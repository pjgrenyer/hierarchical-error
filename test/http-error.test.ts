import { HierarchicalError } from '../src/hierarchical-error';

describe('http error', () => {
    it('should fine the HTTP error', () => {});
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
