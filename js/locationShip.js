var LocationShipHandler =function(){
    this.dimensionField = 0;
    this.globalRow = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.ships = [];
    this.tryLocateShip = 0 ;


    /**
     * Function to generate a location using the dimensions of the field
     * @param {String} id, Identifier of the ship
     * @param {Integer} shipSize, Size of the new ship
     */
    this.getNewLocation =function (dimension, shipMatrix,  directionShip, shipSize){
        this.dimensionField = dimension;
        this.ships = shipMatrix;

        do {
            this.tryLocateShip++;

            var rowPosition  = this.globalRow.charAt(Math.floor(Math.random() * (this.dimensionField-1)));
            var colPosition = parseInt(Math.random() * this.dimensionField-1)+1;


            // Conditional statement to avoid infinite loop to get an empty location
            if (this.tryLocateShip > 500 ){
                this.tryLocateShip = 0;

                return 0;
            }

        }
        while (this.evaluateLocation(rowPosition, colPosition));

        return this.evaluateColision(rowPosition, colPosition, directionShip, shipSize);
    };

    /**
     * Function to evaluate the new location of the ship and avoid collisions between ships
     * @param {String} id, Identifier of the new ship
     * @param {Integer} colPosition, Column position to be evaluated
     * @param {String} rowPosition, Row position to be evaluated
     * @param {String} direction, Direction of the ship to be evaluated
     * @param {Integer} shipSize, Size of the sip to be evaluated
     */
    this.evaluateColision = function (rowPosition, colPosition, directionShip, shipSize){
        var indexRow = this.globalRow.indexOf(rowPosition);
        var collision = false;
        var position = [];
        if (directionShip == 'PORTRAIT'){
            for (var i = indexRow; i < indexRow + shipSize; i++){
                position.push(this.globalRow.charAt(i).concat(colPosition));

                collision = this.evaluateLocation(this.globalRow.charAt(i), colPosition);

                if (collision)
                    break;
            }
        }else{
            for (var j = colPosition; j < colPosition + shipSize; j++){
                position.push(rowPosition.concat(j));

                collision = this.evaluateLocation(rowPosition, j);
                console.log(collision);
                if (collision)
                    break;
            }
        }

        if (collision || this.tryLocateShip >= 100){

            return this.getNewLocation(this.dimensionField,this.ships, directionShip, shipSize);
        }else{
            this.tryLocateShip = 0;

            return position;
            //addShip(id, position, direction, shipSize);
        }
    };
    /**
     * Function to add a Ship into the Ships array
     * @param {String} id, Identifier of the new ship
     * @param {Array} position, Array with coordinates in the field for the new ship
     * @param {String} direction, Direction of the new ship
     * @param {Integer} shipSize, Size of the new ship
     */
    this.addShip = function (id, position, direction, shipSize){
        var ship = new Ship(id, position, direction, shipSize);
        this.ships.push(ship);
    	console.log(this.ships)
    };
    /**
     * Function to evaluate if the coordinate is empty or occupied
     * @param {String} row, Identifier of the row
     * @param {Integer} col, Identifier of the column
     * @returns {boolean} True or false if the coordinate is empty or occupied
     */
    this.evaluateLocation = function (row, col){

        var shipExist = false;
        var position = row.concat(col);
        var indexCol = this.globalRow.indexOf(row);
        var indexRow = col;

        if (indexCol >= this.dimensionField || indexRow >= this.dimensionField){
            shipExist = true;
        }else
        {
            this.ships.forEach(function (object) {
                for (var name in object) {
                    if (name == 'locationShip') {
                        var value = object[name];
                        if (value.indexOf(position) >= 0) {
                            shipExist = true;
                        }
                    }
                }
            });
        }

        return shipExist;
    };
};