require('dotenv').config();
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json')


// Middleware para habilitar CORS
server.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Subida de ficheros
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(process.cwd(), 'src', 'assets', 'products');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `temp-${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({ storage });



//endpoint subida imagenes
server.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No se subió ninguna imagen' });
    }

    const imageUrl = `http://localhost:3001/assets/products/${req.file.filename}`;
    res.json({ imageUrl });
})

server.use(jsonServer.bodyParser);
const middleware = jsonServer.defaults();


server.use(middleware);
server.use(express.json());

// Middleware para verificar el token

const SECRET_KEY = process.env.SECRET_KEY;
const expiresIn = '1h';

const includedPaths = ['/upload', '/productos','/api/cart'];

server.use((req, res, next) => {

    if (!includedPaths.some(path => req.path.startsWith(path))) {
        console.log("Excluyendo:", req.originalUrl);
        return next();
    }

    if (req.path.startsWith('/productos') && req.method === 'GET') {
        return next();
    }

    if (
        req.headers.authorization === undefined ||
        req.headers.authorization.split(' ')[0] !== 'Bearer') {
        return res.status(401).json({ message: "Formato de autorización inválido" });
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log("Token recibido:", token);
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("Token verificado:", decoded);
        req.user = {
            id: decoded.id,
            email: decoded.email
        };
        next();
    } catch (err) {
        res.status(401).json({ message: "Token inválido o expirado" });
    }
})

// Endpoint delete personalizado
server.delete('/productos/:id', async (req, res) => {
    try {
        console.log("Entrando al endpoint DELETE personalizado");
        const { id } = req.params;
        const db = router.db;

        const product = db.get('productos').find({ id: parseInt(id) }).value();
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        await db.get('productos').remove({ id: parseInt(id) }).write();

        const productsDir = path.join(process.cwd(), 'src', 'assets', 'products');

        const files = fs.readdirSync(productsDir);
        const fileToDelete = files.find(file => file.startsWith(`${id}.`));
        console.log("Archivo a eliminar:", fileToDelete);
        if (fileToDelete) {
            fs.unlinkSync(path.join(productsDir, fileToDelete));
        }

        res.status(200).json({ message: 'Producto e imagen eliminados' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});


// Endpoint post personalizado
server.post('/productos', upload.single('image'), async (req, res) => {
    try {
        const db = router.db;
        console.log("req.body:", req.body);
        const productData = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: parseFloat(req.body.precio),
            stock: parseInt(req.body.stock),
            categoria_id: parseInt(req.body.categoria_id)
        };

        const newProduct = await db.get('productos').insert(productData).write();

        const oldPath = req.file.path;
        const newFileName = `${newProduct.id}${path.extname(req.file.originalname)}`;
        const newPath = path.join(path.dirname(oldPath), newFileName);

        fs.renameSync(oldPath, newPath);

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});

// Endpoint put personalizado
server.put('/productos/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const db = router.db;

        const product = db.get('productos').find({ id: parseInt(id) }).value();
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const productData = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: parseFloat(req.body.precio),
            stock: parseInt(req.body.stock),
            categoria_id: parseInt(req.body.categoria_id)
        };

        const updatedProduct = await db.get('productos').find({ id: parseInt(id) }).assign(productData).write();

        if (req.file) {
            const oldPath = req.file.path;
            const newFileName = `${id}${path.extname(req.file.originalname)}`;
            const newPath = path.join(path.dirname(oldPath), newFileName);

            fs.renameSync(oldPath, newPath);
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});


// endpoint login
server.post('/login', (req, res) => {
    const { email, password } = req.body;

    const db = router.db;

    const user = db.get('usuarios').find({ email, password }).value();

    if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn });
    console.log("Token generado:", token);
    res.json({ token, user });
})

const getCurrentUser = (db, userId) => {
    return db.get('usuarios').find({ id: parseInt(userId) }).value();
};

// Obtener carrito
server.get('/api/cart', (req, res) => {
    try {
        const db = router.db;
        const user = getCurrentUser(db, req.user.id);

        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json(user.cart || []);
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

// Actualizar carrito
server.put('/api/cart', (req, res) => {
    try {
        const db = router.db;
        const user = getCurrentUser(db, parseInt(req.user.id));

        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        db.get('usuarios')
            .find({ id: parseInt(req.user.id) })
            .assign({ cart: req.body })
            .write();

        res.json(req.body);
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

// Vaciar carrito
server.delete('/api/cart', (req, res) => {
    try {
        const db = router.db;

        db.get('usuarios')
            .find({ id: parseInt(req.user.id)})
            .assign({ cart: [] })
            .write();

        res.json({ message: 'Carrito vaciado' });
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

server.use('/assets/products', express.static(path.join(process.cwd(), 'src', 'assets', 'products')));


server.use(router);

server.listen(3001, () => {
    console.log("JSON Server con autenticación JWT está corriendo en el puerto 3001");
})