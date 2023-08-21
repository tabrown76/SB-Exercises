const request = require('supertest');
const app = require('./exercise');

describe('GET /mean', () => {
    test('should calculate the mean for valid input', async () => {
        const response = await request(app).get('/mean?nums=10,20,30');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('Mean for 10,20,30 is 20.');
    });

    test('should handle missing nums query parameter', async () => {
        const response = await request(app).get('/mean');
        expect(response.statusCode).toBe(400);
    });

    test('should handle non-numeric values in nums', async () => {
        const response = await request(app).get('/mean?nums=10,abc,30');
        expect(response.statusCode).toBe(400);
    });
});

describe('GET /median', () => {
    test('should calculate the median for valid input with odd length', async () => {
        const response = await request(app).get('/median?nums=10,20,30');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('Median for 10,20,30 is 20.');
    });

    test('should calculate the median for valid input with even length', async () => {
        const response = await request(app).get('/median?nums=10,20,30,40');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('Median for 10,20,30,40 is 25.');
    });

    test('should handle missing nums query parameter', async () => {
        const response = await request(app).get('/median');
        expect(response.statusCode).toBe(400);
        expect(response.body.error.message).toBe('nums are required');
    });

    test('should handle non-numeric values in nums', async () => {
        const response = await request(app).get('/median?nums=10,abc,30');
        expect(response.statusCode).toBe(400);
        expect(response.body.error.message).toContain('is not a number');
    });
});

describe('GET /mode', () => {
    test('should calculate the mode for valid input', async () => {
        const response = await request(app).get('/mode?nums=10,20,20,30');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('Mode for 10,20,20,30 is 20.');
    });

    test('should calculate multiple modes for valid input', async () => {
        const response = await request(app).get('/mode?nums=10,10,20,20,30');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('Mode for 10,10,20,20,30 is 10,20.');
    });

    test('should handle no mode when all numbers appear equally', async () => {
        const response = await request(app).get('/mode?nums=10,10,20,20');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe('No mode for 10,10,20,20.');
    });

    test('should handle missing nums query parameter', async () => {
        const response = await request(app).get('/mode');
        expect(response.statusCode).toBe(400);
        expect(response.body.error.message).toBe('nums are required');
    });

    test('should handle non-numeric values in nums', async () => {
        const response = await request(app).get('/mode?nums=10,abc,30');
        expect(response.statusCode).toBe(400);
        expect(response.body.error.message).toContain('is not a number');
    });
});
