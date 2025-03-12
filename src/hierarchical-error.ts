import { errorToJson } from './error-to-json';
import { HierarchicalContextItem, HierarchicalContextItemOrAny } from './hierarchical-context-item';

export class HierarchicalError extends Error {
    readonly cause;
    readonly context;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(message: string, context?: any, cause?: HierarchicalContextItemOrAny) {
        super(message);
        this.cause = cause;
        this.context = context;
    }

    toJSON = (): HierarchicalContextItem => ({
        message: this.message,
        context: this.context,
        cause: isHierarchicalError(this.cause) ? this.cause.toJSON() : errorToJson(this.cause),
    });

    rootHierarchicalError = (): HierarchicalError => {
        if (isHierarchicalError(this.cause)) {
            return this.cause.rootHierarchicalError();
        }
        return this;
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHierarchicalError = (error: any) => error instanceof HierarchicalError;
