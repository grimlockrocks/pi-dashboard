import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});
  
Meteor.setInterval(function() {
  var now = new Date();
  var day = now.getDay();
  var hour = now.getHours();
  if (day >= 1 && day <= 5 && hour >= 7 && hour <= 15) {
    YahooFinance.snapshot({
      symbols: ["AMZN", "GOOG", "AAPL", "MSFT", "LNKD", "FB", "TSLA", "TWTR", "NFLX"],
      fields: ["s", "m", "j1", "p2", "l1"]
    }, function(err, snapshot) {
      for (i in snapshot) {
        Stocks.update(
          { symbol: snapshot[i].symbol },
          {
            symbol: snapshot[i].symbol,
            currentPrice: snapshot[i].lastTradePriceOnly,
            changeInPercent: snapshot[i].changeInPercent,
            marketCap: snapshot[i].marketCapitalization
          },
          { upsert: true }
        );
        console.log("Inserted stock " + snapshot[i].symbol);
      }
    });
  }
}, 60000);

