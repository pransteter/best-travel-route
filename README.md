# Travel Price Quotation

Travel Price Quotation is a simple app to quote wich is the best price to travel from an airport to another.

### How to start the service?

Execute this command below:

`make api-server-up data_file_path=<file_path>`

example: `make api-server-up data_file_path=~/Documents/file.txt`

The file needs to respect this pattern:

```
GRU,BRC,10
BRC,SCL,5
GRU,CDG,75
GRU,SCL,20
GRU,ORL,56
ORL,CDG,5
SCL,ORL,20
```

### How to check routes through shell?

Execute this command below:

`make get-best-travel-quotation`

Result:

`please enter the route:`

You need to input the route to be checked like this:

`GRU-BRC`

Press enter!

Result will be something like this:

`best route: { from: 'GRU', to: 'BRC', price: 10 } > 10`


### How to use the API?

There are 2 endpoints:

1. Check the best route:

HTTP
```
GET /travel-quotation?from=GRU&to=BRC HTTP/1.1
Host: localhost:4001
```

shell - using cURL
```
curl --location --request GET 'localhost:4001/travel-quotation?from=GRU&to=BRC'
```

Response example (http code: 200 - body: json):
```json
{
    "from": "GRU",
    "to": "BRC",
    "bestPrice": 10,
    "bestPriceRoute": [
        {
            "from": "GRU",
            "to": "BRC",
            "price": 10
        }
    ]
}
```

2. Insert new route:

HTTP
```
POST /travel-route HTTP/1.1
Host: localhost:4001
Content-Type: application/json

{
    "from": "GRU",
    "to": "BRC",
    "price": 10
}
```

shell - using curl
```
curl --location --request POST 'localhost:4001/travel-route' \
--header 'Content-Type: application/json' \
--data-raw '{
    "from": "GRU",
    "to": "BRC",
    "price": 10
}'
```

Response (http code: 204 - body: empty)

API documentation: https://documenter.getpostman.com/view/1363847/T1LTe4RM

### How to execute the unit tests?

Execute this command below:

`make test`

### How turn off the application?

Execute this command below:

`make down`

### You can see all commands executing this commando:

`make`

---

## About project

### Resources

Environment: Docker + docker-compose + node:12-alpine image
Language: Javascript
Libraries (only for support the code style and tests):
- "@sucrase/jest-plugin": "^2.0.0",
- "axios": "^0.19.2",
- "eslint": "^7.6.0",
- "eslint-config-google": "^0.14.0",
- "jest": "^26.2.2"

### Architecture

The architecture was inspired by projects where I already work and good practices.
I tried to implement a few Designer patterns and DDD Bounded Context for business rules.

- database-files (All csv seed files)
- src (The application)
    - adapters (The adapters to connect with databases)
    - api (All about api server)
    - contexts (All business rules splited by contexts)
    - repositories (Abstraction to provide an easy interface to use database through adapters)
    - scripts (All scripts can be executed directly without API server files)
- tests (The unit tests)

### Style patterns

The style patterns is been checked by eslint with these extensions: 'eslint:recommended'and 'google'.

The style check can be done by this command:

`make style-check`

The style check and fix (fix just a few things) can be done by this command:

`make style-fix`

### Requirements to use the application

1. Docker
2. docker-compose








