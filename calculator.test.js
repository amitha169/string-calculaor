import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './app.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /add', () => {
  it('should return 0 if no numbers are provided', (done) => {
    chai.request(app.listen())
      .get('/add')
      .query({ numbers: '' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.result).to.equal(0);
        done();
      });
  });

  it('should return the number itself for a single number', async () => {
    const res = await chai.request(app).get('/add').query({ numbers: '1' });
    expect(res.status).to.equal(200);
    expect(res.body.result).to.equal(1);
  });

  it('should return the sum of two numbers', async () => {
    const res = await chai.request(app).get('/add').query({ numbers: '1,2' });
    expect(res.status).to.equal(200);
    expect(res.body.result).to.equal(3);
  });

  it('should handle newlines between numbers', async () => {
    const res = await chai.request(app).get('/add').query({ numbers: '1\n2,3' });
    expect(res.status).to.equal(200);
    expect(res.body.result).to.equal(6);
  });

  it('should throw an error for negative numbers', async () => {
    const res = await chai.request(app).get('/add').query({ numbers: '1,-2,3' });
    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal('Negative numbers not allowed: -2');
  }); 
});

