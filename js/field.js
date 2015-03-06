/**
* Dimension of the field
* @type {number} dimension
* @type {number} nDestroyers number of destroyers in the field
* @type {number} nShips number of ships in the field
* @type {number} nTugBoats number of tugBoats in the field
* @constructor
*/
var Field = function(dimension,nDestroyers,nShips,nTugBoats){
	
  
	this.dimension = dimension +1;
	this.nDestroyers = nDestroyers;
	this.nShips = nShips;
	this.nTugBoats = nTugBoats;

	/**
	 * Array of ships
     * @type {array} 
	 */
	this._ships=[];
	/**
	 * String that contains the rows
     * @type {string} 
     */
	this._rowsMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	/**
	 * Matrix that will be always drawn in the console
	 */
	this._devConsole = [];

	this.locationShipHandler = new LocationShipHandler(this.dimension, this._ships);

	/**
	 * Draws the field in the html and in console
	 */
	this.drawField = function(){
		this._initAllShips();
		this._initDevConsole();
		this._drawHTML();
		this._drawConsole();

	};

	/**
	 * Draws the fields in the html
	 */
	this._drawHTML = function(){
		
		var htmlMatrix = '';
		for(var i=0;i<this.dimension;i++){
			var row='<tr>\n';
			var col='';			
			var rMap = this._rowsMap.charAt(i-1);

			for(var j=0;j<this.dimension;j++){
				if(i==0 && j==0){	
					col=col+'<td '+ 'id='+rMap+j+'></td>\n';			
				}
				else if(i==0 && j >0){
					console.log("entre"+j);
					col=col+'<td '+ 'id='+rMap+j+'>'+j+'</td>\n';
				}
				else if (j==0){
					col=col+'<td '+ 'id='+rMap+j+'>'+this._rowsMap.charAt(i-1)+'</td>\n';
				}
				else{
					col=col+'<td '+ 'id='+rMap+j+' class="empty"></td>\n';
				}
			}
			row=row+col+'</tr>\n';
			htmlMatrix = htmlMatrix + row;
		}
		document.getElementById('player').innerHTML=htmlMatrix;
	};

	/**
	 * Initiates the dev console that will be displayed in the console
	 */
	this._initDevConsole = function(){
		

		for (var i = 0; i < this.dimension -1; i++) {
			var drawColumn = [];
			for (var j = 0; j < this.dimension -1; j++) {
				drawColumn.push("---")
			}
			this._devConsole.push(drawColumn);
		}
		
		for(var i=0;i<this._ships.length;i++){
			var id = this._ships[i].id;
			var location = this._ships[i].locationShip;
			for(var k = 0; k < location.length; k++){				
				var rowCoordinate = parseInt(this.locationShipHandler.charCollectionRow.indexOf(location[k].slice(0,1)));
				var colCoordinate = parseInt(location[k].slice(1,location[k].length))-1;				
				this._devConsole[rowCoordinate][colCoordinate]= id;
			}
		}
		
	};
	/**
     * Draws the game in the console
	 */
	this._drawConsole = function(location,message){

		if(location){
			this._devConsole[this._rowsMap.indexOf(location.charAt(0))][parseInt(location.charAt(1))-1] = message;
		}

		var text = "\n"
		for (var i = 0; i < this.dimension -1; i++) {
			for (var j = 0; j < this.dimension -1; j++) {
				text = text + this._devConsole[i][j] + " ";
			}
			text = text + "\n";
		}
		console.log(text);

	};

	/**
	 * Function to initialize Ships using the number introduced in UI
	 * @private
	 */
	this._initAllShips = function(){
		if(this.nDestroyers>0){
			this._initShips(this.nDestroyers,'D', 3);
		}

		if(this.nShips>0){
			this._initShips(this.nShips,'S', 2);
		}

		if(this.nTugBoats>0){
			this._initShips(this.nTugBoats,'T', 1);
		}
	};

	/**
	 * Function to initialize ships for each model
	 * @param {Integer} ships, Number of ships to be created by model
	 * @param {String} typeShip, Char used as identified by model
	 * @param {Integer} sizeShip, Size of the ships by model
	 * @private
	 */
	this._initShips = function(ships, typeShip, sizeShip){
		for (var i = 0; i < ships; i++) {
			var directionShip = 'LANDSCAPE';
			var identifierShip = "";

			if (i < 9 )
				identifierShip = typeShip + "0" +(i+1);
			else
				identifierShip = typeShip.concat(i+1);

			directionShip = parseInt(Math.random() * 2);

			if(directionShip == 1)
				directionShip = 'PORTRAIT';

			var positionShip  = this.locationShipHandler.getNewLocation(directionShip, sizeShip);

			if (positionShip != 0) {
				var newShip = new Ship(identifierShip, positionShip, directionShip, sizeShip);
				this._ships.push(newShip);
			}else{
				console.log("Unable to add more ships!");
				break;
			}
		}
		

	};

	/**
	 * Receives the shot and verifies if it has hit, fail or destroyed a ship
	 * @param{string} location
	 */
	this.receivedShot = function(location){
		var ship = this._getShip(location);
		var devMessage = '-F-';
		if(true){
		
			if(true){
				//writing destroyed and then displaying the ship
				this._displayShipDestroyed(ship);

				if(this._isFleetDestroyed()){
					//Showing a message that all the fleet have been destroyed
					//this.displayFleetDestroyed();
				}
			}
			else {
				// writing in the table HIT, and the place that was hit
				this.displayMessage(location,'HIT');
				devMessage = '-H-';
				
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
		this._drawConsole(location,devMessage);
	};

	
	
	this._isFleetDestroyed = function(){
		return false;
	};

	this.getRowsMap = function(){
		return this._rowsMap;
	};

	this._getShip = function(location){
		var nShips = this._ships.length;
		var ship = null;

		for (var i = 0; i < nShips; i++) {
			ship = this._ships[i];

			//TODO still need to be implemented
			if(ship.isHit()){
				return ship;
			}
		}
		return ship;
	};

	/**
	 * Diplays a message notifying that the ship has been hit, along with the place that was hit
	 * @param {string} location is the place where the message has to be displayed
	 * @param {string} message to be displayed HIT or FAIL
	 */
	this.displayMessage = function(location,message){
		var cell = document.getElementById(location);
		cell.innerHTML = message;
		cell.setAttribute('class',message);
	}

	/**
	 * Displays the ship in the html
	 * @param {project.Ship} obj instance of Ship that will be displayed in the html, if it is tugboat it 
	 * 	occupies just one space, ship occupies two and destroyer three
	 */
	this._displayShipDestroyed = function(ship){
		var shipID = ship.id;
		var shipLocation = ship.locationShip;
		var shipDirection = ship.direction;
		var shipSize = ship.locationShip.length;
		var cell = null;
		var typeShipCss= '';

		//verifying if it is a tugboat
		if(shipID.charAt(0)=='T'){
			typeShipCss = 'tugboat-'+shipDirection;
			cell = document.getElementById(shipLocation[0]);				
			cell.setAttribute('class',typeShipCss);	
			
		} else if(shipID.charAt(0)=='S'){
			typeShipCss = 'ship-back-'+shipDirection;
			cell = document.getElementById(shipLocation[0]);			
			cell.setAttribute('class',typeShipCss);
			
			typeShipCss = 'ship-front-'+shipDirection;
			cell = document.getElementById(shipLocation[1]);			
			cell.setAttribute('class',typeShipCss);
		}
		else{
			// the front
			typeShipCss = 'des-back-'+shipDirection;
			cell = document.getElementById(shipLocation[0]);			
			cell.setAttribute('class',typeShipCss);
			// the middle in case the ship it is a detroyer
			for(var i=1;i<shipLocation.length-1;i++){
				typeShipCss = 'des-middle-'+shipDirection;
				cell = document.getElementById(shipLocation[i]);				
				cell.setAttribute('class',typeShipCss);
			}
		
			//the ship back
			typeShipCss = 'des-front-'+shipDirection;
			cell = document.getElementById(shipLocation[shipLocation.length-1]);			
			cell.setAttribute('class',typeShipCss);
		}
		
	};



};