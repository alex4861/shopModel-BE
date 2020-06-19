const Products = require("../Model/Products");
const Departaments = require("../Model/Departaments");

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
          sendData(res, 200, json)       
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
        const departament = new Departaments({
            Name: body.Departament
        })
        try{
            const FindedProd = await Products.find({ SKU: body.SKU});
            const savedDep = await Departaments.find({Name: body.Departament})
            console.log(FindedProd.length);
            var SavedProd;
            if (FindedProd.length == 0){
                SavedProd = await Data.save()
                if(savedDep.length == 0){
                    await departament.save();
                }
            }
            else{
                sendData(res, 500, {error: "El producto con el SKU "+body.SKU+" ya existe", "departments": await Departaments.find()})       
                return   
            }
            sendData(res, 201, {resBody: SavedProd})       
        }
        catch (error){ sendData(res, 500, {error: error}) }
    });
    app.get("/getAllProducts", async(req,res) =>{
        try{
            console.log("iniciando busqueda");
            const products = await Products.find();
            
            if (products.length == 0){
                sendData(res, 404, {"error": "no data found"})
                return
            }
            sendData(res, 200, {"Data": products})

        }
        catch(error){sendData(res, 500, {error: error})}
    });


    app.get("/getDepartments", async (req, res) =>{
        try {
            console.log("buscando");
            
            const savedDep = await Departaments.find()
            if (savedDep.length == 0){
                res.status(404)
                res.send({"error": "no data found"});
                res.end()     
                return
            }
            sendData(res, 200, savedDep)
        } catch (error) {sendData(res, 500, {error: error})}
    })

    function sendData(res, status, Data){
        res.status(status);
        res.send(Data)
        res.end();

    }
      
}
