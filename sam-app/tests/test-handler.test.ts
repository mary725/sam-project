import { lambdaHandler } from '../get-book-by-id/app';
import chai from 'chai';
const expect = chai.expect;

describe('Tests index', function () {
    it('verifies successful response', async () => {
        const result: any = await lambdaHandler(null as any, null as any, null as any);

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');

        const response = JSON.parse(result.body);

        expect(response).to.be.an('object');
        expect(response.message).to.be.equal('hello world');
    });
});
