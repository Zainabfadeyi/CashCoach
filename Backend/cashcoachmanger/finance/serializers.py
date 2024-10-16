from rest_framework import serializers
from .models import AllCategory,Income, Budget, Expense, Transaction,ExpenseCategory
from django.db.models import Sum
from datetime import datetime, timedelta


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AllCategory
        fields = ['id','name','category_type']


def __str__(self):
        return self.name

class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        exclude=['user']    
        read_only_fields=['user','created_at']


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        exclude=['user']
        read_only_fields=['user','created_at']

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        exclude=['user','created_at']


class BudgetDetailSerializer(serializers.ModelSerializer):
    percentage_spent = serializers.ReadOnlyField()

    class Meta:
        model = Budget
        fields = ['name', 'total_amount', 'amount_spent', 'percentage_spent']

class BudgetDashboardSerializer(serializers.ModelSerializer):
    percentage_spent = serializers.ReadOnlyField()


    class Meta:
        model = Budget
        fields = ['name', 'percentage_spent']

class BudgetListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ['name', 'total_amount']
  

class BudgetProgressSerializer(serializers.ModelSerializer):
    spent_percentage = serializers.SerializerMethodField()
    remaining_percentage= serializers.SerializerMethodField()

    class Meta:
        model = Budget
        fields = ['name', 'amount_spent', 'total_amount','spent_percentage','remaining_percentage']

    def get_spent_percentage(self, obj):
        """Calculate the percentage of the total budget that has been spent"""
        if obj.total_amount > 0:
            return (obj.amount_spent / obj.total_amount) * 100
        return 0

    def get_remaining_percentage(self, obj):
        """Calculate the remaining percentage of the budget"""
        return 100 - self.get_spent_percentage(obj)
    # if no expenses are found


    # def get_percentage_spent(self, obj):
    #     # Calculate the percentage of the budget spent
    #     amount_spent = self.get_amount_spent(obj)
    #     if obj.total_amount > 0:
    #         percentage_spent = (amount_spent / obj.total_amount) * 100
    #     else:
    #         percentage_spent = 0
    #     return round(percentage_spent, 2)  
    
    # def get_percentage_left(self, obj):
    #     # Calculate the percentage left based on percentage spent
    #     percentage_spent = self.get_percentage_spent(obj)
    # # Calculate percentage left
    #     return 100 - percentage_spent  

class PreviousMonthBudgetSerializer(serializers.ModelSerializer):
    previous_amount = serializers.SerializerMethodField()
    previous_amount_spent = serializers.SerializerMethodField()
    change = serializers.SerializerMethodField()

    class Meta:
        model = Budget
        fields = ['name', 'total_amount', 'previous_amount', 'previous_amount_spent', 'change']  # Fields to be returned

    
    def get_previous_month_budget(self, obj):
        #previous month budget amount
        previous_month = datetime.now().replace(day=1) - timedelta(days=1)
        month_start = previous_month.replace(day=1)
        return obj.total_amount 
     
    def get_previous_month_spent(self, obj):
        previous_month = datetime.now().replace(day=1) - timedelta(days=1)
        month_start = previous_month.replace(day=1)
        month_end = previous_month.replace(day=1) + timedelta(days=31)
        
        total_spent = Transaction.objects.filter(
            category=obj,
            type='EXPENSE',
            date__gte=month_start,
            date__lt=month_end
        ).aggregate(total=Sum('amount'))['total']
        return total_spent or 0 

    def get_previous_month_change(self, obj):
        previous_budget = self.get_previous_month_budget(obj)
        previous_spent = self.get_previous_month_spent(obj)
        return previous_budget - previous_spent

    
class BudgetWeeklySpendingSerializer(serializers.Serializer):
    week_start = serializers.DateField()
    amount_spent = serializers.DecimalField(max_digits=10, decimal_places=2)

class ExpensesBreakdonwnSerializer(serializers.ModelSerializer):
    model = ExpenseCategory
    category = serializers.CharField()
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    percentage = serializers.FloatField()


class TransactionSerializer(serializers.ModelSerializer):
    category_type = serializers.ReadOnlyField()
    category = serializers.ReadOnlyField()

    class Meta:
        model = Transaction
        fields = ['id', 'category_type', 'category', 'amount', 'description', 'transaction_date', 'created_at']
        # exclude = ['user']

    # def validate(self, attrs):
    #     category = attrs.get('category')

    #     if not category:
    #         raise serializers.ValidationError("Category is required.")

    #     # Ensure the category exists and retrieve its type
    #     if isinstance(category, AllCategory):  # If category is a valid Category instance
    #         category_type = category.category_type  # Derive the transaction type from the category

    #         # Ensure the derived category_type matches the expected category type
    #         if category_type != category.category_type:
    #             raise serializers.ValidationError(
    #                 f"The selected category '{category.name}' is not valid for '{category_type}' transactions."
    #             )
    #     else:
    #         raise serializers.ValidationError("Invalid category data provided.")

    #     return attrs
class TransactionDisplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id','category_type','transaction_date', 'category', 'amount', 'description']
