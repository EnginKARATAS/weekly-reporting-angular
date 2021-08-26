export interface Row{
    report_id: number,
    week_name: string,
    week_id: number,
    code: number,
    matter: string,
    start_date: Date,
    finish_date: Date,
    is_timeout: boolean,
    scheduled_completion_date: Date,
    weekly_time_spent: Date,
    status: boolean,
    comments: string,
    actions: string,
    claimants: string
}