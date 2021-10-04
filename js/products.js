//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

// 1. obtener la información. Para eso usamos la función FETCH o la función GETJSONDATA
const ORDENAR_PRECIO_ASCENDENTE = "$ Más Caros";
const ORDENAR_PRECIO_DESCENDENTE = "$ Más Baratos";
const ORDENAR_CANTIDAD = "Relevancia";
var currentProductsArray = [];
var currentSortProduct = undefined;
var cantidadMinimo = undefined;
var cantidadMaximo = undefined;


function sortProducts(criteria, array){
    let resultado = [];
    if (criteria === ORDENAR_PRECIO_DESCENDENTE )
    {
        resultado = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria ===ORDENAR_PRECIO_ASCENDENTE ){
        resultado = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
        //  Cambie ese elseif
    }else if (criteria === ORDENAR_CANTIDAD ){
        resultado = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);
            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return resultado;
}

 function showProductList(){
    
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product= currentProductsArray[i];
        //  Cambie  algo
        if (((cantidadMinimo == undefined) || (cantidadMinimo != undefined && parseInt(product.cost) >= cantidadMinimo)) &&
            ((cantidadMaximo == undefined) || (cantidadMaximo != undefined && parseInt(product.cost) <= cantidadMaximo))){

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
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

    }
        
        document.getElementById("products-list-container").innerHTML = htmlContentToAppend;


    }

    showProductList();


    function sortAndShowProducts(sortCriteria, productsArray){
        currentSortProduct = sortCriteria;
    
        if(productsArray != undefined){
            currentProductsArray = productsArray;
        }
    
        currentProductsArray = sortProducts(currentSortProduct, currentProductsArray);
    
        showProductList();
    }
    document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDENAR_PRECIO_ASCENDENTE, resultObj.data);
        }
    });

    document.getElementById("Ascenso").addEventListener("click", function(){
        sortAndShowProducts(ORDENAR_PRECIO_ASCENDENTE);
    });

    document.getElementById("Descenso").addEventListener("click", function(){
        sortAndShowProducts(ORDENAR_PRECIO_DESCENDENTE);
    });

    document.getElementById("Cantidad").addEventListener("click", function(){
        sortAndShowProducts(ORDENAR_CANTIDAD);
    });

    document.getElementById("LimpiezaFiltro").addEventListener("click", function(){
        document.getElementById("FiltroMinimo").value = "";
        document.getElementById("FiltroMaximo").value = "";

        cantidadMinimo = undefined;
        cantidadMaximo = undefined;

        showProductList();
    });

    document.getElementById("Filtrar").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        cantidadMinimo = document.getElementById("FiltroMinimo").value;
        cantidadMaximo = document.getElementById("FiltroMaximo").value;

        if ((cantidadMinimo != undefined) && (cantidadMinimo != "") && (parseInt(cantidadMinimo)) >= 0){
            cantidadMinimo = parseInt(cantidadMinimo);
        }
        else{
            cantidadMinimo = undefined;
        }

        if ((cantidadMaximo != undefined) && (cantidadMaximo != "") && (parseInt(cantidadMaximo)) >= 0){
            cantidadMaximo = parseInt(cantidadMaximo);
        }
        else{
            cantidadMaximo = undefined;
        }

        showProductList();
    });

});