function getZ (df, atr){
  var implicados = getImplicados(df);
  var sdsd = atr.filter(function (element) {
    return comprobar(implicados, element) === false;
  });
  console.log(sdsd)
  return sdsd;
} 


var getW = function(df, atr){
  var implicantes = getImplicantes(df);
  var w = atr.filter(function (element) {
    return comprobar(implicantes, element) === false;
  });
  console.log(w);
  return w;
} 

var getV = function (zz, w, atr){
  var aux = eliminarDuplicados(zz.concat(w));
  console.log("aux " + aux)
  var v = atr.filter(function (element) {
    return comprobar(aux, element) === false;
  });
  return v;

}

function probarZ (l2, atr){
  var z2 = getZ(l2, atr);
  zplus = redundancia(z2, l2);
  if (comprobarArray(zplus, atr)){
    console.log("Z es igual a T");
    return true;
  }else {
    console.log("z es diferente a T");
    return false;
  }
}

