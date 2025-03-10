export interface HierarchicalContextItem {
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cause?: HierarchicalContextItem | any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context?: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HierarchicalContextItemOrAny = HierarchicalContextItem | any;
