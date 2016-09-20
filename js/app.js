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

function prepare(lx){
  var retorno = "";
  for(var t = 0; t<lx.length; t++){
    retorno = retorno+lx[t]+"        ";
  }
  return retorno;
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
          if (aux3 != null){
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

//l2

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

var combinaciones = 0;


function redundancia (implicante, lUno){
  // console.log("implicante: " + implicante);
  var array = combinar(implicante);
  // console.log(array);
  var aux = null;
  for (var i=0; i<array.length; i++){
    for (var j=0; j<lUno.length; j++){
      var regex = reg("(^["+array[i]+"]+)(?=\>)\>[a-zA-Z\:]*");
      var redun = lUno[j].match(regex);
      // console.log(regex);
      // console.log(lUno[j]);

      if (redun != null){
        // console.log("redundancia: "+ redun);
        aux    = implicante;
        // console.log("aux:  " + aux);
        combinaciones = aux.length;
        // console.log("combinaciones: " + combinaciones)
        var newImplicado = redun[0].match(regexInplicado)[0];
        
        if (aux.indexOf(newImplicado) == -1) {
          aux.push(newImplicado);
          // console.log(aux);
          // console.log("LLAMANDO A REDUNDANCIA OTRA VEZ!!!");
          redundancia(aux, lUno);
          // console.log("Termino llamado de redundancia! " +  eliminarDuplicados(aux) + " implicante: " + implicante);
        }

        // console.log("aux sin duplicados:  " + aux);
      }
    }

  }
  return aux;
}


//estoy probando deslde la ubicacion 6 del array l1 que es donde se presenta redundacia C:F>B 
var l2 = function (Ll1){
  var auxL1 = Ll1;
  var aux   = "";
  var l2 = []
  console.log("length: "+ Ll1.length)
  for (var i = 0; i<Ll1.length; i++){
    aux            = Ll1[i];
    console.log("DF: " + aux)
    var implicante =  atributos(aux.match(regexInplicante)[0]);
    auxL1 = eliminar_elemento(Ll1, i);
    console.log("REDUNDANCIA DE: " + aux + "  SOBRE:  " + auxL1);
    var combinaciones = redundancia(implicante, auxL1);
    var implicado = aux.match(regexInplicado)
    console.log("combinaciones " +  combinaciones  + " implicado " + implicado);
    if (combinaciones != null) {
      if (comprobar(combinaciones, implicado)){
        console.log(aux+ " es redundante!")
      } else {
        l2.push(aux);
      }
    }else {
      l2.push(aux);
    }
    auxL1 = Ll1;
  }
  console.log(l2);
  return l2;
}

function eliminar_elemento (array, index){
  var arrayNuevo = [];
  for (var i=0; i < array.length; i++){
    if (index != i){
      arrayNuevo.push(array[i]);
    }
  }
  return arrayNuevo;

}


function comprobar(objeto, imp){
  for (var i=0; i<objeto.length; i++){

    var str1 = new String(objeto[i]);
    var str2 = new String(imp);
    console.log("COMPROBANDO:    ---- --- --- -   " + str1 + "  " + str2);
    if(str1[0] == str2[0]){
      console.log("SON IGUALES !!!!!!!!!!!!" + str1 + "  " + str2);
      return true;
    }
  }
  return false;
  
}

