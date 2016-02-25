export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function genKey(className, id=0) {
  var rnd = getRandomInt(1,1000);
  return `${className}_${id}_${rnd}`;
}
