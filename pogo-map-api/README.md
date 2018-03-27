# Pokemon Go GymMap API

## Development

### Database

#### Install PostgreSQL

Install PostgreSQL in local :

```bash
docker pull postgres

docker run --name postgres-3 -d -p 5432:5432 postgres:latest
```

#### Create database

```bash
    export DATABASE_URL='postgres://postgres:postgres@localhost:5432/postgres'
    
    npm run db:create
```

#### Init schema & data

```bash
    export DATABASE_URL='postgres://pogomap:postgres@localhost:5432/pogomapdb'
    
    npm run db:init
```

### Run

```bash
    export DATABASE_URL='postgres://pogomap:postgres@localhost:5432/pogomapdb'
    
    npm start
```

## Deployment

### Database

Replace `PRODUCTION_DATABASE_URL` below :

```bash
    export DATABASE_URL='PRODUCTION_DATABASE_URL?ssl=true'
    
    node scripts/execute-database.js resources/V1.sql
    # node scripts/execute-database.js resources/whatever.sql
```