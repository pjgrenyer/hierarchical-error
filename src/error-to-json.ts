import { HierarchicalContextItemOrAny } from './hierarchical-context-item';

export const errorToJson = (error: unknown): HierarchicalContextItemOrAny => {
    if (Object.prototype.hasOwnProperty.call(error, 'toJSON')) {
        const e = error as { toJSON(): HierarchicalContextItemOrAny };
        return e.toJSON();
    } else if (error instanceof Error) {
        const e = error as Error;
        return { name: e.name, message: e.message, stack: e.stack, cause: e.cause };
    }
    return `${error}`;
};
