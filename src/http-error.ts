import { HierarchicalContextItem, HierarchicalContextItemOrAny } from './hierarchical-context-item';
import { HierarchicalError } from './hierarchical-error';

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

    constructor(
        message: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        context?: any,
        cause?: HierarchicalContextItemOrAny,
        details?: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data?: any;
            statusCode?: number;
            statusText?: string;
        }
    ) {
        super(message, context, cause);
        this.data = details?.data;
        this.statusCode = details?.statusCode;
        this.statusText = details?.statusText;
    }

    toJSON(): HttpContextItem {
        return {
            data: JSON.stringify(this.data),
            statusCode: this.statusCode,
            statusText: this.statusText,
            ...super.toJSON(),
        };
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHttpError = (error: any) => error instanceof HttpError;
