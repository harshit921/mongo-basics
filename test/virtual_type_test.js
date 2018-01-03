const assert = require('assert');
const User = require('../src/user');

describe('Virtual Types ', () => {

  it('Counts the Posts in the Posts.', (done) =>{
      const joe = new User({
        name: 'joe',
        posts: [{title: 'New Post'}]
      });

      joe.save()
        .then(() => User.findOne({name: 'joe'}))
        .then((user) => {
          assert(user.postCount === 1);
          done();
        });
      });
  });
