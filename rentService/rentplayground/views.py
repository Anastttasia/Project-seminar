from django.shortcuts import render
from .models import Playground
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseForbidden, HttpResponseBadRequest

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