/* eslint-disable @typescript-eslint/no-explicit-any */
import { HierarchicalError } from './../src/hierarchical-error';

describe('Hierarchical Error', () => {
    it('should have corect output', () => {
        expect.assertions(2);

        try {
            callService();
        } catch (error: any) {
            const hierarchicalError = error as HierarchicalError;
            expect(hierarchicalError.message).toEqual('Service failed.');
            expect(hierarchicalError.toContextJson()).toEqual({
                cause: {
                    cause: new Error('Something went wrong!'),
                    context: {
                        someContext: 'the url we called',
                    },
                    message: 'Something went wrong!',
                },
                context: {
                    someContext: 'The service we called',
                },
                message: 'Service failed.',
            });
        }
    });
});

const httpCall = () => {
    const someContext = 'the url we called';
    try {
        throw new Error('Something went wrong!');
    } catch (error: any) {
        throw new HierarchicalError(error.message, { someContext }, error);
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
