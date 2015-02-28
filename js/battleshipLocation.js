var size = 4;
var possibleColumn = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var direction = 'LANDSCAPE';
var ships = [
    {
        id: 1,
        location:new Array('A0','A1','A2'),
        hits: 0,
        kill: false
    },
    {
        id: 2,
        location: ['B0','B1'],
        hits: 1,
        kill: true
    },
    {
        id: 3,
        location: ['C0'],
        hits: 0,
        kill: false
    }
];

function getLocation(shipSize){
    do {
        var colPosition  = possibleColumn.charAt(Math.floor(Math.random() * size));
        var rowPosition = parseInt(Math.random() * size);
        var directionShip = parseInt(Math.random() * 3);
        if(directionShip == 2)
            direction = 'PORTRAIT';

        console.log("GET:"+colPosition + "-"+ rowPosition+"-"+direction+"-"+shipSize)
    }
    while (findInLocation(colPosition, rowPosition));

    evaluateLocation(colPosition, rowPosition, direction, shipSize);
}

function evaluateLocation(colPosition , rowPosition, direction, shipSize){
    var indexCol = possibleColumn.indexOf(colPosition);
    var collision = false;
    if (direction == 'PORTRAIT'){
        for( var i = indexCol; i < indexCol + shipSize; i++ ){
            console.log("P"+possibleColumn.charAt(i)+""+rowPosition);
            collision = findInLocation(possibleColumn.charAt(i), rowPosition);
            if (collision)
                break;
        }
    }else{
        for( var j = rowPosition; j < rowPosition + shipSize; j++ ){
            console.log("L"+colPosition+""+j);
            collision = findInLocation(colPosition, j);
            if (collision)
                break;
        }
    }

    if (collision){
        console.log("BuscarOtro");
        getLocation(shipSize)
    }else{
        locateShip();
    }
}

function locateShip(){
	console.log("Añadir Barco")
}

function findInLocation(col, row){
    var shipExist = false;
    var position = col + "" + row;
    var indexCol = possibleColumn.indexOf(col);
    var indexRow = row;
    if (indexCol >= size || indexRow >= size){
        shipExist = true;
    }else
    {
        ships.forEach(function (object) {
            for (var name in object) {
                if (name == 'location') {
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

function getAttributes(){
    ships.forEach(function(object) {
        for(var name in object) {

            var value = object[name];
            console.log(name+' :: '+value);
        }


    });
}

function matchSpecificProperty(item, filter) {
    var keys = Object.keys(filter);
    // true if any true
    return keys.some(function (key) {
        return item[key] == filter[key];
    });
}

function findAttribute(){
    ships.forEach(function(object   ) {
        console.log('Result: ', matchSpecificProperty(object, { hits: 1}));
    });
}
