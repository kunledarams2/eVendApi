// const functions = require("firebase-functions");

import  express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from  './routes/users.js';
import authRouter from './routes/auth.js';
import storeRouter from './routes/store.js'
import categoriesRouter from './routes/catergories.js'
import subCategoriesRouter from './routes/subCategories.js'
import productsRouter from './routes/products.js'
import orderProductRouter from './routes/orderProduct.js'
import mongoose from "mongoose";
// import { MongoClient } from "mongodb";
// import { EJSON } from "bson";
import  'dotenv/config'
import functions from "firebase-functions";



// import { DotenvConfigOptions } from "dotenv";


const app = express();  // init the express framework
app.use(cors())
// const PORT = 5000;       // server port

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/stores', storeRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/subcategories', subCategoriesRouter)
app.use('/api/products', productsRouter)
app.use('/api/orders',orderProductRouter)



// connect to DB

// const uri = "mongodb+srv://kunledarams:Emmanuel@rest.bn59psi.mongodb.net/?retryWrites=true&w=majority"
// const dbName ="Buy_Sale"
// let db
// MongoClient.connect(uri,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// },(err, client)=>{
//     if(err) return console.log(err)

//     db = client.db(dbName)
//     console.log(`Connected MongoDB: ${uri}`)
//     console.log(`Database: ${dbName}`)
// });



// mongoose.connect('mongodb+srv://kunledarams:Emmanuel@rest.bn59psi.mongodb.net/?retryWrites=true&w=majority',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,   }).then(()=>console.log('Connected to DB! '))
//     .catch(err => console.log(err))
// console.log(process.env.DB_CONNECTION)

  mongoose.connect(process.env.DB_CONNECTION)
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

// app.listen(PORT, ()=> console.log(`Server is running on port: http://localhost:${PORT}`));


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// app.get('/', async(req, res)=>{
//   try {
//     res.json({
//       success:true,
//       message:"Hello kunle"
//     })
//   } catch (error) {
    
//   }
// })
export default functions.https.onRequest(app)

// => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
 