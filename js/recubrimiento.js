function prepare(lx){
  var retorno = "";
  for(var t = 0; t<lx.length; t++){
    retorno = retorno+lx[t]+"        ";
  }
  return retorno;
}


/////////////////////////////// L0 ///////////////////////////////

// FUNCION QUE CALCULA L0 
var lcero = function (DF){
  var l0 = [];
  for (var i = 0;  i < DF.length; i++) {
    var implicantes = DF[i].match(regexInplicante)[0];
    var inplicados  = atributos(DF[i].match(regexInplicado)[0]);
    while (inplicados.length > 0){
      var aux = inplicados.pop();
      l0.push(implicantes+">"+aux)
    }    
  }
  return l0;
}

/////////////////////////////// L1 ///////////////////////////////

var l1 = function (l0){
  var l1 = [];
  var strL0 = toDF(l0)
  var l0_df = [];
  //sacamos las de un implicante y las agregamos a l1
  regDF_uno = /(([^\:]|^)([a-zA-Z])\>[a-zA-Z])(?!:)/g; //regex para extraer DF de solo un implicante 
  regDF_mas_uno = /([^:]\S)+([a-zA-Z])\>[a-zA-Z]/g; //regex para extraer DF de mas de un implicante 
  l1 =  eliminarEspacios(strL0.match(regDF_uno)); //elimina espacios de cada elemento de un array
  l0_df = strL0.match(regDF_mas_uno); //DF que tienen mas de un implicante A:B>C
  // factorExtraño("A:B>D", l0);
  if (l0_df != null){
    l0_df.forEach(function(element, index){
      var isExtrano = factorExtraño(element, l0);
      if (isExtrano[0][0].length > 0)
        l1.push(isExtrano[0][0])
    });
  }
  return eliminarDuplicados(l1);
}

function factorExtraño(df, array){
  // console.log(df)
  // console.log(array)
  var implicado            = df.match(regexInplicado);
  var implicante           = df.match(regexInplicante);
  var combinacion          = combinar(atributos(implicante[0]));  
  var stringDF             = toDF(array);
  var generadores_extranos = [];
  combinacion.pop(); //eliminamos la ultima combinacion que es la mima df parámetro
  var contador = 0;
  combinacion.forEach(function(element, index){
    var el = redundancia(atributos(element), array);
    if (el != null){
      if(comprobar(el, implicado[0])){
        generadores_extranos.push(element);
        contador ++;
      }
    }

  });  
  var nueva_df    = [];
  var extranos    = [];
  var no_extramos = [];
  //si tenemos vas de un elemento generador, entonces comprobamos que no estén duplicados, y
  //extraemos [] de extraños y no extraños
  if (contador != atributos(implicante[0]).length){


    generadores_extranos.forEach(function(df){
      atributos(df).forEach(function(atr){
        nueva_df.push(atr);
      })
    });
    nueva_df = eliminarDuplicados(nueva_df);
    if (nueva_df.length > 0){
      var aux = atributos(implicante[0])
      aux.forEach(function(element, index){
        if (!comprobar(nueva_df, element)){
          extranos.push(element);
        }else{
          no_extramos.push(element);
        }
      });

      nueva_df = [arrToImplicantes(nueva_df)];
      nueva_df[0]  = nueva_df[0] + ">" +  implicado[0];
    }else {
      no_extramos = implicante;
      nueva_df = [df];
    }
  }
  if (nueva_df.length > 0)
    nueva_df = arrToImplicantes(nueva_df);
  // console.log(nueva_df)
  // console.log(extranos)
  // console.log(no_extramos)
  return [[nueva_df], extranos, no_extramos]
}

/////////////////////////////// L2 ///////////////////////////////
var combinaciones = 0;
function redundancia (implicante, lUno){
  var array = combinar(implicante);
  var aux   = null;
  for (var i=0; i<array.length; i++){
    for (var j=0; j<lUno.length; j++){
      var regex = reg("(^["+array[i]+"]+)(?=\>)\>[a-zA-Z\:]*");
      var redun = lUno[j].match(regex);
      if (redun != null){
        aux              = implicante;
        combinaciones    = aux.length;
        var newImplicado = redun[0].match(regexInplicado)[0];        
        if (aux.indexOf(newImplicado) == -1) {
          aux.push(newImplicado);
          redundancia(aux, lUno);
        }
      }
    }
  }
  if (aux == null)
    return implicante;
  else
    return aux;
}



var l2 = function (Ll1){
  var auxL1 = Ll1;
  var aux   = "";
  var l2 = [];
  for (var i = 0; i<Ll1.length; i++){
    aux            = Ll1[i];
    var implicante =  atributos(aux.match(regexInplicante)[0]);
    auxL1          = eliminar_elemento(Ll1, i);
    var combinaciones = redundancia(implicante, auxL1);
    var implicado     = aux.match(regexInplicado);
    if (combinaciones != null) {
      if (comprobar(combinaciones, implicado)){
      } else {
        l2.push(aux);
      }
    }else {
      l2.push(aux);
    }
    auxL1 = Ll1;
  }
  return l2;
}


