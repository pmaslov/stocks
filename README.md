# Stocks

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

## Data generation

https://json-generator.com/

configuration as follows:

[
'{{repeat(10)}}',
{
company: '{{company()}} {{company()}}',
ticker: '{{company().toUpperCase()}}',
price: '{{floating(10, 1000, 2)}}',
exchange: function (tags) {
var fruits = ['NASDAQ', 'NYSE', 'TSX', 'IEX'];
return fruits[tags.integer(0, fruits.length - 1)];
},
up: function (tags) {
var fruits = [false,true];
return fruits[tags.integer(0, fruits.length - 1)];
}
}
]
