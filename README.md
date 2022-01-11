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
Twitter Bootstrap açık kaynak kodlu, web sayfaları veya uygulamaları geliştirmek için kullanılabilecek araçlar bütünü ve önyüz çatısı. Bootstrap, web sayfaları veya uygulamalarında kullanılabilecek, HTML ve CSS tabanlı tasarım şablonlarını içerir. [10]
NPM:
Npm javascript betik dili için geliştirilmiş olan ve Node.js'in standart olarak kabul ettiği bir paket yönetim sistemidir. npm komut satırından çalıştırılır ve uygulamalar için bağımlılık yönetimi sağlar. [11]
Visual Studio Code nedir?
Visual Studio Code Microsoft tarafından Windows, Linux ve MacOS için geliştirilen bir kaynak kodu düzenleyicisidir. Hata ayıklama, gömülü Git kontrolü, sözdizimi vurgulama, akıllı kod tamamlama, snippet'ler ve kod yeniden yapılandırma desteği içerir. [12]

Project name: KATANA REPORTING
Purpose of the project: Katana Reporting is a platform where employees can submit their reports and managers can manage these reports.
Project need:
  Before the Katana Reporting project, users were opening a new excel sheet to submit their weekly reports to the manager. On this page, they were filling in the fields one by one, following the template set by the administrators. These created excel files were delivered to the managers via email. This process is very costly for users. It is aimed that users can access the Katana Reporting application from their web browsers with their login information and transmit their reports quickly to the manager.

