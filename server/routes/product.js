const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require("../models/Product");

const { auth } = require("../middleware/auth");
const {User} = require('../models/User');

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'uploads/')
    },
    filename: function(req,file,cb){
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage:storage}).single("file")

router.post("/image", (req, res) => {

    upload(req,res,err => {
        if(err) {return res.json({ success: false, err})}
        return res.json({ success:true, filePath:res.req.file.path, fileName:res.req.file.filename})
    });
});

router.post("/", (req, res) => {

    var product = new Product(req.body)
    
    product.save((err,product)=>{
        if(err) return res.json({success:false, err})
        res.status(200).json({ success:true})
    })
});

router.post('/products',(req,res)=>{

    var skip = req.body.skip ? parseInt(req.body.skip) :0;
    var limit = req.body.limit ? parseInt(req.body.limit): 100;

    var term = req.body.search
    var findArgs = {};

    for(var key in req.body.filters){
        if(req.body.filters[key].length > 0){
            if(key==="price"){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1],
                }
            }else{
                findArgs[key]=req.body.filters[key];

            }

        }
    }
    // console.log("find", findArgs)

    if(term){
        Product.find(findArgs)
        .find({ $text: {$search: term}})
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err, product)=>{
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true, product, postSize:product.length})
    })
    }else{
    Product.find(findArgs)
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err, product)=>{
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true, product, postSize:product.length})
    })
}

})


router.post("/getproduct", (req, res) => {

    var productIds = req.body.id
    var type = req.body.type

    if(type === "array"){
        var ids = req.body.id.split(',')
        productIds = ids.map(item=>{
            return item
        })
    }


    Product.find({_id : {$in:productIds}})
    .populate("writer")
    .exec((err, doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).send(doc)
    })
});

module.exports = router;