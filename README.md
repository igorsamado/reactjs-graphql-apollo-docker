## Tecnologias utilizadas

 * Front end com ReactJS + Apollo Client
 * Back end em Graphql + Apollo Server + Postgres com o Docker (Compose)

## Requerimentos

* [Docker](https://docs.docker.com/desktop/)
* Docker Compose

## Inicialização

* Clone o repositorio `git clone https://github.com/igorsamado/reactjs-graphql-apollo-docker.git`  
* Entre no diretório `node-backend` e rode o comando `docker-compose build` para construir as dependencias e a imagem e logo em seguida rode o comando `docker-compose up` para rodar a imagem do projeto backend no docker.
* Agora vá para no diretório `node-frontend` e rode o processo `docker-composer up`.
* Agora no navegador entre no endereçõ `localhost:3000` para visualizar.  