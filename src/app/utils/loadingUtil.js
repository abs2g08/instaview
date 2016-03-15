export function loading(store, state = true) {
  store.mergeState({
    loading: state
  });
};
