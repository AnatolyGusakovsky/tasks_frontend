#Monarch
**Folders:**

components: Contains reusable UI components organized by feature or functionality. Common components are stored in the "common" subfolder.

containers: Holds container components responsible for fetching data and passing it down to presentational components.

pages: Represents different pages/routes of the application. Each page typically corresponds to a route and may consist of one or more components.

api: Houses API utility functions responsible for making HTTP requests to backend services.

actions: Contains action creators responsible for triggering changes to the application state.

reducers: Holds reducers responsible for managing specific slices of the application state.

store: Contains the Redux store configuration.

utils: Stores utility functions or helper classes used throughout the application.

styles: Contains SCSS files for styling the application, including variables, mixins, and global styles.

assets: Holds static assets such as images and fonts.
(2) In the above problem let us suppose
routes: Contains the routing configuration of the application.

index.js: Entry point of the application.

App.js: Main component of the application.

config.js: Configuration settings for the application.





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
