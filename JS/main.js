const productos = [
    {id : "pizza-01",
     titulo : "pizza muzarella",
     imagen : "",
     categoria :{
        nombre : "pizzas",
        id : "pizzas"
     },
     precio : 2000
    },
    {id : "pizza-02",
     titulo : "pizza jamon",
     imagen : "",
     categoria : {
        nombre : "pizzas",
        id : "pizzas"
     },
     precio : 3000
    },
    {id : "pizza-03",
     titulo : "pizza de cebolla",
     imagen : "",
     categoria :{
        nombre : "pizzas",
        id : "pizzas"
     },
     precio : 1500
    },
    {id : "empanada-01",
     titulo : "empanada j y q",
     imagen : "",
     categoria :{
        nombre : "empanadas",
        id : "empanadas"
     },
     precio : 500
    },
    {id : "empanada-02",
     titulo : "empanada carne",
     imagen : "",
     categoria :{
        nombre : "empanadas",
        id : "empanadas"
     },
     precio : 500
    },
    {id : "empanada-03",
     titulo : "empanada pollo",
     imagen : "",
     categoria :{
        nombre : "empanadas",
        id : "empanadas"
     },
     precio : 500
    },
    {id : "calzone-01",
     titulo : "calzone muzarella",
     imagen : "",
     categoria :{
        nombre : "calzones",
        id : "calzones"
     },
     precio : 2500
    },
    {id : "calzone-02",
     titulo : "calzone napolitano",
     imagen : "",
     categoria :{
        nombre : "calzones",
        id : "calzones"
     },
     precio : 2500
    },
    {id : "calzone-03",
     titulo : "calzone calabres",
     imagen : "",
     categoria :{
        nombre : "calzones",
        id : "calzones"
     },
     precio : 3000
    }
    ]

    const contenedorProductos = document.querySelector("#contenedor-productos");
    const botonesCategorias = document.querySelectorAll (".boton-producto");
    let productoAgregar = document.querySelectorAll (".producto-agregar");
    const numerito =document.querySelector (".numerito");

    function cargarProductos(productosElegidos) {

        contenedorProductos.innerHTML = "";

        productosElegidos.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add ("producto");
            div.innerHTML = `<img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">agregar</button>
            </div>`;
            contenedorProductos.append(div);

        })
        actualizarBotones();
    }

    

    botonesCategorias.forEach(boton =>{
        boton.addEventListener("click",(e)=> {

            botonesCategorias.forEach(boton=> boton.classList.remove("active"));
            e.currentTarget.classList.add("active");

            const productosBoton = productos.filter (producto=>producto.categoria.id === e.currentTarget.id)
            
            cargarProductos(productosBoton);
        })

    });

    function actualizarBotones () {
    productoAgregar = document.querySelectorAll (".producto-agregar");
    
    productoAgregar.forEach (boton => {
      boton.addEventListener("click" , agregarAlCarrito);
    })

    };

    let productosEnCarrito ;
    let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")

    if (productosEnCarritoLS) {
      productosEnCarrito = JSON.parse(productosEnCarritoLS) ;
      actualizarNumerito ();
    } else {
      productosEnCarrito =[];
    }

    function agregarAlCarrito (e) {

      const idBoton = e.currentTarget.id;
      const productoAgregado = productos.find(producto => producto.id === idBoton);

      if (productosEnCarrito.some(producto => producto.id === idBoton)){
      const index = productosEnCarrito.findIndex (producto => producto.id === idBoton);
      productosEnCarrito[index].cantidad++;

      } else {
      productoAgregado.cantidad = 1;
      
      productosEnCarrito.push(productoAgregado);}
      actualizarNumerito ();
      
      localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
   };

   function actualizarNumerito (){
      let nuevoNumerito = productosEnCarrito.reduce((acc,producto) => acc+producto.cantidad, 0);
      numerito.innerText = nuevoNumerito ;
   };





