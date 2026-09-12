import { ApiToolsEntityBase } from '../ApiToolsEntityBase';
import type { ApiToolsSDK } from '../ApiToolsSDK';
import type { Control } from '../types';
import type { Encoding, EncodingCreateData } from '../ApiToolsTypes';
declare class EncodingEntity extends ApiToolsEntityBase<Encoding> {
    constructor(client: ApiToolsSDK, entopts: any);
    make(this: EncodingEntity): EncodingEntity;
    create(this: any, reqdata?: EncodingCreateData, ctrl?: Control): Promise<EncodingEntity>;
}
export { EncodingEntity };
