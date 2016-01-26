const respondOrDie = function(err, resp) {
  if(!err) {
    resp();
  } else {
    res.status(500).send({
      errorMsg: err.error_message
    });
  }
}

const setPagination = function(session, pagination) {
  if(pagination.next_url) {
    session.next_url = pagination.next_url;
  } else {
    session.next_url = null;
  }
}

export {
  respondOrDie,
  setPagination
}
