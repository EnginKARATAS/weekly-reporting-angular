select r.id, w.worker_name, w.worker_surname, w.worker_email from workers w LEFT JOIN reports r
ON r.worker_id = w.id LEFT JOIN report_row_entries rre
ON rre.report_id = r.id where r.id = 1403