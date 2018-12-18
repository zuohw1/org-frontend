/**
 * Update parent's frame's height property
 * @param {*Function} fn
 */
function handler(fn) {
  if (fn) {
    const { scrollHeight, scrollWidth } = window.document.body;
    fn({
      height: scrollHeight,
      width: scrollWidth,
    });
  }
}
/**
 * It's a middleware of Dva.js
 * @param {*Object} opts
 */
function frameHook(opts = {}) {
  const { only = [], except = [] } = opts;
  if (only.length > 0 && except.length > 0) {
    throw Error('It is ambiguous to configurate `only` and `except` items at the same time.');
  }

  function onEffect(effect, _, model, actionType) {
    if ((only.length === 0 && except.length === 0)
        || (only.length > 0 && only.indexOf(actionType) !== -1)
        || (except.length > 0 && except.indexOf(actionType) === -1)
    ) {
      return function* Anonymous(...args) {
        let fn;
        if (window.parent && window.parent.dispatch) {
          fn = window.parent.dispatch;
        }
        handler(fn);
        console.log('dispatch before', fn, args);
        yield effect(...args);
        handler(fn);
        console.log('dispatch after', fn);
      };
    } else {
      return effect;
    }
  }
  return {
    onEffect,
  };
}

export default frameHook;
