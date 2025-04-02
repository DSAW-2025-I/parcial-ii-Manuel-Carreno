const express= require('express');
const app = express();
const port= 3000;

app.use(express.json());

let productos= [
    {id: 1, name: "Asus Vivobook", price: 2500},
    {id: 2, name: "Macbook Air", price: 3500},
    {id: 3, name: "Thinkpad X1", price: 3200}
];


app.get('/products', (req,res) => { 
    res.json(productos);
});

app.get('/products/:id', (req, res) => { 
    const productsID=parseInt(req.params.id);
    const producto= productos.find(prod => prod.id === productsID);

    if(!producto){
        return res.status(404).json({error: "No se encuentra el producto"});
    } else {
        res.json(producto);
    }
});

app.post ('/products', (req,res) => { 
    const {id, name, price} = req.body;

    if (productos.some(prod => prod.id === id)){
        return res.status(400).json({error: "El id ya existe"});
    }

    let nuevoProducto= {id,name,price};
    productos.push(nuevoProducto);

    res.status(201).json(nuevoProducto);
});

app.listen (port, ()=> {
    console.log('Corriendo el servidor en el puerto:', port);
    
})
