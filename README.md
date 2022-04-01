This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to Update the Version Release Number

1. Go to the versionReducer.js file in the src -> reducers folder
2. Update:
	```
	Const initialState -> version: "X.X"
	```
3. The first digit should be incremented if a new analysis (sidebar tab) is added to the MHPAEA Tool
4. The second digit should be incremented if a minor feature or bug fix is implemented

## Essential extensions for VS Code

1. esbenp.prettier-vscode
2. formulahendry.auto-close-tag
3. hex-ci.stylelint-plus
4. dbaeumer.vscode-eslint
5. naumovs.color-highlight
6. DigitalBrainstem.javascript-ejs-support

## To setup Chrome Debugger for VS Code

https://code.visualstudio.com/docs/nodejs/reactjs-tutorial

1. Download Debugger for Chrome extension in VS Code
2. Configure the debugger.
   - Go to the Run view (Ctrl+Shift+D) and click create a launch.json file to customize Run and Debug.
   - Choose Chrome from the Select Environment drop-down list. This will create a launch.json file in a new .vscode folder in your project which includes a configuration to launch the website.
   - Change the port of the url from 8080 to 3000.
3. Ensure that your development server is running (npm start).
4. Press F5 or the green arrow to launch the debugger and open a new browser instance.
5. The source code where breakpoints are set runs on startup before the debugger was attached, so we won't hit breakpoints until we refresh the web page.
6. Refresh the page and you should hit your breakpoint.

## To setup a fake API for frontend development

https://www.pluralsight.com/guides/fetch-data-from-a-json-file-in-a-react-app

1. Add two JSON files (submit.json and upload.json) to the public folder
2. Comment IN API fetches in UploadButton.js and SubmitButton.js

## To setup WAVE (Chrome Web Accessibility Extension)
1. Download WAVE from chrome store
2. https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh?hl=en-US
3. Open the MHPAEA Tool in a Chrome browser window
4. Open the WAVE extension in Chrome
5. A window should appear with results of the tool's web accessibility results

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
Also see the section about testing @ https://testing-library.com/docs/react-testing-library/intro

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
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

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
