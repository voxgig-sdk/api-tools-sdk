import { ApiToolsEntityBase } from '../ApiToolsEntityBase';
import type { ApiToolsSDK } from '../ApiToolsSDK';
import type { Control } from '../types';
import type { Utility, UtilityLoadMatch } from '../ApiToolsTypes';
declare class UtilityEntity extends ApiToolsEntityBase<Utility> {
    constructor(client: ApiToolsSDK, entopts: any);
    make(this: UtilityEntity): UtilityEntity;
    load(this: any, reqmatch?: UtilityLoadMatch, ctrl?: Control): Promise<UtilityEntity>;
}
export { UtilityEntity };
