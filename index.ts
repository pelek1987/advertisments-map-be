import express, {json} from 'express';
import 'express-async-errors';
import cors from 'cors';
import {handleError} from "./utlils/errors";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(json());

// ...

app.use(handleError)

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
})