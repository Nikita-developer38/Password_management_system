var express = require('express');
var router = express.Router();
var userModule = require('../modules/user')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

function checkloginuser(req, res, next) {
  var userToken = localStorage.getItem('userToken');
  try {
    var decoded = jwt.verify(userToken, 'loginToken')
  } catch (error) {
    res.redirect('/');
  }
  next();
}


/* GET home page. */
router.get('/', function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
  if (loginUser) {
    res.redirect('/dashboard')
  }
  else {
    res.render('index', { title: 'Password Management System', msg: '' });
  }
});

router.post('/', async function (req, res, next) {
  const { uname: username, password } = req.body;

  console.log(`Received username: ${username} and password: ${password}`);

  try {
    const user = await userModule.findOne({ username }).exec();
    console.log(`Found user: ${user}`);

    if (user) {
      var getUserId = user._id
      const isValidPassword = bcrypt.compareSync(password, user.password);
      var token = jwt.sign({ userId: getUserId }, "loginToken");
      localStorage.setItem('userToken', token);
      localStorage.setItem('loginUser', username);
      console.log(`Password comparison result: ${isValidPassword}`);

      if (isValidPassword) {
        res.redirect('/dashboard');
      } else {
        res.render('index', { title: 'Password Management System', msg: 'Invalid Password' });
      }
    } else {
      console.log('User not found');
      res.render('index', { title: 'Password Management System', msg: 'User not found' });
    }
  } catch (err) {
    console.error('Error occurred:', err);
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
router.get('/logout', function (req, res, next) {
  localStorage.removeItem('userToken');
  localStorage.removeItem('loginUser');
  res.redirect('/');
});
router.get('/dashboard', checkloginuser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
  res.render('dashboard', { title: 'Password Management System', loginUser: loginUser, msg: '' });
});

router.get('/signup', function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
  if (loginUser) {
    res.redirect('/dashboard')
  } else {
    res.render('signup', { title: 'Password Management System', msg: '' });
  }
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





router.get('/password_category', checkloginuser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');

  res.render('password_category', { title: 'Password Management System', loginUser: loginUser, msg: 'Log In Successfully' });
});

router.get('/addNewCategory', checkloginuser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');

  res.render('addNewCategory', { title: 'Password Management System', loginUser: loginUser });
});

router.get('/addNewPassword', checkloginuser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');

  res.render('addNewPassword', { title: 'Password Management System', loginUser: loginUser });
});

router.get('/viewAllPassword', checkloginuser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');

  res.render('viewAllPassword', { title: 'Password Management System', loginUser: loginUser });
});
module.exports = router;
