const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

require('dotenv').config()


const app = express();
const port = process.env.PORT || 5000;

//Middleware 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pkjqn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pkjqn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run (){
    try{
        await client.connect();
        const database = client.db('travels_Agency');
        const serviceCollection = database.collection('services');
        
        //get products api

        app.get('/services', async(req, res)=>{
            const cursor = serviceCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })

        console.log('Database Connected Successfully');
    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send('Travel Agency Server is Running');
});

app.listen(port, ()=>{
    console.log('Server running at port:', port);
})



// USER_ID=TravelAgencyAdmin
// USER_PASS=siLaq3fwWMwnvqft