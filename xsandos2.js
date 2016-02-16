// Object defining the number of "tokens" contributed to each path for each selection
                   //  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
var tokenMap =  { 'a': [1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
                  'b': [2, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                  'c': [2, 0, 0, 0, 0, 0, 1, 0, 0, 0],
                  'd': [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
                  'e': [0, 1, 0, 0, 2, 0, 0, 0, 0, 0],
                  'f': [0, 2, 0, 0, 0, 2, 0, 0, 2, 0],
                  'g': [0, 2, 0, 0, 0, 0, 2, 0, 0, 2],
                  'h': [0, 1, 0, 0, 0, 0, 0, 2, 0, 0],
                  'i': [0, 0, 1, 0, 2, 0, 0, 0, 0, 0],
                  'j': [0, 0, 2, 0, 0, 2, 0, 0, 0, 2],
                  'k': [0, 0, 2, 0, 0, 0, 2, 0, 2, 0],
                  'l': [0, 0, 1, 0, 0, 0, 0, 2, 0, 0],
                  'm': [0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
                  'n': [0, 0, 0, 2, 0, 1, 0, 0, 0, 0],
                  'o': [0, 0, 0, 2, 0, 0, 1, 0, 0, 0],
                  'p': [0, 0, 0, 1, 0, 0, 0, 1, 1, 0]};


$(document).on('ready', function() {

  playGame();

  function playGame () {

    // Object that keeps each player's score of the number of "tokens" collected for each path
    var score = { 'X': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  'O': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]};
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
      } else if (turn >= 15) {
        alert("Draw....No Winner!    Press \"Enter\" to play again.");
        reset();
      }

      turn++;

    });

    // Add tokens (for each path) to player's score array
    function addScore(player, selection) {
      for (var i = 0; i <= 9; i++) {
        score[player][i] = score[player][i] + tokenMap[selection][i];
      }
    }

    // Return false as long as player has no path that reaches 4 tokens
    function checkForWinner(player) {
      return !score[player].every(element => element < 6);
    }

    function reset() {
      $('td').off('click');
      playGame();
    }

  }

});
