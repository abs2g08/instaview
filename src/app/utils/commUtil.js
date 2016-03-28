export function getRandomInt(min, max) {
  if(min > max) {
    throw 'min must be <= max value';
  }
  return Math.floor(Math.random() * (max - min)) + min;
}

export function genKey(className, id=0) {
  if(!className) {
    throw 'please supply a class name';
  }
  var rnd = getRandomInt(1,1000);
  return `${className}_${id}_${rnd}`;
}

/*
   WARNING: Horrible temporary hack!!!
   fixes weird bug when rending react server side
   where store doesn't update view when action is fired in
   componentDidMount method.

   TO-DO: Need to research this some more
*/
export function isomorphicFix(callback) {
  window.setTimeout(callback, 0);
}
