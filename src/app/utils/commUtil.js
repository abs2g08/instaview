export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function genKey(className, id=0) {
  var rnd = getRandomInt(1,1000);
  return `${className}_${id}_${rnd}`;
}

/*
   fixes weird bug when rending react server side
   where store doesn't update view when action is fired in
   componentDidMount method
*/
export function isomorphicFix(callback) {
  window.setTimeout(callback, 0);
}
