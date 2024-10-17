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
  
# class Budget(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     name = models.CharField(max_length=255)
#     category = models.ForeignKey(AllCategory, on_delete=models.CASCADE , null=False)
#     # expense = models.ForeignKey(id, on_delete=models.CASCADE, null=True, blank=True)
#     total_amount = models.DecimalField(max_digits=12,decimal_places=2,null=False)
#     amount_spent = models.DecimalField(max_digits=12, decimal_places=2, null=False)
#     start_date = models.DateField(null=False)
#     end_date = models.DateField(null=False)
#     created_at = models.DateTimeField(auto_now_add=True)

#     @property

#     def percentage_spent(self):
#         # Calculate the percentage spent based on the total amount
#         if self.total_amount > 0:
#             return (self.amount_spent / self.total_amount) * 100
#         return 0

#     def __str__(self):
#         return self.name
    

#     def save(self, *args, **kwargs):
#         # Check if the category exists in the Category model (for expenses)
#         if not AllCategory.objects.filter(name=self.category.name).exists():
#             # Automatically create the category if it does not exist
#             AllCategory.objects.create(name=self.category.name)

#         super(Budget, self).save(*args, **kwargs)

#     def __str__(self):
#         return f"{self.user.username} - {self.category.name} Budget: {self.amount} from {self.start_date} to {self.end_date}"

    
#     # Expenses model
class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    category = models.ForeignKey(AllCategory, on_delete=models.CASCADE, null=False)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, null=False)
    amount_spent = models.DecimalField(max_digits=12, decimal_places=2, null=False)
    start_date = models.DateField(null=False)
    end_date = models.DateField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    # @property
    def spent_percentage(self):
        # Calculate the percentage spent based on the total amount
        if self.total_amount > 0:
            return (self.amount_spent / self.total_amount) * 100
        return 0
    # @property
    def remaining_percentage(self):
        return 100 - self.spent_percentage()
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


class Transaction(models.Model):
    TRANSACTION_TYPE_CHOICES = [
        ("Income", "Income"),
        ("Expenses", "Expenses"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=255, null=False)
    budget = models.ForeignKey(Budget, related_name="transactions", on_delete=models.CASCADE, null=True, blank=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2, null=False)
    description = models.TextField()
    transaction_date = models.DateField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    category_type = models.CharField(max_length=255, choices=TRANSACTION_TYPE_CHOICES, null=False)
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # Save the transaction first
        # Check if the transaction is marked as an expense and linked to a budget
        if self.category_type == 'Expenses':
            if self.budget:
                try:
                    print(f"Updating budget: {self.budget.name} with amount: {self.amount}")
                    self.budget.amount_spent += self.amount
                    print(f"New amount_spent: {self.budget.amount_spent}")
                    self.budget.save()
                except Exception as e:
                    print(f"Error updating budget: {e}")
        #     else:
        #         # print("Transaction does not have a budget linked.")
        # else:
        #     print("Transaction is not an expense.")