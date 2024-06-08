var express = require('express');
var router = express.Router();
var userModule = require('../modules/user')
var bcrypt = require('bcryptjs');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Password Management System', msg: '' });
});

router.post('/', async function (req, res, next) {
  var username = req.body.uname;
  var password = req.body.password;

  try {
    const checkUser = await userModule.findOne({ username: username });
    if (checkUser) {
      var getPassword = checkUser.password;
      if (bcrypt.compareSync(password, getPassword)) {
        req.session.username = username;
        res.redirect('/password_category');
      } else {
        res.render('index', { title: 'Password Management System', msg: 'Invalid Password' });
      }
    } else {
      res.render('index', { title: 'Password Management System', msg: 'Invalid User Name' });
    }
  } catch (err) {
    console.error(err);
    res.render('index', { title: 'Password Management System', msg: 'Error occurred' });
  }
});



async function checkEmail(req, res, email) {
  try {
    const checkexistemail = await userModule.findOne({ email: email });
    if (checkexistemail) {
      res.render('signup', { title: 'Password Management System', msg: 'Email Already Exist' });
    } else {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
}
async function checkuname(req, res, username) {
  try {
    const checkexistusername = await userModule.findOne({ username: username });
    if (checkexistusername) {
      res.render('signup', { title: 'Password Management System', msg: 'User Name Already Exist' });
    } else {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
}

router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Password Management System', msg: '' });
});

router.post('/signup', async function (req, res, next) {
  var username = req.body.uname;
  var email = req.body.email;
  var password = req.body.password;
  var confirmpassword = req.body.confirmpassword;
  if (password != confirmpassword) {
    res.render('signup', { title: 'password Management System', msg: 'Password dosen`t Match' })
  } else {
    password = bcrypt.hashSync(req.body.password, 10);
    if (await checkEmail(req, res, email)) {
      const userDetails = new userModule({
        username: username,
        email: email,
        password: password
      });
      if (await checkuname(req, res, username)) {
        const userDetails = new userModule({
          username: username,
          email: email,
          password: password
        });
      }
      await userDetails.save();
      res.render('signup', { title: 'Password Management System', msg: 'User Register Successfully' });
    }

  }

});



router.get('/password_category', function (req, res, next) {
  res.render('password_category', { title: 'Password Management System', msg: 'Log In Successfully' });
});

router.get('/addNewCategory', function (req, res, next) {
  res.render('addNewCategory', { title: 'Password Management System' });
});

router.get('/addNewPassword', function (req, res, next) {
  res.render('addNewPassword', { title: 'Password Management System' });
});

router.get('/viewAllPassword', function (req, res, next) {
  res.render('viewAllPassword', { title: 'Password Management System' });
});
module.exports = router;
