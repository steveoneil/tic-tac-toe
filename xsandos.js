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

    // var playAgain;

    function playGame () {

      // Object that keeps each player's score of the number of "tokens" collected for each path
      var score = { 'X': [0, 0, 0, 0, 0, 0, 0, 0],
                    'O': [0, 0, 0, 0, 0, 0, 0, 0]};

      var turn = 0;


      $('td').on('click', function() {

        var self = $(this);
        var selection = self.attr('id');
        var player = '';

        turn % 2 ? player = 'O' : player = 'X';

        self.html(player);
        self.off('click');

    // Add tokens (for each path) to players score array
        for (var i = 0; i < 7; i++) {
          score[player][i] = score[player][i] + tokenMap[selection][i];
        }

        if ( checkForWinner(player) ) {
          alert("Player " + player + " WINS!");
          reset();
        } else if (turn >= 8) {
            alert("Draw....No Winner!");
            reset();
        }

        turn++;

      });

      function checkForWinner(player) {
        return !score[player].every(element => element < 4);
      }

      function reset() {
        $('td').off('click');
        $('td').html('');
        // playAgain = true;
        // return playAgain;
        playGame();
      }

    }

  // if (playAgain) {
  //   playGame();
  // }

});
