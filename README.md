<h1 align="center">
    Compasso Node.js
</h1>

Para rodar a aplicação é necessário que você possua esses dois programas:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/)

### Iniciando o projeto

```bash
# clonando o repositório
git clone https://github.com/carloshkruger/compasso_nodejs.git

# entrando na pasta do projeto
cd compasso_nodejs

#instalando as dependências
npm install

# iniciando a aplicação
npm run start:dev

```

### Comandos

```bash
# rodar todos os testes
npm run test

# rodar todos os testes e gerar code coverage
npm run test:cov

```

### Funcionalidades

- Cadastrar cidade
- Cadastrar cliente
- Consultar cidade pelo nome
- Consultar cidade pelo estado
- Consultar cliente pelo nome
- Consultar cliente pelo Id
- Remover cliente
- Alterar o nome do cliente

### Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [SQLite](https://www.sqlite.org/)
- [Jest](https://jestjs.io/)
