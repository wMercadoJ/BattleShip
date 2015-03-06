
var battleShip = new Game();

/**
 * Starts the game
 */
var startGame = function(nDimensionField,nDestroyers,nShips,nTugBoats){
	battleShip.start(nDimensionField,nDestroyers,nShips,nTugBoats);
}

/**
 * Resets the game
 */
var resetGame = function(){
	if(battleShip.field){
		battleShip.field.reset();
	}
}