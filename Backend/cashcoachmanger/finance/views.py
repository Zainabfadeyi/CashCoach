from datetime import timezone,timedelta
from django.shortcuts import render
from django.db.models import F
from decimal import Decimal
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets,generics
from .serializers import CategorySerializer,IncomeSerializer,ExpenseSerializer,ExpensesBreakdonwnSerializer,BudgetSerializer,TransactionSerializer,BudgetDetailSerializer,BudgetDashboardSerializer,BudgetListSerializer,BudgetWeeklySpendingSerializer,BudgetProgressSerializer
from rest_framework.decorators import api_view
from .models import AllCategory, Income, Expense,ExpenseCategory, Budget, Transaction
from django.http import JsonResponse
from django.db.models import Count, Sum
from datetime import datetime, timedelta
import calendar
import datetime
from rest_framework import status
from datetime import datetime, timezone
from django.utils.timezone import now, timedelta,datetime
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

# Create your views here.


class CustomViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    http_method_names = ('get', 'post', 'put', 'patch', 'delete')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# class CategoryViewSet(CustomViewSet):
#     serializer_class = CategorySerializer

#     def get_queryset(self):
#         return AllCategory.objects.filter(user=self.request.user)
class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        
        user = self.request.user
        queryset = AllCategory.objects.filter(user=user)
        
        return queryset

    def perform_create(self, serializer):
       
        serializer.save(user=self.request.user)

class IncomeByCategoryView(APIView):
    
    def get(self, request, user_id):
        # Fetch income transactions grouped by category for the specific user
        income_data = (
            Transaction.objects
            .filter(category_type='Income', user_id=user_id)  # Filter by income and user ID from URL
            .values('category')  # Group by category name
            .distinct()  # Get unique category names
        )
        
        # Prepare the response
        categories = [item['category'] for item in income_data]

        return Response(categories, status=200)
    
class ExpenseByCategoryView(APIView):
     def get(self, request,user_id):
        # Fetch expense transactions grouped by category
        expense_data = (
            Transaction.objects
            .filter(category_type='Expenses',user_id=user_id)  # Filter by expenses
            .values('category')  # Group by category name
            .distinct()  # Get unique category names
        )

        # Prepare the response
        categories = [item['category'] for item in expense_data]

        return Response(categories, status=200)
     


class MonthlyExpenseCategoryView(APIView):
    def get(self, request,user_id):
        #  current month and year
        current_month = datetime.now().month
        current_year = datetime.now().year
        
        #  total expenses for the current month
        total_expenses = (
            Transaction.objects
            .filter(category_type='Expenses',user_id=user_id, transaction_date__month=current_month, transaction_date__year=current_year)
            .aggregate(total=Sum('amount'))['total'] or 0  #  total sum of expenses for the month
        )

        # Fetch expenses by category for the current month, grouped by category
        expense_data = (
            Transaction.objects
            .filter(category_type='Expenses',user_id=user_id, transaction_date__month=current_month, transaction_date__year=current_year)
            .values('category')  # Group by category name
            .annotate(total_amount=Sum('amount'))  # Total amount per category
            .order_by('-total_amount')  # Order by total amount (descending)
        )

        # Prepare the response with name, total amount, and percentage
        chart_data = [
            {
                'name': item['category'],  # Category name
                'amount': item['total_amount'],  # Total amount for the category
                'percentage': round((item['total_amount'] / total_expenses) * 100 ,2)if total_expenses > 0 else 0  # Percentage of total expenses
            }
            for item in expense_data
        ]

        return Response(chart_data, status=200)

class IncomeViewSet(CustomViewSet):
    serializer_class = IncomeSerializer
    
    def get_queryset(self):
        return Income.objects.filter(user=self.request.user)

