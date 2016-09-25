$(document).foundation();

var regexpDF = /([a-zA-Z]\:*)+\>+([a-zA-Z]\:*)*/g;
var regexInplicante = /([a-zA-Z]\:*)+(?=\>)/g;
var regexInplicado = /(?!.*>)([a-zA-Z](\:)*)+/g;
var regexAtributos = /[a-zA-Z]+/g;


// variables quemadas del ejemplo
var strT = '';
var strDF = "";
// DF ES UN ARRAY CON LAS DEPENDENCIAS FUNCIONALES
var l0="";
var luno = "";
var ldos = "";

//CARGA DEL TEXTO INGRESADO
function load(){
  strT = $("#conjunto").val();
  strDF = $("#df").val();
  atributos(strT);
  var DF = strDF.match(regexpDF);
  l0 = lcero(DF);
  luno = l1(l0);
  ldos = l2(luno, luno);
  l0 = prepare(l0);
  luno = prepare(luno);
  ldos = prepare(ldos);
  $("#l0").text("{ "+l0+" }")
  $("#l1").text("{ "+luno+" }")
  $("#l2").text("{ "+ldos.toString()+" }")
  //console.log(luno)
}



