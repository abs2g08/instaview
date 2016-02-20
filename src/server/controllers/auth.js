import config from '../../config';
import { initAPI, api } from './insta';

const devServer = config.devServer;

const redirect_uri = `http://${devServer.host}:${devServer.port}/handleauth`;

const authorize_user = (req, res)=> {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
};

const handleauth = (req, res)=> {
  api.authorize_user(req.query.code, redirect_uri, (err, result)=> {
    if (err) {
      console.log(`Access token error: ${err.body}`);

      res.send({
        errorMsg: err.body
      });
    } else {
      console.log(`Access token is: ${result.access_token}`);

      req.session.access_token = result.access_token;
      req.session.user = result.user;
      res.redirect('/home');
    }
  });
};

const logged_in = (req, res)=> {
  if (req.session.access_token) {
    const user = req.session.user;
    res.send({ status: true, user});
  } else {
    res.send({
      status: false,
      user: null
    });
  }
};

const logout = (req, res)=> {
  req.session.access_token = null;
  req.session.user = null;
  initAPI();
  res.redirect('/home');
};

const middleware = (req, res, next)=> {
  console.log(`session: ${req.session.access_token}`);
  if (req.session.access_token) {
    api.use({
      access_token: req.session.access_token
    });
    next();
  } else {
    res.status(403).send({
      errorMsg: 'Please login first'
    });
  }
};

export default {
  authorize_user,
  handleauth,
  logged_in,
  logout,
  middleware
}
