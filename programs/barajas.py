import random
import collections

PALOS = ['espada', 'corazon', 'rombo', 'trebol']
VALORES = ['as', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jota', 'reina', 'rey']

def crear_baraja():
    barajas = []
    for palo in PALOS:
        for valor in VALORES:
            barajas.append((palo, valor))

    return barajas

def obtener_mano(barajas, tamano_mano):
    ''' funcion sample de random, 
        dentro de una coleccion obtiene una muestra, sin retornar la muestra, 
        es decir garantiza que no retornara valores repetidos
    '''
    mano = random.sample(barajas, tamano_mano) 
    
    return mano

def main(tamano_mano, intentos):
    barajas = crear_baraja()

    manos = []
    for _ in range(intentos):
        mano = obtener_mano(barajas, tamano_mano)
        manos.append(mano)

    pares = 0
    for mano in manos:
        valores = []
        for carta in mano:
            valores.append(carta[1]) #En la tupla el valor de la carta es el indice 1

        '''
            La clase Counter de la libreria collections, cuenta las veces q se repite un valor en una collection
        '''
        counter = dict(collections.Counter(valores)) 
        for val in counter.values(): #Debito a que counter es un dictionary, accedemos a los valores con .values
            if val == 2:
                pares += 1
                break

    probabilidad_par = pares / intentos
    print(f'La probabilidad de obtener un par en una mano de {tamano_mano} barajas es {probabilidad_par}')


if __name__ == '__main__':
    tamano_mano = int(input('De cuantas barajas sera la mano: '))
    intentos = int(input('Cuantos intentos para calcular la probabilidad: '))

    main(tamano_mano, intentos)