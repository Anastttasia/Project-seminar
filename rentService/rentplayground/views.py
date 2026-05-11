from django.shortcuts import render
from django.http import HttpResponse

from sports.SportTypes import Sport, SPORT_TYPES

CURRENT_SPORTS = [
    Sport(SPORT_TYPES[0], 'Футбол'),
    Sport(SPORT_TYPES[1], 'Баскетбол'),
    Sport(SPORT_TYPES[2], 'Волейбол'),
    Sport(SPORT_TYPES[3], 'Настольный теннис'),
]

def index(request):
    return render(request, "index.html", context={"sports": CURRENT_SPORTS})