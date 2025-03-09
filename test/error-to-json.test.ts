import { errorToJson } from '../src/error-to-json';

describe('Error To Json', () => {
    it('should return as string', () => {
        const result = errorToJson('Error!');
        expect(result).toEqual('Error!');
    });

    it('should return as Error object', () => {
        const result = errorToJson(new Error('Error!'));
        expect(result).toEqual({
            cause: undefined,
            message: 'Error!',
            name: 'Error',
            stack: expect.any(String),
        });
    });

    class MyError extends Error {
        constructor(message: string) {
            super(message);
        }

        toJSON = () => ({
            message: this.message,
        });
    }

    it("should return use object's toJSON", () => {
        const result = errorToJson(new MyError('Error!'));
        expect(result).toEqual({
            message: 'Error!',
        });
    });
});
