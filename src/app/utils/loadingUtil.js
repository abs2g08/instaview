export function loading(store, state = true) {
  //TO-DO: show spinner

  store.setState({
    loading: state
  });
};
