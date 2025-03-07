interface HierarchicalContextItem {
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cause?: HierarchicalContextItem | any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context?: any;
}

export class HierarchicalError extends Error {
    readonly cause;
    readonly context;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(message: string, context?: any, cause?: any) {
        super(message);
        this.cause = cause;
        this.context = context;
    }

    toContextJson = (): HierarchicalContextItem => ({
        message: this.message,
        context: this.context,
        cause: this.cause instanceof HierarchicalError ? this.cause.toContextJson() : this.cause,
    });
}
