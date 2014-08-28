var currencies = require('./libs/currencies.js');

// Kudos to: http://stackoverflow.com/a/19722641 
module.exports.round = function(num) {
  return +(Math.round(num + "e+2")  + "e-2");
};

module.exports.write = function (liveRates) {
  var ratesTxt = '';

  for (var currency in liveRates) {
    if (currencies.hasOwnProperty(currency)) {
      var symbol = currencies[currency]["symbol_native"];
      var rate   = module.exports.round(liveRates[currency]);
      ratesTxt += currency + '=' + symbol + ' ' + rate + '\n'      
    }
  }

  return ratesTxt.slice(0, -1);
};

module.exports.read = function (localRates, convertFrom, convertTo) {
  var results = {};
  localRates  = localRates.split('\n');

  for (var i = 0 ; i < localRates.length; i ++) {

    if (results[convertFrom] && results[convertTo]) {
      return [ results[convertFrom], results[convertTo] ];
    }
    
    var temp      = localRates[i].split('=');
    var currency  = temp[0];
    temp          = temp[1].split(' ');
    var symbol    = temp[0];
    var rate      = temp[1];

    results[currency] = { 'symbol' : symbol, 'rate' : rate };
  }
};