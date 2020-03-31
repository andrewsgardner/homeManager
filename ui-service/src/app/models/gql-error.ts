export interface IGqlError {
    errorMessage: string;
    code: string;
    innerError?: string;
}
