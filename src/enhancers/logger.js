export const logger = store => next => action => {
  console.log('prev state: ', store);
  console.log('action: ', action);
  console.log('next state: ',  store.getState());
  return next(action);
}