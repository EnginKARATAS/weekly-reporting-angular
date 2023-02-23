SELECT r.id, w.id as worker_id,  r.is_report_sended, w.week_name, w.week_id, concat(wo.worker_name, ' ', wo.worker_surname) as worker  FROM reports r INNER JOIN
  weeks w ON r.week_id = w.id INNER JOIN 
  workers wo ON r.worker_id = wo.id INNER JOIN
  report_row_entries rre ON rre.report_id = r.id
   where rre.code = 9859328;
  
  
  