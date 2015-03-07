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
      console.log('----> Shot Invalid <----');
    }
	};

	/**
	 * Verifies if the shot is valid
	 * @param {string} location of the shot
	 */
	this.isValidShot = function(location){
		var charCollectionRow = this.field.getRowsMap();

		if(location.length<2){
			return false;
		}

	    var row = location.charAt(0);
	    var column = location.substring(1,location.length);

	    //verifies if the row is char
	  	if(isNaN(row) || charCollectionRow.indexOf(row) >= 0){
	  		//verifies if the column is char
	  		if(isNaN(column)){
	  			return false;
	  		}
	  		else if(parseInt(column)>=0 && parseInt(column)<this.field.dimension){
	  			return true;
	  		}

	  	}
	  	return false;
	  	
	};
}; 