//////////////////////////// FUNCIONES ////////////////////////////////////77

/*
FUNCION QUE EXTRAE LOS ATRIBUTOS
Si str="A:B:C:A" atributos() retorna ['A','B','C','A']
*/
var atributos = function(str){
  var myArray = str.match(regexAtributos);
  return myArray;
}

//Funcion que crea un nuevo regex (expresion regular) a partir de un string
function reg(input) {
  var flags;    
  flags = 'g';
  return new RegExp(input, flags);
}


function powerset(ary) {
  var ps = [[]];
  for (var i=0; i < ary.length; i++) {
    for (var j = 0, len = ps.length; j < len; j++) {
      ps.push(ps[j].concat(ary[i]));
    }
  }
  return ps;
}

//funcion para sacar todas las combinaciones de un array
function combinar(ary2) {
  var ary = powerset(ary2);
  var ps  = []
  var str = "";
  for (var i=1; i < ary.length; i++) {
    for (var j = 0; j < ary[i].length; j++) {
      str += ary[i][j];
      if(ary[i].length > j+1){
        str += ":";
      }
    }
    ps.push(str);
    str="";
  }
  return ps;
}

//FUNCION QUE CALCULA L1
var eliminarDuplicados = function (array){
  var listaGrupo02  = array;
  var SinDuplicados = [];
  var SinDuplicados = listaGrupo02.filter(function(elem, pos) {
   return listaGrupo02.indexOf(elem) == pos;
 });
  return SinDuplicados;
}

//Elimina los elementos duplicados de un array
function eliminar_elemento (array, index){
  var arrayNuevo = [];
  for (var i=0; i < array.length; i++){
    if (index != i){
      arrayNuevo.push(array[i]);
    }
  }
  return arrayNuevo;
}

//comprueba si existe un elemento (imp) denrto de un array (objeto)
function comprobar(objeto, imp){
  for (var i=0; i<objeto.length; i++){
    var str1 = new String(objeto[i]);
    var str2 = new String(imp);
    if(str1[0] == str2[0]){
      return true;
    }
  }
  return false;  
}


function comprobarArray(objeto, imp){
  if (objeto.length == imp.length){
    for (var i=0; i<objeto.length; i++){    
      var str1 = new String(objeto[i]);
      var str2 = new String(imp[i]);
      if(str1[0] != str2[0]){
        bol = false;
      }
    }
  }else {
    return false;
  }
  return true;
}


// funcion que convierte un array en string implicante o implicado ["A", "B"] ----> "A:B"
function arrToImplicantes(arr){
  var implicantes = "";
  arr.forEach(function(element, index){
    implicantes += element;
    if (index+1 < arr.length)
      implicantes += ":";
  })
  return implicantes;
}

// funcion para convertir array DF en string de DF.
function toDF(array){
  var ar = function (a, b){
    return a + " " + b;
  }
  return array.reduce(ar);
}

// funcion que limina espacios de los elementos de un array
function eliminarEspacios(array){
  return array.map(function(df){
    return df.trim();
  })
}

function comprobarElementales (df) {
  var elemental = function(element){
    var implicado  = atributos(element.match(regexInplicado)[0]);
    var implicante =  atributos(element.match(regexInplicante)[0]);
    for (var i=0; i<implicado.length; i++){
      if (comprobar(implicante, implicado[i])){
        return 0
      }
    }
    return 1;
  }
  even = df.filter(function (element) {
    return elemental(element) == 0;
  })
  return even;
}


function comprobarDF(df, atr) {
  var elemental = function(element){
    var implicado  = atributos(element.match(regexInplicado)[0]);
    var implicante =  atributos(element.match(regexInplicante)[0]);
    for (var i=0; i<implicado.length; i++){
      if (!comprobar(atr, implicado[i])){
        return 0
      }
    }
    for (var i=0; i<implicante.length; i++){
      if (!comprobar(atr, implicante[i])){
        return 0
      }
    }
    return 1;
  }
  even = df.filter(function (element) {
    return elemental(element) == 0;
  })
  return even;
}

function getImplicados(df) {
  var aux = []
  df.forEach(function(element){
    var implicados = atributos(element.match(regexInplicado)[0]);
    implicados.forEach(function(ele){
      aux.push(ele);
    })
  });
  return eliminarDuplicados(aux);
}

function getImplicantes(df) {
  var aux = []
  df.forEach(function(element){
    var implicantes = atributos(element.match(regexInplicante)[0]);
    implicantes.forEach(function(ele){
      aux.push(ele);
    })
  });
  return eliminarDuplicados(aux);
}