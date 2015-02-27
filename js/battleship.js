


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
 * @param {number} row indicates the row in the matrix
 * @param {number} column indicates the column in the matrix
 */
var updatePlayerMatrix = function(row,column){
	
	if(isShipHit(row,column)){
		// writing in the table HIT
		document.getElementById(''+row+column).innerHTML='HIT';
		if(isShipDestroyed(row,column)){
			//writing destroyed and then displaying the ship
			//TODO

			if(isFleetDestroyed(row,column)){
				//Showing a message that all the fleet have been destroyed
				//TODO
			}
		}
	}
	else{
		//writing in the table MISS
		document.getElementById(''+row+column).innerHTML='MISS';
	}

}

/**
 * Verifies if the ship has been hit
 * @param {row} indicates the row in the matrix
 * @param {column} indicates the column in the matrix
 * 
 * @return {boolean} notifying if the ship has been hit or not
 */
var isShipHit = function(row,column){
	return true;
}

/**
 * Verifies if the ship has been destroyed
 * @param {number} row indicates the row in the matrix
 * @param {number} column indicates the column in the matrix
 * 
 * @return {boolean} notifying if the ship has been destroyed
 */
var isShipDestroyed = function(row,column){
	return true;
}

/**
 * Receives the shot
 * @param {number} row represents the row in the matrix
 * @param {number} column represents the row in the matrix
 */
var shot=function(row,column){
	alert(row+' '+ column);
}


/**
 * Creates the matrix for the player, without loading the ships
 * @param {number} dimension this parameter represents the matrix's dimension
 */
var createPlayerMatrix = function(dimension){
	var htmlMatrix = '';
	for(var i=0;i<dimension;i++){
		var row='<tr>\n';
		var col='';
		for(var j=0;j<dimension;j++){
			col=col+'<td '+ 'id='+i+j+'>player</td>\n';
		}
		row=row+col+'</tr>\n';
		htmlMatrix = htmlMatrix + row;
	}
	document.getElementById('player').innerHTML=htmlMatrix;
};

/**
 * Creates the matrix for the player, without loading the ships
 * @param {number} dimension this parameter represents the matrix's dimension
 */
var createDeveloperMatrix = function(dimension){
	var htmlMatrix = '';
	for(var i=0;i<dimension;i++){
		var row='<tr>\n';
		var col='';
		for(var j=0;j<dimension;j++){
			col=col+'<td '+ 'id='+i+j+'>developer</td>\n';
		}
		row=row+col+'</tr>\n';
		htmlMatrix = htmlMatrix + row;
	}
	document.getElementById('developer').innerHTML=htmlMatrix;
};



