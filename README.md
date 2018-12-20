# ClassManager
Users of spreadsheets such as Microsoft Excel, Google Sheets and Apple's Numbers, who don't have a background of working with technology may find overwhelming to see so many features in display since it's not a main part of their job to use them and yet they become handy to keep track of their data. It's very likely that users of spreadsheets are interested on using them as a database for very specific purposes. This application will facilitate the tasks of an elementary school teacher related to the management of records of his/her students. The project is intended to become a feasible solution for a bigger scope of users in future versions. However, it'll start as a personal project that will satisfy the needs of one of my family members, with whom I've had interviews over the required functionality that this project must include.

## Technologies Involved
> **Warning:** This small paragraph contains a little bit of history about the project, please skip it if you're only interested on the technical content. 

I started to ideate this project at the ending of my freshman year (May 2017). However, back then I had zero knowledge about Database Management Systems and front-end technologies. The initial plan was to develop a Windows Forms Application in Visual Studio 2015, using the visual components that the IDE provides for such template, and the database was supposed to be a bare text file. I started learning Visual Basic during the Summer that followed and, after a while, I decided that I wanted to wait to take my databases course from college instead of getting ahead of it to save time and spend it on my competitive programming training. So here I am, after finishing my sophomore year I have taken the Databases course and I've had the chance to work with front-end technologies as part of Hackathon and Internship projects from last Summer (2018).

The architecture will be divided in three parts:
- Front-end
- Server
- Database Management System (DBMS)

As of today (September 9, 2018), the following sections describe the role of each part as it's *intended*, as well as reasons to use the technologies mentioned below instead of their counterparts. Such choices may change over the next two weeks as I start experimenting with feasibility of connecting them.

### Front-end
The front-end will be developed in JavaScript, using Facebook's [React](www.reactjs.org) library for the web components. I will not use Angular since I considered that React was more fit for a small project like mine.

### Server
The server side is supported by [Heroku](www.heroku.com). I'm planning to implement it with Python (3.7), with the idea in mind about scaling the project to feature Machine Learning insights on collected data. This escalation will be subject to users' demand but since this is an area where I'd like to grow in my future, I'm saving space for it in this project. The server's function will be that of connecting the front-end with the DBMS.

### Database Management System
The DBMS will probably be [PostgreSQL](www.postgresql.org) since it's the one that I know that has an add-on for Python in Heroku.

## Project Management
The methodology that I'll be using for the development of this project is Scrum. Sprints and User Stories will be found [here](https://artharenas.visualstudio.com/ClassManager) as soon as the choice of technologies is clear (by December 23rd).
