# API de Emissão de Nota Fiscal

API REST para gerenciamento de clientes, produtos e emissão de notas fiscais eletrônicas, incluindo geração de XML e cálculo de impostos (ICMS e IPI).

## 🚀 Funcionalidades

- 🔐 Autenticação via JWT
- 👤 CRUD de Clientes
- 📦 CRUD de Produtos
- 🧾 Emissão de Nota Fiscal
  - Cálculo automático de ICMS e IPI
  - Geração de XML da nota
- ✅ Validação de dados com Joi
- 🛡️ Middlewares globais de autenticação, validação e tratamento de erros
- 📜 Logs centralizados em arquivo (`/logs/app.log`)
- 🧠 Documentação Swagger

---

## 🧠 Tecnologias e Ferramentas

- Node.js
- TypeScript
- Express
- TypeORM
- MariaDB
- Joi
- Swagger (OpenAPI)
- Docker

---

## 📂 Arquitetura do Projeto

- **/modules** → Funcionalidades (clientes, produtos, notas, autenticação)  
- **/shared** → Middleware, utils, documentação, logs e dados auxiliares  
- **/core** → Entidades, tipos e erros globais  
- **/config** → Configurações de banco, ORM e variáveis  

```plaintext
src/
├── config/
├── core/
├── modules/
├── shared/
````

* **Modularização por domínio.** Cada módulo possui seu próprio controller, router, service, repository, DTO e schemas.

---

## ⚙️ Pré-requisitos

* Node.js ^18.x
* Docker e Docker Compose (opcional, mas recomendado)
* Banco de dados MariaDB

---

## 🏗️ Instalação e Execução Local

1. Clone o repositório:

```bash
git clone https://github.com/Julio0Cesar/nf-emition-system-julio
cd nf-emition-system-julio
```

2. Instale as dependências ou rode Docker:

```bash
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` em api/:

```env
MARIADB_HOST=localhost ou mariadb se estiver usando docker
MARIADB_USER=seu_user
MARIADB_PASSWORD=sua_senha
MARIADB_DATABASE=gp_db
MARIADB_PORT=3306
BACKEND_PORT=3000
JWT_SECRET=seu_segredo
```

4. Configure o banco:

* Crie o banco manualmente ou rode o container do MariaDB com Docker.

5. Rode a aplicação:

```bash
npm run dev
```

---

## 🐳 Docker (opcional)

Para subir com Docker:

```bash
docker compose -p nf-emition-system up --build
```

Caso use docker adicione mais um arquivo `.env` na raiz do projeto:

```env
MARIADB_ROOT_PASSWORD=sua_senha
MARIADB_ADMIN_PASSWORD=sua_senha
BACKEND_PORT=3000
```

> **Obs:** O Dockerfile atual é apenas de desenvolvimento (`Dockerfile.dev`).

---

## 📑 Documentação da API

* Acesse: [`http://localhost:3000/docs`](http://localhost:3000/docs)

* A documentação foi feita com Swagger (OpenAPI) e inclui todos os endpoints dos módulos de:

  * Cliente
  * Produto
  * Nota Fiscal
  * Autenticação

---

## 🔒 Middlewares Globais

* **`autenticarJWT`** → Valida o token JWT
* **`validarSchemas`** → Valida os dados das requisições com Joi
* **`errorHandler`** → Trata erros conhecidos e desconhecidos
* **`notFoundHandler`** → Retorna erro 404 para rotas inexistentes

---

## 📜 Logs

* Os logs são salvos no arquivo:

```plaintext
/logs/app.log
```

* Tipos de logs:

  * Erros de autenticação
  * Erros de validação
  * Erros internos do servidor
  * Erros de banco (QueryFailedError)
  * Rotas não encontradas

---

## 📚 Dados Auxiliares

* Arquivos JSON na pasta `/shared/data`:

  * **cfop.json** → Lista de CFOP válidos
  * **ncm.json** → Lista de NCM válidos
  * **LinksDocs.md** → Documentação e referências sobre extração dos dados

---

## 🌐 Endpoints principais

| Método | Rota           | Descrição                 |
| ------ | -------------- | ------------------------- |
| POST   | /auth/login    | Login e geração do JWT    |
| POST   | /clients       | Cadastrar cliente         |
| GET    | /clients       | Listar clientes           |
| POST   | /products      | Cadastrar produto         |
| GET    | /products      | Listar produtos           |
| POST   | /invoices      | Emitir nota fiscal        |
| GET    | /invoices      | Listar notas fiscais      |
| GET    | /invoices/{id} | Buscar nota fiscal por ID |

> ⚠️ Os endpoints abaixo exigem autenticação via token Bearer.
>  - GET:/clients 
>  - POST:/products 
>  - POST:/invoices 
>  - GET:/invoices 
>  - GET:/invoices/{id}

---

## 🔧 Variáveis de ambiente

| Variável     | Descrição                 |
| ------------ | ------------------------- |
| DB\_HOST     | Host do banco             |
| DB\_PORT     | Porta do banco            |
| DB\_USERNAME | Usuário do banco          |
| DB\_PASSWORD | Senha do banco            |
| DB\_DATABASE | Nome do banco             |
| JWT\_SECRET  | Segredo para gerar tokens |

---=

## 🐛 Dificuldades Encontradas

* **JWT inválido:** O token não era aceito na validação por erro no `JWT_SECRET`. Corrigi garantindo que a chave usada na geração fosse a mesma da validação.

* **Erro no `/invoices/:id`:** A busca falhava por uso errado do `where`, estava passando dois `id` ao invés de `id` e `clienteId`. Corrigi ajustando os filtros corretamente.

---

## 🧠 Melhorias Futuras (To-Do)

* 🔸 Implementar testes automatizados
* 🔸 Melhorar cobertura de erros do banco
* 🔸 Melhorias no tratamento de edge cases
* 🔸 Deploy automático com GitHub Actions (CI/CD)

---

## 👤 Autor

* Júlio César
* [GitHub](https://github.com/Julio0Cesar) • [LinkedIn](https://linkedin.com/in/julio-rios)

#### Tempo para conclusão do projeto

* 5 dias
---

## ⚖️ Licença

MIT License.
