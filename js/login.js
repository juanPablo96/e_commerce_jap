//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function redireccionar(){
  let name = document.getElementById("name").value
  let contrasenia = document.getElementById("password").value

  if (name != "" && contrasenia != "") {
     localStorage.setItem("inicioSesion", name)
      window.location.href = "home.html"
     
      
  }else{

      alert("Debe completar los datos solicitados");
  }

} 
document.addEventListener("DOMContentLoaded", function(e){

  

document.getElementById("login").addEventListener("click",redireccionar);
 
 // document.getElementById("login").addEventListener("click", function(){
    //miStorage = window.localStorage;
     //localStorage.setItem(email);
     //localStorage.getItem(email); });

});
