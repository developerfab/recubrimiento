$(document).foundation();

var regexpDF        = /([a-zA-Z]\:*)+\>+([a-zA-Z]\:*)*/g;
var regexInplicante = /([a-zA-Z]\:*)+(?=\>)/g;
var regexInplicado  = /(?!.*>)([a-zA-Z](\:)*)+/g;
var regexAtributos  = /[a-zA-Z]+/g;


// variables quemadas del ejemplo
var strT  = '';
var strDF = "";
// DF ES UN ARRAY CON LAS DEPENDENCIAS FUNCIONALES
var l0   ="";
var luno = "";
var ldos = "";

//CARGA DEL TEXTO INGRESADO
function load(){
  $("#alert").text("");
  $("#l0").text("");
  $("#l1").text("");
  $("#l2").text("");
  strT            = $("#conjunto").val();
  strDF           = $("#df").val();
  atributos(strT);
  var DF          = strDF.match(regexpDF);
  var elementales = comprobarElementales(DF);
  var isValid     = comprobarDF(DF, atributos(strT));
  if (isValid.length > 0){
    $("#alert").text("Existen atributos en las Dependecias Funcionales que no pertenecen al conjunto de atributos. " + " { " + isValid + " }")
  }else if(elementales.length > 0){
    $("#alert").text("No se permiten dependencias funcionales elementales!\n" + "\n { " + elementales+ " }")
  }else {
    l0   = lcero(DF);
    console.log(l0)
    luno = l1(l0);
    console.log(luno)
    ldos = l2(luno, luno);
    console.log(ldos)
    l0   = prepare(l0);
    luno = prepare(luno);
    ldos = prepare(ldos);  
    $("#l0").text("{ "+l0+" }") 
    $("#l1").text("{ "+luno+" }") 
    $("#l2").text("{ "+ldos.toString()+" }")
  //console.log(luno)
}
}



