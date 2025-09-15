const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 3000;


// middleware
app.use(cors());
app.use(express.json());

// dbConnect
const uri = "mongodb+srv://sampleDB:dxDCV8MqEtB01qsM@cluster0.1d0tmkb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Error Handle
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


// connect and Test Connection
async function run() {
    try {
        const database = client.db("UsersDB");
        const usersCollection = database.collection("users");

        // Create api from here

        // Post Method
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            res.send(result);
        })
        // Get Method
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        // Delete Method
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })

        // Update Method
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const user = req.body;
            const option = { upsert: true };
            const updatedUser = {
                $set: {
                    name: user.name,
                    email: user.email,
                    phone: user.phone
                }
            }
            const result = await usersCollection.updateOne(filter, updatedUser, option);
            res.send(result);
        })










        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




// Listen port server is running
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


// pass
// dxDCV8MqEtB01qsM
// name:sampleDB