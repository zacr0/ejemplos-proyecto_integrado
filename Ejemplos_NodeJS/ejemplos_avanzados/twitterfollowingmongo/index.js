var mongoose = require('mongoose');
var twitter = require('ntwitter');
var async = require('async');
var screen_name = '@', Schema, Users, User, user; // screen_name, example: @RubenRod_18

// Connection for database
mongoose.connect('mongodb://localhost/users');

// It's defined the schema
Schema = mongoose.Schema;
Users = new Schema({
  user: String,
  followingId: String,
  followingNickname: String
});

mongoose.model('User', Users);

// Add the user model to the users database
User = mongoose.model('User');
user = new User();

var twit = new twitter({
    consumer_key: '', // Enter your consumer_key
    consumer_secret: '', // Enter your consumer_secret
    access_token_key: '', // Enter your access_token_key
    access_token_secret: '' // Enter your access_token_secret
  });

/*
 * Function that show the time to go back to
 * request to the Twitter REST API.
 */
function showRemainingTime(time) {
  console.log('You can perform more requests at ' + time.getHours()
                    + ':' + time.getMinutes()
                    + ':' + time.getSeconds());
}

function show(nickName, followingId, followingNickname) {
  console.log('Nickname: ' + nickName);
  console.log('Following ID: ' + followingId);
  console.log('First Following: ' + followingNickname);
}

function newUser(nickName, followingId, followingNickname) {
  user.user = nickName;
  user.followingId = followingId;
  user.followingNickname = followingNickname;
  user.save(function (err) {
    if (err) {
      throw err;
    }
    console.log('User ' + nickName + ' registered.\n');
    show(nickName, followingId, followingNickname);
  });
} // newUser

function ratedLimit(err, params) {
  var time = new Date(err.headers['x-rate-limit-reset'] * 1000); // The timestamp in Unix
                                               // The timestamp in Unix works in seconds and the timestamp
                                               // in Javascript works in milliseconds.
  showRemainingTime(time);

  setTimeout(function () {
    console.log('Inside setTimeout');
    var url = '/followers/ids.json';

    if (params.screen_name) {
      params = { key: 'ids', screen_name: params.screen_name, cursor: params.nextCursor };
    }

    if (params.user_id) {
      params = { key: 'ids', user_id: params.user_id, cursor: params.nextCursor };
    }

    twit._getUsingCursor(url, params, showFirstFollowing);
  }, time.getTime() - new Date().getTime()); // It works, when countdown comes to zero

} // ratedLimit


function showFirstFollowing(err, params) {

  async.series([ function (callback) {
    // First, we find the user
    User.findOne({ user: screen_name.substr(1, screen_name.length) }, function (err, data) {
      if (err) { return console.error(err); }
      if (data === null) { // If the user isn't in database
        console.log('The user isn\'t in database ');
        callback();
      } else { // If the user is in database
        console.log('User find!');
        show(data.user, data.followingId, data.followingNickname);
      }
    });
  }, function (callback) {
    if (err) {
      console.log('I\'m searching the user...');
      ratedLimits(err, params);
    } else {
      // We are finding the first following
      twit.showUser(params[params.length - 1], function (err, params) {
        if (err) {
          return console.log(err);
        }
        newUser(screen_name.substr(1, screen_name.length), params.id, params.screen_name);
      }); // showUser
    }
  }, function (err) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ERROR');
  }
    ]);
} // showFirstFollowing

twit.getFriendsIds(screen_name, showFirstFollowing);