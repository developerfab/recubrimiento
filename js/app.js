$(document).foundation();

var regexpDF = /([a-zA-Z]\:*)+\>+([a-zA-Z]\:*)*/g;
var regexInplicante = /([a-zA-Z]\:*)+(?=\>)/g;
var regexInplicado = /(?!.*>)([a-zA-Z](\:)*)+/g;
var regexAtributos = /[a-zA-Z]+/g;


// variables quemadas del ejemplo
var strT = 'A:B:C:D:E:F';
var strDF = "A:B>C D>E:F C>A B:E>C B:C>D C:F>B:D A:C:D>B C:E>A:F";
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


// FUNCION QUE CALCULA L0 
var lcero = function (DF){
  var l0 = [];
  for (var i = 0;  i < DF.length; i++) {
    //console.log("ATRIBUTO: "+ DF[i]);
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
