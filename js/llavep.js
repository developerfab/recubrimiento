var getZ = function(df, atr){
  var implicados = getImplicados(df);
  var z = atr.filter(function (element) {
    return comprobar(implicados, element) === false;
  });
  console.log(z)
  return z;
} 


var getW = function(df, atr){
  var implicantes = getImplicantes(df);
  var w = atr.filter(function (element) {
    return comprobar(implicantes, element) === false;
  });
  console.log(w);
  return w;
} 

getV = function (z, w, atr){
  var aux = eliminarDuplicados(z.concat(w));
  var v = atr.filter(function (element) {
    return comprobar(implicantes, element) === false;
  });
  return ;

}

function probarZ (l2, atr){
  z = getZ(l2, atr);
  zplus = redundancia(z, l2);
  if (comprobarArray(zplus, atr)){
    console.log("Z es igual a T");
  }else {
    console.log("z es diferente a T");
  }
}