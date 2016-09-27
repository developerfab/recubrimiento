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
    probarZ(ldos, atr);
  }
  // getZ(ldos, atributos(strT));
}
// var l22 = ["A:B>C", "B:D>F:G", "A:E>C", "C>D:E"];
// var atr = ["A", "B", "C", "D", "E", "F", "G"];
// var l = ["C>D", "C>E", "A:B>C", "B:D>F", "B:D>G", "A:E>C"];
// var lp = ["K:M:S>T:N", "L:P>M:T:S", "L:T>K", "L:N>S", "M:T>L", "S>L", "K:T>L"];
// var LL2 = l2(l1(lcero(lp)));
// console.log(l22 + " ----- " + atr)
// var w = getW(l, atr);
// var z = getZ(l, atr);

// console.log("redundancia");
// console.log(redundancia(z, l));
// console.log(z + " #### " + w);
// console.log(getV(z,w));



