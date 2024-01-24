process.env.NODE_ENV = 'test';
const request = require('supertest');

const app = require('../app');
let items = require('../fakeDb');

let item = {name: 'FangBoi', price: 500}

beforeEach(function () {
    items.push(item);
})

afterEach(function () {
    items.length = 0;
})

describe('GET /items', () => {
    test('Get all items', async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({items: [item]});
    })
})

describe('POST /items', () => {
    test('Create new item', async () => {
        const res = await request(app).post('/items').send({name: 'FangBoi', price: 500});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item: {name: 'FangBoi', price: 500}});
    })
})

describe('GET /cats/:name', () => {
    test('Get single item', async () => {
        const res = await request(app).get(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item: item});
    })
    test("Respond with 404 if can't find item", async () => {
        const res = await request(app).get('/items/0')
        expect(res.statusCode).toBe(404);
    })
})

describe('PATCH /cats/:name', () => {
    test('Update single item', async () => {
        const res = await request(app).patch(`/items/${item.name}`).send({name: 'ChonkBoi'});
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual({name: 'ChonkBoi'});
    })
    test("Respond with 404 if can't find item", async () => {
        const res = await request(app).get('/items/0')
        expect(res.statusCode).toBe(404);
    })
})

describe('DELETE /cats/:name', () => {
    test('Delete single item', async () => {
        const res = await request(app).delete(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: 'Deleted'});
    })
    test("Respond with 404 if can't find item", async () => {
        const res = await request(app).get('/items/0')
        expect(res.statusCode).toBe(404);
    })
})