class DailyIncomeTrendView(APIView):
    def get(self, request,user_id):
        today = datetime.now().date()
        start_date = today - timedelta(days=11)  # 12 days total

        # Fetch income transactions for the last 12 days, grouped by transaction_date
        income_data = (
            Transaction.objects
            .filter(category_type='Income', user_id=user_id,transaction_date__gte=start_date, user=request.user)
            .values('transaction_date')  # Group by transaction_date
            .annotate(total_income=Sum('amount'))  # Sum amounts for each date
            .order_by('transaction_date')  # Order by transaction_date
        )

        # Create a dictionary to store income per day
        income_by_date = {item['transaction_date']: item['total_income'] for item in income_data}

        # Initialize result for all 12 days
        chart_data = []
        for i in range(12):
            date = start_date + timedelta(days=i)
            formatted_date = date.strftime('%b %d')

            # Get total income for this day (0 if no income found)
            total_income = income_by_date.get(date, 0)
            
            chart_data.append({
                'date': formatted_date,
                'total_income': total_income
            })

        # Calculate the total amount of income across the last 12 days
        total_income = sum(item['total_income'] for item in chart_data)

        # Prepare the final response data
        response_data = {
            'total_income': total_income,  # Total income for the last 12 days
            'daily_income_trend': chart_data,  # Daily income data
        }

        return Response(response_data, status=200)
class TotalExpensesView(APIView):

    def get(self,request, user_id, month, year=None, *args, **kwargs):
        if not year:
            year = datetime.now().year  # Default to current year if not provided

        # Calculate the total sum of all expense transactions for the specified month and year
        total_expenses = Transaction.objects.filter(
            category_type='Expenses',
            user_id=user_id,
            transaction_date__month=month,
            transaction_date__year=year
        ).aggregate(total_expenses=Sum('amount'))['total_expenses'] or 0

        # Return the total as a JSON response
        return Response({'total_expenses': float(total_expenses)})
class TotalIncomeView(APIView):
    
    def get(self, request,user_id, month, *args, **kwargs):
        # Get the current year or the specified year if you want to filter by year
        year = datetime.now().year

        # Aggregate the sum of all income transactions for the specified month
        total_income = Transaction.objects.filter(
            category_type='Income',
            user_id=user_id,
            transaction_date__month=month,
            transaction_date__year=year  # Optionally filter by year
        ).aggregate(total_income=Sum('amount'))['total_income'] or 0

        # Prepare the response
        return Response({
            'total_income': float(total_income)  # Return total income as a float
        })

class ExpenseViewSet(CustomViewSet):
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)

# LIST OF EXPENSES WITH THIER PERCENTAGE-------------

class ExpensesBreakdownView(APIView):
    queryset = ExpenseCategory.objects.all()
    serializer_class = ExpensesBreakdonwnSerializer
    def get(self, request,user_id):
        # Calculate the total expenses
        total_expenses = Expense.objects.aggregate(total=Sum('amount'))['total'] or 0

        # Fetch all expense categories
        categories = ExpenseCategory.objects.all()

        # Prepare the response data
        category_data = []
        for category in categories:
            # Calculate the total amount spent in this category
            category_total = ExpenseCategory.objects.filter(category=category,user_id=user_id).aggregate(total=Sum('amount'))['total'] or 0
            
            # Calculate the percentage
            percentage = (category_total / total_expenses * 100) if total_expenses > 0 else 0

            category_data.append({
                'category': category.name,
                'amount': category_total,
                'percentage': round(percentage, 2)  # Round to 2 decimal places
            })

        return Response(category_data, status=200)
class BudgetViewSet(CustomViewSet):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]
    

    def get_queryset(self):
      
        user_id = self.kwargs.get('user_id')
       
        return Budget.objects.filter(user_id=user_id)

    def perform_create(self, serializer):
        # Set the user when creating a new budget
        serializer.save(user=self.request.user)
class   DeleteBudgetView(APIView): 
    def delete(self, request,user_id, budget_id=None):
        try:
            # Fetch the budget by its ID
            budget = Budget.objects.get(id=budget_id,user_id=user_id)
            budget.delete()  # Delete the budget
            return Response({"detail": "Budget deleted successfully."}, status=200)
        except Budget.DoesNotExist:
            return Response({"detail": "Budget not found."})
    
