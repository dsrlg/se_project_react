const supertest = require('supertest');
const app = require('../app'); 
const request = supertest(app);

describe('Endpoints respond to requests', () => {
  it('should return a 200 status for the root endpoint "/',  () => {
   return request.get('/').then(response => {
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello, World!');
        });
  });


});
