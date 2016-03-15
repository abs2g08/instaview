import Immutable from 'seamless-immutable';

export function generateAjaxActions(context, names) {
  const actionList = [];
  names.forEach(function(name) {
    const nameItem = [`${name}`, `${name}Success`, `${name}Error`];
    actionList.push.apply(actionList, nameItem);
  });
  context.generateActions.apply(context, actionList);
}

export function seamlessImmutable(StoreModel) {
  StoreModel.config = {
    setState(currentState, nextState) {
      this.state = nextState;
      return this.state;
    },

    getState(currentState) {
      return currentState;
    },

    onSerialize(state) {
      return state.asMutable();
    },

    onDeserialize(data) {
      return Immutable(data);
    }
  };

  StoreModel.prototype.mergeState = function(obj) {
    this.setState(this.state.merge(obj));
  }

  return StoreModel;
};
