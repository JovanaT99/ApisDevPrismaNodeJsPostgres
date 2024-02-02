import * as express from 'express';
import morgan = require("morgan");
import errorhandler from 'error-handler';
import router from './router';

const app = express();

app.use(morgan("dev"));
app.use(express.json()); //parse the req body


app.use('/api', router);


app.get('/',(req,res)=>{
    res.send("Jo");

})

if(process.env.NODE_ENV ==='development'){
app.use(errorhandler());
}

export default app;