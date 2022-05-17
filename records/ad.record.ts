import {AdEntity, NewAdEntity} from "../types";
import {ValidationError} from "../utlils/errors";
import { v4 as uuid } from 'uuid';
import {pool} from "../db";
import {FieldPacket} from "mysql2";

type AdRecordResults = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public lat: number;
    public lon: number;

    constructor(obj: NewAdEntity) {
        const {id, name, description, price, url, lat, lon} = obj;

        if (!name || name.length > 100) {
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta lub przekraczać 100 znaków.');

        }
        if (description.length > 1000) {
            throw new ValidationError('Treść ogłoszenia nie może przekraczać 1000 znaków.');

        }
        if (price < 0 || price > 9999999) {
            throw new ValidationError('Cena nie może być mniejsza niż 0 i większa od 9 999 9999');

        }
        if (!url || url.length > 100) {
            throw new ValidationError('Link ogłoszenia nie może być pusty lub przekraczać 100 znaków.');
        }
        const coordsRe = /[\d\.]+/;
        const isCoordsValid = coordsRe.test(String(lat)) && coordsRe.test(String(lon));
        if (!isCoordsValid) {
            throw new ValidationError('Nie można zlokalizować ogłoszenia')
        }

        this.id = id ?? uuid();
        this.name = name;
        this.description = description;
        this.price = price;
        this.url = url;
        this.lat = lat;
        this.lon = lon;
    }

    static async getOne(id: string): Promise<AdRecord> {
        const [results] = await pool.execute('SELECT * FROM `ads` WHERE `id` = :id', {
            id,
        }) as AdRecordResults;

        return results.length === 0 ? null : new AdRecord(results[0]);
    }


}