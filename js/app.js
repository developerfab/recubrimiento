$(document).foundation();

var regexpDF = /([a-zA-Z]\:*)+\>+([a-zA-Z]\:*)*/g;
var regexInplicante = /([a-zA-Z]\:*)+(?=\>)/g;
var regexInplicado = /(?!.*>)([a-zA-Z](\:)*)+/g;
var regexAtributos = /[a-zA-Z]+/g;


// variables quemadas del ejemplo
var strT  = 'A:B:C:D:E:F';
var strDF = 'A:B>C D>E:F C>A B:E>C B:C>D C:F>B:D A:C:D>B C:E>A:F';
var strL0 = 'A:B>C D>E D>F C>A B:E>C B:C>D C:F>B C:F>D A:C:D>B C:E>A C:E>F';
var strL1 = 'A:B>C C>A D>E D>F B:E>C B:C>D A:C:D>B C:F>B C:F>D C:E>F';

var strL00 = 'Avion:B>Casa D>E D>F Casa>Avion B:E>Casa B:Casa>D Casa:F>B Casa:F>D Avion:Casa:D>B Casa:E>Avion Casa:E>F';

// DF ES UN ARRAY CON LAS DEPENDENCIAS FUNCIONALES
var DF = strDF.match(regexpDF);
var l0="";

//CARGA DEL TEXTO INGRESADO
function load(){
  strT = $("#conjunto").val();
  strDF = $("#df").val();
  atributos(strT);
  l0 = lcero(DF);
  $("#l0").text("{ "+l0+" }")
}

/*
FUNCION QUE EXTRAE LOS ATRIBUTOS
Si str="A:B:C:A" atributos() retorna ['A','B','C','A']
*/
var atributos = function(str){
  var myArray = str.match(regexAtributos);
  return myArray;
}

var eliminarDuplicados = function (array){
  var listaGrupo02  = array;
  var SinDuplicados = [];
  var SinDuplicados = listaGrupo02.filter(function(elem, pos) {
   return listaGrupo02.indexOf(elem) == pos;
 });
  return SinDuplicados;
}


// FUNCION QUE CALCULA L0 
var lcero = function (DF){
  var l0 = [];
  for (var i = 0;  i < DF.length; i++) {
    var implicantes = DF[i].match(regexInplicante)[0];
    var inplicados  = atributos(DF[i].match(regexInplicado)[0]);
    //console.log(implicantes);
    //console.log(inplicados);    
    while (inplicados.length > 0){
      var aux = inplicados.pop();
      l0.push(implicantes+">"+aux)
    }    
  }
  //console.log("l0: " + l0);
  return l0;
}


var l1 = function (l0){
  var l1 = [];
  ml0 = l0.match(regexpDF);
  //recoremos todo el l0
  for (var i = 0;  i < ml0.length; i++) {    //ml0.length
    var implicantes = atributos(ml0[i].match(regexInplicante)[0]);
    //sacamos todos los de un solo implicante para l1
    if (implicantes.length<=1){
      l1.push(ml0[i]);
    }
    //las que tienen mas de un implicado comprobamos si tienen casos extraños
    else {
      var generadores = []; 
      for (var j = 0;  j < implicantes.length; j++) {
        for (var k=0; k<ml0.length; k++){
          var regex = reg("(^"+implicantes[j]+")\>([a-zA-Z\:]*)")
          var aux3  = ml0[k].match(regex);
          if (aux3 == null){
          }else {
            var str1 = new String(aux3[0].match(regexInplicado));
            var str2 = new String(ml0[i].match(regexInplicado));
            if (str1[0] == str2[0]){
              generadores.push(implicantes[j]);
            }
          }
        }
      }
      var DF2    = "";
      var genlen = generadores.length;
      if (genlen>0){
        for (var l=0; l<genlen; l++){
          DF2 += generadores[l];
          if (genlen>l+1){
            DF2 += ":";
          }
        }
        DF2 +=">"+ml0[i].match(regexInplicado);

      } else {
        DF2 = ml0[i];
      }
      l1.push(DF2);
    }
  }
  return eliminarDuplicados(l1);
}

console.log(l1(strL0));


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

var cantrendun = 0;


function redundancia (implicante, l1){
  console.log("implicante: " + implicante);
  var array = combinar(implicante);
  console.log(array);

  for (var i=0; i<array.length; i++){
    for (var j=0; j<l1.length; j++){
      var regex = reg("(^["+array[i]+"]+)(?=\>)\>[a-zA-Z\:]*");
      var redun = l1[j].match(regex);
      console.log(regex);
      console.log(l1[j]);

      if (redun != null){
        console.log("redundancia: "+ redun);
        var aux    = implicante;
        console.log("aux:  " + aux);
        cantrendun = aux.length;
        console.log("cantrendun: " + cantrendun)          
        aux.push(redun[0].match(regexInplicado)[0]);
        aux = eliminarDuplicados(aux);
        console.log("aux sin duplicados:  " + aux);
        
        if (aux.length > cantrendun){
          console.log("LLAMANDO A REDUNDANCIA OTRA VEZ!!!");
          redundancia(aux, l1);
          console.log("Termino llamado de redundancia! " +  eliminarDuplicados(aux) + " implicante: " + implicante);

        }else {
        }
      }
    }
  }
}


//estoy probando deslde la ubicacion 6 del array l1 que es donde se presenta redundacia C:F>B 
var l2 = function (l1){
  var auxL1 = l1;
  var aux   = "";
  for (var i = 6; i<l1.length; i++){
    aux            = l1[i];
    var implicante =  atributos(aux.match(regexInplicante)[0]);
    auxL1.splice(i,1);
    console.log("REDUNDANCIA DE: " + aux + "  SOBRE:  " + auxL1);
    redundancia(implicante, auxL1);
  }
}

l2(l1(strL0));