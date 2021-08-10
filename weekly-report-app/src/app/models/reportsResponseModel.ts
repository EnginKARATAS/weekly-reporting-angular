import { Report } from "./reports";
import { ResponseModel } from "./ResponseModel";

export interface ReportResponseModel extends ResponseModel{
    data: Report[]
}