const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
/**
 * Set storage engine
 */
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    }
});
/**
 * Init the upload
 */
const upload = multer({
    storage:storage,
    limits:{ fileSize: 100000000},
    fileFilter: (req,file,cb)=>{
        checkFile(file,cb); 
    }
}).array('myImage');
/**
 * Check allowed extension
 */
checkFile = (file,cb)=>{
    const isExtAllowed = /jpeg|pdf|png|jpg|gif|zip/.test(path.extname(file.originalname).toLowerCase())
    return isExtAllowed ?  cb(null,true) : cb('File not allowed');
}
/**
 * Middleware
 */
router.get('/',(req,res)=>{
    res.render("index");
    console.log('Home page...');
});
router.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            err.name == "MulterError" ? err = "Image too large" : err ;
            res.render('index',{
                msg:err,
                color: 'red'
            })
            console.log(err);
        }else{
            if(req.files[0] == undefined){
                res.render('index',{
                    msg:'Choose file(s) too upload please',
                    color:'danger'
                });
                console.log('Choose file(s) too upload please');
            }else{
                const images = [];
                for(let image of req.files)
                    images.push(image.filename);
                /* console.log(images); */

                res.render('index',{
                    msg:'File uploaded',
                    color:'success',
                    images:images
                    /* file:`uploads/${req.file.filename}` */
                });
                console.log('File upload successfully...');
            }
     }
    });
});
module.exports = router;