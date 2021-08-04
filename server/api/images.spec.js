/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const { db, models: { User } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app')

describe('Image routes', () => {
  beforeEach(async() => {
    await seed();
  })

  describe('/api/images/', () => {

    it('GET /api/images', async () => {
      const res = await request(app)
        .get('/api/images')
        .expect(200)

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(2);
      expect(res.body[0].data.startsWith('data:image/png;base64,')).to.equal(true);
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
