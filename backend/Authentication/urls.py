from django.urls import path
from . import views

urlpatterns = [
    # Auth & profile
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('profile/', views.profile_view, name='profile'),
    path('profile/update/', views.update_profile_view, name='update_profile'),

    # Skills
    path('skills/', views.list_skills, name='list_skills'),

    # Users
    path('users/', views.list_users, name='list_users'),
    path('users/search/', views.search_users_by_skill, name='search_users'),
    path('users/<int:user_id>/', views.get_user_profile, name='get_user_profile'),

    # Swaps
    path('swaps/request/', views.request_swap, name='request_swap'),
    path('swaps/', views.list_my_swaps, name='list_my_swaps'),
    path('swaps/<int:swap_id>/accept/', views.accept_swap, name='accept_swap'),
    path('swaps/<int:swap_id>/reject/', views.reject_swap, name='reject_swap'),
    path('swaps/<int:swap_id>/cancel/', views.cancel_swap, name='cancel_swap'),
    path('swaps/<int:swap_id>/delete/', views.delete_swap, name='delete_swap'),
    path('swaps/<int:swap_id>/rate/', views.rate_swap, name='rate_swap'),

    path('availability-choices/', views.get_availability_choices, name='availability_choices'),

]
