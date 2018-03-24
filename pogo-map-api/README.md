# Database

Install PostgreSQL in local :

```
docker pull postgres

docker run --name postgres-3 -d -p 5432:5432 postgres:latest
```

psql -U postgres -d postgres -a -f resources/03-gyms.sql -h localhost
psql -U postgres -d postgres -a -f resources/03-gyms.sql -h localhost
psql -U postgres -d postgres -a -f resources/03-gyms.sql -h localhost