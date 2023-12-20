psql psql -U duosystem -h localhost -p 5932 -d duosystem -f initial-sql.sql
psql psql -U duosystem -h localhost -p 5932 -d duosystem -f primary-insert.sql
npm run start:dev
