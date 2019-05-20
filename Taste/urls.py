from django.conf.urls import url
from . import views


app_nam='Taste'

urlpatterns=[
    # url(r'Home',views.Home,name="Home"),
    # url(r'ShowShop',views.ShowShop,name="ShowShop"),
    # url(r'HeatMap',views.HeatMap,name="HeatMap"),
    # url(r'Migration',views.Migration,name="Migration"),
    # url(r'Parallel',views.Parallel,name="Parallel"),
    # url(r'RoutePlanning',views.RoutePlanning,name="RoutePlanning"),


    url(r'Home',views.Home,name="Home"),
    url(r'a1',views.Function1_1,name="a1"),
    url(r'b2',views.Function1_2,name="b2"),
    url(r'c3',views.Function1_3,name="c3"),
    url(r'd4',views.Function1_4,name="d4"),
    url(r'j1',views.Function2_1,name="j1"),
    url(r'k2',views.Function2_2,name="k2"),
    url(r'l3',views.Function2_3,name="l3"),
    url(r'm4',views.Function2_4,name="m4"),
    url(r'n1',views.Function3,name="n1"),
    url(r'o1',views.Function4_1,name="o1"),
    url(r'p2',views.Function4_2,name="p2"),
]