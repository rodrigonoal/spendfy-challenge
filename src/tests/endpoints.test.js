/* eslint-disable no-undef */
require('dotenv').config({ path: 'src/.env' });
const supertest = require('supertest');
const mongoose = require('mongoose');
const connectMongoDB = require('../connection/mongodb');
const { app, server } = require('../index');

const request = supertest(app);

describe('Get Endpoints', () => {
  it('should return the weekday based by a start day and the amount days passed', async () => {
    const response = await request.get('/weekday-after')
      .query({
        startday: 'segunda',
        amountOfDays: '3',
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.answer).toBe('quinta');
  });

  it('should return a document by ID', async () => {
    await connectMongoDB();
    const id = '60f4c874863df63c2075d32d';
    const response = await request.get(`/documents/${id}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toStrictEqual({
      createdAt: '2021-07-19T00:33:53.000Z',
      _id: id,
      name: 'name',
      content: 'Y29udGVudA==',
      kbSize: 0.009,
      __v: 0,
      deletedAt: '2021-07-19T01:57:01.000Z',
    });
  });

  it('should return an array of objects', async () => {
    await connectMongoDB();
    const response = await request.get('/documents');

    expect(response.statusCode).toEqual(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          name: expect.any(String),
          content: expect.any(String),
          kbSize: expect.any(Number),
          deletedAt: expect.any(String),
        }),
      ]),
    );
  });

  afterAll(() => {
    server.close();
    mongoose.disconnect();
  });
});

describe('Post Endpoints', () => {
  it('should save and return a saved document', async () => {
    await connectMongoDB();

    const response = await request.post('/documents')
      .send({
        name: 'name',
        content: 'content',
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject({
      name: 'name',
      content: 'Y29udGVudA==',
      kbSize: 0.009,
      createdAt: expect.any(String),
      _id: expect.any(String),
    });
  });

  afterAll(() => {
    server.close();
    mongoose.disconnect();
  });
});

describe('Delete Endpoints', () => {
  it('should return a saved document by ID with deletedAt', async () => {
    await connectMongoDB();
    const id = '60f0a98f52bbf9366025baa9';
    const response = await request.delete(`/documents/${id}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject({
      _id: id,
      deletedAt: expect.any(String),
    });
  });

  afterAll(() => {
    server.close();
    mongoose.disconnect();
  });
});
