from django.shortcuts import render
from .models import Playground, Rent
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest, JsonResponse

def index(request):
    return render(request, "index.html", context={"playgrounds": Playground.objects.values()})

def details(request):
    id = request.GET.get("id", None)

    if id is None:
        return HttpResponseNotFound("Not Found")

    try:
        playground = Playground.objects.get(id=id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound("Not Found")
    except MultipleObjectsReturned:
        return HttpResponseNotFound("Not Found")

    return render(request, "details.html", context={"playground": playground})


def getDateDataWithNames(request):
    idPlayground = request.headers.get("idPlayground", None)
    rentDate = request.headers.get("rentDate", None)

    rents = Rent.objects.filter(idPlayground=idPlayground, date=rentDate)

    rentedHoursData = list()

    for rent in rents:
        rentedHoursData.append({"name": rent.namePerson, "phone": rent.numberPerson, "hour": rent.hour})

    return JsonResponse({"rentedHoursData": rentedHoursData})

def getDateData(request):
    idPlayground = request.headers.get("idPlayground", None)
    rentDate = request.headers.get("rentDate", None)

    rents = Rent.objects.filter(idPlayground=idPlayground, date=rentDate)

    rentedHours = list()

    for rent in rents:
        rentedHours.append(rent.hour)

    return JsonResponse({"rentedHours": rentedHours})

def delRent(request):
    idPlayground = request.headers.get("idPlayground", None)
    rentDate = request.headers.get("rentDate", None)
    rentHour = request.headers.get("rentHour", None)

    if idPlayground is None or rentDate is None or rentHour is None:
        return HttpResponseBadRequest()

    try:
        rent = Rent.objects.get(
            idPlayground=idPlayground,
            date=rentDate,
            hour=rentHour
        )
    except Rent.DoesNotExist:
        rent = None

    if rent is None:
        return HttpResponseBadRequest()

    rent.delete()

    return HttpResponse("OK")

def createRent(request):
    idPlayground = request.POST.get("idPlayground", None)
    rentDate = request.POST.get("rentDate", None)
    rentHours = request.POST.get("rentHours", None)
    name = request.POST.get("name", None)
    phone = request.POST.get("phone", None)

    if idPlayground is None or rentDate is None or rentHours is None or name is None or phone is None:
        return HttpResponseBadRequest()

    try:
        playground = Playground.objects.get(id=idPlayground)
    except ObjectDoesNotExist:
        return HttpResponseBadRequest()
    except MultipleObjectsReturned:
        return HttpResponseBadRequest()

    rentHoursList = list()

    for rentHour in rentHours.strip('.').split('.'):
        if not rentHour.isdigit():
            return HttpResponseBadRequest()
        rentHoursList.append(int(rentHour))

    for rentHourNumber in rentHoursList:
        try:
            rent = Rent.objects.get(
                idPlayground=idPlayground,
                date=rentDate,
                hour=rentHourNumber
            )
        except Rent.DoesNotExist:
            rent = None

        if rent is None:
            Rent.objects.create(
                idPlayground=idPlayground,
                date=rentDate,
                hour=rentHourNumber,
                namePerson=name,
                numberPerson=phone
            )

    return render(request, "confirmed.html", context={"playground": playground, "hours": rentHoursList, "finalPrice": len(rentHoursList) * playground.price, "rentDate": rentDate})

def admin(request):
    id = request.GET.get("id", None)

    if id is None:
        return HttpResponseNotFound("Not Found")

    try:
        playground = Playground.objects.get(id=id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound("Not Found")
    except MultipleObjectsReturned:
        return HttpResponseNotFound("Not Found")

    rents = Rent.objects.filter(idPlayground=id)

    allProfit = playground.price * len(rents)

    mostPopularTime = None
    lenOfRents = 0

    for hour in range(9, 22):
        lenOfRentsLocal = len(Rent.objects.filter(idPlayground=id, hour=hour))

        if lenOfRentsLocal > lenOfRents:
            lenOfRents = lenOfRentsLocal
            mostPopularTime = hour


    return render(request, "admin.html", context={"playground": playground, "mostPopularTime": mostPopularTime, "allProfit": allProfit})
