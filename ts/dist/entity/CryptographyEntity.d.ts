import { ApiToolsEntityBase } from '../ApiToolsEntityBase';
import type { ApiToolsSDK } from '../ApiToolsSDK';
import type { Control } from '../types';
import type { Cryptography, CryptographyCreateData } from '../ApiToolsTypes';
declare class CryptographyEntity extends ApiToolsEntityBase<Cryptography> {
    constructor(client: ApiToolsSDK, entopts: any);
    make(this: CryptographyEntity): CryptographyEntity;
    create(this: any, reqdata?: CryptographyCreateData, ctrl?: Control): Promise<CryptographyEntity>;
}
export { CryptographyEntity };
