import dva from 'dva';
import React from 'react';
import { LocaleProvider, message } from 'antd';
import createLoading from 'dva-loading';
import { createLogger } from 'redux-logger';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Router, Route, Switch } from 'dva/router';
import Layout from './layout/containers';
import Configure from './env.config';
import customizedHistory from './utils/history';
import { debounce } from './utils/helper';

const app = dva({
  history: customizedHistory,
  onError: debounce((error) => {
    message.error(error.message);
  }, 1.5),
});
app.use(createLoading());
if (Configure.debug) {
  app.use({
    onAction: createLogger(),
  });
}

app.model(require('./layout/models').default);
require('./org/models').default.forEach(key => app.model(key.default));
require('./post/models').default.forEach(key => app.model(key.default));

app.router(({ history }) => (
  <LocaleProvider locale={zhCN}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={Layout} />
      </Switch>
    </Router>
  </LocaleProvider>
));

app.start('#root');
