import React from 'react';

const router = jest.genMockFromModule('@entando/router');
const real = require.requireActual('@entando/router');

router.routeToPath = jest.fn();
router.gotoPath = jest.fn();
router.gotoRoute = jest.fn();
router.routerConfig = real.routerConfig;
router.routerReducer = real.routerReducer;
router.getRoute = real.getRoute;
router.Link = () => (<span />);

export const {
  routeToPath,
  gotoPath,
  gotoRoute,
  routerConfig,
  routerReducer,
  getRoute,
  Link,
  getParams,
} = router;
