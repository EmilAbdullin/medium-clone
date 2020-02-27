const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const users = JSON.parse(fs.readFileSync('./db.json','UTF-8')).users;


server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

function b64DecodeUnicode(password) {
    return decodeURIComponent(Buffer.from(password,'base64').toString('binary').split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function checkUser({login, password}){
    return users.filter(user => user.login === login && String(user.password) === b64DecodeUnicode(password))
}


function checkEmail(email){
    return users.filter(user => user.login === email);
}


server.post('/checkLogin', (req, res) => {
    let email = req.body.email;
    if(checkEmail(email).length > 0){
        res.status(200).jsonp('ok');
    }else{
        res.status(200).jsonp('no-user');
    }
})

server.post('/login',(req, res) => {
    let {login, password} = req.body;
    if(checkUser({login,password}).length === 0){
        const status = 401;
        const message = 'Incorrect email or password';
        res.status(status).json({status,message})
        return
    }
    const userInfo = {
        userId:checkUser({login,password})[0].id,
        role:checkUser({login,password})[0].role
    }
    res.status(200).json({userInfo});
})

server.use(router)
server.listen(3000, () => {
  console.log('Run Auth API Server')
})
