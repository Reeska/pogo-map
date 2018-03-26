# Development

## Database

### Install PostgreSQL

Install PostgreSQL in local :

```bash
docker pull postgres

docker run --name postgres-3 -d -p 5432:5432 postgres:latest
```

### Create database

```bash
    export DATABASE_URL='postgres://postgres:postgres@localhost:5432/postgres'
    
    npm run db:create
```

### Init schema & data

```bash
    export DATABASE_URL='postgres://pogomap:postgres@localhost:5432/pogomapdb'
    
    npm run db:init
```

## Run

```bash
    export DATABASE_URL='postgres://pogomap:postgres@localhost:5432/pogomapdb'
    
    npm start
```