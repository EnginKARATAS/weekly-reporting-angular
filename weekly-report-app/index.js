// const express = require("express");
// const app = express();
// var cors = require("cors");
// app.use(cors());

// app.use(express.json());

// let report = {
//   data: {
//     workerId: 1,
//     reportRows: [
//       {
//         id: 1,
//         matter: 2,
//         startDate: "1.1.1",
//         finishDate: "1.1.1",
//         workDone: "yes",
//         claimant: "GM A",
//         scheduledCompletionDate: "1.1.1",
//         weeklyTimeSpent: 25,
//         status: "Bitti",
//         comments: "Case'de neden sorun ile ilgill geliştirme planlanabilir.",
//       },
//       {
//         id: 1,
//         matter: 2,
//         startDate: "1.1.1",
//         finishDate: "1.1.1",
//         workDone: "yes",
//         claimant: "GM A",
//         scheduledCompletionDate: "1.1.1",
//         weeklyTimeSpent: 25,
//         status: "Bitti",
//         comments: "Case'de neden sorun ile ilgill geliştirme planlanabilir.",
//       },
//     ],
//   },
//   success: true,
//   message: "başarılı",
// };

// app.get("/api/reports", function (req, res) {
//   res.send(reports);
// });

// app.get("/api/reports/:id", (req, res) => {
//   // res.send(req.params);//gives what we gives like parameter: id
//   // res.send(req.query);//?= leri verir sorgulamak için json formatında
//   const report = reports.find((r) => r.id === parseInt(req.params.id));
//   if (!report) res.status(404).send("Verilen id ile ilgili bir kurs yok");
//   res.send(report);
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}`));
