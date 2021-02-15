# Calculadora de investimentos

Calculadora financeira é uma aplicação construída em Node.js, Postgres e React.js, que recebe algumas informações de entrada e calcula o rendimento dos investimentos poupança e CDB.

Este projeto é constituido por um servidor, que realiza os calculos e salva os valores e resultados obtidos dos calculos, e um cliente que funciona como a entrada dos dados e visualização dos resultados.

### Pré-requisitos

Você precisa ter instalado:
* Node.js
* Postgres
* Git

### Instalação

Primeiramente você realizará o clone deste projeto para seu ambiente:

```bash
git clone https://github.com/rfaelmarini/desafio-desenvolvedor-fullstack.git
```

Em seguida você deve realizar a instalação das dependências dos projetos, servidor e cliente.
Na pasta server:
```bash
cd server/
```

```bash
npm install
```

Na pasta client:
```bash
cd client/
```

```bash
npm install
```

Em seguida você deve rodar o servidor localizado na pasta server:

```bash
node index.js
```

E por último você deve rodar o cliente localizado na pasta client:

```bash
npm start
```

## Built With

* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [React.js](https://reactjs.org/)
* [Postgres](https://www.postgresql.org/)