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


$(document).on('ready', function() {

  playGame();

  function playGame () {

    // Object that keeps each player's score of the number of "tokens" collected for each path
    var score = { 'X': [0, 0, 0, 0, 0, 0, 0, 0],
                  'O': [0, 0, 0, 0, 0, 0, 0, 0]};
    var turn = 0;

    $('td').html('');

    $('td').one('click', function() {

      var self = $(this);
      var selection = self.attr('id');
      var player = '';

      turn % 2 ? player = 'O' : player = 'X';

      self.html(player).css('opacity', 1).animate({
        fontSize: '300',
      }, 500);
      self.animate({
        opacity: 0.50,
        fontSize: '200',
      }, 300);

      addScore(player, selection);

      if ( checkForWinner(player) ) {
        alert("Player " + player + " WINS!    Press \"Enter\" to play again.");
        reset();
      } else if (turn >= 8) {
        alert("Draw....No Winner!    Press \"Enter\" to play again.");
        reset();
      }

      turn++;

    });

    // Add tokens (for each path) to player's score array
    function addScore(player, selection) {
      for (var i = 0; i <= 7; i++) {
        score[player][i] = score[player][i] + tokenMap[selection][i];
      }
    }

    function checkForWinner(player) {
      return !score[player].every(element => element < 4);
    }

    function reset() {
      $('td').off('click');
      playGame();
    }

  }

});
