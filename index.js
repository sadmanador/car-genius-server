const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config()


//middleware
app.use(cors());
app.use(express.json());


//mongoDB

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://car-genius:SovAGND5bOUVHLDY@cluster0.9mathic.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
try{
    const servicesCollection = client.db('car-genius').collection('services');
    app.post('/services', async (req, res) => {
    const services = req.body;
    const result = await servicesCollection.insertOne(services);
    res.send(result);
    });

    app.get('/services', async (req, res) => {
    const query = {};
    const cursor = servicesCollection.find(query);
    const result = await cursor.toArray();
    res.send(result);
    });
}
finally{
}
};
run().catch(console.dir);




app.get('/', (req, res) => {
res.send('The Web is running')
});


app.listen(port, () => {
console.log(`listening port ${port}`);
});