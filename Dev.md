# Connecting to the Shared PostgreSQL Server

Follow these steps to connect to the shared PostgreSQL server.

## Prerequisites

1. Ensure you have PostgreSQL client tools installed. You can download them from the [official PostgreSQL website](https://www.postgresql.org/download/).
2. Obtain the following connection details from the database administrator:
   - **Host:** 192.168.100.90
   - **Port:** 5432 
   - **Database:** hover_sprite
   - **Username:** developer_user
   - **Password:** 1234

## Using Command Line to access in the psql
```sh
psql -h your_server_ip -p 5432 -U developer_user -d hover_sprite

```
## Connect database in pgadmin
1. Register-> new Server
2. Enter the server detail with the configuration above.

## Table permission denied
- Need to create to table in database first before using JPA