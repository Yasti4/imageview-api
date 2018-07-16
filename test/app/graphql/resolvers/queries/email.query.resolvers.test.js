import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import userActions from './../../../../../app/actions/users';
import mailHelpers from './../../../../../app/helpers/mail';

let sandbox, context;
test.before(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      users: userActions
    }
  }
});
test.after(() => sandbox.restore());

test('forgottenPassword(email)', async t => {
  // Arrange
  const users = [
    {email: 'test@imageview.com', deleted_at: null}
  ];
  sandbox.replace(userActions, 'findByEmail', email => users.find(user => user.email === email));
  sandbox.replace(mailHelpers, 'sendMail', () => Promise.resolve(true));
  // Act
  let res = await graphql(`query _($email: String!) {
    forgottenPassword(email: $email)
  }`, { email: 'test@imageview.com' }, context);
  // Assert
  t.falsy(res.errors);
  t.truthy(res.data.forgottenPassword);
  // Act
  res = await graphql(`query _($email: String!) {
    forgottenPassword(email: $email)
  }`, { email: 'info@imageview.com' }, context);
  // Assert
  t.falsy(res.errors);
  t.falsy(res.data.forgottenPassword);
});
