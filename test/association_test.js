const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Association', () => {
  let joe,blogPost,comment;
  beforeEach((done) =>{
    joe = new User({name : 'Joe'});
    blogPost = new BlogPost({title: 'JS is tatti' , content:' sab framework bana dala'});
    comment = new Comment({content: 'Tatti khaa lo  jaakar'});

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    joe.save();


    Promise.all([joe.save() ,blogPost.save(),comment.save()] )
      .then(() => done());
    });

    it('saves a relation b/w user and blogpost', ()=>{
      User.findOne({name: 'Joe'})
        .then((user) => {
          console.log(user);
          done();
        });
    });
});
