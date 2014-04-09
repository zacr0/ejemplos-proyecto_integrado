var twitter = require('ntwitter');
var screen_name = '@'; // example: @RubenRod_18

var twit = new twitter({
    consumer_key: '', // Enter your consumer_key
    consumer_secret: '', // Enter your consumer_secret
    access_token_key: '', // Enter your access_token_key
    access_token_secret: '' // Enter your access_token_secret
  });

/*
 * Function that it shows the time to go back to
 * request to the Twitter REST API.
 */
function showRemainingTime(time) {
  console.log('You can perform more requests at ' + time.getHours()
                  + ':' + time.getMinutes()
                  + ':' + time.getSeconds());
}

/*
 * Function that it shows the nickname of user, the id of the first
 * following and his nickname.
 */
function show(nickName, followingId, followingNickname) {
  console.log('Nickname: ' + nickName
                + '\nFollowing ID: ' + followingId
                + '\nFirst Following: ' + followingNickname);
}

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
  if (err) {
    return ratedLimit(err, params);
  }

  // Show the dates of the first following
  twit.showUser(params[params.length - 1], function (err, params) {
    if (err) {
      return console.log(err);
    }
    show(screen_name.substr(1, screen_name.length), params.id, params.screen_name);
  });

} // showFirstFollowing

twit.getFriendsIds(screen_name, showFirstFollowing);
