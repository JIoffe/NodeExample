import chai from 'chai';
import chaiHttp from 'chai-http';

import { bootstrapTestEnvironment, getTestServer } from './util.js';

const should = chai.should();

chai.use(chaiHttp);

let app;

describe('Index Router', () => {
    before((done) => {
        bootstrapTestEnvironment();
        app = getTestServer();
        done();
    });

    beforeEach((done) => {
        done();   
    });

    /*
    * Test the index page
    */
    describe('/GET index', () => {
        it('Should return the index page', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });
});