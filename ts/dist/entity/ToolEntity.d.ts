import { ApiToolsEntityBase } from '../ApiToolsEntityBase';
import type { ApiToolsSDK } from '../ApiToolsSDK';
import type { Control } from '../types';
import type { Tool, ToolListMatch } from '../ApiToolsTypes';
declare class ToolEntity extends ApiToolsEntityBase<Tool> {
    constructor(client: ApiToolsSDK, entopts: any);
    make(this: ToolEntity): ToolEntity;
    list(this: any, reqmatch?: ToolListMatch, ctrl?: Control): Promise<ToolEntity[]>;
}
export { ToolEntity };
