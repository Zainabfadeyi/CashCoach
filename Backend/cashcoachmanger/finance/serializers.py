from rest_framework import serializers
from .models import AllCategory,Income, Budget, Expense, Transaction,ExpenseCategory
from django.db.models import Sum
from datetime import datetime, timedelta


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AllCategory
        fields = ['id','name','category_type']

    def validate(self, data):
        # Check if a category with the same name and type already exists 
        user = self.context['request'].user
        if AllCategory.objects.filter(user=user, name=data['name'], category_type=data['category_type']).exists():
            raise serializers.ValidationError("Category with this name and type already exists.")
        return data


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
    category = CategorySerializer(read_only=True)  # Use nested serializer
    class Meta:
        model = Budget
        exclude=['user','created_at']
    def create(self, validated_data):
        # Check if a budget with the same name already exists for the user
        user = self.context['request'].user
        budget_name = validated_data['name'].strip()

        if Budget.objects.filter(name=budget_name, user=user).exists():
            raise serializers.ValidationError("A budget with this name already exists.")

        # Create the budget if it does not exist
        return super().create(validated_data)


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


# class TransactionSerializer(serializers.ModelSerializer):
#     category_type = serializers.ReadOnlyField()

#     class Meta:
#         model = Transaction
#         fields = ['id', 'category_type', 'category', 'amount', 'description', 'transaction_date', 'created_at']
#         # exclude = ['user']

#     def validate(self, attrs):
#         category = attrs.get('category', '')

#         # Set category_type to "Income" if the category is "Income", otherwise default to "Expenses"
#         if category.lower() == "income":
#             attrs['category_type'] = "Income"
#         else:
#             attrs['category_type'] = "Expenses"

#         return attrs

# class TransactionSerializer(serializers.ModelSerializer):
#     category_type = serializers.ReadOnlyField()

#     class Meta:
#         model = Transaction
#         fields = ['id', 'category_type', 'category', 'amount', 'description', 'transaction_date', 'created_at']

#     def validate(self, attrs):
#         category_name = attrs.get('category', '').strip()

#         # Validate that the category exists in AllCategory
#         if not AllCategory.objects.filter(name=category_name).exists():
#             raise serializers.ValidationError("Category does not exist.")

#         # Set category_type based on the category name
#         if category_name == "Income":
#             attrs['category_type'] = "Income"
#         else:
#             attrs['category_type'] = "Expenses"

#         return attrs
class TransactionSerializer(serializers.ModelSerializer):
    category_type = serializers.SerializerMethodField()  # Use SerializerMethodField for dynamic behavior

    class Meta:
        model = Transaction
        fields = ['id', 'category_type', 'category', 'amount', 'description', 'transaction_date', 'created_at']

    def validate(self, attrs):
        category_name = attrs.get('category', '').strip()

        # Validate that the category exists in AllCategory
        if not AllCategory.objects.filter(name=category_name).exists():
            raise serializers.ValidationError("Category does not exist.")
    
        return attrs  # Return validated attributes

    def get_category_type(self, obj):
        # Determine category type based on the category name
        if obj.category_type == "Income":
            return "Income"
        return "Expenses"

    def create(self, validated_data):
        # Create a Transaction instance
        transaction = Transaction.objects.create(**validated_data)
        return transaction
class TransactionDisplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id','category_type','transaction_date', 'category', 'amount', 'description']
