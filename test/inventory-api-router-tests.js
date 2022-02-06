import chai from 'chai';
import chaiHttp from 'chai-http';

import { bootstrapTestEnvironment, generateTestToken, getTestServer } from './util.js';
import { testInventoryPost } from './data.js';

const should = chai.should();

chai.use(chaiHttp);

let token, app;

describe('Inventory API Router', () => {
    before((done) => {
        bootstrapTestEnvironment();
        app = getTestServer();
        done();
    });

    beforeEach((done) => {
        token = generateTestToken();
        done();   
    });

    /*
        GET: /api/inventory
    */
    describe('GET /api/inventory (no auth header)', () => {
        it('Should return 401', (done) => {
        chai.request(app)
            .get('/api/inventory')
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
        });
    });

    describe('GET /api/inventory (invalid token)', () => {
        it('Should return 401', (done) => {
        chai.request(app)
            .get('/api/inventory')
            .set('Authorization', 'Bearer 123456')
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
        });
    });

    describe('GET /api/inventory', () => {
        it('Should return inventory array', (done) => {
        chai.request(app)
            .get('/api/inventory')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });

    /*
        POST: /api/inventory
    */
    describe('POST /api/inventory (no auth header)', () => {
        it('Should return 401', (done) => {
        chai.request(app)
            .post('/api/inventory')
            .send(testInventoryPost)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
        });
    });

    describe('POST /api/inventory (invalid token)', () => {
        it('Should return 401', (done) => {
        chai.request(app)
            .post('/api/inventory')
            .set('Authorization', 'Bearer 123456')
            .send(testInventoryPost)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
        });
    });

    describe('POST /api/inventory (no body)', () => {
        it('Should return 400: Bad Request', (done) => {
        chai.request(app)
            .post('/api/inventory')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        });
    });

    describe('POST /api/inventory', () => {
        it('Should return newly created item', (done) => {
        chai.request(app)
            .post('/api/inventory')
            .set('Authorization', `Bearer ${token}`)
            .send(testInventoryPost)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('displayName').eql(testInventoryPost.displayName);
                done();
            });
        });
    });
});