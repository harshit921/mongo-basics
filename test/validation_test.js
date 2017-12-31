const assert = require('assert');
const User = require('../src/user');

describe('Validating Records ', () => {
  it('Requires a Username' , () => {
      const user = new User({name:'' });
      const validationResult = user.validateSync();
      const {message} = validationResult.errors.name;
      assert(message === 'Name is required.');
  });

  it('requires a user\'s name longer than 2 char', () =>{
    const user = new User({name: 'al'});
    const validationResult = user.validateSync();
    const {message} = validationResult.errors.name;
    assert(message === 'Name must be greater than 2 characters.');
    });

    it('File Handling for not saving invalid file', (done) =>{
      const user = new User({name: 'al'});
      user.save().catch((validationResult)=>{
        const {message} = validationResult.errors.name;
        done();
      });

    });

});
