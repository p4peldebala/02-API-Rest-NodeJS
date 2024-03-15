# API de Transações 💸

Bem-vindo à API de Transações! Esta API permite que você gerencie transações financeiras de forma simples e segura. 🚀

## Introdução ℹ️

A API de Transações oferece endpoints para criar novas transações, consultar o saldo de contas e listar transações existentes.

## Configuração 🛠️ 

Antes de começar, você precisa configurar o ambiente:

1. **Instalação:**
   - Clone o repositório.
   - Instale as dependências usando `npm install`.

2. **Configuração do Banco de Dados:**
   - Configure as credenciais do banco de dados no arquivo `.env` utilizando o `.env.example` para se basear.
   - Em caso de duvida leia a documentação do Next para integrar qualquer banco de dados, no nosso projeto estamos usando o sqlite.
   - Execute as migrações do banco de dados usando `npm run knex migrate:latest`.

3. **Inicialização do Servidor:**
   - Inicie o servidor com o comando `npm start`.

## Endpoints 🌐

Aqui estão os principais endpoints da API:

- **POST /transactions:** Cria uma nova transação.
- **GET /transactions/:id:** Lista todas as transacoes de um usuario.
- **GET /transactions/summary:** Lista o saldo daquele usuario.


## Licença 📝

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
