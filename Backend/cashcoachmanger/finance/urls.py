from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, BudgetViewSet, IncomeViewSet, ExpenseViewSet,dashtotals_api,expense_list_with_percentage,BudgetDetailView,BudgetDashboardView,ExpenseCategoryListView

router = DefaultRouter()
router.register(r'categories', CategoryViewSet,basename='categories')
router.register(r'budgets', BudgetViewSet,basename='budgets')
router.register(r'incomes', IncomeViewSet,basename='incomes')
router.register(r'expenses', ExpenseViewSet,basename='expenses')

urlpatterns = [
    path('', include(router.urls)),
    path('api/dashboard/', dashtotals_api, name='dashboard-api'),
    path('api/expenses/', expense_list_with_percentage, name='expense-list'),
    path('api/budget/<str:name>/', BudgetDetailView.as_view(), name='budget-detail'),
    path('api/dashboard/', BudgetDashboardView.as_view(), name='budget-dashboard'),
    path('api/expense-categories/', ExpenseCategoryListView.as_view(), name='expense-category-list'),
]
