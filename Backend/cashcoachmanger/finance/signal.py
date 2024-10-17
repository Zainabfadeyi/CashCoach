from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Transaction, Budget

# @receiver(post_save, sender=Transaction)
# def update_budget_on_transaction_save(sender, instance, created, **kwargs):
#     if created:  # Only update if a new transaction is created
#         try:
#             # Find the budget where the name matches the transaction category
#             budget = Budget.objects.get(name=instance.category)
            
#             # Add the transaction amount to the amount_spent
#             budget.amount_spent += instance.amount
            
#             # Link the transaction to the budget
#             budget.transaction = instance
#             budget.save()
#         except Budget.DoesNotExist:
#             pass  # If no budget with matching name exists, do nothing
