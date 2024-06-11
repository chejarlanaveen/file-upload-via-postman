const express=require('express');
const path=require('path');
const cors=require('cors');
const bodyParser=require('body-parser');
const multer=require('multer');
const db=require('./database');
const app= express();
const port=process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/uploads',express.static('uploads'));


const storage= multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,'uploads');
    },
    filename:(req,file,callback)=>{
        callback(null, `${file.originalname.split(".")[0]}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload =multer({storage:storage});

app.get('/',(req,res)=>{
    res.send('node js file upload rest apis');
})
app.post('/file-upload',upload.single('file'),(req,res,next)=>{
    const file= req.file;
    if(!file){
        return res.status(400).send({message:'please upload a file'});
    }
    const sql="insert into `files`(`name`) values('" +req.file.filename+ "')";
    const query=db.query(sql,(err,result)=>{
        return res.send({message: 'file is successfully uploaded',file});
    })
});

app.listen(port,()=>{
    console.log(`sever started on - ${port}`);
})
