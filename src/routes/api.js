const express = require('express');
// const ProductController = require('../controllers/ProductsController')
const router = express.Router();


// router.post("/CreateProduct", ProductController.CreateProduct)

router.get("/", (req, res) => {
    res.json({ message: "API Working" })
})


module.exports = router
