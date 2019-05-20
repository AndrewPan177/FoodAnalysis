from django.shortcuts import render
from .models import DianpingLoc,Dianping
import json
from . import function as fc


# Create your views here.


#
# def Home(requests):
#     return render(requests, 'Taste/home.html')
#
#
# #用来展示数据的位置分布
# def ShowShop(requests):
#
#     shops_all = DianpingLoc.objects.all()
#     shops_loc = []
#     for shop_all in shops_all:
#         # 排除非北京武汉的点
#         if shop_all.lng != '0.0' and (float(shop_all.lng) > 116.103588 and float(shop_all.lng) < 116.827326 and float(
#                 shop_all.lat) > 39.61188 and float(shop_all.lat) < 40.354873) \
#                 or (float(shop_all.lng) > 113.989049 and float(shop_all.lng) < 114.784732 and float(
#             shop_all.lat) > 30.229841 and float(shop_all.lat) < 30.967912):
#             shops_loc.append(shop_all)
#     shops_len = len(shops_loc)
#
#     shops_filter = fc.TopK_filter(shops_loc, 750)
#
#     gridData = []
#     # gridData=fc.grid(shops_loc,50)
#     return render(requests, 'Taste/ShowShop.html',
#                   {"shops_len": shops_len, "shops": shops_filter, "gridData": gridData})
#
# # 显示热力图
# def HeatMap(requests):
#
#     shops_all = DianpingLoc.objects.all()
#     shops_loc = []
#     for shop_all in shops_all:
#         # 排除非北京武汉的点
#         if shop_all.lng != '0.0' and (float(shop_all.lng) > 116.103588 and float(shop_all.lng) < 116.827326 and float(
#                 shop_all.lat) > 39.61188 and float(shop_all.lat) < 40.354873) \
#                 or (float(shop_all.lng) > 113.989049 and float(shop_all.lng) < 114.784732 and float(
#             shop_all.lat) > 30.229841 and float(shop_all.lat) < 30.967912):
#             shops_loc.append(shop_all)
#
#
#     # gridData = []
#     # gridData=fc.grid(shops_loc,100)
#     locData=[]
#     valueData=[]
#     locData,valueData=fc.GetHeat(shops_loc,50)
#
#     return render(requests, 'Taste/HeatMap.html',
#                   {"locData": locData,"valueData":valueData})
#
#
# # 人口迁徙图
# def Migration(requests):
#     '''我不传数据嘻嘻嘻'''
#     return render(requests,'Taste/.html')
#
# # 平行坐标图
# # 需要 各个城市的评分和评论数
# def Parallel(requests):
#     shops_all=Dianping.objects.all()
#     data=fc.GetParallel(shops_all)
#
#     # city='武汉'
#     # str='"{}"'.format(city)
#     # test=['武汉',1,2,3,4]
#     # test_json=json.dumps(test)
#
#
#     data_json=json.dumps(data)
#
#     return render(requests,'Taste/Parallel.html',{"data":data_json})
#
#
# # 路线推荐规划
# def RoutePlanning(requests):
#     '''我不传数据嘻嘻嘻'''
#     return render(requests,'Taste/RoutePlanning.html')
#
#
# # # 显示第二个热力图
# # def HeatMap2(requests):
# #
# #
# #
# #     return render(requests, 'HeatMap2.html')
#



'''下面的为第二版'''


def Home(requests):
    '''我不传数据嘻嘻嘻'''
    return render(requests,'base.html')



# 第一个气象数据
def Function1_1(requests):
    '''我不传数据嘻嘻嘻'''
    return render(requests,'a1.html')


# 日照
def Function1_2(requests):
    '''我不传数据嘻嘻嘻'''
    return render(requests,'b2.html')

# 温度
def Function1_3(requests):
    '''我不传数据嘻嘻嘻'''
    return render(requests,'c3.html')

# 湿度
def Function1_4(requests):
    '''我不传数据嘻嘻嘻'''
    return render(requests,'d4.html')



# 展示店铺位置
def Function2_1(requests):
    shops_all = DianpingLoc.objects.all()
    shops_loc = []
    for shop_all in shops_all:
        # 排除非北京武汉的点
        if shop_all.lng != '0.0' and (float(shop_all.lng) > 116.103588 and float(shop_all.lng) < 116.827326 and float(
                shop_all.lat) > 39.61188 and float(shop_all.lat) < 40.354873) \
                or (float(shop_all.lng) > 113.989049 and float(shop_all.lng) < 114.784732 and float(
            shop_all.lat) > 30.229841 and float(shop_all.lat) < 30.967912):
            shops_loc.append(shop_all)
    shops_len = len(shops_loc)

    shops_filter = fc.TopK_filter(shops_loc, 750)

    gridData = []
    # gridData=fc.grid(shops_loc,50)
    return render(requests, 'j1.html',
                  {"shops_len": shops_len, "shops": shops_filter, "gridData": gridData})


# 热力图可视化
def Function2_2(requests):
    shops_all = DianpingLoc.objects.all()
    shops_loc = []
    for shop_all in shops_all:
        # 排除非北京武汉的点
        if shop_all.lng != '0.0' and (float(shop_all.lng) > 116.103588 and float(shop_all.lng) < 116.827326 and float(
                shop_all.lat) > 39.61188 and float(shop_all.lat) < 40.354873) \
                or (float(shop_all.lng) > 113.989049 and float(shop_all.lng) < 114.784732 and float(
            shop_all.lat) > 30.229841 and float(shop_all.lat) < 30.967912):
            shops_loc.append(shop_all)


    # gridData = []
    # gridData=fc.grid(shops_loc,100)
    locData=[]
    valueData=[]
    locData,valueData=fc.GetHeat(shops_loc,50)

    return render(requests, 'k2.html',
                  {"locData": locData,"valueData":valueData})


# 店铺数据 雷达图+分店
def Function2_3(requests):
    '''我不传数据嘻嘻嘻'''
    return render(requests,'l3.html')

# 平行坐标图
def Function2_4(requests):
    shops_all = Dianping.objects.all()
    data=fc.GetParallel(shops_all)

    # city='武汉'
    # str='"{}"'.format(city)
    # test=['武汉',1,2,3,4]
    # test_json=json.dumps(test)


    data_json=json.dumps(data)

    return render(requests,'m4.html',{"data":data_json})



# 迁徙数据
def Function3(requests):
    '''我不传数据嘻嘻嘻'''
    return render(requests,'n1.html')



# 城市推荐
def Function4_1(requests):
    '''我不传数据嘻嘻嘻'''
    return render(requests,'o1.html')



# 餐馆推荐及导航
def Function4_2(requests):

    return render(requests, 'p2.html')



