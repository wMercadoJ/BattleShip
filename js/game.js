
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

	this.shot = function(location){
    location = location.toLocaleUpperCase();
		if(this.isValidShot(location)){
      //console.log(this.field.receivedShot(location));
			this.field.receivedShot(location);
		} else {
      console.log('----> Shot Data incorrect <----');
    }
	};

	this.isValidShot = function(location){
	    location.split('');
	    var row = location[0];
	    var column = location[1];
      var charCollectionRow = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if(charCollectionRow.indexOf(row) >= 0){
        return (column > 0)
      } else {
        return false;
      }
	};

	this.parseLocation = function(location){
		var row = parseInt(this.field.getRowsMap().indexOf(location.charAt(0)))+1;
		var column = parseInt(location.charAt(1));
		return row+''+column;
	};
};