export function redirect403(code, win) {
  if(code === 403) {
    win.location.href = '/';
  }
};
