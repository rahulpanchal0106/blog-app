# Steps to follow for FE Local Environment

-  Make sure you already have blog-app-server listening on port 3000, if not then go through [these](https://github.com/rahulpanchal0106/blog-app-server/blob/main/README.md) steps.
-  And get outside of the server repo
-  Clone the FE repo ``` git clone https://github.com/rahulpanchal0106/blog-app-client.git ```
- Go to the FE directory ``` cd blog-app-client ```
- Install the depenencies ``` npm install ```
- ⚠️⚠️⚠️ IMPORTANT: Add the .env file having ``` VITE_SERVER="http://localhost:3000" ```
- Start the server ``` npm run dev ``` and go to the vite local server, generally at ``` http://localhost:5173/ ```
