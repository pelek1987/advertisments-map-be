import {AdEntity, NewAdEntity} from "../types";
import {ValidationError} from "../utlils/errors";

export class AdRecord implements AdEntity {
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public coords: {
        lat: number;
        lon: number;
    };

    constructor(obj: NewAdEntity) {
        if(!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta lub przekraczać 100 znaków.');
        }

        if(obj.description.length > 1000) {
            throw new ValidationError('Treść ogłoszenia nie może przekraczać 1000 znaków.');
        }

        if(obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Cena nie może być mniejsza niż 0 i większa od 9 999 9999');
        }

        if(!obj.url || obj.name.length > 100) {
            throw new ValidationError('Link ogłoszenia nie może być pusty lub przekraczać 100 znaków.');
        }

        const {lat, lon} = obj.coords;
        const coordsRe = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/;
        const isCoordsValid = coordsRe.test(String(lat)) && coordsRe.test(String(lon));
        if(!isCoordsValid) {
            throw new ValidationError('Nie można zlokalizować ogłoszenia')
        }
    }


}