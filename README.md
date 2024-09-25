##The Inspiration
Stock trading is something that everyone, whether recently or in the past, has wanted to get into. However, fear and frustration are the two main factors that prevent people from pursuing that course. Trading Docks attempts to allay the negative feelings towards day trading by providing users with a FREE online trading algorithm application, built and designed for the average user.

The Function
Trading Docks provides users with multiple customizable, personal trading algorithms built from scratch to allow for easily manageable logging and data analysis. Trading Docks takes your algorithm, compiles it and executes it on our server, logging every step along the way for you to look back and reflect on the current state of the market.

The Build
Using a ReactJS front-end with a NodeJS environment using TypeScript, Trading Docks was built by a team of 3 Computer Science Bachelors students at the University of Texas at Dallas. Our back-end sports a custom API for front-to-back communication along with wrappers and hooks around MongoDB and Axios to allow for a more seamless integration with all our tools.

Frontend
Customized Login System
In order to more cohesively build our application with all the functionality we needed, our team decided to build a customized login system with built-in client-side caching for added convenience. Doing this allows the user to continue browsing the website without the hassle of logging in again and again. Additionally, it provides faster load times to improve the user's experience when writing their algorithms.

Backend
Custom Language Compiler
Using a customized compiler in Python 3, we created a customized compiler schema for our simple, intuitive language to create intelligent API calls to our market-data provider. The compiler allowed us to not only convert our code to expanded Python, but it provided us the tools to integrate it into single-instance executions.

Cohesive Server & API
In order to expedite the production process and simplify the data-management process, we decided to host our API and our web-server on the same NodeJS instance for increased functionality. In addition to essential tools and technologies on the back-end, we designed an all-in-one back-end hook for full-stack communication with the Website, API and Database.

The Challenges
Because we had to create our own compiled language, we used Python 3 to create compilation schemas for our language. Since this technology was new to us, it took most of the back-end's development time throughout the hackathon. Another challenge was figuring out how to create and store the scripts on our back-end. While we did have many options, the easiest solution was to store the uncompiled code on MongoDB and run a single-instance script on our web-server for full functionality.

no experience with language compilation algorithms and techniques
little experience with full-stack application creation
little experience with language integration for Python & TypeScript
Accomplishments
Since about 60% of our work-load was based in back-end setup, lots of effort was put into the front-end to improve visual aesthetic, functionality and the user's experience. We created a custom login authentication system with built-in caching to waive the need to log-in on every refresh. Additionally, we wanted to keep the UI simple and unique. In the spirit of HackUTD's Seven-seas theme, we went for an oceanic design and color scheme. In the end, our application functioned completely as expected, and we were extremely proud to have worked on such a big project.

fully-functional compiler for our custom syntax
immaculate website design and visual aesthetic
detailed and expandable database integration
The Take-away
As our first hackathon, we think that our project was a great success. All of us worked incredibly hard (especially since we worked the whole 24 hours) and are very proud to have accomplished something this big in such a short amount of time.

