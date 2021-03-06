// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
// import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};


import {Accommodations, Registry, Travel} from 'containers/Site';


export default function createRoutes() {
  // Create reusable async injectors using getAsyncInjectors factory
  // const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/wip',
      name: 'Work in progress',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Site'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/wip/registry',
      name: 'Work in progress',
      getComponent(nextState, cb) {
        cb(null, Registry);
      },
    },
    {
      path: '/wip/accommodations',
      name: 'Work in progress',
      getComponent(nextState, cb) {
        cb(null, Accommodations);
      },
    },
    {
      path: '/wip/travel',
      name: 'Work in progress',
      getComponent(nextState, cb) {
        cb(null, Travel);
      },
    },
    {
      path: '/wip2',
      name: 'Work in progress',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/WeddingDetails'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
