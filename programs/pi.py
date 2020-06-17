import random
import math
from statistics import desviacion_estandar, media

def aventar_agujas(numero_de_agujas):
    adentro_del_circulo = 0

    for _ in range(numero_de_agujas):
        x = random.random() * random.choice([-1, 1])
        y = random.random() * random.choice([-1, 1])

        '''
            Teorema de pitagoras: si la hipotenusa de la coordenada (x, y)
            es menor o igual que 1, el punto está dentro del círculo
        '''
        distancia_desde_el_centro = math.sqrt(x**2 + y**2)

        if distancia_desde_el_centro <= 1:
            adentro_del_circulo += 1

    return (4 * adentro_del_circulo) / numero_de_agujas


def estimacion(numero_de_agujas, numero_de_intentos):
    estimados = []
    for _ in range(numero_de_intentos):
        estimacion_pi = aventar_agujas(numero_de_agujas)
        estimados.append(estimacion_pi)

    media_estimados = media(estimados)
    sigma = desviacion_estandar(estimados)
    print(f'Est={round(media_estimados, 5)}, sigma={round(sigma, 5)}, agujas={numero_de_agujas}')

    return (media_estimados, sigma)

def estimar_pi(numero_de_agujas, precision, numero_de_intentos):
    sigma = precision
    '''
        el 95% de confianza lo encontramos a 1.96 desviaciones estandar (sigma)
        precision, indica que los valores van a estar 0.01 por arriba y por debajo de la media
    '''
    while sigma >= precision / 1.96:
        media, sigma = estimacion(numero_de_agujas, numero_de_intentos)
        print(media)
        numero_de_agujas *= 2

    ''' 
        retornamos la ultima media
    '''
    return media

if __name__ == '__main__':
    estimar_pi(1000, 0.01, 1000)
