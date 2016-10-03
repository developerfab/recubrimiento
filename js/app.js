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
  var atr = atributos(strT);
  var DF          = strDF.match(regexpDF);
  var elementales = comprobarElementales(DF);
  var isValid     = comprobarDF(DF, atributos(strT));
  if (isValid.length > 0){
    $("#alert").text("Existen atributos en las Dependecias Funcionales que no pertenecen al conjunto de atributos. " + " { " + isValid + " }")
  }else if(elementales.length > 0){
    $("#alert").text("No se permiten dependencias funcionales elementales!\n" + "\n { " + elementales+ " }")
  }else {
    l0   = lcero(DF);
    luno = l1(l0);
    ldos = l2(luno, luno);
    var pl0   = prepare(l0);
    var pluno = prepare(luno);
    var pldos = prepare(ldos);  
    $("#l0").text("{ "+pl0+" }") 
    $("#l1").text("{ "+pluno+" }") 
    $("#l2").text("{ "+pldos.toString()+" }") 
    var w = getW(ldos, atr);
    var z = getZ(ldos, atr);
    var v = getV(z, w, atr);
    $("#z").text("Z = { "+atr+" }" + " - " + "{ "+ getImplicados(ldos) +" } = { " + z + " }");
    $("#zp").text("Z+ = { "+ redundancia(z, ldos) +" }");
    if (probarZ(ldos, atr)){
      $("#resz").text("Z es igual a T, entonces Z es llave primaria.");
    }else {
      $("#resz").text("Z es diferente a T");
    }
    $("#w").text("W = { "+atr+" }" + " - " + "{ "+ getImplicantes(ldos) +" } = { " + w + " }");
    $("#wp").text("W+ = { "+ redundancia(w, ldos) +" }");

    $("#v").text("V = { " + v + " }");
	var M2_all = getM2(z,v,ldos,atr);
 	var M2 = getM2Optimo(M2_all);
	console.log(M2);
	}
}
