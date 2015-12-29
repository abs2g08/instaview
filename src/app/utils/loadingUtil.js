export function loading(store, state = true) {
  //TO-DO: show spinner

  console.log(`loading.. ${state}`);

  store.setState({
    loading: state
  });
};
