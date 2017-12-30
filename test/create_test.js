const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user' , (done) => {
    const joe = new User({
      name: 'Joe Stew',
      email: 'Joe@gmail.com',
      age: 23
    });
    joe.save()
      .then(() =>{
         assert(!joe.isNew);
         done();
      });


  });
});
