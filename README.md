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
— x7 = tonnes de charbon. \ 
\
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
En supposant que n’importe quelle quantité d’une matière première 
