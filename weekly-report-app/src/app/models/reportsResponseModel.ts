import { Report } from "./reports";
import { ResponseModel } from "./responseModel";

export interface ReportResponseModel extends ResponseModel{
    data: Report[]
}