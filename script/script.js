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

    
    div.appendChild(divc);
    divc.appendChild(divtp);
    divc.appendChild(divbr);
    divtp.appendChild(divcn);
    divtp.appendChild(divtd);
    divbr.appendChild(divcon);
    divbr.appendChild(divs);

    //to.textContent = doc.data().to;
   // message.textContent = doc.data().message;
    divcn.textContent = doc.data().titulo;
    divcon.textContent = doc.data().contenido;
    //divtd.textContent = doc.data().timestamp;
    divtd.textContent = doc.data().timestamp.toDate().toLocaleString();
    //divs.textContent="1";
    document.querySelector(".conver").appendChild(div);
}
//----------Cargando información de la base de datos firebase----------
//Se generan dos variables para hacer el filtro de información
//function filtro(){
//document.querySelector(".conver").innerHTML="";  
/*filtro_ = document.getElementById("to").value;
const fromto = db.collection('notas').where('to', '==', filtro_);
const tofrom = db.collection('notas').where('from', '==', filtro_);*/

//Se trae la colección de la base de datos con to=persona seleccionada
db.collection('notas').orderBy("timestamp", "desc")
.get()
.then((snapshots)=>{
    snapshots.docs.forEach(doc =>{
        renderChat(doc);
        console.log(doc.id, " => ", doc.data());
    });

  });

 /* //Se trae la colección de la base de datos con from=persona seleccionada
  tofrom.get()
.then((snapshots)=>{
    snapshots.docs.forEach(doc =>{
        renderChat(doc);
        console.log(doc.id, " => ", doc.data());
    });

  });*/
//}
 //----------Finaliza la carga de información de la base de datos firebase----------

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
             
                renderChat(doc)});
        })
        .catch(function(error) {
            console.error("Error al escribir en la base de datos ", error);
        });
        
        
}
  //hasta aquí la función para escribir en la base de datos


/*
//Esta función es para duplicar el DIV de Chats, llamadas y estados
function duplicate(){
 var str_html='';
 //la variable deb se trae todos los div de la clase copy
 // chats, estados y llamadas"
 var deb =document.querySelectorAll('.copy');
 for(i=0; i<deb.length; i++){
   // la variable activo nos dirá cuál elemento
   // está seleccionado "chats, estados o llamadas"
   var activo = deb[i].style.display;
  //solo al elemento que esté activo se le agregan copias
  // de su contenido
   if (activo=="block"){
    str_html = document.querySelector('.copy-'+i).innerHTML;
    console.log(str_html) //grabar en consola
    document.querySelector('.copy-'+i).innerHTML += str_html;
   }
}
}
*/

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
   // filtro();

     
};
});
/*
window.onscroll=function(){
this.console.log(window.scrollY)
}*/
});