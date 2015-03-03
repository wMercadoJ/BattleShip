/**
 * Created by root on 03-03-15.
 */

/**
 * this function search the coordinates in the matrix and verify if is a ship place
 * @param coordinates Coordinates Eg: [1,2]
 * @param matrix variable for matrix created Eg:
 * @param fn
 */
function verifyShot(coordinates, matrix, fn){
  var matrixValue;
  for (x in matrix.x){
    for (y in matrix.y){
      matrixValue = matrix.y;
    }
  }
  if (matrix.value == '0'){
    console.log('fail');
  } else if (matrix.value == 'B'){
    if (matrix.hits == matrix.size.length){
      console.log('kill');
    }
    console.log('hit');
  }
}

//Note Matrix should be :
//Matrix:{x:8,
//        y:8
//        boats:{name:'U1', size = 3, coordinates:[[1,a][1,b][1,c]], hits: '1'}
//        }