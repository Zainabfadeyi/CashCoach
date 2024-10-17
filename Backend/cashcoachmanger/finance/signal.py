from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Transaction, Budget
from django.db.models import F

@receiver(post_save, sender=Transaction)
def update_budget_amount_spent(sender, instance, **kwargs):
    if instance.category_type == 'Expenses' and instance.budget:
        total_spent = instance.budget.transactions.aggregate(sum('amount'))['amount__sum'] or 0.00
        print(f"Updating Budget ID: {instance.budget.id} - Total Spent: {total_spent}")  # Debugging output
        instance.budget.amount_spent = total_spent
        instance.budget.save()
        print(f"New Amount Spent: {instance.budget.amount_spent}")  # Debugging output