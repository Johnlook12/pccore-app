require('dotenv').config();
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('db.json')
const middleware = jsonServer.defaults();

server.use(middleware);
server.use(jsonServer.bodyParser);

const SECRET_KEY = process.env.SECRET_KEY;
const expiresIn = '1h';

server.post('/login', (req, res) => {
    const { email, password } = req.body;

    const db = router.db;

    const user = db.get('usuarios').find({ email, password }).value();

    if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn });
    res.json({ token, user });
})

const excludedPaths = ['']

server.use((req, res, next) => {
    
    if(!excludedPaths.includes(req.path)){
        return next();
    }
    
    if (
        req.headers.authorization === undefined ||
        req.headers.authorization.split(' ')[0] !== 'Bearer') {
        return res.status(401).json({ message: "Formato de autorización inválido" });
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, SECRET_KEY);
        next();
    } catch (err) {
        res.status(401).json({message:"Token inválido o expirado"});
    }
})

server.use(router);

server.listen(3001, () =>{
    console.log("JSON Server con autenticación JWT está corriendo en el puerto 3001");
})