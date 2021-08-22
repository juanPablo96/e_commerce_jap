//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    document.getElementById("login").addEventListener("click",redireccionar);
  function redireccionar(){
    let email = document.getElementById("email").value
    let contrasenia = document.getElementById("password").value

    if (email != "" && contrasenia != "") {

        window.location.href = "home.html"
        
    }else{

        alert("Debe completar los datos solicitados");
    }

  } 

});