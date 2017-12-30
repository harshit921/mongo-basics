const assert = require('assert');
const User = require('../src/user');

describe('Deleting A User', () => {
  let joe;
   beforeEach((done)=>{
     joe = new User({
       name: 'joe',
       email: 'joe@gmail.com',
       age: 19
     });
     joe.save().then((user) => {
       done();
     });
   });

   it('model Instance remove' , (done) => {
     joe.remove().then(()=>User.findOne({name: 'Joe'})).then((user)=> {
       assert(user === null);
       done();
     })
   });

   it('class method remove' , (done) =>{
     User.remove({name:'joe'})
     .then(()=>User.findOne({name: 'Joe'}))
     .then((user)=> {
       assert(user === null);
       done();
     });
   });

   it('class method findAndRemove' , (done) =>{
     User.findOneAndRemove({name: 'joe'})
     .then(()=>User.findOne({name: 'Joe'}))
     .then((user)=> {
       assert(user === null);
       done();
     });
   });

   it('class method FindByIdAndRemove' , (done) =>{
     User.findByIdAndRemove(joe._id)
     .then(()=>User.findOne({name: 'Joe'}))
     .then((user)=> {
       assert(user === null);
       done();
     });

   });

});
