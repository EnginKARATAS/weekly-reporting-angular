export interface Report {
    id: number,
    week_id: number,
    code: number,
    actions: string,
    claimant_id: number,
    claimant_name: string,
    claimant_surname: string,
    comments: null
    finish_date: Date,
    is_timeout: number,
    job_title: string,
    matter: number,
    report_commit_date: Date,
    report_edit_date: Date,
    report_row_entry_id: number,
    scheduled_completion_date: Date,
    start_date: Date,
    status: string,
    weekly_time_spent: number,
    worker_id: number,
    worker_name: string,
    worker_surname: string,
    

}
