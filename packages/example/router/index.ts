import { Route } from '@idg/idg';
const TestRedirect: Route = {
  path: '*',
  redirect: 'test',
  name: 'test-redirect',
  page: 'Test',
};
const Test: Route = {
  path: '/test',
  name: 'test',
  page: 'Test',
};
export const routes = [
  TestRedirect,
  Test,
];
