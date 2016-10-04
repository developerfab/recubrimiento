$(document).foundation();
var error1;
var error2;
$(document).ready(function(){
  error1 = new Foundation.Reveal($("#Modal1"));
  error2 = new Foundation.Reveal($("#Modal2"));
});



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
var arrM2 = "";

var atr;
var DF;
var elementales;
var isValid;
//CARGA DEL TEXTO INGRESADO
function load(){
  $("#alert").text("");
  $("#l0").text("");
  $("#l1").text("");
  $("#l2").text("");
  strT            = $("#conjunto").val();
  strDF           = $("#df").val();
  atr = atributos(strT);
  DF          = strDF.match(regexpDF);
  elementales = comprobarElementales(DF);
  isValid     = comprobarDF(DF, atributos(strT));
  if (isValid.length > 0){
    $("#alert1-text").text("{ " + isValid + " }");
    error1.open();
  }else if(elementales.length > 0){
    $("#alert2-text").text("{ " + elementales+ " }");    
    error2.open();
    strDF = eliminarElementales(DF, elementales);    
    console.log(DF);
    DF = strDF;
    $("#df").val(DF);

  }
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
    $(".llaves").addClass("hiden");
    $("#resz").text("Z es igual a T, entonces Z es llave primaria.");
  }else {
    $(".llaves").removeClass("hiden");
    $("#resz").text("Z es diferente a T");
    $("#w").text("W = { "+atr+" }" + " - " + "{ "+ getImplicantes(ldos) +" } = { " + w + " }");
    $("#wp").text("W+ = { "+ redundancia(w, ldos) +" }");

    $("#v").text("V = { " + v + " }");
    var M2_all = getM2(z,v,ldos,atr);
    var M2 = getM2Optimo(M2_all);
    var pM2 = prepare(M2);  
    $("#llaves").text("Llaves primarias = { "+ pM2.toString() +" }");

  }
  console.log("********************************************");
  var valor = normal1(ldos);
  var zficti = z;
  if (valor==true){
    console.log("PRIMERA FORMA NORMAL");
    $("#1N").text("Se encuentra en primera forma normal");
  }else{
    console.log("NO PRIMERA FORMA NORMAL");
    $("#1N").text("No se encuentra en primera forma normal");
  }

  //SE CALCULA 2N
  var rta2= normal2(ldos, zficti, v, M2);
  var valor2N = rta2[0];
  var primo = rta2[1];
  var noprimo = rta2[2];
  if (valor2N==true){
    console.log("SEGUNDA FORMA NORMAL");
    $("#2N").text("Se encuentra en segunda forma normal");
  }else{
    console.log("NO SEGUNDA FORMA NORMAL");
    console.log("RETORNO PRIMO: "+primo);
    console.log("RETORNO NO PRIMO: "+noprimo);
    $("#2N").text("No se encuentra en segunda forma normal");
  }
  $("#primo").text("PRIMOS: [ "+primo+" ]");
  $("#noprimo").text("NO PRIMOS: [ "+noprimo+" ]");

  //SE CALCULA SI 3N
  var valor3N= normal3(ldos, primo, noprimo);

  if (valor3N==true){
    console.log("TERCERA FORMA NORMAL");
    $("#3N").text("Se encuentra en tercera forma normal");
  }else{
    console.log("NO TERCERA FORMA NORMAL");
    $("#3N").text("No se encuentra en tercera forma normal");
  }

  //SE CALCULA BCN

  var valorBNC= normalBNC(ldos, primo);

  if (valorBNC==true){
    console.log("BOICE CLOUD FORMA NORMAL");
    $("#BCN").text("Se encuentra en BOYCE-COOD");
  }else{
    console.log("NO BCN");
    $("#BCN").text("No se encuentra en BOYCE-COOD");
  }

}

function eliminarElementales(DF, elementales){
  console.log(DF);
  console.log(elementales);
  var index = [];
  var result = DF;
  DF.forEach(function(e, i){
    elementales.forEach(function(el, ind){
      if(e == el){
        console.log("add")
        index.push(i);
      }
    });
  });
  for (var i = index.length-1; i>=0; i--){

    console.log("eliminando: " + index[i])
    result = eliminar_elemento(result, index[i]);
  }
  return result;

}
