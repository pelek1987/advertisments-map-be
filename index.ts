import express, {json, Router} from 'express';
import 'express-async-errors';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import {adRouter} from "./routers/ad.router";
import {handleError} from "./utlils/errors";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5
    max: 100, // Limit each IP to 100 requests per `window`
}))
const router = Router();
router.use('/ad', adRouter);
app.use('/api', router);

app.use(handleError)

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
})