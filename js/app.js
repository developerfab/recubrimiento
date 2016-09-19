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

var stre= "A:B>C B>D D>G D>C C:G>H";

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

// (D>)([a-zA-Z]\:*)+
var l1 = function (l0){
  var li = [];
  ml0 = l0.match(regexpDF);
  var aux = [];

  for (var i = 0;  i < ml0.length; i++) {    //ml0.length
    var implicantes = atributos(ml0[i].match(regexInplicante)[0]);
    //sacamos todos los de un solo implicante
    if (implicantes.length<=1){
      li.push(ml0[i]);
    }
    //las que tienen mas de un implicado comprobamos si tienen casos extraños
    else {
      var noExtraños = [];
      var generadores = [];

      console.log("implicantes: ---------------------------------- " + implicantes +">" + ml0[i].match(regexInplicado));
      for (var j = 0;  j < implicantes.length; j++) {
        for (var k=0; k<ml0.length; k++){
          var regex = reg("(^"+implicantes[j]+")\>([a-zA-Z\:]*)")
          console.log(regex)
          console.log("ml0[k]: " + ml0[k])
          var aux3 = ml0[k].match(regex);
          console.log("aux3 :" +aux3);
          if (aux3 == null){
            console.log("no hay candidatos");
            
          }else {
            console.log("SE ENCONTRÓ UNA CONINCIDENCIA JAJAJAJA ------"+ aux3[0].match(regexInplicado)+ " and " + ml0[i].match(regexInplicado));
            var str1 =  new String(aux3[0].match(regexInplicado));
            var str2 = new String(ml0[i].match(regexInplicado));
            if (str1[0] == str2[0]){
              console.log("pero SIIIIIII lo genera :( :(");
              generadores.push(implicantes[j]);
            }
            else {
              noExtraños.push(implicantes[j])
              console.log("pero no lo genera :)");
              console.log(aux3[0].match(regexInplicado)+ml0[i].match(regexInplicado))
            }
          }
        }


      }

      console.log("IMPRIMIENDO NO ESTRAXNOS Y GENERADORES")
      console.log(noExtraños);
      console.log(generadores);
      var DF2 = "";
      var genlen = generadores.length;
      console.log("Genlen: "+ genlen)
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
      console.log("DF2: ############################### :" + DF2)
      li.push(DF2);
      
      
    }

    
  }
  var listaGrupo02 = li;
  var SinDuplicados = [];
  var SinDuplicados = listaGrupo02.filter(function(elem, pos) {
   return listaGrupo02.indexOf(elem) == pos;
 });

  console.log(SinDuplicados)
}

l1(stre);

// (^A)\>([a-zA-Z\:]*)

function es_extraño (l0, DF){
  for (var k = 0;  k < l0.length; k++) {
    console.log(l0[k]);
    auxIpte = l0[k].match(regexInplicante);
    auxIpdo = l0[k].match(regexInplicado);
    console.log(auxIpte);
    console.log(auxIpdo);
    console.log("DF: ");
    console.log(DF);
  }
}



function reg(input) {
  var flags;
    //could be any combination of 'g', 'i', and 'm'
    flags = 'g';
    return new RegExp(input, flags);
  }

  var ldos = function (l1){
    var l2 = [];
    var compL1 = l1;
    var aux2 = "";
    console.log("l1" + l1);
    var expr = /([A:B:C]+\>[a-zA-Z])/g;
    for (var i = 0;  i < l1.length; i++) {
    // console.log("ATRIBUTO: "+ l1[i]);
    var implicantes      = l1[i].match(regexInplicante)[0];
    var inplicados       = atributos(l1[i].match(regexInplicado)[0]);
    var arrayImplicantes = atributos(implicantes);
    var redundancia      = [];
    // console.log(implicantes);
    // console.log(inplicados[0]);

    var aux = compL1.pop();
    aux2 = atributos(implicantes.match(expr));

    for (var j=0; j< aux2.length;j++){

    }

    // while (arrayImplicantes.length > 0){

    //   var atr = atributos(aux);

    //   l2.push(implicantes+">"+aux)
    // }
    
  }
}

// (?:[a-zA-Z\:]+\>)(([a-zA-Z])(?!:))
// ldos(strL1.match(regexpDF));


// ([A:B:C]+\>[a-zA-Z])