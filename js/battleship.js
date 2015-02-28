var dimension = 0;


/**
 * Creates the matrixes for the player and developer, without loading the ships
 * @param {number} dimension this parameter represents the matrixes' dimension
 */
var createMatrixes = function(dimension){
	createPlayerMatrix(dimension);
	createDeveloperMatrix(dimension);
}

/**
 * Loads the ships to the developer matrix will display the position of the ships
 * 
 */
var loadShips = function(){

}

/**
 * Updates the player's matrix 
 * @param {string} location indicates the position in the matrix
 */
var updatePlayerMatrix = function(location){
	
	if(isShipHit(location)){
		// writing in the table HIT, and the place that was hit
		displayMessage(location,'HIT');
		
		if(isShipDestroyed(location)){
			//writing destroyed and then displaying the ship
			displayShipDestroyedBoard(location);

			if(isFleetDestroyed()){
				//Showing a message that all the fleet have been destroyed
				displayFleetDestroyed();
			}
		}
	}
	else{
		//writing in the table Fail
		displayMessage(location,'FAIL');
		// Verifying if there is still empty spaces not hit
		if(!isAllMissedShotHit()){
			//The player loose because there is no empty spaces
			// TODO
		}

	}

}

/**
 * Diplays a message notifying that the ship has been hit, along with the place that was hit
 * @param {string} location is the place where the message has to be displayed
 * @param {string} message to be displayed HIT or FAIL
 */
var displayMessage = function(location,message){
	var cell = document.getElementById(location);
	cell.innerHTML = message;
}

/**
 * Diplays a message notifying that a ship has been destroyed and shows the ship
 * @param {string} location is the location where the message should displayed
 */
var displayShipDestroyedBoard = function(location){

}

/**
 * Diplays a message notifying that all ships have been destroyed the player won the game
 */
var displayFleetDestroyed = function(){

}

/**
 * Verifies if all the missed has been hit, this helps to identify if the player loose the game
 */
var isAllMissedShotHit = function(){

}
/**
 * Verifies if the ship has been hit
 * @param {string} location indicates the position in the matrix
 * @return {boolean} notifying if the ship has been hit or not
 */
var isShipHit = function(location){
	console.log(location);
	return true;
}

/**
 * Verifies if the ship has been destroyed
 * @param {column} indicates the column in the matrix
 * 
 * @return {boolean} notifying if the ship has been destroyed
 */
var isShipDestroyed = function(location){
	return true;
}

var isFleetDestroyed = function(){
	return true;
}
/**
 * Receives the shot
 * @param {number} row represents the row in the matrix
 * @param {number} column represents the row in the matrix
 */
var shot=function(row,column){
	if(validShot(row,column)){
		updatePlayerMatrix(''+row+column);
	}

}

/**
 * Verifies if the shot is inside of the matrix
 * @param {number} row represents the row in the matrix
 * @param {number} column represents the row in the matrix
 * @return {Boolean} 
 */
var validShot = function(row,column){
	return (row>0 && column>0)&&(row<dimension && column<dimension);
}

/**
 * Creates the matrix for the player, without loading the ships
 * @param {number} dimension this parameter represents the matrix's dimension
 */
var createPlayerMatrix = function(dimension){
	this.dimension = dimension + 1 ;
	var htmlMatrix = '';
	for(var i=0;i<dimension;i++){
		var row='<tr>\n';
		var col='';
		var background = 'player';
		for(var j=0;j<dimension;j++){
			if(i==0){
				background = j;
			}
			else if (j==0){
				background = i;
			}
			else{
				background = 'developer'	
			}


			col=col+'<td '+ 'id='+i+j+'>'+background+'</td>\n';
		}
		row=row+col+'</tr>\n';
		htmlMatrix = htmlMatrix + row;
	}
	document.getElementById('player').innerHTML=htmlMatrix;
};

/**
 * Creates the matrix for the developer, without loading the ships
 * @param {number} dimension this parameter represents the matrix's dimension
 */
var createDeveloperMatrix = function(dimension){
	var htmlMatrix = '';
	for(var i=0;i<dimension;i++){
		var row='<tr>\n';
		var col='';
		var background = 'developer';
		for(var j=0;j<dimension;j++){
			if(i==0){
				background = j;
			}
			else if (j==0){
				background = i;
			}
			else{
				background = 'developer'	
			}


			col=col+'<td '+ 'id='+i+j+'>'+background+'</td>\n';
		}
		row=row+col+'</tr>\n';
		htmlMatrix = htmlMatrix + row;
	}
	document.getElementById('developer').innerHTML=htmlMatrix;
};



