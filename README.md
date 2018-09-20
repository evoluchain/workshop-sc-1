# Workshop Smart Contract 1

## Setup

Pour le setup il faut avoir installé nodeJs version 8 ou supérieure ainsi que Python 2.
Python 2.7 est installé par défaut sur MacOS et la majorité des distributions Linux.
Il y a une incompatibilité avec Python 3, donc pour l'installation il faut configurer le chemin de Python 2 dans le PATH.
Tous les autres outils pour le build, test et déploiement sont installés au sein du projet. Cela permet de l'intégrer dans un process d'intégration continue tel que gitlab-ci.

Lien des applications à installer :
- NodeJs (version 8 conseillée): https://nodejs.org/en/download/
- Ganache : https://truffleframework.com/ganache 

Puis à la racine du projet git :
```sh
npm install
```

## Test

```sh
npm test
```

## Compilation
Génération des binnaires et des ABI dans /build/contracts

```sh
npm run build
```

## Token ERC20

### Fonctions
- totalSupply() : nombre de tokens en circulation
- transfer(address _to, uint256 _value) : transfer des tokens vers un autre wallet
- balanceOf(address _owner) : nombre de tokens en possession d'un wallet donné
- approve(address _spender, uint256 _value) : Autorise le transfer des tokens par _spender sur le wallet de l'appelant
- allowance(address _owner, address _spender) : Donne le nombre de tokens que peut dépenser _spender sur le protefeuille de _owner.
- transferFrom(address _from, address _to, uint256 _value) : Transfert des tokens dont on a l'autorisation préalable 
- increaseApproval(address _spender, uint _addedValue) : amélioration de approve car il évite le Race condition Approve/TransferFrom  
- decreaseApproval(address _spender, uint _subtractedValue) : amélioration de approve car il evite le Race condition Approve/TransferFrom 
