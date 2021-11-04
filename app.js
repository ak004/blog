const { render } = require('ejs');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const Blog = require('./models/blogs');
//test
// express app
const app = express();
const dbURI ='mongodb+srv://mascuud:mascuudabc@cluster0.qjp60.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//const connString = mogodb//localhost/blogs
mongoose.connect(dbURI)
  .then((result) => console.log('mongodb connect....'))
  .catch((err) => console.log("error"));

  app.listen(4000, ()=>console.log('listning on port 4000'))

//register veiw engine
app.set('view engine','ejs');
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true}));


app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    //res.send('<h1>about page </h1>');
    res.render('about',{title: 'about'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'create'});
});


// clog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1 })
      .then((result) => {
        res.render('index', {title: 'all Blogs', blogs: result})
      })
      .catch((err) => {
          console.log(err);
      })
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
      .then((result) => {
          res.redirect('/blogs');
      })
      .catch((err) => {
          console.log(err);
      })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    console.log('id',id)

    Blog.findById(id)
     .then(result => {
         res.render('details', {blog: result, title: 'Blogs Details'});
     })
     .catch(err => {
        console.log(err);
    });
})

app.delete('/api/blog/:id', (req, res) => {
    const _id = req.params.id;

    console.log('id delete ',_id)

    Blog.findOneAndDelete(_id)
      .then(reslut => {
          res.json({ redirect: '/blogs'})
      })
      .catch(err => {
          console.log(err);
      })
    // res.send('deleted')
})

