/**
 * Constructor for the object Ship used in BattleShip game
 * @param {String} id, Identifier for the Ship
 * @param {Array} locationShip, Array with Coordinates of the Ship
 * @param {String} direction, Direction of the Ship. i.e: LANSCAPE or PORTRAIT
 * @param {number} size, Size of the Ship
 * @constructor
 */
var Ship = function(id, locationShip, direction, size) {
    this.id = id;
    this.locationShip = locationShip;
    this.hits = [];
    for (var h in locationShip){
      this.hits.push('')
    }
    this.direction = direction
    this.size = size;
    this.status = "ALIVE";

	this.isDestroyed = function(ship){
    var result = false;
    if (ship.status == 'Killed') {
      result = true;
    }
    return result;
	};

	this.isHit = function(ship){
    var result = false;
    if (ship.status == 'Damaged') {
      result = true;
    }
    return result;
	};

  this.isAShipAlive = function(){
    var ships = this._ships;
    for (var x in ships){
      if (ships[x].status != 'Killed') {
        break;
      } else {
        if (x == ships.length-1)
          console.log('-----> All boats killed <-----');
      }
    }
  };


};