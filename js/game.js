/**
 * Class Game which receives the parameter from HTML and initiates the the game
 * @constructor
 */
var Game = function(){
	/**
	 * Instance of Field
     * @type {object}
	 */
	this.field = null;

	/**
	 * Starts the game initiating the field object
	 * @param {number} field dimension
	 * @param {number} number of destroyers
	 * @param {number} number of tugBoats
	 * @param {number} number of Ships
	 */
	this.start = function(dimension,nDestroyers,nTugBoats,nShips){
		this.field = new Field(parseInt(dimension),
								parseInt(nDestroyers),
								parseInt(nTugBoats),
								parseInt(nShips)
								);
		this.field.drawField();
	};

	/**
	 * Receives the value from html which represents the shot
	 * @param {string} location of the shot
	 */
	this.shot = function(location){
    	location = location.toLocaleUpperCase();
		if(this.isValidShot(location)){
      		this.field.receivedShot(location);
		} else {
      console.log('----> Shot Data incorrect <----');
    }
	};

	/**
	 * Verifies if the shot is valid
	 * @param {string} location of the shot
	 */
	this.isValidShot = function(location){

	    location.split('');
	    var row = location[0];
	    var column = location[1];
     	var charCollectionRow = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	  	if(charCollectionRow.indexOf(row) >= 0){
	    	return (column <= this.field.dimension)
	  	} else {
	    	return false;
	  	}
	};

	/**
	 * Parses the location
	 * @param{string} location of the shot
	 */
	this.parseLocation = function(location){
		var row = parseInt(this.field.getRowsMap().indexOf(location.charAt(0)))+1;
		var column = parseInt(location.charAt(1));
		return row+''+column;
	};

	
}; 