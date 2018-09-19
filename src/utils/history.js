import createHashHistory from 'history/createHashHistory';
import createBrowserHistory from 'history/createBrowserHistory';
import env from '../env.config';

const history = env.debug ? createHashHistory() : createBrowserHistory({
  basename: 'org-frontend',
});

export default history;
