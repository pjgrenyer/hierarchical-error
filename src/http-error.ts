import { HierarchicalContextItemOrAny } from './hierarchical-context-item';
import { HierarchicalError } from './hierarchical-error';

export class HttpError extends HierarchicalError {
    readonly data;
    readonly statusCode;
    readonly statusText;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(message: string, data?: any, statusCode?: number, statusText?: string, context?: any, cause?: HierarchicalContextItemOrAny) {
        super(message, context, cause);
        this.data = data;
        this.statusCode = statusCode;
        this.statusText = statusText;
    }
}
