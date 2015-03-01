

var Field = function(dimension,nDestroyers,nShips,nTugBoats){
	this.dimension = dimension +1;
	this.nDestroyers = nDestroyers;
	this.nShips = nShips;
	this.nTugBoats = nTugBoats;
	this._ships=[];
	this._rowsMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	this.drawField = function(){
		this._drawHTML();
		this._drawConsole();
		this._initAllShips();

	};

	this._drawHTML = function(){
		
		var htmlMatrix = '';
		for(var i=0;i<this.dimension;i++){
			var row='<tr>\n';
			var col='';
			var background = 'player';
			for(var j=0;j<this.dimension;j++){
				if(i==0 && j==0){
					background = '';
				}
				else if(i==0){
					background = j;
				}
				else if (j==0){
					background = this._rowsMap.charAt(i-1);
				}
				else{
					background = 'player'	
				}


				col=col+'<td '+ 'id='+i+j+'>'+background+'</td>\n';
			}
			row=row+col+'</tr>\n';
			htmlMatrix = htmlMatrix + row;
		}
		document.getElementById('player').innerHTML=htmlMatrix;
	};

	this._drawConsole = function(){

	};

	this._initAllShips = function(){
		if(this.nDestroyers>0){
			this._initShips(this.nDestroyers,'D');
		}

		if(this.nShips>0){
			this._initShips(this.nShips,'S');
		}

		if(this.nTugBoats>0){
			this._initShips(this.nTugBoats,'T');
		}

	};

	this._initShips = function(ships,type){
		for (var i = 0; i < ships; i++) {
			this._ships.push(new Ship(type+(i+1)));
		}

	};

	this.receivedShot = function(location){
		if(this.isAnyShipHit(location)){
			// writing in the table HIT, and the place that was hit
			this.displayMessage(location,'HIT');
			
			if(this.isShipDestroyed(location)){
				//writing destroyed and then displaying the ship
				//this.displayShipDestroyedBoard(location);

				if(this.isFleetDestroyed()){
					//Showing a message that all the fleet have been destroyed
					//this.displayFleetDestroyed();
				}
			}
		}
		else{
			//writing in the table Fail
			this.displayMessage(location,'FAIL');
			/*// Verifying if there is still empty spaces not hit
			if(!this.isAllMissedShotHit()){
				//The player loose because there is no empty spaces
				// TODO
			}*/

		}
	};

	/**
	 * Verifies if the ship has been hit
	 * @param {string} location indicates the position in the matrix
	 * @return {boolean} notifying if the ship has been hit or not
	 */
	this.isAnyShipHit = function(location){
		

		return true;
	};

	/**
	 * Verifies if the ship has been destroyed
	 * @param {column} indicates the column in the matrix
	 * 
	 * @return {boolean} notifying if the ship has been destroyed
	 */
	this.isShipDestroyed = function(location){
		return true;
	};

	this.isFleetDestroyed = function(){
		return true;
	};

	this.getRowsMap = function(){
		return this._rowsMap;
	};

	/**
	 * Diplays a message notifying that the ship has been hit, along with the place that was hit
	 * @param {string} location is the place where the message has to be displayed
	 * @param {string} message to be displayed HIT or FAIL
	 */
	this.displayMessage = function(location,message){
		var cell = document.getElementById(location);
		cell.innerHTML = message;
	}


};