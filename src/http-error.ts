import { errorToJson } from './error-to-json';
import { HierarchicalContextItem, HierarchicalContextItemOrAny } from './hierarchical-context-item';
import { HierarchicalError, isHierarchicalError } from './hierarchical-error';

interface HttpContextItem extends HierarchicalContextItem {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    statusCode?: number;
    statusText?: string;
}

export class HttpError extends HierarchicalError {
    readonly data;
    readonly statusCode;
    readonly statusText;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(message: string, context?: any, cause?: HierarchicalContextItemOrAny, details?: { data?: any; statusCode?: number; statusText?: string }) {
        super(message, context, cause);
        this.data = details?.data;
        this.statusCode = details?.statusCode;
        this.statusText = details?.statusText;
    }

    toJSON = (): HttpContextItem => ({
        message: this.message,
        context: this.context,
        data: JSON.stringify(this.data),
        statusCode: this.statusCode,
        statusText: this.statusText,
        cause: isHierarchicalError(this.cause) ? this.cause.toJSON() : errorToJson(this.cause),
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHttpError = (error: any) => error instanceof HttpError;
