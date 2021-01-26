import { BaseModel } from "src/app/_metronic/shared/crud-table";

export interface MaintScheme extends BaseModel {
    maintSchemeId: number;
    id: number;
    maintSchemeActive: number;
    maintSchemeCode: string;
    maintSchemeName: string;
    costPerVisit: number;
    intervalOfVisit: number;
    maintSchemeRemark: string;
    dtCreated: Date;
    dtDeleted: Date;
    personDeleted: number;
}