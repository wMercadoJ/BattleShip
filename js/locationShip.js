/**
 * Class to handle functions to get and evaluate a Location for the new ship
 * @param {Integer} dimension, Dimension of the Field
 * @param {Array} ships, Matrix with ships added in the game
 * @constructor
 */
var LocationShipHandler =function(dimension, ships){
    this.dimensionField = dimension;
    this.charCollectionRow = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.ships = ships;
    this.avoidInfiniteLocation = 0 ;


    /**
     * Function to generate a location using the dimensions of the field
     * @param {String} directionShip, Direction of the ship to be evaluated(LANDSCAPE or PORTRAIT)
     * @param {Integer} shipSize, Size of the ship
     * @returns {Array} Array with all free coordinates
     */
    this.getNewLocation =function (directionShip, shipSize){
        do {
            this.avoidInfiniteLocation++;

            var rowPosition  = this.charCollectionRow.charAt(Math.floor(Math.random() * (this.dimensionField-1)));
            var columnPosition = parseInt(Math.random() * (this.dimensionField-1))+1;


            // Conditional statement to avoid infinite loop to get an empty location
            if (this.avoidInfiniteLocation > 500 ){
                this.avoidInfiniteLocation = 0;
                return 0;
            }

        }
        while (this.evaluateLocation(rowPosition, columnPosition));
        return this.evaluateColision(rowPosition, columnPosition, directionShip, shipSize);
    };

    /**
     * Function to evaluate if the new location of the ship has collisions with another ships
     * @param {String} rowPosition, Char of the row to be evaluated
     * @param {Integer} columnPosition, Number of the column to be evaluated
     * @param {String} directionShip,  Direction of the ship to be evaluated(LANDSCAPE or PORTRAIT)
     * @param {Integer} shipSize, Size of the ship
     * @returns {Array} Array with all free coordinates
     */
    this.evaluateColision = function (rowPosition, columnPosition, directionShip, shipSize){
        var indexRow = this.charCollectionRow.indexOf(rowPosition);
        var isCollision = false;
        var positionShip = [];
        if (directionShip == 'PORTRAIT'){
            for (var i = indexRow; i < indexRow + shipSize; i++){
                positionShip.push(this.charCollectionRow.charAt(i).concat(columnPosition));

                isCollision = this.evaluateLocation(this.charCollectionRow.charAt(i), columnPosition);

                if (isCollision)
                    break;
            }
        }else{
            for (var j = columnPosition; j < columnPosition + shipSize; j++){
                positionShip.push(rowPosition.concat(j));

                isCollision = this.evaluateLocation(rowPosition, j);
                if (isCollision)
                    break;
            }
        }

        if (isCollision || this.avoidInfiniteLocation >= 100){
            return this.getNewLocation(directionShip, shipSize);
        }else{
            this.avoidInfiniteLocation = 0;
            return positionShip;
        }
    };

    /**
     * Function to evaluate if the coordinate is empty or occupied
     * @param {String} row, Char of the row to be evaluated
     * @param {Integer} column, Number of the column to be evaluated
     * @returns {boolean}, Return True is Location is Full
     *                     Return False is Location is Empty
     */
    this.evaluateLocation = function (row, column){

        var isPositionFull = false;
        var positionField = row.concat(column);
        var indexRow = this.charCollectionRow.indexOf(row);
        var indexColumn = column;

        if (indexColumn >= this.dimensionField || indexRow >= this.dimensionField - 1){
            isPositionFull = true;
        }else
        {	
			for(var i=0;i<this.ships.length;i++){				
				var location = this.ships[i].locationShip;
				if (location.indexOf(positionField) >= 0){
					isPositionFull = true;
					break;
				}
			}			
        }
        return isPositionFull;
    };
};