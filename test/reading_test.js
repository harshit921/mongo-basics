const assert = require('assert');
const User = require('../src/user');

describe('reading Users of the database', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({name: 'Joe', email: 'avk' , age: 23});
    joe.save().then(() => done());
  });


  it('find all users with a name', (done) => {
    User.find({name: 'Joe'}).then((users) => {
      assert(users[0]._id.toString() === joe._id.toString())
      done();
    })
  });

  it('Fine One user with a name' , () => {
    User.findOne();
  });

});
