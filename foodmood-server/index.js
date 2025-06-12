
const express = require('express')
const app = express();
const cors =require('cors')
const jwt = require('jsonwebtoken');
const connectDB = require('./db');
const port = process.env.PORT || 6001;
require('dotenv').config()
connectDB();


//middleware
app.use(cors());
app.use(express.json());



//jwt
  app.post('/jwt', async(req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1hr'
    })
    res.send({token});
  })

 
//   import routes here
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes=require('./api/routes/userRoutes')

app.use('/menu', menuRoutes)
app.use('/carts', cartRoutes);
app.use('/users',userRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})