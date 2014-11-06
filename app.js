function Map(locations) {
    this.locations = locations;
}

Array.prototype.chunk = function(chunkSize) {
    var array = [];
    for (var i = 0; i < this.length; i+=chunkSize)
        array.push(this.slice(i, i+chunkSize));
    return array;
};

function createUsableArray(array) {
    var splitArray = array.split(', ');
    var cityName;
    var newArray = [];

    for (var i = 0; i < splitArray.length; i++) {
        if (i % 4 === 0) {
            cityName = splitArray[i] + ', ' + (splitArray[i+1]);
            cityName = cityName.slice(1,-1);
            newArray.push(cityName);
        } else if (splitArray[i].search((/[A-Z][A-Z]/))) {
            newArray.push(parseFloat(splitArray[i]));
        }
    }
    newArray = newArray.chunk(3);
    return newArray;
}

Map.prototype.createDirectionArray = function(direction) {
  var cleanArray = createUsableArray(this.locations);
  var directionArray = cleanArray[0];

  for (var i = 0; i < cleanArray.length; i++) {
    switch (direction) {
      case "north":
        if (cleanArray[i][1] > directionArray[1]) {
            directionArray = cleanArray[i];
        }
        break;
      case "south":
        if (cleanArray[i][1] < directionArray[1]) {
            directionArray = cleanArray[i];
        }
        break;
      case "east":
        if (cleanArray[i][2] > directionArray[2]) {
            directionArray = cleanArray[i];
        }
        break;
      case "west":
        if (cleanArray[i][2] < directionArray[2]) {
            directionArray = cleanArray[i];
        }
        break;
    }
  }
  return directionArray;
}

Map.prototype.northernmost = function() {
    return this.createDirectionArray("north");
};

Map.prototype.southernnmost = function() {
    return this.createDirectionArray("south");
};

Map.prototype.easternnmost = function() {
    return this.createDirectionArray("east");
};

Map.prototype.westernmost = function() {
    return this.createDirectionArray("west");
};


loc1 = '"Nashville, TN", 36.17, -86.78, "New York, NY", 40.71, -74.00, "Atlanta, GA", 33.75, -84.39, "Denver, CO", 39.74, -104.98, "Seattle, WA", 47.61, -122.33, "Los Angeles, CA", 34.05, -118.24, "Memphis, TN", 35.15, -90.05';


var newObj = new Map(loc1);
console.log('---');

var north = newObj.northernmost();
console.log('northernmost place on the list');
console.log(north);

var south = newObj.southernnmost();
console.log('southernmost place on the list');
console.log(south);

var east = newObj.easternnmost();
console.log('easternmost place on the list');
console.log(east);

var west = newObj.westernmost();
console.log('westernmost place on the list');
console.log(west);
