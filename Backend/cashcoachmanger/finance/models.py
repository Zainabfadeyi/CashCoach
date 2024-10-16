from datetime import datetime
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.db.models import F
from django.core.exceptions import ValidationError

# Create your models here.
User = get_user_model()
# Category Model for both Budget and Expenses
    
class AllCategory(models.Model):
 
    CATEGORY_TYPE_CHOICES = [
        ("Income", 'Income'),
        ("Expense", 'Expense'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    category_type = models.CharField(
        max_length=7,
        choices=CATEGORY_TYPE_CHOICES,
        null =False
    )

    def __str__(self):
        return f"{self.name} ({self.category_type})"

    # Income Model
class Income(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(AllCategory, on_delete=models.CASCADE) 
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.source}: {self.amount}"
  
class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    category = models.ForeignKey(AllCategory, on_delete=models.CASCADE)
    # expense = models.ForeignKey(id, on_delete=models.CASCADE, null=True, blank=True)
    total_amount = models.DecimalField(max_digits=12,decimal_places=2,null=False)
    amount_spent = models.DecimalField(max_digits=12, decimal_places=2, null=False)
    start_date = models.DateField(null=False)
    end_date = models.DateField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    @property

    def percentage_spent(self):
        # Calculate the percentage spent based on the total amount
        if self.total_amount > 0:
            return (self.amount_spent / self.total_amount) * 100
        return 0

    def __str__(self):
        return self.name
    

    def save(self, *args, **kwargs):
        # Check if the category exists in the Category model (for expenses)
        if not AllCategory.objects.filter(name=self.category.name).exists():
            # Automatically create the category if it does not exist
            AllCategory.objects.create(name=self.category.name)

        super(Budget, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.category.name} Budget: {self.amount} from {self.start_date} to {self.end_date}"

    
    # Expenses model
class Expense(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(AllCategory, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=12, decimal_places=2, null=False)
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField()
    date = models.DateField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.category.name} - {self.amount} on {self.date}"

class ExpenseCategory(models.Model):
    name = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return self.name


class Transaction(models.Model):
    TRANSACTION_TYPE_CHOICES = [
        ("Income", "Income"),
        ("Expenses", "Expenses"),
    ]

 
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Uncomment this line
    category = models.ForeignKey(AllCategory,on_delete=models.CASCADE, null=False)
    budget = models.ForeignKey(Budget,related_name="transactions", on_delete=models.CASCADE, null=True, blank=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2, null=False)
    description = models.TextField()
    transaction_date = models.DateField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPE_CHOICES, null=False)  # Add this field

    def save(self, *args, **kwargs):
        # check if the transaction is an expense and linked to a budget
        if self.transaction_type == 'expense' and self.budget:
            #  find a budget that matches the category, if none provided
            if not self.budget:
                try:
                    self.budget = Budget.objects.get(category=self.category)
                except Budget.DoesNotExist:
                    raise ValueError(f"No budget exists for category {self.category}")
            # check if the category of the expense matches the budget category
            if self.budget and self.category == self.budget.category:
                # add the expense amount to the budget spent amount
                self.budget.spent_amount = F('spent_amount') + self.amount
        # Set transaction_type based on category before saving
        self.transaction_type = "Income" if self.category == "Income" else "Expenses"
        if self.category:
            self.transaction_type = self.category.category_type
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.transaction_type} of {self.amount} in {self.category} on {self.transaction_date}"
    
     

# automatically update amount_spent in Budget when a Transaction is created
# @receiver(post_save, sender=Transaction)
def update_budget_amount_spent(sender, instance, **kwargs):
    budget = instance.budget
    total_spent = sum(transaction.amount for transaction in budget.transactions.all())
    budget.amount_spent = total_spent
    budget.save()