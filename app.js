const express=require('express');
const jwt=require('jsonwebtoken');

const app=express();

app.get('/api', (req, res)=>{
    res.json({
        message: "welcome to the API"
    });
});

app.post('/api/post', verifytoken, (req, res)=>{

    res.json({
        messgae: "weclome to post api"
    });        
    
});

app.post('/api/login', (req, res)=>{
    const user={
        id:1,
        name:'Raja',
        email: 'raja@gmail.com'
    }
    

    jwt.sign({user}, 'secretkey', {expiresIn: '30s'}, (err, token)=>{
        res.json({
            token
        });
    });
});

function verifytoken(req, res, next){
//
const bearerHeader= req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearer= bearerHeader.split(' ');

        const bearerToken= bearer[1];

        req.token=bearerToken;

        jwt.verify(req.token, 'secretkey', (err, authData)=>{
            if(err){
                res.sendStatus(403);
            }else{
                
                next();
            }
        })
        

    }else{
        res.sendStatus(403);
    }
}

app.listen('5000', ()=> console.log("server is running in 5000"));