import { CryptographyEntity } from './entity/CryptographyEntity';
import { EncodingEntity } from './entity/EncodingEntity';
import { GeneratorEntity } from './entity/GeneratorEntity';
import { GetDocumentationEntity } from './entity/GetDocumentationEntity';
import { ToolEntity } from './entity/ToolEntity';
import { UtilityEntity } from './entity/UtilityEntity';
export type * from './ApiToolsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ApiToolsEntityBase } from './ApiToolsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class ApiToolsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Cryptography(entopts?: Record<string, any>): CryptographyEntity;
    Encoding(entopts?: Record<string, any>): EncodingEntity;
    Generator(entopts?: Record<string, any>): GeneratorEntity;
    GetDocumentation(entopts?: Record<string, any>): GetDocumentationEntity;
    Tool(entopts?: Record<string, any>): ToolEntity;
    Utility(entopts?: Record<string, any>): UtilityEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ApiToolsSDK;
    tester(testopts?: any, sdkopts?: any): ApiToolsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ApiToolsSDK;
export { stdutil, config, BaseFeature, ApiToolsEntityBase, ApiToolsSDK, SDK, };
