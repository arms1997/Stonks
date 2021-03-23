# Stonks

Sometimes it can be overwhelming to research stocks and not know where to look first. With Stonks, as a user you are able to search for specific stock tickers and view a current graph with news correlated to direct changes in the stock values data.

Using a pre-selected delta value, Stonks analyzes the stock data for any significant changes in a set period of time and if a significant change is present, it searches for relevant news in that period of time to display to the user.

Hosted at: www.stonks-lhl.com

\*Disclaimer - We are using the free plans for all of our APIs in use, so it might cause some delay in accessing stock data or retrieving the news. Apologies in advance - if we have reached our max API limits for the day, the page might not render fully.

## Key Features

- Sign up for an account
- Update account info (password, username, phone number, email)
- Search for a stock ticker
- View stock ticker page with stock value graph and correlated news to that specific stock ticker
- Hover over graph on highlighted areas to view relevant news that has been found for that area of significant change
- Real time chat rooms for stock ticker pages and general chat room on user's page
- Like stock tickers
- Watch stock tickers for specific value ($)

## Tech Stack

### Front End

React | Axios | Material UI | SASS | Firebase Auth

### Back End

Node.js | Express | Socket.IO

### Database

postgreSQL

## Getting Started

- You will need **two** terminal windows/tabs for running this application
- In the first terminal `cd` into `client` and run ` yarn` for `npm install` to install all of the dependencies. Then run `npm start ` or `yarn start` and go to <localhost:8008/> in your browser.
- In the second terminal `cd` into `backend` and run ` yarn` for `npm install` to install all of the dependencies. Then run `npm start ` or `yarn start` to start the server.

## Dependencies

### Client

- Node 10.x or above
- NPM 6.x or above
- @agney/react-loading: ^0.1.2
- @fortawesome/fontawesome-svg-core: ^1.2.35
- @fortawesome/free-solid-svg-icons: ^5.15.3
- @fortawesome/react-fontawesome: ^0.1.14
- @material-ui/core: ^4.11.3
- @material-ui/icons: ^4.11.2
- @material-ui/lab: ^4.0.0-alpha.57
- axios: ^0.21.1
- firebase: ^8.3.0
- local-storage: ^2.0.0
- moment: ^2.29.1
- node-sass: 5.0.0
- react: ^17.0.1
- react-dom:^17.0.1
- react-router-dom: ^5.2.0
- react-scripts: 4.0.3
- react-spring: ^8.0.27
- react-vis: ^1.11.7
- socket.io-client: ^4.0.0

### Backend

- body-parser: 1.19.0
- chalk: 4.1.0
- cors: 2.8.5
- dotenv: ^8.2.0
- express: ^4.17.1
- moment: ^2.29.1
- newsapi: ^2.4.1
- nodemon: ^2.0.7
- pg: ^8.5.1
- request: 2.88.2
- request-promise: ^4.2.6
- socket.io: ^4.0.0

### API Keys Required

- Alpha Vantage Key
- News API Key
- HyperCharts Key

### Firebase

- Create a new Firebase project and include environment variables for user authentication set up.
- Select Email/Password for Sign-In method

## Screenshots

### About Page

!["About Page"](https://github.com/arms1997/Stonks/blob/master/docs/aboutpage.gif)

### User Landing Page

!["User Landing Page"](https://github.com/arms1997/Stonks/blob/master/docs/userlandingpage.gif)

### Ticker Page

!["Ticker Page"](https://github.com/arms1997/Stonks/blob/master/docs/tickerpage.gif)

### Real Time Chat Room

!["Real Time Chat Room"](https://github.com/arms1997/Stonks/blob/master/docs/chatroom.gif)

### Sign Up Form

!["Sign Up Form"](https://github.com/arms1997/Stonks/blob/master/docs/signupform.png)

### Log In Form

!["Log In Form"](https://github.com/arms1997/Stonks/blob/master/docs/loginform.png)

### Forgot Password Form

!["Forgot Password Form"](https://github.com/arms1997/Stonks/blob/master/docs/forgotpasswordform.png)

### Account Settings Form

!["Account Settings Form"](https://github.com/arms1997/Stonks/blob/master/docs/accountsettingsform.png)
