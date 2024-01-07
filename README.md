<h1 align="center">
  Find A Friend API
</h1>

## Sobre

Projeto desenvolvido durante o desafio do curso Ignite da Rocketseat cujo objetivo foi colocar em prática todo o conteúdo estudado durante o módulo.

## Find a Friend Api

Esta api permite que ONGs cadastrem pets para adoção, e usuários interessados possam visualizar e adotar esses pets.

## Rodando o servidor

    # Clone o repositório 

    git clone https://github.com/KlevissonWeskley/find-a-friend-api.git

    # Acesse a pasta do projeto no terminal/cmd

    cd find-a-friend-api

    # Instale as dependências

    npm install

    # Execute a aplicação 

    npm run dev

    # O servidor iniciará na porta 3333 ou na porta definida no arquivo .env na variável PORT - acesse <http://localhost:3333>

    # Acesse as rotas

    POST '/clients' para cadastrar como cliente
    POST '/sessions/client' para logar como cliente
    POST '/ongs' para cadastrar ongs
    POST '/sessions' para fazer login como uma ong
    POST '/pets' para cadastrar um pet
    GET '/petsInMyCity?city=nameOfCity' para listar os pets de uma cidade (precisa estar logado)


## Tecnologias

[![My Skills](https://skillicons.dev/icons?i=nodejs,ts,postgresql,prisma,jest,docker)](https://skillicons.dev)
