import {Request, Response, Router} from "express";
import {AdRecord} from "../records/ad.record";

export const adRouter = Router()

adRouter
    .get('/search/:name?', async (req: Request, res: Response) => {
        const { name } = req.params;
        const ads = await AdRecord.find(name ?? '');
        res.json(ads);
    })
    .get('/:id', async (req:Request, res: Response) => {
        const ad = await AdRecord.getOne(req.params.id);
        res.json(ad);
    })
    .post('/', async (req: Request, res: Response) => {
        const newAd = new AdRecord(req.body);
        await newAd.insert();
        res.json(newAd)
    })