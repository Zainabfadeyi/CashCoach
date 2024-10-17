"""
URL configuration for financemanager project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from django.contrib import admin
from users.views import RegisterationViewSet,LoginViewSet,RefreshViewset, UserDetailsView
from rest_framework.routers import DefaultRouter
from finance.views import CategoryViewSet, BudgetViewSet, IncomeViewSet, ExpenseViewSet,TransactionViewSet,BudgetDetailView,BudgetDashboardView, MonthlyIncomeExpenseView,TotalIncomeView,TotalExpensesView,DailyIncomeTrendView,BudgetListView,PreviousMonthBudgetView,WeeklySpendingChartView,IncomeByCategoryView,ExpenseByCategoryView,MonthlyExpenseCategoryView,DeleteBudgetView,BudgetProgressAPIView

router = DefaultRouter()
router.register(r'auth/register', RegisterationViewSet,basename='auth-register')
router.register(r'auth/login',LoginViewSet,basename='auth-login')
router.register(r'auth/refresh',RefreshViewset,basename='auth-refresh')
router.register(r'categories', CategoryViewSet,basename='categories')
router.register(r'budgets', BudgetViewSet,basename='budgets')
router.register(r'incomes', IncomeViewSet,basename='incomes')
router.register(r'expenses', ExpenseViewSet,basename='expenses')

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include((router.urls, "api"))), 
    path("api/user/details/", UserDetailsView.as_view({'get': 'list'}), name='user-details'),
    path("api/transactions/", TransactionViewSet.as_view({'get': 'list', 'post': 'create'}), name='user-transactions'),
    path('api/transactions/<int:pk>/', TransactionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='transaction-detail'),
    path('api/dashboard/total-income/<int:month>', TotalIncomeView.as_view(), name='total-income'),
    path('api/dashboard/total-expenses/<int:month>', TotalExpensesView.as_view(), name='total-expenses'),
    path('api/dashboard/daily-income-trend/', DailyIncomeTrendView.as_view(), name='daily-income-trend'),
    path('api/expenses-by-category/', ExpenseByCategoryView.as_view(), name='expenses-by-category'),
    path('api/income-by-category/', IncomeByCategoryView.as_view(), name='income-by-category'),
    path('api/dashboard/monthly-expense-breakdown/', MonthlyExpenseCategoryView.as_view(), name='expense-category-list'),
    path('api/dashboard/budget-summary', BudgetDashboardView.as_view(), name='budget-summary'),
    path('api/dashboard/monthly-income-expense/', MonthlyIncomeExpenseView.as_view(), name='monthly-income-expense'),
    # path('api/transactions/', TransactionViewSet.as_view(), name='transaction-list'),
    path('api/sidebar/budgets-with-totalamount/', BudgetListView.as_view(), name='budget-list'),
    path('api/budget/<int:pk>/progress/', BudgetProgressAPIView.as_view(), name='budget-progress'),
    path('api/budget/<str:name>/', BudgetDetailView.as_view(), name='budget-detail'),
    path('api/delete-budget/<int:budget_id>/', DeleteBudgetView.as_view(), name='delete-budget'),
    path('api/sidebar/previousbudgets/<int:id>/', PreviousMonthBudgetView.as_view(), name='budget-detail'),
    path('api/sidebar/budgets/weekly-spending/', WeeklySpendingChartView.as_view(), name='weekly-spending-chart')
]
    
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)