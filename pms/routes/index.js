var express = require('express');
var router = express.Router();
var userModule = require('../modules/user')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var { check, validationResult } = require('express-validator');
var passCatModel = require('../modules/password_category');
var addPassModel = require('../modules/add_password');
//var getPasscat = passCatModel.find({});
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
  passCatModel.find().exec().then(data => {
    res.render('password_category', { title: 'password Management System ', loginUser: loginUser, errors: '', success: '', records: data });
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error occurred while fetching categories');
  });
});
router.get('/password_category/delete/:id', checkloginuser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
  var passcat_id = req.params.id;
  passCatModel.findByIdAndDelete(passcat_id).exec().then(data => {
    res.redirect('/password_category');
  }).catch(err => {

    res.status(500).send('Error occurred while deleting category');
  });

});

router.get('/password_category/edit/:id', checkloginuser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
  var passcat_id = req.params.id;
  passCatModel.findById(passcat_id).exec().then(data => {
    res.render('edit_pass_category', { title: 'password Management System ', loginUser: loginUser, errors: '', success: '', records: data, id: passcat_id });
  }).catch(err => {

    res.status(500).send('Error occurred while deleting category');
  });

});

router.post('/password_category/edit/', checkloginuser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
  var passcat_id = req.body.id;
  var passcat_category = req.body.passwordCategory;
  passCatModel.findByIdAndUpdate(passcat_id, { password_category: passcat_category }).exec().then(data => {
    res.redirect('/password_category');
  }).catch(err => {

    res.status(500).send('Error occurred while deleting category');
  });

});

router.get('/addNewCategory', checkloginuser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');


  res.render('addNewCategory', { title: 'Password Management System', loginUser: loginUser, errors: '', success: '' });

});
router.post('/addNewCategory', checkloginuser, [check('passwordCategory', 'Enter Password Category Name').isLength({ min: 1 })], function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('addNewCategory', { title: 'Password Management System', loginUser: loginUser, errors: errors.mapped(), success: '' });

  } else {

    try {
      var passCatName = req.body.passwordCategory;
      var passCatDetails = new passCatModel({
        password_category: passCatName
      })

      passCatDetails.save().then(result => {
        res.render('addNewCategory', { title: 'Password Management System', loginUser: loginUser, errors: '', success: 'password Category Added Successfully', records: result });

      });

    } catch (err) {
      // res.redirect('addNewCategory', { title: 'Password Managemnt System', loginUser: loginUser, errors: '', success: '' });
    }
  }
});


router.get('/addNewPassword', checkloginuser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');

  passCatModel.find().exec().then(data => {

    res.render('addNewPassword', { title: 'Password Management System', loginUser: loginUser, records: data, success: '' });
  }).catch(err => {

    res.status(500).send('Error occurred while deleting category');
  });
});
router.post('/addNewPassword', checkloginuser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
  var pass_cat = req.body.pass_cat;
  var password_detail = req.body.password_detail;
  var project_name = req.body.Project_Name;
  var password_details = new addPassModel({
    password_category: pass_cat,
    project_name: project_name,
    password_Details: password_detail
  });
  password_details.save().then(result => {
    passCatModel.find({}).exec().then(data => {
      res.render('addNewPassword', { title: 'Password Management System', loginUser: loginUser, records: data, success: "Password Details Recorded Successfully" });
    })
  }).catch(err => {

    res.status(500).send('Error occurred while deleting category');
  });
});

//your code
// router.get('/viewAllPassword', checkloginuser, function (req, res, next) {
//   var loginUser = localStorage.getItem('loginUser');
//   var perPage = 2;
//   var page = req.params.page || 1;



//   addPassModel.find({}).skip((perPage * page) - perPage)
//     .limit(perPage).exec().then(data => {
//       addPassModel.countDocuments({}).exec().then(count => {
//         res.render('viewAllPassword', {
//           title: 'Password Management System',
//           loginUser: loginUser,
//           success: '',
//           errors: '',

//           records: data,
//           current: page,
//           pages: Math.ceil(count / perPage)


//         });


//       });
//     }).catch(err => {

//       res.status(500).send('Error occurred while fetching categories');
//     });

// });


// router.get('/viewAllPassword/:page', checkloginuser, function (req, res, next) {
//   var loginUser = localStorage.getItem('loginUser');
//   var perPage = 2;
//   var page = 1;



//   addPassModel.find({}).skip((perPage * page) - perPage)
//     .limit(perPage).exec().then(data => {
//       addPassModel.countDocuments({}).exec().then(count => {
//         res.render('viewAllPassword', {
//           title: 'Password Management System',
//           loginUser: loginUser,
//           success: '',
//           errors: '',

//           records: data,
//           current: page,
//           pages: Math.ceil(count / perPage)


//         });


//       });
//     }).catch(err => {

//       res.status(500).send('Error occurred while fetching categories');
//     });

// });

router.get('/viewAllPassword', checkloginuser, function (req, res, next) {
  try {
    var loginUser = localStorage.getItem('loginUser');


    var options = {

      offset: 1,
      limit: 1
    };

    addPassModel.paginate({}, options).then(function (result) {
      res.render('viewAllPassword', {
        title: 'Password Management System',
        loginUser: loginUser,
        success: '',
        errors: '',

        records: result,


      });


    });

  }

  catch (err) {
    next(err)

  }
});


router.get('/viewAllPassword/:page', checkloginuser, function (req, res, next) {
  try {
    var loginUser = localStorage.getItem('loginUser');
    var options = {

      offset: 1,
      limit: 1
    };

    addPassModel.paginate({}, options).then(function (result) {
      res.render('viewAllPassword', {
        title: 'Password Management System',
        loginUser: loginUser,
        success: '',
        errors: '',

        records: result.docs,
        current: result.offset,
        pages: (result.total)


      });

    })
  }

  catch (err) {

    next(err);
  };

});



router.get('/viewAllPassword/delete/:id', checkloginuser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
  var passcat_id = req.params.id;
  addPassModel.findByIdAndDelete(passcat_id).exec().then(data => {
    res.redirect('/viewAllPassword');
  }).catch(err => {

    res.status(500).send('Error occurred while deleting category');
  });

});

router.get('/viewAllPassword/edit/:id', checkloginuser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
  var passcat_id = req.params.id;

  addPassModel.findById(passcat_id).exec().then(data => {
    addPassModel.find().exec().then(data1 => {
      res.render('edit_pass_details', { title: 'password Management System ', loginUser: loginUser, errors: '', success: '', record: data1, records: data, id: passcat_id });
    });
  }).catch(err => {

    res.status(500).send('Error occurred while deleting category');
  });

});

router.post('/viewAllPassword/edit/', checkloginuser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
  var passcat_id = req.body.id;
  var passcat_category = req.body.pass_cat;
  var passcat_details = req.body.password_detail;
  var project_name = req.body.Project_Name;
  passCatModel.findByIdAndUpdate(passcat_id, { password_category: passcat_category }, { project_name: project_name }, { password_Details: passcat_details }).exec().then(data => {
    res.redirect('/viewAllPassword');
  }).catch(err => {

    res.status(500).send('Error occurred while deleting category');
  });

});

module.exports = router;
