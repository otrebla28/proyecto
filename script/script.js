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
             
              // renderChat(doc)});
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

//Función para cachar el id del registro al momento de dar clic sobre él
function showid(idelement){
  console.log(idelement.id)
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