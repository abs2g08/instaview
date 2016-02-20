import config from '../config';
import express from 'express';
import cookieParser from 'cookie-parser';
import { auth, insta, iso } from './controllers';
import session from 'express-session';

const app = express();
const devServer = config.devServer;

app.use(cookieParser());

app.use('/assets', express.static(`${__dirname}/../assets`));

app.use(session({
  secret:'somesecrettokenhere',
  resave: true,
  saveUninitialized: true
}));

insta.initAPI();

// this is where you would initially send users to authorize
app.get('/authorize_user', auth.authorize_user);

// this is your redirect URI
app.get('/handleauth', auth.handleauth);

// check if use is logged in
app.get('/logged_in', auth.logged_in);

app.get('/logout', auth.logout);

// set up Jade
app.set('views', `${__dirname}/../`);
app.set('view engine', 'jade');

app.get('/feed/self', auth.middleware, insta.feed_self);
app.get('/search_user', auth.middleware, insta.search_user);

// front-end routing
app.get('/*', iso.index);

const server = app.listen(devServer.port, ()=> {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Instaview app listening at http://%s:%s', host, port);
});
