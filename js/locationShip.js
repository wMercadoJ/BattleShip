var dimensionField = 0;
var globalRow = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var ships = [];
var tryLocateShip = 0 ;

/**
 * Function to generate a location using the dimensions of the field
 * @param {String} id, Identifier of the ship
 * @param {Integer} shipSize, Size of the new ship
 */
function getNewLocation(dimension, shipMatrix,  directionShip, shipSize){
    dimensionField = dimension;
    ships = shipMatrix;

    do {
        tryLocateShip++;

        var rowPosition  = globalRow.charAt(Math.floor(Math.random() * (dimensionField-1)));
        var colPosition = parseInt(Math.random() * dimensionField-1)+1;


        // Conditional statement to avoid infinite loop to get an empty location
        if (tryLocateShip > 500 ){
            tryLocateShip = 0;

            return 0;
        }

    }
    while (evaluateLocation(rowPosition, colPosition));

    return evaluateColision(rowPosition, colPosition, directionShip, shipSize);
}

/**
 * Function to evaluate the new location of the ship and avoid collisions between ships
 * @param {String} id, Identifier of the new ship
 * @param {Integer} colPosition, Column position to be evaluated
 * @param {String} rowPosition, Row position to be evaluated
 * @param {String} direction, Direction of the ship to be evaluated
 * @param {Integer} shipSize, Size of the sip to be evaluated
 */
function evaluateColision(rowPosition, colPosition, directionShip, shipSize){
    var indexRow = globalRow.indexOf(rowPosition);
    var collision = false;
    var position = [];
    if (directionShip == 'PORTRAIT'){
        for (var i = indexRow; i < indexRow + shipSize; i++){
            position.push(globalRow.charAt(i).concat(colPosition));

            collision = evaluateLocation(globalRow.charAt(i), colPosition);

            if (collision)
                break;
        }
    }else{
        for (var j = colPosition; j < colPosition + shipSize; j++){
            position.push(rowPosition.concat(j));

            collision = evaluateLocation(rowPosition, j);
            console.log(collision);
            if (collision)
                break;
        }
    }

    if (collision || tryLocateShip >= 100){

        return getNewLocation(dimensionField,ships, directionShip, shipSize);
    }else{
        tryLocateShip = 0;

        return position;
        //addShip(id, position, direction, shipSize);
    }
}
/**
 * Function to add a Ship into the Ships array
 * @param {String} id, Identifier of the new ship
 * @param {Array} position, Array with coordinates in the field for the new ship
 * @param {String} direction, Direction of the new ship
 * @param {Integer} shipSize, Size of the new ship
 */
function addShip(id, position, direction, shipSize){
    var ship = new Ship(id, position, direction, shipSize);
    ships.push(ship);
	console.log(ships)
}
/**
 * Function to evaluate if the coordinate is empty or occupied
 * @param {String} row, Identifier of the row
 * @param {Integer} col, Identifier of the column
 * @returns {boolean} True or false if the coordinate is empty or occupied
 */
function evaluateLocation(row, col){

    var shipExist = false;
    var position = row.concat(col);
    var indexCol = globalRow.indexOf(row);
    var indexRow = col;

    if (indexCol >= dimensionField || indexRow >= dimensionField){
        shipExist = true;
    }else
    {
        ships.forEach(function (object) {
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
}
