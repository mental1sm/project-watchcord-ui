/**
 * Fetching options
 * limit - message count
 * after - fetch after message with specified id
 * before - fetch before message with specified id
 * around - fetch before and after message with specified id
 */
export type MessageFetchingOptions = {
    limit?: number;
    after?: string;
    before?: string;
    around?: string;
}