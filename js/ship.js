/**
 * Constructor for the object Ship used in BattleShip game
 * @param {String} id, Identifier for the Ship
 * @param {Array} locationShip, Array with Coordinates of the Ship
 * @param {String} direction, Direction of the Ship. i.e: LANSCAPE or PORTRAIT
 * @param {Integer} size, Size of the Ship
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


	this.isDestroyed = function(){
		return true;
	};

	this.isHit = function(){
		return true;
	};


};