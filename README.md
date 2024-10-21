# Challenge - FullStack Users/Events

Este é um projeto que contém:

- Banco de Dados MySQL com Sequelize para manipulação.
- BackEnd -> API construída com Node, Express, e TypeScript.
- FrontEnd -> Interface construída com React, TypeScript e TailWindCSS.

## Features

- Criar novos Usuários.
- Fazer Login em uma plataforma que registra Eventos.
- Criar novos Eventos.
- Listar todos os eventos e Eventos específicos.
- Excluir, Modificar Eventos existentes.

## Estrutura do Projeto

O projeto é dividido em duas pastas principais:

- **backend**: Contém a conexão com o banco de dados e construção da API.
- **frontend**: Contém as Páginas, componentes e estilização, além de serviços utilizados.

## Pré-requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) e [Git](https://git-scm.com/) instalados na sua máquina.

## Como clonar o repositório e Rodar a Aplicação

Para clonar o repositório para a sua máquina local, siga os passos abaixo:

1. Abra o terminal (ou Git Bash).
2. Navegue até o diretório onde você deseja clonar o repositório.
3. Execute o seguinte comando:
   SSH
   git@github.com:fblessa/FullStack-Challenge.git

4. instale o `dot env` na raiz com `npm install` e copiar os arquivos da "env.example" e criar o própio arquivo .env
5. Entre na pasta `backend` e instale todas as dependências com `npm install`
6. Entre na pasta `frontend` e instale todas as dependências com `npm install`
7. retorne a raiz e execute o comando `docker compose up -d` -> Certifique-se de ter o Docker instalado na sua máquina.
8. Retorne para a pasta `frontend` e execute o comando `npm run dev` e acesse o localhost exposto pelo Vite.