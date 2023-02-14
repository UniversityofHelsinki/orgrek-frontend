# Getting Started with Orgrek frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Environment variables

Place environment variables in .env.development.local file (create it if it does not exist)
Add these environment variables to file :

REACT_APP_ORGREK_BACKEND_SERVER=

Value to run the project with api-gateway backend:

http://localhost:8080

Value to run the project with local json server backend:

http://localhost:3003

REACT_APP_ORGREK_LOGIN=https://organisaatiorekisteri-dev.it.helsinki.fi/Shibboleth.sso/Login

## Available Scripts

In the project directory, you can run:

### `yarn dev` or `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn start:server` or `npm run start:server`

Starts the local json server, if you are aiming to use api-gateway server you should run the backend project separately.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Code Style

The code is formatted automatically with [Prettier](https://prettier.io/).
There are several ways to run the formatter:

- automatically on save file by IDE
- automatically by a pre-commit hook
- manually from command line by executing `npm run format`

Most text editors have built-in support for Prettier, so refer to the documentation of your favorite tool.

The pre-commit hook runs both ESLint and Prettier on staged files when you do a git commit.
The hook is installed automatically after running `npm install`.

### Using Prettier in IntelliJ IDEA

In IDEA, two steps are needed:

- [Apply Prettier code style](https://www.jetbrains.com/help/idea/prettier.html#ws_prettier_apply_code_style) from the banner appearing on top of `package.json`
- [Enable run automatically on save](https://www.jetbrains.com/help/idea/prettier.html#ws_prettier_run_automatically_in_current_project).
  Check that the file pattern includes all desired files, e.g. `{**/*,*}.{js,jsx,json,css,html,yml,md}`

## Storybook

Storybook is a UI component development tool and also serves as documentation for all custom components and
the Material UI theme.
See [Introduction](https://storybook.js.org/docs/react/get-started/introduction) in Storybook docs.

To open Storybook in browser, run:

```bash
npm install
npm run storybook
```

Storybook fetches translations from the local backend using the same configuration as the main app,
so `orgrek-backend` must also be running, and the required auth headers must be mocked in the browser as with the
main app.

Storybook is used primarily for component development. Whole pages should still be tested using the main app.
You can run both the main app and Storybook at the same time,
and all code changes are reloaded in both automatically.

### Updating Storybook dependencies

Storybook has its own migration tool `npx storybook upgrade` which should be used for updating Storybook packages.
See [Upgrading Storybook](https://storybook.js.org/docs/react/configure/upgrading)

## JSON server

The JSON server runs mock api using the db.json-file as database.

You can make GET, POST, PUT, PATCH and DELETE requests to the mock database. You should include the `Content-Type: application/json` header to your requests to ensure the changes are made to data.

### Adding new endpoints or data

**When creating new mock endpoint or adding data ensure your formatting matches the one coming from the actual database or, in case of yet inexistent endpoint, what have been planned** - switching between mock and actual database should not cause any disturbances on component behavior.

Adding new data is done by adding new JSON objects to the db.json-file.

To create a new endpoint customize one matching your needs to the routes.json-file. Read more from [JSON server custom routes documentation.](https://github.com/typicode/json-serverr#add-custom-routes)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### JSON server

JSON server documentation: [https://github.com/typicode/json-server](https://github.com/typicode/json-server)

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
