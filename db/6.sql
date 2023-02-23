  select r.id, wee.week_id, w.worker_name, w.worker_surname, w.worker_email from workers w 
  inner JOIN reports r ON r.worker_id = w.id 
  Left join weeks wee ON r.week_id = wee.id
  left JOIN report_row_entries rre ON rre.report_id = r.id where r.id = 1402
		