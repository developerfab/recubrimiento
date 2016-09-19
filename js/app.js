$(document).foundation();

var regexpDF = /([a-zA-Z]\:*)+\>+([a-zA-Z]\:*)*/g;
var regexInplicante = /([a-zA-Z]\:*)+(?=\>)/g;
var regexInplicado = /(?!.*>)([a-zA-Z](\:)*)+/g;
var regexAtributos = /[a-zA-Z]+/g;


// variables quemadas del ejemplo
var strT = 'A:B:C:D:E:F';
var strDF = "A:B>C D>E:F C>A B:E>C B:C>D C:F>B:D A:C:D>B C:E>A:F";
// DF ES UN ARRAY CON LAS DEPENDENCIAS FUNCIONALES
var l0="";
var luno = "";

//CARGA DEL TEXTO INGRESADO
function load(){
  strT = $("#conjunto").val();
  strDF = $("#df").val();
  atributos(strT);
  var DF = strDF.match(regexpDF);
  l0 = lcero(DF);
  luno = l1(l0)
  $("#l0").text("{ "+l0+" }")
  $("#l1").text("{ "+luno+" }")
  console.log(luno)
}

/*
FUNCION QUE EXTRAE LOS ATRIBUTOS
Si str="A:B:C:A" atributos() retorna ['A','B','C','A']
*/
var atributos = function(str){
  var myArray = str.match(regexAtributos);
  return myArray;
}


// FUNCION QUE CALCULA L0 
var lcero = function (DF){
  var l0 = [];
  for (var i = 0;  i < DF.length; i++) {
    //console.log("ATRIBUTO: "+ DF[i]);
    var implicantes = DF[i].match(regexInplicante)[0];
    var inplicados  = atributos(DF[i].match(regexInplicado)[0]);
    console.log(implicantes);
    console.log(inplicados);    
    while (inplicados.length > 0){
      var aux = inplicados.pop();
      l0.push(implicantes+">"+aux)
    }
    
  }
  //console.log("l0: " + l0);
  return l0;
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

var l1 = function (l0){
  var l1 = [];
  ml0 = l0
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
          var aux3 = ml0[k].match(regex);
          if (aux3 == null){
          }else {
            var str1 =  new String(aux3[0].match(regexInplicado));
            var str2 = new String(ml0[i].match(regexInplicado));
            if (str1[0] == str2[0]){
              generadores.push(implicantes[j]);
            }
          }
        }
      }
      var DF2 = "";
      var genlen = generadores.length;
      if (genlen>0){
        for (var l=0; l<genlen; l++){
          DF2 += generadores[l];
          if (genlen>l+1){
            DF2 += ":";
          }
        }
        DF2+=">"+ml0[i].match(regexInplicado);

      } else {
        DF2=ml0[i];
      }
      l1.push(DF2);
    }
  }
  return eliminarDuplicados(l1);
}

function reg(input) {
  var flags;    
  flags = 'g';
  return new RegExp(input, flags);
}
