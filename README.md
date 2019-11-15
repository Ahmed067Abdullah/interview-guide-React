# How to setup your local project

## Step # 1:
  Clone the repository and run ```npm install``` in the root directory

## Step # 2: (Firebase setup)
1) Sign in to Firebase and create a new project.
2) In the navigation bar on the left, click the Settings icon, then select Project settings.
3) In the Your apps card, select the nickname of the app for which you need a config object.
4) Select Config from the Firebase SDK snippet pane and copy the config object snippet.
5) locate the config folder inside the src folder and create a new file named firebaseConfig.js in the config folder.
6) paste and export your config object from the file
 ### Example
 ```const config = {
  apiKey: "API_KEY",
  authDomain: "URL",
  databaseURL: "DB_URL",
  projectId: "PROJECT_ID",
  storageBucket: "BUCKET_URL",
  messagingSenderId: "ID",
  appId: "APP_ID",
};

export default config;
```

# How to build and deploy your local project
[Click here](https://www.youtube.com/watch?v=Gl-qlxfTJHE)
