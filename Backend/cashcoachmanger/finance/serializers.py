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
    # Define percentage_spent as a method field
    percentage_spent = serializers.SerializerMethodField()

    class Meta:
        model = Budget
        fields = ['name', 'percentage_spent']

    def get_percentage_spent(self, obj):
        # Get the sum of all 'amount_spent' across all budgets
        total_amount_spent = Budget.objects.aggregate(total_spent=Sum('amount_spent'))['total_spent']
        
        if total_amount_spent and total_amount_spent > 0:  # Avoid division by zero
            return round((obj.amount_spent / total_amount_spent) * 100, 2)
        return 0.0  # If the total amount spent is zero, return 0%


class BudgetListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ['name', 'total_amount']
  

class BudgetProgressSerializer(serializers.ModelSerializer):
    spent_percentage = serializers.SerializerMethodField()
    remaining_percentage= serializers.SerializerMethodField()

    class Meta:
        model = Budget
        fields = ['id','name', 'amount_spent', 'total_amount','spent_percentage','remaining_percentage']
    def get_spent_percentage(self, obj):
        """Return the spent percentage."""
        return obj.spent_percentage()  # Ensure this method exists in your model

    def get_remaining_percentage(self, obj):
        """Return the remaining percentage."""
        return obj.remaining_percentage()  # Ensure this method exists in your model
     

    
class BudgetWeeklySpendingSerializer(serializers.Serializer):
    week_start = serializers.DateField()
    amount_spent = serializers.DecimalField(max_digits=10, decimal_places=2)

class ExpensesBreakdonwnSerializer(serializers.ModelSerializer):
    model = ExpenseCategory
    category = serializers.CharField()
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    percentage = serializers.FloatField()



class TransactionSerializer(serializers.ModelSerializer):
    # category_type = serializers.SerializerMethodField()  # Use SerializerMethodField for dynamic behavior

    class Meta:
        model = Transaction
        fields = ['id', 'category_type', 'category', 'amount', 'description', 'transaction_date', 'created_at']
    
    
    def validate_category_type(self, value):
        if value not in dict(Transaction.TRANSACTION_TYPE_CHOICES):
            raise serializers.ValidationError("Invalid category type.")
        return value
    
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
        return Transaction.objects.create(**validated_data)
class TransactionDisplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id','category_type','transaction_date', 'category', 'amount', 'description']