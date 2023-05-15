// Using the Chai assertion library and Chai-HTTP plugin to test the status codes of a blog API on a local server at http://localhost:8080.
// Includes three separate test suites to check the status codes for retrieving blog posts, adding new blog posts, and deleting all blog posts.
// Each test makes an HTTP request to the specified endpoint and checks whether the response has a status code of 200 using the expect method from the Chai library.
// The done function is called to indicate that the test has completed.

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('blog status', function(){
    it('status', function(done){
        chai.request('http://localhost:8050')
            .get('/api/blog')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
        });
    });
});



