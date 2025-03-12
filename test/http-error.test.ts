/* eslint-disable @typescript-eslint/no-explicit-any */
import { HierarchicalError, isHierarchicalError } from '../src/hierarchical-error';
import { HttpError, isHttpError } from '../src/http-error';

const data = 'data';
const statusCode = 500;
const statusText = 'server error';

describe('http error', () => {
    const context = {
        cause: {
            cause: {
                cause: undefined,
                message: 'Something went wrong!',
                name: 'Error',
                stack: expect.any(String),
            },
            context: {
                someContext: 'the url we called',
            },
            message: 'Something went wrong!',
            data: '{"data":"data"}',
            statusCode: 500,
            statusText: 'server error',
        },
        context: {
            someContext: 'The service we called',
        },
        message: 'Service failed.',
    };

    it('should have correct output', () => {
        expect.assertions(2);

        try {
            callService();
        } catch (error: any) {
            const hierarchicalError = error as HierarchicalError;
            expect(hierarchicalError.message).toEqual('Service failed.');
            expect(hierarchicalError.toJSON()).toEqual(context);
        }
    });

    it('should get root HierarchicalError', () => {
        expect.assertions(5);

        try {
            callService();
        } catch (error: any) {
            const hierarchicalError = error as HierarchicalError;
            const rootHierarchicalError = hierarchicalError.rootHierarchicalError();
            expect(rootHierarchicalError.toJSON()).toEqual({
                cause: {
                    cause: undefined,
                    message: 'Something went wrong!',
                    name: 'Error',
                    stack: expect.any(String),
                },
                context: {
                    someContext: 'the url we called',
                },
                data: '{"data":"data"}',
                message: 'Something went wrong!',
                statusCode: 500,
                statusText: 'server error',
            });
            expect(isHttpError(rootHierarchicalError)).toBeTruthy();
            const httpError = rootHierarchicalError as HttpError;
            expect(httpError.statusCode).toEqual(statusCode);
            expect(httpError.statusText).toEqual(statusText);
            expect(httpError.data).toEqual({ data: 'data' });
        }
    });

    describe('isHttpError', () => {
        it('is not HierarchicalError', () => {
            expect(isHierarchicalError(new Error())).toBeFalsy();
        });

        it('is not HttpError', () => {
            expect(isHttpError(new Error())).toBeFalsy();
        });

        it('is HierarchicalError', () => {
            expect(isHierarchicalError(new HierarchicalError('message', { someContext: 'someContext' }, new Error()))).toBeTruthy();
        });

        it('is HttpError', () => {
            expect(new HttpError('message', { someContext: 'someContext' }, new Error(), { data, statusCode, statusText })).toBeTruthy();
        });
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
