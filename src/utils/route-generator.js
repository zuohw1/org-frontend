import React from 'react';
import { Route, Switch } from 'dva/router';

/**
 * Generate route component.
 *
 * @author peng
 * @param  {object} routeMap  The configureation of Route
 * @return {jsx}              A route component
 */
export default function routeGenerator(routeArray) {
  const children = [];
  routeArray.forEach((item) => {
    const c = (item.children || []).map((i) => {
      const p = {
        path: i.path,
        key: i.path,
        component: () => React.createElement(i.component, {}, null),
      };
      if ('exact' in i && i.exact) {
        Object.assign(p, {
          exact: i.exact,
        });
      }
      return React.createElement(Route, p, null);
    });

    // const childrenProps = {
    //   children: c,
    // };
    const props = {
      path: item.path,
      key: item.path,
      component: () => React.createElement(item.component, {
        // _children_: c,
      }, c),
    };
    if ('exact' in item && item.exact) {
      Object.assign(props, {
        exact: item.exact,
      });
    }
    const routeItem = React.createElement(Route, props, null);
    children.push(routeItem);
  });
  const result = React.createElement(Switch, null, children);
  return result;
}
