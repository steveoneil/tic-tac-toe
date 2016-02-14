// Object defining the number of "tokens" contributed to each path for each selection
var tokenMap =  { 'a': [1, 0, 0, 1, 0, 0, 1, 0],
                  'b': [2, 0, 0, 0, 1, 0, 0, 0],
                  'c': [1, 0, 0, 0, 0, 1, 0, 1],
                  'd': [0, 1, 0, 2, 0, 0, 0, 0],
                  'e': [0, 2, 0, 0, 2, 0, 2, 2],
                  'f': [0, 1, 0, 0, 0, 2, 0, 0],
                  'g': [0, 0, 1, 1, 0, 0, 0, 1],
                  'h': [0, 0, 2, 0, 1, 0, 0, 0],
                  'i': [0, 0, 1, 0, 0, 1, 1, 0]};

// Object that keeps each player's score of the number of "tokens" collected for each path
var score = { 'x': [0, 0, 0, 0, 0, 0, 0, 0],
              'o': [0, 0, 0, 0, 0, 0, 0, 0]};

$(document).on('ready', function() {
  var turn = 0;
  var player = '';

  $('td').on('click', function() {

    var self = $(this);
    var selection = self.attr('id');

    turn % 2 ? player = 'o' : player = 'x';

    self.html(player);
    self.off('click');

// Add tokens to players score (path array)
    for (var i = 0; i < 7; i++) {
      score[player][i] = score[player][i] + tokenMap[selection][i];
    }

    if ( checkForWinner(player) ) {
      alert("Player " + player + " WINS!")
      $('td').off('click');
    }

    turn++;
  });

  function checkForWinner(player) {
    return !score[player].every(element => element < 4);

  }
});
