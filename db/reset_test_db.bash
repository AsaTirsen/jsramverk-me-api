#!/usr/bin/env bash

#rm test.sqlite
#sqlite3 test.sqlite < migrate.sql
echo "works"

$(> db/test.sqlite)
cat db/migrate.sql | sqlite3 db/test.sqlite
