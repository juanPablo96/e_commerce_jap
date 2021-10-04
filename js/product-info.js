//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.




var currentComentariosArray = [];

function infoProduct(info){



    let htmlContentToAppend = "";


    htmlContentToAppend += `

   
    <a href="product-info.html" class="list-group-item list-group-item-action">

        

        <h2 class="mb-1">`+ info.name +`</h2> 
    
        
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel class="container p-2"">

     <div class="carousel-inner">
     <div class="carousel-item active">
      <img class="d-block w-100" src="` + info.images[0] + `" alt="` + info.images  + `">
     </div>
     <div class="carousel-item">
      <img class="d-block w-100" src="` + info.images[1] + `" alt="` + info.images + `">
     </div>
     <div class="carousel-item">
      <img class="d-block w-100" src="` + info.images[2] + `" alt="` + info.images + `">
     </div>
     <div class="carousel-item">
      <img class="d-block w-100" src="` + info.images[3] + `" alt="` + info.images + `">
     </div>
     <div class="carousel-item">
      <img class="d-block w-100" src="` + info.images[4] + `" alt="` + info.images + `">
     </div>
     </div>

     <div class="col">
     <div class="d-flex w-100 justify-content-between">
     </div>

     <br>
     <h4 class="mb-1">Descripción</h4>
     <p class="mb-1">` + info.description + `</p>
     <br>
     <p class="mb-1">` + info.currency + ` `+`` +  info.cost + `</p>
     <small class="text-muted">` + info.soldCount + ` artículos</small>
     <small class="text-muted">` + info.relatedProducts+ `</small>
     

     </div>

     <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
     <span class="sr-only">Previous</span>

     </a>
     <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
     <span class="carousel-control-next-icon" aria-hidden="true"></span>
     <span class="sr-only">Next</span>
     
     </a>

     </div>
    
    </a>
    `

        document.getElementById("informacionproducts").innerHTML = htmlContentToAppend;
       
      
        
    }  

// Mostrar las fotos de los productos relacionados 

    function despelegarProductosRelacionados(info,  infoProductos) {
        
console.log(infoProductos);
        
        
        let productosRelacionados = "";
    
        productosRelacionados += `
    
        <a href="product-info.html" class="list-group-item list-group-item-action">
        
        <h5 class="mb-1">Productos Relacionados</h5> 
        <div class="row">

        <div class="col-5">
        <img src="` + infoProductos[0].imgSrc+ `" alt="` +infoProductos.imgSrc + `" class="img-thumbnail">
        </div>

        <div class="col-5">
        <img src="` + infoProductos[3].imgSrc+ `" alt="` +infoProductos.imgSrc + `" class="img-thumbnail">
        </div>
        
        </div>
        </a>
        `
    
    
        document.getElementById("produtosrelacionados").innerHTML =  productosRelacionados;
        
    
      }
   
    
    // Nuevos Comentarios 

    let comentarios = [] ;

    function guardarComentarios() {
    
        let fecha = new Date();
        let formatoFecha = +fecha.getFullYear().toString()+"-"
        +(fecha.getMonth()+1).toString()+ "-" 
        +fecha.getDate().toString() + " " + fecha.getHours()+":" + fecha.getMinutes()+":"+fecha.getSeconds();
         
       
    
       let comentario = {
    
            mensaje: document.getElementById("comentariodeusuarios").value,
            fechaCompleta: formatoFecha,
            puntuacion: document.getElementById("puntos").value,
            usuario: localStorage.getItem("inicioSesion"),
        }

        comentarios.push(comentario)
        mostrarComentario()
    }
    
  function mostrarComentario(){

    let agregarComentario = ""
    for (let index = comentarios.length - 1 ; index >=0; index--) {
       let comentario = comentarios[index];
        agregarComentario  += `

        
        <a href="product-info.html" class="list-group-item list-group-item-action">
        <div class="row">
        <div class="col">
        <div class="d-flex w-100 justify-content-between">
        <table style="width:100%">
         <tr>
             <th>`+ estrellasNuevosComentarios(comentario.puntuacion)+`</th>
             <th class="mb-1">`+ comentario.usuario +` `+ comentario.fechaCompleta +` </th>
             <th class="mb-1">`+ comentario.mensaje+`</th>
        </tr>
         </table>
            
            </div>
            </div>
            </div>
            </a>
           `
       
        
    }
    document.getElementById("newcoment").innerHTML = agregarComentario 
    document.getElementById("formulario").reset()
}


