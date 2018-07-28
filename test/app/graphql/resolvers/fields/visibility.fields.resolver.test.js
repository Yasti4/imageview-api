import test from 'ava';
import sinon from 'sinon';

import graphql from './../../server';
import visibilityActions from './../../../../../app/actions/visibilities';
import userActions from './../../../../../app/actions/users';
import albumActions from './../../../../../app/actions/albums';
import postActions from './../../../../../app/actions/posts';

let sandbox, context;
test.beforeEach(() => {
  sandbox = sinon.createSandbox();
  context = {
    actions: {
      visibilities: visibilityActions,
      users: userActions,
      albums: albumActions,
      posts: postActions
    },
    isAdmin: false,
    isAuth: true,
    userAuth: {id: 1}
  };
  sandbox.stub(visibilityActions, 'findAll').callsFake(() => [{name:'user'}]);
});
test.afterEach(() => sandbox.restore());

test.serial('albums(name)', async t => {
  // Arrange
  sandbox.spy(albumActions, 'findAllByVisibility');
  // Act
  await graphql(`query _ {
    visibilities {
      albums {
        id
      }
    }
  }`, {}, context);
  // Assert
  t.truthy(albumActions.findAllByVisibility.calledOnce);
  albumActions.findAllByVisibility.restore();
});

test.serial('posts(name)', async t => {
  // Arrange
  sandbox.spy(postActions, 'findAllByVisibility');
  // Act
  await graphql(`query _ {
    visibilities {
      posts {
        id
      }
    }
  }`, {}, context);
  // Assert
  t.truthy(postActions.findAllByVisibility.calledOnce);
  postActions.findAllByVisibility.restore();
});
