# PokeHunter

# PokeHunter


<iframe width="600" height="400" src="https://www.youtube.com/embed/bGICKQ3RonE?showinfo=0&rel=0&modestbranding=1&fs=1" frameborder="0" allow="fullscreen"></iframe>

## Documentação

### 1. Banco de dados

Este projeto usa o banco de dados PostgreSQL, gerenciado pelo ORM Prisma para interagir com o banco de dados no servidor. Como os Pokémon não serão armazenados diretamente no banco de dados, mas obtidos de uma API externa, o banco de dados contém apenas duas tabelas principais: **User** e **CapturedPokemon**. Essas tabelas armazenam informações sobre os usuários e os Pokémon que eles capturam, seguindo o modelo e o relacionamento descritos no diagrama abaixo.

![ER Diagram](database.png)

### 2. Backend

O backend da aplicação é responsável por gerenciar os usuários, se comunicar com a Poke API v2 para obter dados dos Pokémons e gerenciar os Pokémons capturados e soltos.

- **/src/auth**: Responsável pela autenticação dos usuários.
- **/src/captured-pokemons**: Responsável pela captura, soltura e listagens dos Pokémons capturados.
- **/src/prisma**: Módulo do Prisma.
- **/src/shared/services**: Serviços compartilhados (incluindo o serviço de cache utilizado para cachear requisições repetidas para a Poke API).
- **/src/users**: Gerencia usuários.
- **/tests/unit**: Testes unitários

### 3. Frontend

O Frontend é simples, contendo duas páginas:

- **Login**: Página de login (`page.tsx`).
- **Captura de Pokémons**: Página de captura (`/hunting/page.tsx`).

O mapa na página de captura foi concebido com a biblioteca Tree.js, cujos arquivos se encontram em `/components/3d`. O restante da aplicação segue a estrutura convencional de um projeto NextJS.

---

## Como executar 


### PokeHunter Frontend

Consulte a documentação gerada pelo Next.js [neste link](./frontend/README.md).


### PokeHunter Backend

Feito com NestJS, Prisma e PostgreSQL; Siga as instruções abaixo para configurar o ambiente e rodar o projeto em seu PC.

### Pré-requisitos

Você precisará de instalar as seguintes ferramentas:

- **Docker** e **Docker Compose**: Para gerenciar o banco de dados PostgreSQL.
- **Node.js**: Para rodar o servidor NestJS.
- **NPM** ou **Yarn**: Para gerenciar as dependências do projeto.

### Instalação

1. **Clone o repositório**:

   ```bash
   git clone + (URL DO REPOSITORIO)
   cd backend
   ```
2. **Rode a imagem docker**:
   
   ```bash
   docker-compose up -d
   ```
3. **Crie um .env**:

   Crie um dotenv e coloque
   ```bash
   DATABASE_URL="postgresql://postgres:senha@localhost:5433/poke_hunter?schema=public"
   POKEAPI_URL="https://pokeapi.co/api/v2"
   POKEMON_COUNT=150
   ```
4. **Prisma**

   Gere o PRisma
   ```
      npx prisma generate
   ```

   Execute a migração
   ```
      npx prisma migrate dev
   ```

   Isso criará as tabelas.

5. **Servidor**
   
   Ligue o servidor
   ```bash
   npm run start:dev
   ```