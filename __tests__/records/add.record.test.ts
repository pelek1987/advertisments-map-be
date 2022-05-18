import {AdRecord} from "../../records/ad.record";
import {NewAdEntity, SimpleAdEntity} from "../../types";
import {pool} from "../../db";

const data: NewAdEntity = {
    name: 'Test name',
    description: 'Blah blah',
    price: 1000,
    url: 'https//expampe.com',
    lat: 50.2656066,
    lon: 18.9917111
}

let ar: AdRecord;

describe('AdRecord class', () => {

    afterAll(async () => {
        await pool.end()
    })

    it('should create proper AdRecord instance', () => {
        ar = new AdRecord(data);
        expect(ar).toMatchObject({
            ...data
        })
    });

    describe('throws when', () => {
        describe('name of ad', () => {
            it('is empty', () => {
                expect(() => new AdRecord({
                    ...data,
                    name: ''
                })).toThrow();
            });
            it('is undefined or null', () => {
                expect(() => new AdRecord({
                    ...data,
                    name: undefined
                })).toThrow();
                expect(() => new AdRecord({
                    ...data,
                    name: null
                })).toThrow();
            });
            it('contains more than 100 chars', () => {
                expect(() => new AdRecord({
                    ...data,
                    name: 'a'.repeat(101)
                })).toThrow();
            });
        });

        describe('description of ad', () => {
            it('contains more than 1000 chars', () => {
                expect(() => new AdRecord({
                    ...data,
                    name: 'a'.repeat(1001)
                })).toThrow();
            });
        });

        describe('price of ad', () => {
            it('is smaller than 0', () => {
                expect(() => new AdRecord({
                    ...data,
                    price: -1
                })).toThrow();
            });
            it('is greater than 9999999', () => {
                expect(() => new AdRecord({
                    ...data,
                    price: 10000000
                })).toThrow();
            });
        });

        describe('link of ad', () => {
            it('contains more than 100 chars', () => {
                expect(() => new AdRecord({
                    ...data,
                    url: `http://wp.pl/${'a'.repeat(90)}`
                })).toThrow();
            });
            it('is empty', () => {
                expect(() => new AdRecord({
                    ...data,
                    url: ''
                })).toThrow();
            });
            it('is undefined or null', () => {
                expect(() => new AdRecord({
                    ...data,
                    url: undefined
                })).toThrow();
                expect(() => new AdRecord({
                    ...data,
                    url: null
                })).toThrow();
            });
        });
    });
    let ad: AdRecord;
    describe('has method getOne that',() => {

        it('will return null when given id does not exist', async () => {
            ad = await AdRecord.getOne('wrong-id');
            expect(ad).toBeNull();
        })
        it('will return AdRecord when given id exists', async () => {
                ad = await AdRecord.getOne('xyz');
                expect(ad).toBeDefined();
                expect(ad).toMatchObject({
                    name: 'Testowa nazwa',
                    description: 'Testowy opis',
                    price: 0,
                    url: 'http://example.com',
                    lat: 50.2656066,
                    lon: 18.9917111
                })
        })
    })
    let ads: SimpleAdEntity[];
    describe('has method find that',() => {
        it('will list array of found entries', async () => {
            ads = await AdRecord.find('');
            expect(ads.length).toBeGreaterThan(0);
        })

        it('will list array of small amount of data', () => {
            expect(ads[0]).not.toHaveProperty('description');
            expect(ads[0]).not.toHaveProperty('price');
            expect(ads[0]).not.toHaveProperty('url');
        })

        it('will list array of found AdRecords when searching for "testowa"', async () => {
            ads = await AdRecord.find('a')
            expect(ads[0].id).toBe('xyz');
        })

        it('will list array of found AdRecords when searching for "wrong-name"', async () => {
            ads = await AdRecord.find('wrong-name')
            expect(ads).toEqual([]);
        })
    })
});