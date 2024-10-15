from datetime import timezone
from django.shortcuts import render
from django.db.models import F
from decimal import Decimal
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets,generics
from .serializers import CategorySerializer,IncomeSerializer,ExpenseSerializer,ExpensesBreakdonwnSerializer,BudgetSerializer,TransactionSerializer,BudgetDetailSerializer,BudgetDashboardSerializer,BudgetListSerializer,BudgetWithProgressSerializer,PreviousMonthBudgetSerializer,BudgetWeeklySpendingSerializer
from rest_framework.decorators import api_view
from .models import AllCategory, Income, Expense,ExpenseCategory, Budget, Transaction
from django.db.models import Sum
import calendar
from django.utils.timezone import now, timedelta,datetime
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

# Create your views here.


class CustomViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    http_method_names = ('get', 'post', 'put', 'patch', 'delete')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CategoryViewSet(CustomViewSet):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return AllCategory.objects.filter(user=self.request.user)

class IncomeViewSet(CustomViewSet):
    serializer_class = IncomeSerializer
    
    def get_queryset(self):
        return Income.objects.filter(user=self.request.user)

# class DailyIncomeTrendView(APIView):

#     def get(self, request, *args, **kwargs):
#         # Get today's date
#         today = now().date()

#         # Get the date range (e.g., the last 30 days)
        
#         start_date = today - timedelta(days=30)

#         # Query for daily income (grouping by date)
#         daily_income = (
#             Transaction.objects.filter(transaction_type='Income', date__range=[start_date, today])
#             .values('transaction_date')
#             .annotate(total_income=Sum('amount'))
#             .order_by('transaction_date')
#         )

#         #  data for the chart (x-axis: dates, y-axis: daily income)
#         tr_dates = []
#         income_data = []

#         for entry in daily_income:
#             tr_dates.append(entry['transaction_date'].strftime('%Y-%m-%d'))  # Format date as a string
#             income_data.append(float(entry['total_income']))

#         # Prepare the response data
#         chart_data = {
#             'tr_dates': tr_dates,
#             'income_data': income_data
#         }

#         return Response(chart_data)
class DailyIncomeTrendView(APIView):
    def get(self, request):
        # Fetch income data, grouped by transaction_date
        income_data = (
            Income.objects
            .values('transaction_date')  # Group by transaction_date
            .annotate(total_income=Sum('amount'))  # Sum amounts for each date
            .order_by('transaction_date')  # Order by transaction_date
        )

        # Prepare the response
        chart_data = [
            {
                'date': str(item['transaction_date']), 
                'total_income': item['total_income'] or 0  # Use 0 if total_income is None
            }
            for item in income_data
        ]
        return Response(chart_data, status=200)
    
class TotalIncomeView(APIView):
    
    def get(self, request, *args, **kwargs):
        # Aggregate the sum of all income transactions
        total_income = Transaction.objects.filter(transaction_type='Income').aggregate(total_income=Sum('amount'))['total_income'] or 0

        # Prepare the response
        return Response({
            'total_income': float(total_income)  # Return total income as a float
        })
class TotalExpensesView(APIView):

    def get(self, request, *args, **kwargs):
        user_id = request.query_params.get('user_id')
        # Calculate the total sum of all expense transactions
        total_expenses = Transaction.objects.filter(transaction_type='Expenses').aggregate(total=Sum('amount'))['total'] or 0

        # Return the total as a JSON response
        return Response({'total_expenses': float(total_expenses)})

class ExpenseViewSet(CustomViewSet):
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)

# LIST OF EXPENSES WITH THIER PERCENTAGE-------------

class ExpensesBreakdownView(APIView):
    queryset = ExpenseCategory.objects.all()
    serializer_class = ExpensesBreakdonwnSerializer
    def get(self, request):
        # Calculate the total expenses
        total_expenses = Expense.objects.aggregate(total=Sum('amount'))['total'] or 0

        # Fetch all expense categories
        categories = ExpenseCategory.objects.all()

        # Prepare the response data
        category_data = []
        for category in categories:
            # Calculate the total amount spent in this category
            category_total = ExpenseCategory.objects.filter(category=category).aggregate(total=Sum('amount'))['total'] or 0
            
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
    
    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)
    
