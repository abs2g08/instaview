export function redirect403(code, win) {
  if(!code) {
    throw 'please supply an error code';
  }
  if(!win) {
    throw 'please supply a window object';
  }
  if(code === 403) {
    win.location.href = '/';
  }
};
