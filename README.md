### Un problème de mélange

Un armateur doit construire un navire de guerre à partir de 50 tonnes
d’acier contenant entre 0.5% et 1.25% de carbone (C), entre 0.3% and 0.5% de silicone (Si), pas plus de 0.05% de
sulfure (Su), et pas plus de 0.04% de phosphore (Ph). Un fournisseur produit de l’acier à partir de sept matières
premières dont les qualités, les disponibilités en tonnes, et les coûts en $/tonne sont donnés dans la Table. Le
fournisseur veut déterminer la combinaison la moins coûteuse de composants bruts qu’il peut utiliser pour produire
l’acier répondant aux besoins de l’armateur.

| Matière première  | %C | %Si | %Su | %SPh | Stock | Coût |
| ----------------- | -- | --- | --- | ---- | ----- |----- |
| limonite | 3.0 | 0 | 0.013 | 0.015 | 40 | 200 |
| taconite | 2.5 | 0 | 0.008 | 0.001 | 30 | 250 |
| hématite | 0 | 0 | 0.011 | 0.05 | 60 | 150 |
| magnétite | 1.2 | 0 | 0.002 | 0.008 | 50 | 220 |
| silicone 1 | 0 | 90 | 0.004 | 0.002 | 20 | 300 |
| silicone 2 | 0 | 96 | 0.012 | 0.003 | 30 | 310 |
| charbon | 90 | 0 | 0.002 | 0.01 | 25 | 165 |

Puisque les fournisseur peut changer les quantités de matéries premières utilisées dans la producton de l’acier,
nous pourrions assigner une variable diﬀérente pour représenter la quantiter de chaque matière première: \
\
— x1 = tonnes de limonite, \
— x2 = tonnes de taconite, \
— x3 = tonnes d’hématite, \
— x4 = tonnes de magnétite, \
— x5 = tonnes de silicone 1, \
— x6 = tonnes de silicone 2, \
— x7 = tonnes de charbon. 


Afin de modéliser les contraintes, observons tout d’abord que les variables dans ce cas sont naturellement bornées
inférieurement par 0 (puisque des quantités négatives ne feraient pas de sens), et bornées supérieurement par leur
quantité disponible, aussi avons-nous: 
```math
0 ≤x1 ≤40
```
```math
0 ≤x2 ≤30
```
```math 
0 ≤x3 ≤60
```
```math
0 ≤x4 ≤50
```
```math
0 ≤x5 ≤20
```
```math
0 ≤x6 ≤30
```
```math
0 ≤x7 ≤25.
```
\
En supposant que n’importe quelle quantité d’une matière première contribue pour la même quantité d’acier, et en
sachant que nous devons produire au moins 50 tonnes, nous avons :
```math
\sum_{i=1}^7 x_i \geq 50
```
\
Notons que nous ne supposons pas que nous produirons exactement 50 tonnes, puisqu’il peut être nécessaire de
produire d’avantage afin de satisfaire les autres exigences du problème.


L’autre caractéristique contraignante dans ce problème est que l’acier doit contenir un certain pourcentage de
carbone, de silicone, de sulfure et de phosphore. Afin de voir comment ces exigences de composition se traduisent en
contraintes par rapport à nos variables, nous nous concentrerons d’abord sur l’exigence d’avoir entre 0.5% et 1.25% de carbone, en espérant que les exigences sur le silicone, le sulfure et le phosphore se formulent de manière similaire. \
À partir des données, nous connaissons le pourcentage de contribution en carbone de chaque matière première, aussi
nous pouvons facilement calculer la quantité de carbone pour n’importe quel choix de variables comme $0.03x_1 + 0.025x_2 + 0.012x_4 + 0.9x_7$.


Cependant, comme nous avons une exigences de proportion de carbone dans l’acier, nous devons diviser cette quantité de carbone (tonnes) par la quantité d’acier (tonnes). \
La contrainte que l’acier contienne entre 0.5% et 1.25% de carbone se traduit dans la paire de contraintes linéaire : 
```math
0.5 \leq \frac{3x_1 + 2.5x_2 + 1.2x_4 + 90x_7}{x_1 +x_2 +x_3 +x_4 +x_5 +x_6 +x_7} \leq 1.25
```
\
Puisque ce problème implique de trouver la combinaison la moins coûteuse de matières premières qui rencontre la demande de 50 tonnes d’acier, la fonction objectif est simplement le coût des matières premières utilisées: 

```math
coût = 200x_1 + 250x_2 + 150x_3 + 220x_4 + 300x_5 + 310x_6 + 165x_7
```
