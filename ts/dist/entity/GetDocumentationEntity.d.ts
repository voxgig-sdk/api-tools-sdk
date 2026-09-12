import { ApiToolsEntityBase } from '../ApiToolsEntityBase';
import type { ApiToolsSDK } from '../ApiToolsSDK';
import type { Control } from '../types';
import type { GetDocumentation, GetDocumentationListMatch } from '../ApiToolsTypes';
declare class GetDocumentationEntity extends ApiToolsEntityBase<GetDocumentation> {
    constructor(client: ApiToolsSDK, entopts: any);
    make(this: GetDocumentationEntity): GetDocumentationEntity;
    list(this: any, reqmatch?: GetDocumentationListMatch, ctrl?: Control): Promise<GetDocumentationEntity[]>;
}
export { GetDocumentationEntity };
