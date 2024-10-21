Neste arquivo, para iniciá-lo basta copiar os arquivos da "env.example" e criar o própio arquivo .env, ao rodar o comando docker compose up -d vai ser criado as dependências necessárias para o container, desse modo, ao finalizar a criação, basta usar o comando docker exec -it app_backend para acessar o container do backend, da mesma forma basta usar o comando docker logs -f app_backend para ver os logs do container

Como Rodar a Aplicação?
instale o `dot env` na raiz com `npm install`
Entre na pasta `backend` e instale todas as dependências com `npm install`
Entre na pasta `frontend` e instale todas as dependências com `npm install`
retorne a raiz e execute o comando `docker compose up -d` -> Certifique-se de ter o Docker instalado na sua máquina.
Retorne para a pasta `frontend` e execute o comando `npm run dev`
