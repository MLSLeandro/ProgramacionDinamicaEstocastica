## Objectives

- Learn when to use, dinamiyc programming and its benefits 
- Unterstand the diference between deterministic and stochastic Programs
- Learn to use stochastic programmig
- Learn how to create valid computational simulations 


## Dynamic Programming
- Optimal Substructure: an Optimal Global Solution can be found by combining optimal solutions from local subproblems  
- Problemas empalmados: Una Solución Optima que involucra resolver el mismo problema en varias ocaciones

## Memoization
- La Memorizacion es una tecnica para guardar computos previos y evitar realizarlos nuevamente
- Normalmente se utiliza un diccionario, donde las consultas se pueden hacer en una complejidad algoritmica de $O(1)$
- Intercambiar tiempo por espacio

## Fibonacci Optimitation (using memorization)

$f_n = f_{n-1} + f_{n-2}$

Calcular el fibonacci de un numero como 50:
- Con una simple funcion recursiva tiene una complejidad $O(2^n)$ Exponencial,
esto se puede corroborar en la funcion `def fibonacci_recursivo(n):` programa **dynamic_programming.py**
- Con una funcion con memorization, tiene una complejidad $O(n)$ Lineal, esto se puede corroborar en la funcion `def fibonacci_dinamico(n, memo = {}):` programa **dynamic_programming.py**


## random paths 
- Es un tipo de simulacion que elige aleatoriamente una desición dentro de un conjunto de desciones válidas
- Se utilizan en muchos campos del conocimiento cuando los sistemas no son deterministas e incluyen elementos de aleatoriedad

Se utiliza por ejemplo para simulaciones, por ejemplo para el comportamiento de una accion en bolsa, el movimiento del humo



