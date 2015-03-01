
var Game = function(){
	this.field = null;
	
	this.start = function(dimension,nDestroyers,nTugBoats,nShips){
		this.field = new Field(parseInt(dimension),
								parseInt(nDestroyers),
								parseInt(nTugBoats),
								parseInt(nShips)
								);
		this.field.drawField();

	};

	this.shot=function(location){
		if(this.isValidShot(location)){
			this.field.receivedShot(this.parseLocation(location));
		}
	};

	
	this.isValidShot = function(location){
		var row = parseInt(this.field.getRowsMap().indexOf(location.charAt(0)))+1;
		var column = parseInt(location.charAt(1));

		console.log(row +' '+ column);
		return (row>0 && column>0)&&(row<this.field.dimension && column<this.field.dimension);

	};

	this.parseLocation = function(location){
		var row = parseInt(this.field.getRowsMap().indexOf(location.charAt(0)))+1;
		var column = parseInt(location.charAt(1));

		return row+''+column;
	};
}