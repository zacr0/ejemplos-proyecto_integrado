var mongoose = require('mongoose');
var twitter = require('ntwitter');
var async = require('async');
var Schema, Users, User, user;
var screen_name = ['@']; // screen_name, example: ['@RubenRod_18', '@twitter_es']

// Connection for database
mongoose.connect('mongodb://localhost/users');

Schema = mongoose.Schema;
Users = new Schema({
  user: String,
  followingId: String,
  followingNickname: String
});

mongoose.model('User', Users);

// Add the user model to the users database
User = mongoose.model('User');
var twit = new twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key:  '',
    access_token_secret: ''
  });

/*
 * Function that it shows the time to go back to
 * request to the Twitter REST API.
 */
function showRemainingTime(tiempo) {

  console.log('You can perform more requests at ' + tiempo.getHours()
                    + ':' + tiempo.getMinutes()
                    + ':' + tiempo.getSeconds());
}

/*
 * Function that it shows the nickname of user, the id of the first
 * following and his nickname.
 */
function show(nickName, followingId, followingNickname) {
  console.log('Nickname: ' + nickName
              + '\n\tFollowing ID: ' + followingId
              + '\n\tFirst Following: ' + followingNickname
              + '\n -------------------- ');
}

async.eachSeries(screen_name, function (item, callback) {
  User.findOne({ user: item.substr(1, item.length) }, function (err, data) { // Whe find the user for his nickname

    /*
     * Function that it call to the API Twitter and receive cursors and errors if exists.
     */
    function callAPI(err, params) {

      if (err !== null && err.statusCode === 429) { // If exist an status error 429....
        var tiempo = new Date(err.headers['x-rate-limit-reset'] * 1000); // The timestamp in Unix
                                               // The timestamp in Unix works in seconds and the timestamp
                                               // in Javascript works in milliseconds.
        showRemainingTime(tiempo);
        return setTimeout(function () {
          console.log('Inside setTimeout');

          if (params.screen_name) {
            params = { key: 'ids', screen_name: params.screen_name, cursor: params.nextCursor };
          }

          if (params.user_id) {
            params = { key: 'ids', user_id: params.user_id, cursor: params.nextCursor };
          }

          twit._getUsingCursor('/friends/ids.json', params, callAPI);
        }, tiempo.getTime() - new Date().getTime());
      } // if

      if (err) {
        return console.log('ERROR: ' + err);
      }

      twit.showUser(params[params.length - 1], function (err, param) {
        if (err) {
          return console.log(' showUser ERROR: ' + err);
        }

        user = new User();
        user.user = item.substr(1, item.length);
        user.followingId = param.id;
        user.followingNickname = param.screen_name;
        user.save(function (err) {
          if (err) {
            return console.log(err);
          }
          console.log('The user called ' + user.user + ' has been registered');
          show(item, param.id, param.screen_name);
        });
        callback();  // Call next callback
      }); // showUser
    } // callAPI

    if (err) { return console.log('>>>>>>>>>>>>>>ERROR'); }

    if (data !== null) { // If the user is in database
      show(data.user, data.followingId, data.followingNickname);
      callback(); // Call next callback
    } else { // If the user isn't in database, calls to API Twitter with that nickname
      twit.getFriendsIds(item, callAPI);
    } // else

  }), // findOne
  function (err) {
    if (err)
      return console.log('ERROR: ' + err);
  };
}); // async.eachSeries