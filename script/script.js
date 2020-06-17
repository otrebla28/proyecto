  // Your web app's Firebase configuration
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAu8oRe6vCzITR4Gbg4ARGELYDJ0it3sH0",
    authDomain: "notas-c5289.firebaseapp.com",
    databaseURL: "https://notas-c5289.firebaseio.com",
    projectId: "notas-c5289",
    storageBucket: "notas-c5289.appspot.com",
    messagingSenderId: "968255364404",
    appId: "1:968255364404:web:3f75264cf4ad82f9961961",
    measurementId: "G-KWY2CSVB4B"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

//crear variables
const db = firebase.firestore();

//función para generar los campos de la base de firebase
ordena();
function renderChat(doc){
    //Let variable que solo existe dentro de la función
let div = document.createElement('div');
let divc = document.createElement('div');
let divtp= document.createElement('div');
let divcn = document.createElement('div');
let divbr = document.createElement('div');
let divtd= document.createElement('div');
let divcon = document.createElement('div');
let divs= document.createElement('div');

div.setAttribute('class',"row");
div.setAttribute('data-id', doc.id);
divc.setAttribute('class', "content");
divtp.setAttribute('class', "top-row");
divcn.setAttribute('class', "titulo");
divtd.setAttribute('class', "timedate");
divbr.setAttribute('class', "bottom-row")
divcon.setAttribute('class', "contactname");
divs.setAttribute('class', "status");    
div.setAttribute('onClick',"showid(this)");
div.setAttribute('id',doc.id);
    
    div.appendChild(divc);
    divc.appendChild(divtp);
    divc.appendChild(divbr);
    divtp.appendChild(divcn);
    divtp.appendChild(divtd);
    divbr.appendChild(divcon);
    divbr.appendChild(divs);

   
    divcn.textContent = doc.data().titulo;
    divcon.textContent = doc.data().contenido;
    divtd.textContent = doc.data().timestamp.toDate().toLocaleString();
    document.querySelector(".conver").appendChild(div);
}
//----------Cargando información de la base de datos firebase----------

function ordena(){

db.collection('notas').orderBy("timestamp", "desc")
.get()
.then((snapshots)=>{
    snapshots.docs.forEach(doc =>{
      
        renderChat(doc);
        console.log(doc.id, " => ", doc.data());
    });

  });
}
  //Función para escribir en la base de datos
  function writeNewPost(){
    var coleccion = db.collection('notas');
        
        const de = "hugo.mar.310@gmail.com";
        var titulo_ = "";
        var mensaje = "";
        var fech = new Date();
        
        titulo_ = document.getElementById("titulo").value;
        mensaje = document.getElementById("message").value;
        document.getElementById("message").value="";
        alert('Entrando a la funciión para guardar datos'+de+' '+mensaje);
        coleccion.add({
            usuario:de,
            contenido:mensaje,
            timestamp:fech,
            titulo:titulo_,
        }) .then(function(docRef) {
            console.log("Se gusrdó con éxito");
           
            db.collection("notas").doc(docRef.id).get().then(function(doc){
             
            ordena(doc)});
        })
        .catch(function(error) {
            console.error("Error al escribir en la base de datos ", error);
        });
        
        
}
  //hasta aquí la función para escribir en la base de datos


//Esta función activa DIV estados "como seleccionado"
// y elimina la selección del resto
function activetab(renglon){
    var tabestados=document.querySelectorAll('#bottom-line');
    var edo = document.querySelectorAll('.copy');
    for(var i=0; i<tabestados.length; i++){
        tabestados[i].style.borderBottom = '3px solid green';
        edo[i].style.display="none";

        }

        //al elemento que sea seleccionado se pinta línea blanca
        // y además se muestra su contenido con display block
        tabestados[renglon].style.borderBottom = '3px solid white';
        edo[renglon].style.display="block";
}
//----------------------------------------------    
function llenarnota(doc){

  alert("Entra a la función llenar nota");
  //Let variable que solo existe dentro de la función
  let div2 = document.createElement('div');
  let divc2 = document.createElement('div');
  let divtp2= document.createElement('div');
  let divcn2 = document.createElement('div');
  let divbr2 = document.createElement('div');
  let divtd2= document.createElement('div');
  let divcon2 = document.createElement('div');
  let divs2= document.createElement('div');
  
  div2.setAttribute('class',"row");
  div2.setAttribute('data-id', doc.id);
  divc2.setAttribute('class', "content");
  divtp2.setAttribute('class', "top-row");
  divcn2.setAttribute('class', "titulo");
  divtd2.setAttribute('class', "timedate");
  divbr2.setAttribute('class', "bottom-row")
  divcon2.setAttribute('class', "contactname");
  divs2.setAttribute('class', "status");    
  //div.setAttribute('onClick',"showid(this)");
  //div.setAttribute('id',doc.id);
      
      div2.appendChild(divc2);
      divc2.appendChild(divtp2);
      divc2.appendChild(divbr2);
      divtp2.appendChild(divcn2);
      divtp2.appendChild(divtd2);
      divbr2.appendChild(divcon2);
      divbr2.appendChild(divs2);
  
     
      divcn2.textContent = doc.data().titulo;
      divcon2.textContent = doc.data().contenido;
      divtd2.textContent = doc.data().timestamp.toDate().toLocaleString();
      document.querySelector(".notasimple").appendChild(div2);
  
  
  }
  
//Función para cachar el id del registro al momento de dar clic sobre él
function showid(idelement){
  console.log(idelement.id);
  var x = document.getElementById("maindiv");
  var y = document.getElementById("seconddiv");
  var id_= idelement.id;
 

  x.style.display="none";
  y.style.display="block";

alert("Antes de la consulta where "+id_);

db.collection("notas").doc(id_)
    .get().then(function (doc) {
            var nota1 = doc.data();
            console.log("Id Notas", nota1);
            llenarnota(doc);
    }).catch(function (error) {
            console.log("Error", error);
    });


/*db.collection('notas').doc(id_)
.get()
.then((snapshots)=>{
    snapshots.docs.forEach(doc =>{
      alert("Antes del llamado a llenar nota");
        llenarnota(doc);
        console.log(doc.id, " => ", doc.data());
    });

  });*/


}


// fin de la función

 //Aquí implementamos la nueva función "al cargar"
document.addEventListener('DOMContentLoaded',function(){
document.querySelectorAll('#bottom-line').forEach(function (div) {
div.onclick=function(){

    //alert ("Entra a la función onclick de loader");
    console.log(div.dataset.view)
    
    //Aquí es donde Erick creó la magia completita
    //solo llama a la función activetab y le envía el parametro
    //contenido en el dataview
    activetab(div.dataset.view);
    

     
};
});

});