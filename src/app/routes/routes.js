const Products = require("../Model/Products");

const uri = 'mongodb+srv://isarn:isarn4861@cluster0-cjep0.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority'

module.exports = (app, cors, mongoose) => {

    mongoose.connect(uri,
        {useNewUrlParser: true, useUnifiedTopology: true},
         () => console.log("connected to db")
      )
    

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
        const Data = new Products({
            Name: body.Name,
            Price: body.Price,
            Image: body.Image,
            SKU: body.SKU,
            Description: body.Description,
            Details: body.Details,
            Departament: body.Departament,
        })
        try{
            const savedPost = await Data.save();
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
    app.get("/getAllProducts", async(req,res) =>{
        try{
            console.log("iniciando busqueda");
            const products = await Products.find();
            
            if (products.length == 0){
                res.status(200);
                res.send({"error": "no data found"});
                res.end()     
                return
            }
            res.status(200);
            res.send({"Data": products});
            res.end()
        }
        catch(error){
            res.status(500)
            res.send(error)
            res.end()
        }
    });
      
}
