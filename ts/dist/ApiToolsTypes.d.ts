export interface Cryptography {
    algorithm?: string;
    hash?: string;
    text: string;
}
export interface CryptographyCreateData {
    algorithm?: string;
    hash?: string;
    text: string;
}
export interface Encoding {
    decoded?: string;
    encoded: string;
    text: string;
}
export interface EncodingCreateData {
    decoded?: string;
    encoded: string;
    text: string;
}
export interface Generator {
    uuid?: string;
    uuids?: any[];
}
export interface GeneratorLoadMatch {
    length?: number;
    max?: number;
    min?: number;
    type?: string;
}
export interface GeneratorListMatch {
    count?: number;
}
export interface GetDocumentation {
    description?: string;
    endpoint?: string;
    name?: string;
}
export interface GetDocumentationListMatch {
    description?: string;
    endpoint?: string;
    name?: string;
}
export interface Tool {
    category?: string;
    description?: string;
    id?: string;
    name?: string;
}
export interface ToolListMatch {
    category?: string;
    description?: string;
    id?: string;
    name?: string;
}
export interface Utility {
    city?: string;
    country?: string;
    ip?: string;
    iso?: string;
    isp?: string;
    milliseconds?: number;
    timestamp?: number;
    utc?: string;
}
export interface UtilityLoadMatch {
    ip?: string;
}
