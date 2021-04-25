const express = require('express');
const multerS3 = require("multer-s3");
const aws = require('aws-sdk');
const router = express.Router();
const multer = require('multer');
const { Product } = require("../models/Product");

const { auth } = require("../middleware/auth");
const {User} = require('../models/User');

//=================================
//             Product
//=================================
const s3 = new aws.S3({
    accessKeyId: "AKIA4HIE7Q3SRWQM2IIG",   // user 만들면서 지급받은 키값
    secretAccessKey: "kREjsLKyIcJ/jVJX+FNgxGprbuEUI4ajUfyGDbfu",
    region: 'ap-northeast-2'
})

// var storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null, '/home/ubuntu/showsite/uploads/')
//     },
//     filename: function(req,file,cb){
//         cb(null, `${Date.now()}_${file.originalname}`)
//     }
// })
const storage = multerS3({
    s3: s3,
    bucket: 'elasticbeanstalk-ap-northeast-2-840213432037', // s3 생성시 버킷명
    acl: 'public-read',   // 업로드 된 데이터를 URL로 읽을 때 설정하는 값입니다. 업로드만 한다면 필요없습니다.
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname}); // 파일 메타정보를 저장합니다.
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`) // key... 저장될 파일명과 같이 해봅니다.
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

    var term = req.body.searchTerm
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
    console.log("find", term)
    console.log("finds", findArgs)
    if(term){
        Product.find(findArgs)
        .find({ "title": {$regex: term}})
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
