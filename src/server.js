import express, {Router} from 'express'
import mongoose from 'mongoose'
import ApiController from './controllers/api.controller'
import exceptionController from './controllers/exception.controller'

const port = 8181;
const app = express();

app.use(express.json());

// Routing
const proxyRouter = Router();
proxyRouter.use('/api', ApiController);
proxyRouter.get('/*', (req, res) => {
    res.send("Hello express auth.")
});
app.use(proxyRouter);

// Data sources
mongoose.connect("mongodb://localhost/express-auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB..."));

// exception controller
app.use(exceptionController);
app.listen(port);
console.log('app running on port ', port);
export default app;
