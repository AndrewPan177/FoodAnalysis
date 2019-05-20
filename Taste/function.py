import re


food_types=['小吃快餐','烧烤','自助餐','韩国料理','下午茶','粤菜','其他美食','云贵菜','北京菜',
            '江河湖海鲜','小龙虾','湘菜','东北菜','本帮浙江菜','素食','西北菜','早茶','家常菜',
            '粉面馆','水果生鲜','火锅','面包甜点','食品保健','饮品店','川菜','西餐','咖啡厅',
            '日本菜','新疆菜','私房菜','特色菜','人气餐厅','创意菜','徽菜','鲁菜','东南亚菜',
            '湖北菜','台湾菜','福建菜','俄罗斯菜']

#获取DianpingLoc中每一类别前k的数据

def TopK_filter(shops_loc,k):

    shops_filter = []
    #遍历两次类型数据

    for food_type in food_types:
        i1=0;i2=0
        for shop_loc in shops_loc:
            if shop_loc.type == food_type and i1 < k and shop_loc.city=='北京':
                i1 += 1
                shops_filter.append(shop_loc)

    for food_type in food_types:
        i1=0;i2=0
        for shop_loc in shops_loc:
            if shop_loc.type == food_type and i2 < k and shop_loc.city=='武汉':
                i2 += 1
                shops_filter.append(shop_loc)

    return shops_filter

# 将所在位置的地理坐标栅格化，用以生成热力图
# l为正方形边长，暂定为50
# 北京：    116.103588  116.827326  39.61188    40.354873
# 武汉：    113.989049  114.784732  30.229841   30.967912
# 武汉：    114.136237  114.536378  30.387355   30.68795

def grid(shops_loc,L):
    # latExtent_bj = [39.61188,40.354873]
    # lngExtent_bj = [116.103588,116.827326]

    latExtent_wh = [30.387355,30.78795]
    lngExtent_wh = [114.136237,114.536378]


    latExtent = latExtent_wh
    lngExtent = lngExtent_wh
    cellCount = [L, L]
    cellSizeCoord = [
        (lngExtent[1] - lngExtent[0]) / cellCount[0],
        (latExtent[1] - latExtent[0]) / cellCount[1]
    ]

    gridData=[]
    # i 遍历行、j遍历列 由下往上
    for i in range(L):
        for j in range(L):
            # 获得每一个小栅格的经纬度范围
            bottom = latExtent[0] + i * cellSizeCoord[0]
            top = latExtent[0] + (i + 1) * cellSizeCoord[0]
            left = lngExtent[0] + j * cellSizeCoord[1]
            right = lngExtent[0] + (j + 1) * cellSizeCoord[1]
            count=0;value=0
            for shop_loc in shops_loc:
                if float(shop_loc.lat) > bottom and float(shop_loc.lat) < top and float(shop_loc.lng) > left and float(shop_loc.lng) < right:
                    count+=1
            if count > 0 and count<10:
                value=5
            elif count<30:
                value=4
            elif count<50:
                value=3
            elif count<70:
                value=2
            elif count<90:
                value=1
            else:
                value=0


            data=[i,j,value]
            gridData.append(data)

    with open("gridData.txt","w",encoding="utf-8") as f:
        for gd in gridData:
            f.write(str(gd)+",")


    return gridData
    # print(gridData)



'''
"海门":[121.15,31.89],

{name: "海门", value: 9},

'''
# 传入北京/武汉带有坐标的店铺数据，将其转化为带有数值的点格网进行输出
def GetHeat(shops_loc,L):

    # latExtent_bj = [39.61188,40.354873]
    # lngExtent_bj = [116.103588,116.827326]

    latExtent_wh = [30.387355, 30.78795]
    lngExtent_wh = [114.136237, 114.536378]

    latExtent = latExtent_wh
    lngExtent = lngExtent_wh
    cellCount = [L, L]
    cellSizeCoord = [
        (lngExtent[1] - lngExtent[0]) / cellCount[0],
        (latExtent[1] - latExtent[0]) / cellCount[1]
    ]

    gridData = []

    locData=[]
    valueData=[]
    # i 遍历行、j遍历列 由下往上
    for i in range(L):
        for j in range(L):
            # 获得每一个小栅格的经纬度范围
            bottom = latExtent[0] + i * cellSizeCoord[0]
            top = latExtent[0] + (i + 1) * cellSizeCoord[0]
            left = lngExtent[0] + j * cellSizeCoord[1]
            right = lngExtent[0] + (j + 1) * cellSizeCoord[1]
            count = 0

            lng=(left+right)/2
            lat=(bottom+top)/2

            for shop_loc in shops_loc:
                if float(shop_loc.lat) > bottom and float(shop_loc.lat) < top and float(shop_loc.lng) > left and float(
                        shop_loc.lng) < right:
                    count += 1

            data=[lng,lat]
            locData.append(data)
            valueData.append(count)

    with open("locData.txt", "w", encoding="utf-8") as f_loc,open("valueData.txt","w",encoding="utf-8")as f_v:
        i=0
        for l in locData:
            f_loc.write(str(i)+":"+str(l)+",")
            i+=1
            # f_loc.write(str(l) + ",")
        for v in valueData:
            f_v.write(str(v) + ",")

    return locData,valueData

    pass