function estrellasNuevosComentarios(estrellas){

    let puntos = parseInt(estrellas)
    let comentariosenhtml = ""

    for (let index = 1; index <= puntos; index++) {
      
        comentariosenhtml += `<span class="fa fa-star checked"></span>`
        
    }

    for (let index = puntos+1; index <= 5; index++) {
        
        comentariosenhtml += `<span class="fa fa-star"></span>`
    }

    return comentariosenhtml ;
}
  
      
   



document.addEventListener("DOMContentLoaded", function(e){

   

      getJSONData(PRODUCT_INFO_URL).then(function(resultObj){ // resultobj = producto
        
        if (resultObj.status === "ok"){
            info=resultObj.data
            infoProduct(info);
            

               getJSONData(PRODUCTS_URL).then(function(resultObj2){ 
                  
             if (resultObj2.status === "ok"){

                infoProductos=resultObj2.data
                despelegarProductosRelacionados(info.relatedProducts, infoProductos);
                
            }      
        });
      } 
      
         
    });  
       
  


  async function estrellas() {

    const coments_link = await getJSONData(PRODUCT_INFO_COMMENTS_URL);
         
        
        let puntuacion = "";

        for(coments of coments_link.data){

        if (coments.score === 3 ) {

            puntuacion += 
            
            `
            <a href="product-info.html" class="list-group-item list-group-item-action">

            <h5 class="mb-1">Comentarios</h5> 
            <br>
             <div class="row">
             <div class="col-3">
             <p class="mb-1"><p class="mb-1">
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star"></span>
             <span class="fa fa-star"></span></p></p>
             </div>

             <div class="col">
             <div class="d-flex w-100 justify-content-between">
             <table style="width:100%">
             <tr>
             <th class="mb-1">` + coments.user + `</th>
             <th class="mb-1">` + coments.dateTime +  `</th>
             <th class="mb-1">` + coments.description +  `</th>
            </tr>
            </table>
                </div>
                
            </div>
         </div>
      </a>
            `

        }
        if (coments.score === 4) {

            puntuacion += 
            
            `
            <a href="product-info.html" class="list-group-item list-group-item-action">
             <div class="row">
             <div class="col-3">
             <p class="mb-1"><p class="mb-1">
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star"></span></p></p>
             </div>
             <div class="col">
             <div class="d-flex w-100 justify-content-between">
             <table style="width:100%">
             <tr>
             <th class="mb-1">` + coments.user + `</th>
             <th class="mb-1">` + coments.dateTime +  `</th>
             <th class="mb-1">` + coments.description +  `</th>
            </tr>
            </table>
                
                </div>
                
            </div>
        </div>
      </a>
            `
            
        }

        if (coments.score === 5) {

            puntuacion += 
            
            `
            <a href="product-info.html" class="list-group-item list-group-item-action">
             <div class="row">
             <div class="col-3">
             <p class="mb-1"><p class="mb-1">
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star checked"></span>
             </div>

             <div class="col">
             <div class="d-flex w-100 justify-content-between">
             <table style="width:100%">
             <tr>
             <th class="mb-1">` + coments.user + `</th>
             <th class="mb-1">` + coments.dateTime +  `</th>
             <th class="mb-1">` + coments.description +  `</th>
            </tr>
            </table>

                </div>
                
            </div>
        </div>
      </a>
            `
            
        }
    }

  
           
     
document.getElementById("coment").innerHTML = puntuacion;

   }
  
   estrellas()

   


   });

   
  

   
    



























  