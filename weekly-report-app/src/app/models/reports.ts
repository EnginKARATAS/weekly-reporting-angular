export interface Report {
   
        id: number,
        matter: number,
        startDate: Date,
        finishDate: Date,
        workDone: string,
        claimant: string,
        scheduledCompletionDate: Date,
        timeout: boolean,
        weeklyTimeSpent: number,
        status: string,
        comments: string,
 
}