export const errorToJson = (error: unknown) => {
    if (error instanceof Error) {
        const e = error as Error;
        return { name: e.name, message: e.message, stack: e.stack, cause: e.cause };
    }
    return `${error}`;
};
