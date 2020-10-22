const express = require('express');
const router = express.Router();
const multer = require("multer");
const { User } = require("../models/User");
const { Product } = require("../models/Product")

const { auth } = require("../middleware/auth");

//=================================
//             product
//=================================

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req,file,cb){
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage}).single("file")

router.post('/image',(req,res)=>{

    upload(req,res,err => {
        if(err) return res.json({success:false, err})
        res.status(200).json({ success:true, filePath: res.req.file.path, fileName:res.req.file.filename})
    })

})

router.post('/',(req,res)=>{

    var product = new Product(req.body);

    product.save((err)=>{
        if(err) return res.json({success:false,err})
        return res.status(200).json({success:true})
    })

})

router.get('/getproduct',(req,res)=>{

    var type=req.query.type
    var productId = req.query.id

    Product.find({_id: productId})
    .populate('writer')
    .exec((err,doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({ success:true, doc})
    })

})

router.post('/products',(req,res)=>{

    var skip = req.body.skip ? parseInt(req.body.skip) : 0;
    var limit = req.body.limit ? parseInt(req.body.limit) : 10;
    var term = req.body.searchTerm

    var findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length > 0 ){

            console.log('key',key)
            if(key ==="price"){
                findArgs[key] ={
                    $gte : req.body.filters[key][0],
                    $lte : req.body.filters[key][1],
                }
            }else{
                findArgs[key]=req.body.filters[key]
            }
        }
    }
    console.log('finArgs',findArgs )

    if(term){
        Product.find(findArgs)
        .find({"title": {"$regex": term}})
        .populate("writer")
        .skip(skip)
        .limit(limit)
        .exec((err, product)=>{
            if(err) return res.json({success:false, err})
            return res.status(200).json({success:true, product, PostSize:product.length})
        })
    }else{
        Product.find(findArgs)
        .populate("writer")
        .skip(skip)
        .limit(limit)
        .exec((err, product)=>{
            if(err) return res.json({success:false, err})
            return res.status(200).json({success:true, product, PostSize:product.length})
        })
    }

    

})

module.exports = router;
