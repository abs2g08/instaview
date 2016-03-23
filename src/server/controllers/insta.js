import request from 'request';
import instagramNode from 'instagram-node';
import { setPagination, respondOrDie } from '../utils';

const api = instagramNode.instagram();

const initAPI = ()=> {
  api.use({
    client_id: '158b444ca0074028bc72049470c0bc81',
    client_secret: 'a471608714dd4a48b44875d74b4c2f7a'
  });
};

/* TO-DO: refactor the following code in a more functional stlye */

const feed_self = (req, res)=> {
  if(req.query.next) {
    if(req.session.next_url) {
      request.get({
        url: req.session.next_url,
        json: true
      }, (err, resp, body)=> {
        setPagination(req.session, body.pagination);

        respondOrDie(err, ()=> {
          res.send({
            medias: body.data
          });
        });
      });
    } else {
      res.send({
        medias: []
      });
    }
  } else {
    api.user_self_feed([], (err, medias, pagination)=> {
      setPagination(req.session, pagination);

      respondOrDie(err, ()=> {
        res.send({
          medias
        });
      });
    });
  }
};

const search_user = (req, res)=> {
  const q = req.query.q;

  /* TO-DO: sanatise and check inputs, add useful errors */
  api.user_search(q, [], (err, users)=> {
    respondOrDie(err, ()=> {
      res.send({
        users
      });
    });
  });
};

export default {
  api,
  initAPI,
  feed_self,
  search_user
};
