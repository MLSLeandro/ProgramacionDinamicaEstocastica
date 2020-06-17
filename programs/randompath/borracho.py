import random

class Borracho:

    def __init__(self, nombre):
        self.nombre = nombre

''' BorrachoTradicional extiende a class Borracho ''' 
class BorrachoTradicional(Borracho):

    def __init__(self, nombre):
        super().__init__(nombre) # Con Super() se indica la supreclase

    def camina(self):
        return random.choice([(0, 1), (0, -1), (1, 0), (-1, 0)])

''' BorrachoTradicional extiende a class Borracho ''' 
class BorrachoLoco(Borracho):

    def __init__(self, nombre):
        super().__init__(nombre) # Con Super() se indica la supreclase

    def camina(self):
        return random.choice([(0, 3), (0, -3), (3, 0), (-3, 0)]) 