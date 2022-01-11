#weekly-reporting-angular
weekly reporting app, track workers weekly activities



#Project Introduction

The name of my project is “Katana Reporting” and it is a reporting management system in general. Users can easily enter their weekly reports into the system in the desired format, and the administrator can easily manage these mails entered by the users, send revision mails, add comments to the revision message, etc. can fulfill many functions.
The project is written with frontend angular, backend nodejs. The project is live on the apache server and the stability of the backend is provided by the pm2 server. The project has a responsive design. Users who visit the system via both mobile and web browsers are facilitated. Mysql is used as database and all technologies work on ubuntu server. No ORM tool is used and all queries are written in T-SQL helper language.

![image](https://user-images.githubusercontent.com/43602725/148954494-1984219f-083f-4a4b-aa00-266d78710a45.png)

Requirements Analysis:
There are weekly activity reports that all employees fill out and send on a weekly basis. This weekly activity report is a laborious task that is prepared manually in Excel. It is aimed to transfer this to an online environment and to create a system where users can easily send their weekly reports.

Şekil 2 - Excellde veri düzenlemenin ne kadar karmaşık olduğunu gösteren bir görsel
![image](https://user-images.githubusercontent.com/43602725/148954969-041f867c-b4ee-4a0d-881a-38c9cfbf807c.png)

As can be seen in Table 1, there is a title section about who belongs to the weekly report and lines where employees can enter each of their weekly work. The user is perhaps copying the lines and changing the places they need to change one by one. Continuation holds a lot of information about the status of the row, such as closed. This needs to be prevented. Because although I filled out this report from the first week, the employees fill out this report every week. For example, the fact that 100 employees do this boring job and lose time will also affect the performance of the companies. For example, I spend an average of 20 minutes on this report. If we consider this as 100 employees, a total of 33 hours per week is wasted.
What technologies could be used in this project?
FRONTEND
• React
• Vue
• Angular
BACKEND
• .Net Core
• Spring Boot
• Django
• Nodejs
Why Angular?
Angular framework will be used as it is requested to make this action very easy for users.
While developing, a lot of information was needed. Therefore, CRUD APP projects made with angular were examined.
When the Angular structure is examined, it is seen that it makes requests to services in general and makes CRUD operations from these requests. After watching the Deborah Kurata Angular Getting Started course, she started working on the internship project.

It was decided that login processes should also be included in the project. Because users should be able to log in to the system and only deal with their own reports.
Why Nodejs?
Node.js is a free and open source server-side framework. It can be used on Windows, Linux, Unix, macOS and many operating system architectures without any problems.
With Node.js, which uses JavaScript on the server side, you can develop web-based projects and produce web software that provides solutions to real-time needs.
Node.js is one of the most frequently used frameworks for software developers on the Internet. It may even be the most preferred framework. It has important advantages such as providing high performance, being easily scalable, shortening the process between the visitor and the server.
Software/Hardware Tools Used in the Project
Angular:
Angular is a modern JavaScript framework developed and supported by Google. Angular, which makes it possible to write single-page applications, provides development with the MVC design pattern.[1]
NodeJs:
Node.js is an open-source, server-side runtime environment for networked applications. Node.js applications are typically developed using JavaScript, a client-side scripting language. [2nd]
MYSQL:
MySQL is a multi-threaded, multi-user, fast and robust database management system installed on more than six million systems. While it is distributed free of charge for UNIX, OS/2 and Windows platforms, there is also a paid license option for those who want to use a commercial license. [3]

ExpressJs:
Express.js Node.js based web application server framework. Express.js is designed for developing single-page, multi-page and hybrid web applications. Express.js is also one of the components of the MEAN software bundle. [4]
TypeScript:
TypeScript is a free and open source programming language. TypeScript developed and supported by Microsoft; Thanks to the compiler it contains, it converts the written code to JavaScript code. TypeScript can be used in both client-side and server-side software development. [5]
PM2:
Translated from English-PM2 is a transaction manager for the JavaScript runtime Node.js. In 2016, PM2 was named the 82nd most popular JavaScript project on GitHub. [6]
Ubuntu:
Ubuntu is a free and free operating system based on Linux. It is developed for computers, servers and smartphones. [7]
Apache Server
Apache is an open source and free Web server program. It is developed by the Apache Software Foundation. It can run on Unix, GNU, FreeBSD, GNU/Linux, Solaris, Novell NetWare, Mac OS X, Microsoft Windows, OS/2, TPF and eComStation operating systems. [8]
RxJS:
RxJS is a reactive programming library written in JavaScript where you can convert events and data sources into subscriptable objects, perform transformations on them with the help of operators, and consume the result through observers. [9]

Bootstrap:
Twitter Bootstrap is open source, a suite of tools and frontend framework that can be used to develop web pages or applications. Bootstrap contains HTML and CSS based design templates that can be used in web pages or applications. [10]
NPM:
Npm is a package management system developed for the javascript scripting language and accepted as a standard by Node.js. npm is run from the command line and provides dependency management for applications. [11]
What is Visual Studio Code?
Visual Studio Code is a source code editor developed by Microsoft for Windows, Linux and MacOS. It includes support for debugging, embedded Git checking, syntax highlighting, smart code completion, snippets, and code refactoring. [12]

Project name: KATANA REPORTING
Purpose of the project: Katana Reporting is a platform where employees can submit their reports and managers can manage these reports.
Project need:
Before the Katana Reporting project, users were opening a new excel sheet to submit their weekly reports to the manager. On this page, they were filling in the fields one by one, following the template set by the administrators. These created excel files were delivered to the managers via email. This process is very costly for users. It is aimed that users can access the Katana Reporting application from their web browsers with their login information and transmit their reports quickly to the manager.

5. Requirements to be included in the Project:
It is to deliver the weekly report entered by the user to the administrator. For this reason, users should be able to edit and send their own weekly reports. In this time period, it should save as clean data as possible to the database, so form validation processes should be provided in the best way.
![image](https://user-images.githubusercontent.com/43602725/148956118-fd043d5c-1954-4e11-8cd8-11c2d809c51a.png)

figure 5.1 user reports

![image](https://user-images.githubusercontent.com/43602725/148956200-7e64aef5-7f0d-4fdf-a053-10e3ad0363b2.png)

figure 5.2 user report details

![image](https://user-images.githubusercontent.com/43602725/148956245-7688d883-51a2-4326-ad4d-730b586516d5.png)

figure 5.3 user can send reports

![image](https://user-images.githubusercontent.com/43602725/148956281-54788d32-1421-4089-a6df-0cc271eefdb0.png)

figure 5.4 user have to credentials

![image](https://user-images.githubusercontent.com/43602725/148956313-ffd390cf-5454-4a75-aa07-5676fa09da37.png)

The administrator, on the other hand, should be able to request, view and edit these submitted reports again.

Reports can have multiple rows and the fields of each row are as seen in table 3.
Table 3
• Sequence Number (expected to increase as the number of lines increases)
• Severity (Scored from 1 to 5)
•	Starting date
• End Date
• Works / Actions
• Requestor
• Scheduled Completion Date
• Timeout/Timeout Yes-No

• Status / Status
• Comments/Suggestions
5.1 User Actions:
After logging into the system, the user should be able to see their weekly reports. When he wants to go to the details of the report he wants, he should be able to go.
The user should be able to create a report for a particular week by entering the week number he wants to add into the system and fill in it.
After the staff finishes and adds the report, the manager should be notified by e-mail. In the subject part of the mail to be sent to the administrator, "<Year.week no>.Report. <Personnel name>” should be written.
If user should be able to submit weekly reports. If it did, it shouldn't be able to add newlines.
5.2 Admin Actions:
After logging into the system, the administrator should be able to see the reports of all employees.

Figure 5.2.1 Admin reports display screen
  
![image](https://user-images.githubusercontent.com/43602725/148958152-a2374a23-0df7-4086-bd7d-c90d3295f796.png)

It should be able to search the reports of the employees, and be able to sort them according to the sending status.

Figure 5.2.2 Report filtering options

![image](https://user-images.githubusercontent.com/43602725/148956631-f12f82cb-c4f5-46e0-8984-dc783c81db09.png)

After the report is entered and sent to the manager, if the manager finds the information in one of the lines in the report insufficient, he should be able to send the report with an explanation text to the employee with a request for correction.

Figure 5.2.3 Revision comment can be written with the Require revision button.
  
![image](https://user-images.githubusercontent.com/43602725/148956725-552506a2-8dbc-415f-b821-5d1f3ee7f240.png)


When a report correction request is made to the personnel by the manager, the personnel should be notified by e-mail. In the subject part of the mail, "<Week number of the year>.Report.Correction Request" should be written.

When the staff responds to the correction request and reposts the report, an e-mail should be sent to the manager. In the subject part of the mail, “<Week number of the year>.Report. <Staff name>.Revision” should be written.

Figure 5.2.4 The general manager who makes a revision request can send an e-mail by the system as above.
  
![image](https://user-images.githubusercontent.com/43602725/148956785-f9d058e4-0c55-40dc-b872-0620d4973af3.png)

Users will initially be defined as static, on the admin screen. When the manager enters the personnel on the screen, the personnel should be notified by e-mail. You have been invited to the Weekly Report Platform. You can set your password using the link below and start generating a report. When the link to be given in the mail body is clicked, the user should be able to set his own password.

Figure 5.2.5 E-mail register link
  
![image](https://user-images.githubusercontent.com/43602725/148956864-980cb794-796c-4205-8ffc-d2bb6ff8c950.png)

Figure 5.2.6 Diagram of relational tables in the database with mysql workbench and reverse engineering method
  
![image](https://user-images.githubusercontent.com/43602725/148956938-a237df69-6ea8-49ab-b126-165ff237861e.png)


5.3 Shortcomings of the Project:
Some date fields opened in the database are not used. Angular, especially the models, could not be used fully, the lack of this was felt while developing the project. It lacks abstraction techniques. At some points, the RxJS library has been used for state managing. For this reason, one of the best practices of Angular has been waived from the fact that the flow occurs without refreshing the pages. Improvements can be made for these situations in the future.



  PROJECT IMAGES:
![image](https://user-images.githubusercontent.com/43602725/148957143-eba6b65f-4d86-4188-b177-7524aedc0641.png)
![image](https://user-images.githubusercontent.com/43602725/148957171-8b9c47eb-47aa-4670-94a8-3c3eb9f1d215.png)
![image](https://user-images.githubusercontent.com/43602725/148957179-f3c8f8af-82c2-48a4-bf1c-5993059da73f.png)
![image](https://user-images.githubusercontent.com/43602725/148957184-5f4a5dc2-b594-4af2-af9f-36d0d53a0202.png)
![image](https://user-images.githubusercontent.com/43602725/148957214-d217339d-b784-43fa-8fb1-d55a5ef12a08.png)
![image](https://user-images.githubusercontent.com/43602725/148957236-b2177f25-e3f0-4ca2-8d80-1d05579eed62.png)
![image](https://user-images.githubusercontent.com/43602725/148957252-651e2ce0-99fc-46be-844a-e285064c47e5.png)
![image](https://user-images.githubusercontent.com/43602725/148957257-59102f87-0acf-4f26-a03c-6f62b4978ec3.png)
![image](https://user-images.githubusercontent.com/43602725/148957267-517595aa-f77b-4e8b-ba9e-d5ab7cc9ed5e.png)
![image](https://user-images.githubusercontent.com/43602725/148957291-e5511556-0062-4320-9fce-9f7535e87458.png)
Responsive design
![image](https://user-images.githubusercontent.com/43602725/148957361-02861d24-37f8-4d99-be87-ea2706317f00.png)
![image](https://user-images.githubusercontent.com/43602725/148957437-b5db4c69-41d0-4186-8b5e-3f89a573ab64.png)
![image](https://user-images.githubusercontent.com/43602725/148957467-d930d636-6908-4acb-ba72-53dd1ae853f9.png)
  
  REFERENCES:
  1.	Angular (framework) - Vikipedi. https://tr.wikipedia.org/wiki/Angular_(Framework)
2.	NodeJs - Vikipedi. https://tr.wikipedia.org/wiki/Node.js
3.	MYSQL - Vikipedi. https://tr.wikipedia.org/wiki/MySQL
4.	ExpressJs - Vikipedi. https://tr.wikipedia.org/wiki/Express.js
5.	TypeScript - Vikipedi. https://tr.wikipedia.org/wiki/TypeScript
6.	PM2 - Vikipedi. https://en.wikipedia.org/wiki/PM2_(software)
7.	Ubuntu - Vikipedi. https://tr.wikipedia.org/wiki/Ubuntu_(i%C5%9Fletim_sistemi)
8.	Apache Server - Vikipedi. https://tr.wikipedia.org/wiki/Apache_HTTP_Sunucusu
9.	RxJs - Vikipedi. https://en.wikipedia.org/wiki/Reactive_programming
10.	Bootstrap-Vikipedi. https://en.wikipedia.org/wiki/Bootstrap_(front-end_framework)
11. NPM - Vikipedi. https://tr.wikipedia.org/wiki/Npm
12. Vscode - Vikipedi. https://tr.wikipedia.org/wiki/Visual_Studio_Code 
13.	SQL Server – İstatistik – Statistic Nedir?. https://www.cozumpark.com/sql-server-istatistik-statistic-nedir/
14.	SQL Server’da İstatistik Kavramı ve Performansa Etkisi. http://www.veritabani.gen.tr/2016/11/17/sql-serverda-istatistik-kavrami-performansa-etkisi/
15.	SQL Server Statistics Basics. - https://www.red-gate.com/simple-talk/databases/sql-server/performance-sql-server/sql-server-statistics-basics/
16.	Wikipedi - JWT JSON Web Token - Vikipedi (wikipedia.org)
