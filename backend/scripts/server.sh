until psql "postgres://user:password@localhost:5432/meetdown" -c '\l'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
yarn run node-pg-migrate up
