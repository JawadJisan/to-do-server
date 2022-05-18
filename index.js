const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config()

//admin
//PLJw3ft9MJXHxxWz


app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://admin:PLJw3ft9MJXHxxWz@cluster0.2tphq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const todoCollection = client.db("toDoCollection").collection("todo");


        app.get('/todos', async (req, res) => {
            const query = req.query;
            const cursor = todoCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });


        
        app.post('/todo',async (req, res) => {
            const data = req.body;
            console.log(data);
            const result = await todoCollection.insertOne(data);
            res.send(result);
        })







        // 
        app.delete('/todo/:id',async(req, res)=>{
            const id= req.params.id;
            const filter = { _id: ObjectId(id)};
            const result = await todoCollection.deleteOne(filter);
            res.send(result);



        })
    }
    finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hellow World From Simple To do')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})