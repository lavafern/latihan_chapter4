const app = require('../../app');
const request = require('supertest');
let articles = [];

describe('test GET /api/v1/articles endpoint', () => {
    test('test get all articles -> berhasil', async () => {
        try {
            let { statusCode, body } = await request(app).get('/api/v1/articles');

            articles = body.data; 

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toBeInstanceOf(Array);
        } catch (err) {
            throw err;
        }
    });
});

describe('test GET /api/v1/articles/:id endpoint', () => {
    test('test get article by id -> berhasil', async () => {
        try {
            let { statusCode, body } = await request(app).get(`/api/v1/articles/${articles[0].id}`);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('title');
            expect(body.data).toHaveProperty('body');
        } catch (err) {
            throw err;
        }
    });

    test('test get article by id -> failed : article_id terdaftar didalam database', async () => {
        try {
            let { statusCode, body } = await request(app).get(`/api/v1/articles/9999`);

            expect(statusCode).toBe(404);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toBeNull();
        } catch (err) {
            throw err;
        }
    });
});

