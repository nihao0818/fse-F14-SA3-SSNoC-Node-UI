var bcrypt = require('bcrypt-nodejs');
var request = require('request');
var rest_api = require('../../config/rest_api');

<<<<<<< HEAD
function User(user_name, password, status, statusDate){
  this.local = {
    name : user_name,
    password : password,
    status : status,
    statusDate: statusDate
=======
function User(user_name, password){
  this.local = {
    name : user_name,
    password : password
>>>>>>> 0cd38623b295c99a9e8eaf467e7bc52f31eff874
  };
}

User.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.prototype.isValidPassword = function(password, callback) {
  request.post(rest_api.is_password_valid + this.local.name + '/authenticate', {json:true, body:{password:password}}, function(err, res, body) {
    if (err || res.statusCode !== 200){
      callback(false);
      return;
    }

    callback(true);
  });
};

<<<<<<< HEAD
User.updateStatus = function(user_name, user_status, createdDate) {
  request.post({url:rest_api.update_user_status + user_name, body: {statusCode:user_status, createdDate:createdDate}, json:true }, function(err, res, body) {
      if (err || res.statusCode !== 200){
        console.log("return unsuccessfully!");
        console.log(res.statusCode);
        console.log(rest_api.update_user_status + user_name);
      }
        console.log("return successfully");
        return;
  });
};

=======
>>>>>>> 0cd38623b295c99a9e8eaf467e7bc52f31eff874
User.getUser = function(user_name, callback) {
  request(rest_api.get_user + user_name, {json:true}, function(err, res, body) {
    if (err){
      callback(err,null);
      return;
    }
    if (res.statusCode === 200) {
<<<<<<< HEAD
      var user = new User(body.userName, body.password, body.statusCode, body.statusDate);
=======
      var user = new User(body.userName, body.password);
>>>>>>> 0cd38623b295c99a9e8eaf467e7bc52f31eff874
      callback(null, user);
      return;
    }
    if (res.statusCode !== 200) {
      callback(null, null);
      return;
    }
  });
};

User.getAllUsers = function(callback) {
  request(rest_api.get_all_users, {json:true}, function(err, res, body) {
    if (err){
      callback(err,null);
      return;
    }
    if (res.statusCode === 200) {
      var users = body.map(function(item, idx, arr){
<<<<<<< HEAD
        return new User(item.userName, item.password, item.statusCode, item.statusDate);
=======
        return new User(item.userName, item.password);
>>>>>>> 0cd38623b295c99a9e8eaf467e7bc52f31eff874
      });

      users.sort(function(a,b) {
        return a.userName > b.userName;
      });

      console.log("@@@@@ in User.getAllUser succeed users :" + JSON.stringify(users));
      callback(null, users);
      return;
    }
    if (res.statusCode !== 200) {
      callback(null, null);
      return;
    }
  });
};

User.saveNewUser = function(user_name, password, callback) {
  var options = {
    url : rest_api.post_new_user,
    body : {userName: user_name, password: password},
    json: true
  };

  request.post(options, function(err, res, body) {
    if (err){
      callback(err,null);
      return;
    }
    if (res.statusCode !== 200 && res.statusCode !== 201) {
      callback(res.body, null);
      return;
    }
<<<<<<< HEAD
    var new_user = new User(body.userName, password, undefined, undefined);
=======
    var new_user = new User(body.userName, password, undefined);
>>>>>>> 0cd38623b295c99a9e8eaf467e7bc52f31eff874
    callback(null, new_user);
    return;
  });
};

module.exports = User;
