# Eleshopping App

This is my personal project done to fit my needs. The project was started mainly to learn reactjs and tailwind from scratch. Also I needed a recipe / shopping list app and there just weren't any that fit exactly my needs :P

The app can be bundled as a single html file and hosted anywhere and it doesn't require a backend. Configured to use firebase as the database. The whole app is encrypted with [staticrypt](https://github.com/robinmoisson/staticrypt) so your database keys are secured at least from bots.

Note this is not _really_ secure but secure enough for personal needs.

## Features

- Add / Toggle shopping list items (basic todo list functionality)
- Sort shopping list items by dragging
- Add recipes
- Copy recipe ingredients to the shopping list
- Tag recipes to find them easily
- Data is synced live accross all devices (supports multiple users)

## Demo

Here is an online demo to tinker with. https://eleshopping-demo.netlify.app/ Note that the demo uses dummy data and only uses local storage as database. Live updates accross devices require firestore configuration.

## How to run

### `npm install`

Install the required packages.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

## Configuration

All configurations can be found in `.env.example`. Just rename it to `.env` and set your own values. Here are some settings worth mentioning.

```
REACT_APP_useDemoData=true
```

By default we use demodata for tinkering. If you deploy the app just set it to false

```
STATICRYPT_PW=""
```

If you want to deploy encrypted version of the app, set your own password for staticrypt. This will encrypt the whole app in the deployment phase.

## NPM Commands

### `npm run build`

Builds the app for production to the `build` folder.\
If you are using firestore I do not recommend deploying to public internet as all your database keys are bundled in and visible.

### `npm run contain`

Inlines js and css to `index.html`. Use this after build to create self contained index.html.

### `npm run encrypt`

Encrypts `index.html` in `build` folder with [staticrypt](https://github.com/robinmoisson/staticrypt). Now index.html is encrypted and ready to be deployed anywhere. See `.env` to set a secure password for staticrypt.

### `npm run predeploy`

Builds the app, inlines scripts and encrypts index.html
