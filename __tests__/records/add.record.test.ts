import {AdRecord} from "../../records/ad.record";
import {NewAdEntity} from "../../types";

const data: NewAdEntity = {
    name: 'Test name',
    description: 'Blah blah',
    price: 1000,
    url: 'https//expampe.com',
    coords: {
        lat: 50.2656066,
        lon: 18.9917111
    }
}

let ar: AdRecord;

describe('AdRecord class', () => {

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
});