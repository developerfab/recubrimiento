function getZ (df, atr){
  var implicados = getImplicados(df);
  var sdsd       = atr.filter(function (element) {
    return comprobar(implicados, element) === false;
  });
  // console.log(sdsd)
  return sdsd;
} 


function getW(df, atr){
  var implicantes = getImplicantes(df);
  var w           = atr.filter(function (element) {
    return comprobar(implicantes, element) === false;
  });
  // console.log(w);
  return w;
} 

function getV(zz, w, atr){
  var aux = eliminarDuplicados(zz.concat(w));
  // console.log("aux " + aux)
  var v = atr.filter(function (element) {
    return comprobar(aux, element) === false;
  });
  return v;
}

function getM2(z,v, l, atr){
  var combinaciones = combinar(v);
  // console.log(combinaciones);
  var M1 = combinaciones.map(function(e){
    return arrToImplicantes(z)+":"+e
  });
  // console.log(M1);
  var M2 = M1.filter(function(e){
    var generados = redundancia(atributos(e), l);
    // console.log(generados)
    return comprobarArray(generados, atr) === true;
  });
  return M2;
}
