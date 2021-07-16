//Variables
let productos = document.querySelector("main");
let carrito = document.querySelector(".carrito_elementos");
let carritoVaciar = document.querySelector(".carrito_vaciarBtn");

//console.log(carritoVaciar);

//Event Listeners

eventlisteners();

function eventlisteners() {
  productos.addEventListener("click", addProduct);

  carrito.addEventListener("click", deleteProduct);

  carritoVaciar.addEventListener("click", emptyCar);

  document.addEventListener('DOMContentLoaded',printCarFromLS)
}

//Funciones

function addProduct(e) {
  if (e.target.className == "producto_btn") {
    //Extraer data de producto
    let productData = readProductData(e.target.parentElement);

    //Imprimir producto en el carrito DOM
    printCarInDOM(productData);



    //Guardar producto en el LS

        //Antes de guardar hay que leer
        let productosInLS = productosInLs()
        //console.log(productosInLS);

        productosInLS.push(productData)
        localStorage.setItem('productos', JSON.stringify(productosInLS))

        productosInLS = productosInLs()
        //console.log(productosInLS);
  }
}

function productosInLs(){
    let productos;

    if (localStorage.getItem('productos')==null) {
        productos = [];
    } else {
        productos = JSON.parse(localStorage.getItem('productos'))
    }

    return productos
}

function readProductData(e) {
  let producto = e;

  let prdName = producto.querySelector(".producto_name").innerText;
  let prd_price = producto.querySelector(".producto_precio").innerText;
  let imgSrc = producto.querySelector(".producto_img").getAttribute("src");

  let productoData = {
    name: prdName,
    price: prd_price,
    img: imgSrc,
  };

  return productoData;
}

function readProductDOMCar(e) {
  let producto = e;

  let prdName = producto.querySelector(".carrito_elemento_name").innerText;
  let prd_price = producto.querySelector(".carrito_elemento_price").innerText;
  let imgSrc = producto.querySelector(".carrito_elemento_img").getAttribute("src");

  let productoData = {
    name: prdName,
    price: prd_price,
    img: imgSrc,
  };

  return productoData;
}



function printCarInDOM(producto) {

  let carritoElement = document.createElement("div");
  carritoElement.className = "carrito_elemento";

  let productoHtml = `
    <h3 class="carrito_elemento_name">${producto.name}</h3>
    <img class="carrito_elemento_img" src="${producto.img}" alt="">
    <p class="carrito_elemento_price">${producto.price}</p>
    <p class="carrito_elemento_X">X</p>
    
    `;
  carritoElement.innerHTML = productoHtml;

  carrito.appendChild(carritoElement);

  //console.log(carritoElement);
}

function deleteProduct(e) {
  //Elimina elemento del DOM
  if (e.target.className == "carrito_elemento_X") {
    //console.log("hiciste clic en eliminar");

    let product2Delete = e.target.parentElement;
    //console.log(product2Delete);

    product2Delete.remove();

    //Eliminar elemento de LS
    deleteProductFromLS(readProductDOMCar(product2Delete))
  }
}

function emptyCar(e) {
  let elementos = e.target.parentElement.querySelector(".carrito_elementos");

  //console.log(elementos);
  //console.log(elementos.firstElementChild);

  while (elementos.firstElementChild) {
    elementos.removeChild(elementos.firstElementChild);
  }

  //Limpiar LS
  localStorage.clear()
}

function printCarFromLS(){
    //Leer LS
    let productos = productosInLs()

    //console.log(productos);

    productos.forEach(producto => {
        printCarInDOM(producto)
    })
}

function deleteProductFromLS(productoInOBJ){
    // console.log("asd");
    // console.log(productoInOBJ);

    let productosInLS = productosInLs()
    let contador = 0
    productosInLS.forEach((producto,index) => {
    //     console.log("inicio");
    //    console.log(producto);
    //    console.log(`contador: ${contador}`);
        if (producto.name == productoInOBJ.name
            && producto.price == productoInOBJ.price
            && producto.img == productoInOBJ.img
            && contador == 0
            ) {
            //console.log("encontre coincidencia");
            contador++

            //console.log(productosInLS);

            productosInLS.splice(index,1)
            //console.log(productosInLS);
            //console.log("mirame");

            localStorage.setItem("productos",JSON.stringify(productosInLS))
        }
    })

}
