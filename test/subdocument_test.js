const assert = require('assert');
const User = require('../src/user');

describe('Updating Records ', () => {
  it('can create Subdocument', (done)=> {
    const joe = new User({
      name: 'Joe',
      posts: [{title: 'Heroo Heera Laal'}]
    });

    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user)=> {
        assert(user.posts[0].title === 'Heroo Heera Laal' );
        done();
      });
  });

  it('can add Subdocument to existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });

    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) =>{
        user.posts.push({title: 'New Post'});
        return user.save()
      })
      .then(() => User.findOne({name: 'Joe'}))
      .then((user)=>{
      assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('can remove a Subdocument' ,(done) =>{
    const joe= new User({
      name: 'joe',
      posts: [{title: 'new post'}]
    });

    joe.save()
      .then(()=> User.findOne({name:'joe'}))
      .then((user)=>{
          user.posts[0].remove();
          return user.save();
      })
      .then(() => User.findOne({name: 'joe'}))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });

});
