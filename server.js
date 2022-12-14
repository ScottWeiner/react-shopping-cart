const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const shortid = require('shortid')

require('dotenv').config()

//work damn you!

const app = express()
app.use(bodyParser.json())

app.use("/", express.static(__dirname + "/build"))
app.get("/", (req, res) => res.sendFile(__dirname + "build/index.html"))

const mongoURL = process.env.MONGODB_URL

mongoose.connect(mongoURL, {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true
})

/* Product Model & API */

const Product = mongoose.model("products", new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String]

}))



app.get("/api/products", async (req, res) => {
    console.log("get products request: ", req)
    const products = await Product.find({})
    res.send(products)
})

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body)

    const savedProduct = await newProduct.save()
    res.send(savedProduct)
})

app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.send(deletedProduct)
})

/* Order Model & API */

const Order = mongoose.model("order", new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    email: String,
    name: String,
    address: String,
    total: Number,
    cartItems: [{
        _id: String,
        title: String,
        price: Number,
        count: Number
    }]
}, {
    timestamps: true
}))

app.post('/api/orders', async (req, res) => {
    if (!req.body.name ||
        !req.body.email ||
        !req.body.address ||
        !req.body.cartItems ||
        !req.body.total
    ) {
        return res.send({ message: "Data is required. " })
    }

    const newOrder = new Order(req.body)

    const savedOrder = await newOrder.save()
    res.send(savedOrder)
})

app.get('/api/orders', async (req, res) => {
    const orders = await Order.find({})
    res.send(orders)
})

app.delete('/api/order/:id', async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id)
    res.send(order)
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log("listening on port " + port))