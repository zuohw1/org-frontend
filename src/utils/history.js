import createHashHistory from 'history/createHashHistory';

const history = createHashHistory();
const { push } = history;
/**
 * hijack push method.
 */
Object.assign(history, {
  push(first, state) {
    const { location: { search } } = history;
    if (search.indexOf('headless=true') >= 0) {
      // such as .push('a/b/c');
      if (typeof first === 'string') {
        let pathname = '';
        if (first.indexOf('?') >= 0) {
          pathname = `${first}&headless=true`;
        } else {
          pathname = `${first}?headless=true`;
        }
        push(pathname);
      } else {
        // such as .push({ pathname: 'a/b/c' })
        /* eslint prefer-destructuring: 0 */
        if (first.search && first.search.length) {
          const searchString = first.search;
          Object.assign(first, {
            search: `${searchString}&headless=true`,
          });
        } else {
          Object.assign(first, {
            search: '?headless=true',
          });
        }
        push(first);
      }
    } else {
      push(first, state);
    }
  },
});

export default history;
