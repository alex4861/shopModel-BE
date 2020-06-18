const Products = require("../Model/Products");

module.exports = (app, cors) => {
    app.options('*', cors)
    app.get('/getProduct/:id', async (req, res) =>{   
        const a = req.params.id;  
        const b = req.body.data;  
        var key = a;
        var json = { };
        json[key] = b;
        res.status(200) 
          res.send(json)
          res.end();          
      });
    app.post('/addProduct', async (req, res) =>{
        const body = req.body
        const Id = body.Id;
        const name = body.name
        const Price = body.Price
        const Image = body.Image
        const SKU = body.SKU
        const Description = body.Description
        const Details = body.Details
        const Departament = body.Departament
        const Data = new Products({
            Id: Id,
            name: name,
            Price: Price,
            Image: Image,
            SKU: SKU,
            Description: Description,
            Details: Details,
            Departament: Departament,
        })
        try{
            const savedPost = await post.save();
            res.status(201);
            res.send({resBody: "Se ejecutó de forma correcta"});
            res.end();
        }
        catch (error){
            res.status(500);
            res.send({error: error});
            res.end();
        }
    });
      
}
