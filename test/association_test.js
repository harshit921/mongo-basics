const mongoose = require('mongoose');
const User = require('../src/user');
const assert = require('assert');
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
      User.findOne({name: 'Joe'}).populate('blogPosts')
        .then((user) => {
        assert(user.blogPosts[0].title === 'JS is tatti');
          done();
        });
    });

    it('saves a fulll relation of Associations', (done)=>{
      User.findOne({name:'Joe'})
        .populate({
          path: 'blogPosts',
          populate: {
            path: 'comments',
            model: 'comment',
            populate: {
              path: 'user',
              model: 'user'
              }
            }
        })
        .then((user)=>{
          assert(user.name === 'Joe');
          assert(user.blogPosts[0].title === 'JS is tatti');
          assert(user.blogPosts[0].comments[0].content ==='Tatti khaa lo  jaakar');
          assert(user.blogPosts[0].comments[0].user.name ==='Joe');
          done();
        });
    });
});
