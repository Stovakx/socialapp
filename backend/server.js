import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import {register} from './controllers/auth.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import postsRouter from './routes/posts.js';
import { verifyToken } from './middleware/auth.js';
import {createPost} from './controllers/posts.js'
import User from './models/user.js';
import Post from './models/post.js';
import {users, posts} from './data/index.js';
/* middlewares confinguration */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
app.use(express.json());
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin'}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extendend:true}));
app.use(bodyParser.urlencoded({limit: '3Omb', extended:true}));
app.use(cors(corsOptions));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

//file storage
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) { 
        cb(null, file.originalname);
     }
});

const upload = multer({ storage});

//file routes
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);
//routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/posts', postsRouter)

//mongoose setup
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server PORT: ${PORT}`));
/*  inserted data (onetime!!)
    User.insertMany(users);
    Post.insertMany(posts); */
}).catch((error)=> console.log(`${error} dit not connect`));