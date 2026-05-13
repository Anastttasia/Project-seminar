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

def getDateData(request):
    idPlayground = request.headers.get("idPlayground", None)
    rentDate = request.headers.get("rentDate", None)

    rents = Rent.objects.filter(idPlayground=idPlayground, date=rentDate)

    rentedHours = list()

    for rent in rents:
        rentedHours.append(rent.hour)

    return JsonResponse({"rentedHours": rentedHours})

def createRent(request):
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
        Rent.objects.create(
            idPlayground=idPlayground,
            date=rentDate,
            hour=rentHour
        )

        return HttpResponse("OK")

    return HttpResponseBadRequest()