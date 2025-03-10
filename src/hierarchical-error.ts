import { errorToJson } from './error-to-json';
import { HierarchicalContextItem } from './hierarchical-context-item';

export class HierarchicalError extends Error {
    readonly cause;
    readonly context;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(message: string, context?: any, cause?: HierarchicalContextItem | any) {
        super(message);
        this.cause = cause;
        this.context = context;
    }

    toJSON = (): HierarchicalContextItem => ({
        message: this.message,
        context: this.context,
        cause: isHierarchicalError(this.cause) ? this.cause.toJSON() : errorToJson(this.cause),
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHierarchicalError = (error: any) => error instanceof HierarchicalError;
