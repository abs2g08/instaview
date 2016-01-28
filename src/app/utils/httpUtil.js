export function redirect403(code) {
  if(code === 403) {
    window.location.href = '/home';
  }
};
