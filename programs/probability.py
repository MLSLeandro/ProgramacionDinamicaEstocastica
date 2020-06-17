import random

def tirar_dado(number_of_attemps, number_of_dice=1):    
    secuencia_de_tiros = []
    for _ in range(number_of_attemps):
        tiro = 0
        for _ in range(number_of_dice):
            tiro += random.choice([1, 2, 3, 4, 5, 6])
        secuencia_de_tiros.append(tiro)

    return secuencia_de_tiros

def main(number_of_attemps, number_simulations, number_of_dice=1, target_value=1, probability_type=0):
    tiros = []
    for _ in range(number_simulations):
        secuencia_de_tiros = tirar_dado(number_of_attemps, number_of_dice)
        tiros.append(secuencia_de_tiros)

    tiros_con = 0
    tiros_sin = 0
    for tiro in tiros:
        if probability_type == 0:
            if target_value not in tiro:
                tiros_sin += 1
        elif probability_type == 1:
            if target_value in tiro:
                tiros_con += 1
        

    probabilidad_tiros_con = tiros_con / number_simulations
    probabilidad_tiros_sin = tiros_sin / number_simulations
    print(f'Probabilidad de {"no" if probability_type==0 else "si"} obtener por lo menos un {target_value} en {number_of_attemps} tiros = {probabilidad_tiros_con if probability_type==1 else probabilidad_tiros_sin}')



if __name__ == '__main__':
    number_of_attemps = int(input('Cuantos tiros del dado: '))
    number_simulations = int(input('Cuantas veces correra la simulacion: '))
    number_of_dice = int(input('Cuantos Dados Tienes: '))
    target_value = int(input('Valor Objetivo: '))
    probability_type = int(input('Tipo de probabilidad 1=Obtener Valor Objetivo / 0=No Obtener Valor Objetivo: '))

    main(number_of_attemps, number_simulations, number_of_dice, target_value, probability_type)