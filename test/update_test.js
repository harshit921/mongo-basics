const assert = require('assert');
const User = require('../src/user');

describe('Updating Records ', () => {
  let joe;

  beforeEach((done) =>{
    joe = new User({name: 'joe', email: 'joe@gmail.com' , age: 19, postCount: 0})
    joe.save().then(()=> done());
  });

  function assertName(operation, done) {
    operation
    .then(() => User.find({}))
    .then((users)=> {
      assert(users.length === 1);
      assert(users[0].name === 'Alex');
      done();
    });
}

  it('Instance set n save ', (done) => {
    joe.set('name' , 'Alex');
    assertName(joe.save(), done);
  });

  it('Model Instance Update', (done) =>{
    assertName(joe.update({name: 'Alex'}), done);
  })

  it('class Update' , (done) => {
    assertName(User.update({name:'joe'}, {name:'Alex'}),done);
  });

  it('class one Update' , (done) => {
    assertName(User.findOneAndUpdate({name: 'joe'}, { name: 'Alex'}),done);
  });

  it('class Update by Id' , (done) => {
    assertName(User.findByIdAndUpdate(joe._id,{name:'Alex'}),done);
  });

  it('Update User Postcount by 1', (done)=>{
     User.update({  name: 'joe'},
              {$inc:{postCount: 1}})
        .then(()=> User.findOne({name:'joe'}))
        .then((user)=>{
          assert(user.postCount ===1);
          done();
        });
  });
});
