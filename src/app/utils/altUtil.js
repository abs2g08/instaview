export function generateAjaxActions(context, names) {
  const actionList = [];
  names.forEach(function(name) {
    const nameItem = [`${name}`, `${name}Success`, `${name}Error`];
    actionList.push.apply(actionList, nameItem);
  });
  context.generateActions.apply(context, actionList);
}
