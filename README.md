# Travel Price Quotation

Travel Price Quotation is a simple app to quote wich is the best price to travel from an airport to another.

### How to start the api-server?

Execute this command below:

`make api-server-up data_file_path=<file_path>`

example: `make api-server-up data_file_path=~/Documents/file.txt`

Your file needs to respect this pattern:

```
GRU,BRC,10
BRC,SCL,5
GRU,CDG,75
GRU,SCL,20
GRU,ORL,56
ORL,CDG,5
SCL,ORL,20
```

### How to check routes through shell

Execute this command below:

`make get-best-travel-quotation`

Result:

`please enter the route:`

You need to input the route to be checked like this:

`GRU-BRC`

Press enter!

Result will be something like this:

`best route: { from: 'GRU', to: 'BRC', price: 10 } > 10`

