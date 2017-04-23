// Routers
Router.route("/dashboard", function() {
  this.render("dashboard");
});

// Stocks
Stocks = new Mongo.Collection("stocks");

if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });  
  Template.dashboard.helpers({
    mapOptions: function() {
      if (GoogleMaps.loaded()) {
        return {
          center: {lat: 47.59, lng: -122.26},
          zoom: 12
        }
      }
    },
    stocks: function() {
      return Stocks.find();
    },
  });
  Template.dashboard.onCreated(function() {
    GoogleMaps.ready("trafficMap", function(map) {
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map.instance);
    });
  });
  Template.stock.helpers({
    largerThanZero: function(data) {
      return data > 0;
    },
    formatPercent: function(data) {
      return parseFloat(data * 100).toFixed(2) + "%";
    }
  }); 
}