# cities=['北京','天津']
# cities=["北京","上海","天津","重庆","哈尔滨","长春", "沈阳","呼和浩特","石家庄","乌鲁木齐",
#    "兰州", "西宁","西安","银川", "郑州", "济南","太原","合肥","武汉", "长沙","南京",
#     "成都","贵阳","昆明", "南宁","拉萨", "杭州","南昌", "广州", "福州","海口"]
cities=["海口","福州","广州","南昌","杭州","拉萨", "南宁","昆明","贵阳","成都",
   "南京", "长沙","武汉","合肥", "太原", "济南","郑州","银川","西安", "西宁","兰州",
    "乌鲁木齐","石家庄","呼和浩特", "沈阳","长春", "哈尔滨","重庆", "天津", "上海","北京"]

# cities=list(cccc.reverse())
'''
d={"北京":1}

'''
# 获取各个城市的各项评分及评论数
def GetParallel(shops_all):

    value=[0,0,0,0]
    data=[]
    dic = dict()
    shop_total_in_city = dict()
    for city in cities:
        shop_total_in_city[city] = 1
        dic[city]=value
        # data.append(dic)

    a = 0
    b = 0
    c = 0
    d = 0
    k=0
    i=0
    ch='北京'
    look=[]
    for city in cities:
        for shop in shops_all:

            if city==shop.city:
                # if city=='北京':
                #     k+=float(shop.score1)
                look.append(city)
                # dic[city][0] += float(shop.comment)
                # dic[city][1] += float(shop.score1)
                # dic[city][2] += float(shop.score2)
                # dic[city][3] += float(shop.score3)
                a += float(shop.comment)
                b += float(shop.score1)
                c += float(shop.score2)
                d += float(shop.score3)
                shop_total_in_city[city] += 1
        temp = []
        temp.append(city)
        fenmu = 0
        if shop_total_in_city[city] - 1:
            fenmu = shop_total_in_city[city] - 1
        else:
            fenmu = 1
        if a:
            temp.append(a / fenmu)
            temp.append(b / fenmu)
            temp.append(c / fenmu)
            temp.append(d / fenmu)
            data.append(temp)
            a = 0;
            b = 0;
            c = 0;
            d = 0;
        else:
            a = 0;
            b = 0;
            c = 0;
            d = 0;

        # shop_total_in_city[city][1] += 1
                # shop_total_in_city[city][2] += 1
                # shop_total_in_city[city][3] += 1

    # for city in cities:
    #     temp = []
    #     # str='{}'.format(city)
    #     temp.append(city)
    #     # temp.append(dic[city][0])
    #     # temp.append(dic[city][1])
    #     # temp.append(dic[city][2])
    #     # temp.append(dic[city][3])
    #
    #     fenmu=0
    #     if shop_total_in_city[city]-1:
    #         fenmu=shop_total_in_city[city]-1
    #     else:
    #         fenmu=1
    #
    #     temp.append(dic[city][0] / fenmu)
    #     temp.append(dic[city][1] / fenmu)
    #     temp.append(dic[city][2] / fenmu)
    #     temp.append(dic[city][3] / fenmu)
    #     data.append(temp)


    return data    #shop_total_in_city["北京"]
    pass


if __name__ == '__main__':

    print(cities[1])
    # c=dict()
    # d=[]
    # c["1"] = [1, 2, 3]
    # c["2"] = [4, 5, 6]
    # d.append(c)
    # d.append(c["2"])
    # print(d)

    # shops_all = Dianping.objects.all()
    # data = GetParallel(shops_all)
    # print(data)

    # grid(shops_loc,50)
    pass