class BudgetListView(generics.ListAPIView):
    queryset = Budget.objects.all()  
    serializer_class = BudgetListSerializer
    
class BudgetDetailView(generics.RetrieveAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetDetailSerializer
    lookup_field = 'name'

    def get_object(self):
        name = self.kwargs.get('name')
        try:
            return Budget.objects.get(name=name)
        except Budget.DoesNotExist:
            raise NotFound(f"Budget with name '{name}' not found.")
        
class BudgetDashboardView(generics.ListAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetDashboardSerializer
    
class BudgetprogressView(generics.RetrieveAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetWithProgressSerializer
    lookup_field = 'id'

class WeeklySpendingChartView(generics.GenericAPIView):
    serializer_class = BudgetWeeklySpendingSerializer

    def get(self, request, *args, **kwargs):
        today = datetime.now().date()
         # Get data for the last 30 days
        start_date = today - timedelta(days=30) 

        #  a list of weekly intervals
        weeks = []
        for i in range(5):  # 5 weeks
            week_start = start_date + timedelta(days=i * 7)
            week_end = week_start + timedelta(days=7)
            total_spent = Transaction.objects.filter(
                date__gte=week_start,
                date__lt=week_end,
                transaction_type='EXPENSE'
            ).aggregate(total=Sum('amount'))['total'] or 0
            weeks.append({
                'week_start': week_start,
                'amount_spent': total_spent
            })

        return Response(weeks)
class PreviousMonthBudgetView(generics.ListAPIView):
    queryset = Budget.objects.all()
    serializer_class = PreviousMonthBudgetSerializer


class MonthlyIncomeExpenseView(APIView):
    
    def get(self, request, *args, **kwargs):
        months = []
        income_data = []
        expense_data = []

        # Get today's date
        today = now().date()

        # Loop through the last 10 months
        for i in range(10, 0, -1):
            first_day_of_month = (today.replace(day=1) - timezone.timedelta(days=30 * i)).replace(day=1)
            last_day_of_month = first_day_of_month.replace(day=calendar.monthrange(first_day_of_month.year, first_day_of_month.month)[1])

            # Query total income for this month
            monthly_income = Transaction.objects.filter(
                transaction_type='INCOME', 
                date__range=[first_day_of_month, last_day_of_month]
            ).aggregate(total_income=Sum('amount'))['total_income'] or 0

            # Query total expenses for this month
            monthly_expense = Transaction.objects.filter(
                transaction_type='EXPENSE', 
                date__range=[first_day_of_month, last_day_of_month]
            ).aggregate(total_expense=Sum('amount'))['total_expense'] or 0

            # Format the month name (e.g., "Jan 2024")
            month_name = first_day_of_month.strftime('%b %Y')

            # Append results for this month
            months.append(month_name)
            income_data.append(float(monthly_income))
            expense_data.append(float(monthly_expense))

        # Prepare the data for the chart
        chart_data = {
            'months': months,
            'income_data': income_data,
            'expense_data': expense_data
        }

        return Response(chart_data)
    

class TransactionViewSet(CustomViewSet):
    lookup_field = 'pk' 
    permission_classes = [IsAuthenticated]
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    def list(self, request):
        user_id = request.query_params.get('user_id')
        if user_id:
             # Filter by user ID if provided
            
            transactions = Transaction.objects.filter(user_id=user_id)
        else:
             # Default to the authenticated user
            transactions = Transaction.objects.filter(user=request.user)
        
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

    def create(self, request):
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({"error": "User ID is required."}, status=400)

        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            # Set the user before saving
            serializer.save(user_id=user_id)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, *args, **kwargs):
        
        pk = kwargs.get('pk')  # Get the pk from URL
        transaction = self.get_object()  # Retrieve the object based on pk
        transaction.delete()  # Perform the delete action
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data,status=201)