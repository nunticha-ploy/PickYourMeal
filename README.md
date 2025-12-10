Phase 2:
-  Define data structure (Entities and their relationship)
-  Created JSON files with example data for all entities (menuItem is a dataset from kaggle)
-  Created directory for each entities
-  Implement required middleware in server.js
-  Created middleware for validation rules (create-menuItems-rules and update-menuItems-rules for menuItems,create-user-rules and update-user-rules for users, create-bookmarks-rules and update-bookmarks-rules)
-  Connect database with mongoDB and create MenuItemSchema and userSchema in menuItems-model
-  Implement logic by call MenuItemItemModel (Get all menu items, get menu item by id, create new menu items, update menu item details and delete menu items)
-  Implement logic by call userModel (Get all users, get user by id, create new user, update user details and delete user)
-  Implement logic create new bookmark call userModel and createBookmarkRules
-  Create check validation use express-validator
-  Test all routes

Phase 3:
-  Routes in menuItems (get filter choices for check box, get data by query search + filter, get random menu + filter)
-  Routes in users (create new bookmarks, add menu item into bookmarks)
-  Test all routes
*note* still need (remove menu item, update bookmark name)

Phase 4:
- Routes for remove menu item out of bookmark
- Create directory for backend and frontend
- Setup frontend directory 
- Create RegisterPage (create new user)
- Create BrowserRoute in App.jsx
- Test create user account and check data in MongoDB

Phase 5:
- Identify Features & Assign Access Roles
- Add Token-Based Authentication with Email-Based MFA
- Add Role-Based Access Control (RBAC)
- Update Backend Routes for authorization
- Add Authentication Flow in Frontend but logout still not working
- Change error return type 
- Test Register and Login with valid and invalid credentials
