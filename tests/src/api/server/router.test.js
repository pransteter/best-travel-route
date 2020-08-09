import {Router} from '../../../../src/api/server/Router';

describe('Router class test', () => {
  it('Applying routes method', () => {
    const router = new Router;

    const req = {
    };

    const res = {
    };

    router.apply(req, res);
  });
});