class BudgetListView(generics.ListAPIView):
   
    serializer_class = BudgetListSerializer
    
 
    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        return Budget.objects.filter(user_id=user_id)
    
class BudgetDetailView(generics.RetrieveAPIView):
 
    serializer_class = BudgetDetailSerializer
    
    lookup_field = 'name'

    def get_object(self,user_id):
        user_id = self.kwargs.get('user_id')

        name = self.kwargs.get('name')
        try:
            return Budget.objects.get(name=name)
        except Budget.DoesNotExist:
            raise NotFound(f"Budget with name '{name}' not found.")
        
class BudgetProgressAPIView(generics.RetrieveAPIView):
    serializer_class = BudgetProgressSerializer
    permission_classes = [IsAuthenticated]
    
    lookup_field = 'pk' 
  
    
    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        return Budget.objects.filter(user_id=user_id)
        
            
class BudgetDashboardView(generics.ListAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetDashboardSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id') 
        total_amount_spent = Budget.objects.filter(user_id=user_id).aggregate(total_spent=Sum('amount_spent'))['total_spent'] or 0

        # Filter budgets by user and calculate the percentage spent
        if total_amount_spent > 0:
            return Budget.objects.filter(user_id=user_id).annotate(
                percentage_spent=(F('amount_spent') / total_amount_spent) * 100
            ).order_by('-percentage_spent')  # Order by percentage_spent descending
        else:
            return Budget.objects.filter(user_id=user_id).order_by('name')

class WeeklySpendingChartView(generics.GenericAPIView):
    serializer_class = BudgetWeeklySpendingSerializer

    def get(self, request,user_id, budget_id, *args, **kwargs):
        today = datetime.now().date()
        # Get data for the last 12 days
        start_date = today - timedelta(days=11)  # This includes today + 11 previous days

        # A list of daily intervals for spending
        daily_spending = []
        
        for i in range(12):  # Loop through the last 12 days
            day = start_date + timedelta(days=i)
            total_spent = Transaction.objects.filter(
                transaction_date__gte=day,
                transaction_date__lt=day + timedelta(days=1),
                category_type='Expenses',
                user_id=user_id,
                budget__id=budget_id  # Use budget__id instead of budget_id
            ).aggregate(total=Sum('amount'))['total'] or 0
            
            # Format the date as 'Oct 7', 'Oct 8', etc.
            daily_spending.append({
                'day': day.strftime('%b %d'),  # Format the date as abbreviated month and day
                'amount_spent': total_spent
            })

        return Response(daily_spending, status=200)
    
class MonthlyIncomeExpenseView(APIView):

    def get(self, request,user_id, *args, **kwargs):
        monthly_data = {}

        # Get today's date and start from the current month
        today = now().date()
        start_month = today.replace(day=1)

        # Loop through the current month and the last 11 months (totaling 12 months)
        for i in range(0, 12):
            # Calculate the first and last day of each month
            first_day_of_month = (start_month - timedelta(days=30 * i)).replace(day=1)
            last_day_of_month = first_day_of_month.replace(
                day=calendar.monthrange(first_day_of_month.year, first_day_of_month.month)[1]
            )

            # Query total income for this month
            monthly_income = Transaction.objects.filter(
                category_type='Income', 
                user_id=user_id,
                transaction_date__range=[first_day_of_month, last_day_of_month]
            ).aggregate(total_income=Sum('amount'))['total_income'] or 0

            # Query total expenses for this month
            monthly_expense = Transaction.objects.filter(
                category_type='Expenses', 
                user_id=user_id,
                transaction_date__range=[first_day_of_month, last_day_of_month]
            ).aggregate(total_expense=Sum('amount'))['total_expense'] or 0

            # Format the month name (e.g., "Oct")
            month_name = first_day_of_month.strftime('%b')

            # Add data to the monthly_data dictionary with the month as a key
            monthly_data[month_name] = {
                'income_data': float(monthly_income),
                'expense_data': float(monthly_expense)
            }

        return Response(monthly_data)

class TransactionViewSet(CustomViewSet):
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]
    serializer_class = TransactionSerializer

    def get_queryset(self):
        # Ensure only transactions for the logged-in user are returned
        user = self.request.user
        queryset = Transaction.objects.filter(user=user).order_by('-pk')  # Order by pk descending
        return queryset

    def create(self, request):
        # Use the logged-in user directly
        user = request.user
        if not user.is_authenticated:
            return Response({"error": "Authentication required."}, status=401)
        
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            # Save the transaction with the logged-in user
            transaction = serializer.save(user=user)
            return Response(serializer.data, status=201)
        
        return Response(serializer.errors, status=400)

    def delete(self, request, user_id, *args, **kwargs):
        pk = kwargs.get('pk')  # Get the pk from URL
        try:
            transaction = Transaction.objects.get(pk=pk, user_id=user_id)
            transaction.delete()  # Perform the delete action
            return Response(status=204)
        except Transaction.DoesNotExist:
            return Response({"detail": "Transaction not found"}, status=200)

    def update(self, request, user_id, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        
        # Ensure the user_id matches the user associated with the instance
        if instance.user_id != user_id:
            return Response({"detail": "You do not have permission to update this transaction."}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class AnalyticsView(APIView):
    
    def get(self, request,user_id, *args, **kwargs):
       
        today = datetime.now().date()
  
        # Total income and expenses for the that day
        total_income_today = Transaction.objects.filter(
            category_type='Income', 
            user_id=user_id,
            transaction_date=today
        ).aggregate(total=Sum('amount'))['total'] or 0

        total_expense_today = Transaction.objects.filter(
            category_type='Expenses', 
            user_id=user_id,
            transaction_date=today
        ).aggregate(total=Sum('amount'))['total'] or 0

        # Daily average total income + total expense/2
        total_today = total_income_today + total_expense_today
        daily_average = total_today / 2 if total_today > 0 else 0

        # Total number of categories and transactions
        total_transactions = Transaction.objects.filter(user_id=user_id).count()

    # Total Categories
        total_categories = AllCategory.objects.filter(user_id=user_id).count()

        # Prepare the response data
        analytics_data = {
            "daily_average": daily_average,
            "total_categories": total_categories,
            "total_transactions": total_transactions,
        }

        return Response(analytics_data)


class IncomeOverviewView(APIView):
    def get(self, request,user_id):
        # Get the current date and the first day of the current month
        today = now()
        first_day_of_month = today.replace(day=1)

        # Fetch income transactions for the current month
        income_transactions = (
            Transaction.objects.filter(
                created_at__gte=first_day_of_month,
                category_type='Income',
                user_id=user_id,
                user=request.user  # Filter by logged-in user
            )
            .values('category')
            .annotate(amount=Sum('amount'))  # Sum amounts for each category
        )

        # Calculate the total income for the month
        total_income = sum(item['amount'] for item in income_transactions)

        # Prepare the response data with percentage calculation
        income_data = []
        for transaction in income_transactions:
            percentage = round((transaction['amount'] / total_income * 100), 2) if total_income > 0 else 0
            income_data.append({
                'category': transaction['category'],
                'amount': transaction['amount'],
                'percentage': round(percentage,2)
                            
                })

        # Return the data as a JSON response
        return Response(income_data)




class ExpenseOverviewView(APIView):
    def get(self, request,user_id):
        # Get the current date and the first day of the current month
        today = now()
        first_day_of_month = datetime.now().replace(day=1)

        # Fetch expense transactions for the current month
        expense_transactions = (
            Transaction.objects.filter(
                created_at__gte=first_day_of_month,
                category_type='Expenses',
                user_id=user_id,
                user=request.user  
            )
            .values('category')
            .annotate(total_amount=Sum('amount'))  # Group by category and sum the amounts
        )

        # Calculate the total expenses for percentage calculation
        total_expense = sum(item['total_amount'] for item in expense_transactions)

        # Prepare the response data
        expense_data = []
        for transaction in expense_transactions:
            percentage = (transaction['total_amount'] / total_expense * 100) if total_expense > 0 else 0
            expense_data.append({
                'category': transaction['category'],
                'amount': transaction['total_amount'],
                'percentage': round(percentage, 2)  # Round to two decimal places
            })

        # Return the data as a JSON response
        return Response(expense_data)



class IncomeTransactionsView(APIView):
    def get(self, request,user_id):
        # Fetch all transactions where category_type is 'Expenses'
        transactions = Transaction.objects.filter(category_type='Income',user_id=user_id).order_by('-id')

        # Prepare the response data
        transactions_data = [
            {
                'id': transaction.id,
                'category': transaction.category,
                'description': transaction.description,
                'amount': transaction.amount,
                'category_type': transaction.category_type,
                'transaction_date': transaction.transaction_date,
                'created_at': transaction.created_at,
            }
            for transaction in transactions
        ]

        # Return the data as a JSON response
        return Response(transactions_data, status=200)




class ExpenseTransactionsView(APIView):
    def get(self, request,user_id):
        # Fetch all transactions where category_type is 'Expenses'
        transactions = Transaction.objects.filter(category_type='Expenses',user_id=user_id).order_by('-id')

        # Prepare the response data
        transactions_data = [
            {
                'id': transaction.id,
                'category': transaction.category,
                'description': transaction.description,
                'amount': transaction.amount,
                'category_type': transaction.category_type,
                'transaction_date': transaction.transaction_date,
                'created_at': transaction.created_at,
            }
            for transaction in transactions
        ]

        # Return the data as a JSON response
        return Response(transactions_data, status=200)
    
class IncomeandExpenseProgressView(APIView):
    def get(self, request,user_id):
        # Fetch total income and income transaction count
        income_data = Transaction.objects.filter(
            user=request.user, category_type='Income',user_id=user_id
        ).aggregate(
            total_income=Sum('amount'),
            total_income_count=Count('id')
        )

        # Fetch total expenses
        expense_data = Transaction.objects.filter(
            user=request.user, category_type='Expenses',user_id=user_id
        ).aggregate(
            total_expenses=Sum('amount'),
            total_expenses_count=Count('id')
        )

        total_income = income_data['total_income'] or 0
        total_expenses = expense_data['total_expenses'] or 0

        # Calculate total for percentage calculation
        total_amount = total_income + total_expenses

        # Calculate income percentage
        if total_amount > 0:
            income_percentage = (total_income / total_amount) * 100
            expenses_percentage = (total_expenses / total_amount) * 100
        else:
            income_percentage = 0
            expenses_percentage = 0

        # Round percentages to two decimal places and return them as strings with '%' symbol
        return Response({
            "income_percentage": f"{round(income_percentage, 2)}%",
            "expenses_percentage": f"{round(expenses_percentage, 2)}%"
        })

class EditCategoryView(generics.UpdateAPIView):
    queryset = AllCategory.objects.all()
    serializer_class = CategorySerializer

    def update(self, request,user_id, *args, **kwargs):
        category = self.get_object()  
        # Get the category to be updated
        old_name = category.name 
         

      
        response = super().update(request, *args, **kwargs)

        # Update all transactions that used the old category name
        Transaction.objects.filter(category=old_name,user_id=user_id).update(category=request.data['name'])

        return response
    

class DeleteCategoryView(generics.DestroyAPIView):
    queryset = AllCategory.objects.all()

    def destroy(self, request,user_id, *args, **kwargs):
        category = self.get_object()  # Get the category to be deleted

        # Delete all transactions associated with this category
        Transaction.objects.filter(category=category.name,user_id=user_id).delete()

        # Perform the category deletion
        category.delete()

        return Response(status=200)