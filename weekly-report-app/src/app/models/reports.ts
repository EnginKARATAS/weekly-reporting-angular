export interface Report {
    id: number,
    week_id: number,
    report_date: Date
    code: number,
    matter: number,
    start_date: Date,
    finish_date: Date,
    actions: string,
    claimant_id: number,
    claimant_name: string,
    claimant_surname: string,
    comments: string
    is_timeout: number,
    job_title: string,
    report_commit_date: Date,
    report_edit_date: Date,
    report_row_entry_id: number,
    scheduled_completion_date: Date,
    status: string,
    weekly_time_spent: number,
    worker_id: number,
    worker_name: string,
    worker_surname: string,
}
