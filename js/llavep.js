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

function probarZ(l2, atr){
  var z2 = getZ(l2, atr);
  zplus  = redundancia(z2, l2);
  // console.log("zplus")
  // console.log(zplus)
  if (comprobarArray(zplus, atr)){
    // console.log("Z es igual a T");
    return true;
  }else {
    // console.log("z es diferente a T");
    return false;
  }
}

function getM2(z,v, l, atr){
  var combinaciones = combinar(v);
  var M1 = combinaciones.map(function(e){
    if(arrToImplicantes(z).lenght == 0){
      return e;
    }
    else{
      return arrToImplicantes(z)+":"+e;
    }
  });
  var M2 = M1.filter(function(e){
    var generados = redundancia(atributos(e), l);
    return comprobarArray(generados, atr) === true;
  });
  return M2;
}

// funcion que retornoa un array con las llaves optimas.
function getM2Optimo(M2){
  var optimos = [];
  var arrsM2 = M2.map(function(e){
	return atributos(e);
  });
  arrsM2.forEach(function(elemento, index){
	var newarr = eliminar_elemento(arrsM2, index);
	if(!contiene(elemento, newarr))
		optimos.push(elemento);
  });
  return optimos.map(function(e){
  	return arrToImplicantes(e);
  });	
}

//function que retorna true  si almenos un array de arr2(conjunto de arrays) está contenido en el array "arr1"
function contiene(arr1, arr2){
  return arr2.some(function(element){
	return contieneAB(arr1, element);
  });
}

//verifica si el array arr2 está contenido en arr1
function contieneAB(arr1, arr2){
  return arr2.every(function(element){
	var si = comprobar(arr1, element);

  	return si;; 
  });
}



///////////////////// fin //////////////
