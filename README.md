# todojwt
Todo list. FullStack application with redux/toolkit, jwt authorization , database postgresql. 
Default configuration for localhost:3000, server PORT:4000, database PORT:7777.
Database uncludes 2 tables:
table users: id , login, password, refresh_id.
table tasks: id, title , done, user_id

Functionality: 
1.Registration user
2. Authorization user
3. Add task
4.Delete task
All save in postgresql.
Refresh_token update every 2min.

Get starting: npm start
