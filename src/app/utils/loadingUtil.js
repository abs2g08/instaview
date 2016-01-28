export function loading(store, state = true) {
  store.setState({
    loading: state
  });
};
