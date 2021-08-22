//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    // 1. obtener la información. Para eso usamos la función FETCH o la función GETJSONDATA



async function showProductList(){
    
    const products_link = await getJSONData(PRODUCTS_URL);

    let htmlContentToAppend = "";
    
    for(product of products_link.data){
        

            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                        <p class="mb-1">` + product.currency + ` `+`` +  product.cost + `</p>
                    </div>
                </div>
            </a>
            `

            
        }
        
        document.getElementById("products-list-container").innerHTML = htmlContentToAppend;


    }

    showProductList();

});