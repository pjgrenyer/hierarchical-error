/* eslint-disable @typescript-eslint/no-explicit-any */
import { HierarchicalError, isHierarchicalError } from '../src/hierarchical-error';
import { HttpError, isHttpError } from '../src/http-error';

const data = 'data';
const statusCode = 500;
const statusText = 'server error';

describe('next error', () => {
    it('should get new HttpError', () => {
        //  expect.assertions(5);

        try {
            callService();
        } catch (error: any) {
            const hierarchicalError = error as HierarchicalError;
            const rootHierarchicalError = hierarchicalError.rootHierarchicalError();
            expect(rootHierarchicalError.next(HierarchicalError)).toEqual({});
        }
    });
});

const httpCall = () => {
    const someContext = 'the url we called';
    try {
        throw new Error('Something went wrong!');
    } catch (error: any) {
        throw new HttpError(error.message, { someContext }, error, { data: { data }, statusCode, statusText });
    }
};

const callService = () => {
    const someContext = 'The service we called';
    try {
        httpCall();
    } catch (error: any) {
        throw new HierarchicalError(`Service failed.`, { someContext }, error);
    }
};
