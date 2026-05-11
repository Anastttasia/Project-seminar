
FOOTBALL = 'football'
FOOTBALL_TEXTS = {
    'name': 'Футбол',
}

BASKETBALL = 'basketball'
BASKETBALL_TEXTS = {
    'name': 'Баскетбол',
}

VOLLEYBALL = 'volleyball'
VOLLEYBALL_TEXTS = {
    'name': 'Волебол',
}

PING_PONG = 'ping_pong'
PING_PONG_TEXTS = {
    'name': 'Настольный теннис',
}

SPORT_TYPES = [FOOTBALL, BASKETBALL, VOLLEYBALL, PING_PONG]

class Sport:

    def __init__(self, type, name):
        assert type in SPORT_TYPES

        self.type = type
        self.name = name