from datetime import datetime
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.db.models import F
from django.core.exceptions import ValidationError
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
User = get_user_model()
# Category Model for both Budget and Expenses
    
class AllCategory(models.Model):
 
    CATEGORY_TYPE_CHOICES = [
        ("Income", 'Income'),
        ("Expenses", 'Expenses'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    category_type = models.CharField(
        max_length=255,
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
  

class Transaction(models.Model):
    TRANSACTION_TYPE_CHOICES = [
        ("Income", "Income"),
        ("Expenses", "Expenses"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=255, null=False)
    amount = models.DecimalField(max_digits=12, decimal_places=2 ,null=False)
    description = models.TextField()
    transaction_date = models.DateField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    category_type = models.CharField(max_length=255, choices=TRANSACTION_TYPE_CHOICES, null=False)
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # Save the transaction first
  
        # Only update budgets for expenses
        if self.category_type == "Expenses":
            try:
                # Find the corresponding budget where the name matches the category
                budget = Budget.objects.get(name=self.category, user=self.user)

                # Calculate the potential new amount_spent
                new_amount_spent = budget.amount_spent + self.amount

                # Check if the new amount exceeds the budget's total amount
                if new_amount_spent > budget.total_amount:
                    exceeded_amount = new_amount_spent - budget.total_amount
                    # Notify the user about the exceeded amount
                    print(f"You have exceeded your budget by {exceeded_amount:.2f}.")  # Change to appropriate notification method

                # Update the budget's amount_spent regardless
                budget.amount_spent += self.amount
                budget.transaction = self  # Link the transaction to the budget
                budget.save()

            except Budget.DoesNotExist:
                # Handle cases where no matching budget is found
                pass
    
#     # Expenses model
class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    # transaction = models.ForeignKey('Transaction', related_name="budget",on_delete=models.CASCADE,null=False)
    category = models.ForeignKey(AllCategory, on_delete=models.CASCADE, null=True, blank=True)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, null=False)
    amount_spent = models.DecimalField(max_digits=12, decimal_places=2, null=False)
    start_date = models.DateField(null=False)
    end_date = models.DateField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    # @property
    def spent_percentage(self):
        # Calculate the percentage spent based on the total amount
        if self.total_amount > 0:
            return round((self.amount_spent / self.total_amount) * 100,2)
        return 0
    # @property
    def remaining_percentage(self):
          return round(100 - self.spent_percentage(), 2) 
    def save(self, *args, **kwargs):
        # Check if the category name exists in AllCategory for this user
        category_name = self.name.strip()  # Use the budget name as the category name

        all_category = AllCategory.objects.filter(name=category_name, user=self.user).first()
        
        # If no category found, create a new category with type "Expenses"
        if not all_category:
            all_category = AllCategory.objects.create(
                name=category_name,
                category_type="Expenses",  # Default to Expenses
                user=self.user
            )
        
        # Assign the category to the budget
        self.category = all_category
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.category.name} Budget: {self.total_amount} from {self.start_date} to {self.end_date}"

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
