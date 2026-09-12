import { ApiToolsEntityBase } from '../ApiToolsEntityBase';
import type { ApiToolsSDK } from '../ApiToolsSDK';
import type { Control } from '../types';
import type { Generator, GeneratorLoadMatch, GeneratorListMatch } from '../ApiToolsTypes';
declare class GeneratorEntity extends ApiToolsEntityBase<Generator> {
    constructor(client: ApiToolsSDK, entopts: any);
    make(this: GeneratorEntity): GeneratorEntity;
    load(this: any, reqmatch?: GeneratorLoadMatch, ctrl?: Control): Promise<GeneratorEntity>;
    list(this: any, reqmatch?: GeneratorListMatch, ctrl?: Control): Promise<GeneratorEntity[]>;
}
export { GeneratorEntity };
