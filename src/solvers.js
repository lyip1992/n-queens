/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({n:n});

  var findSolution = function(row) {
    if (row === n) {
      return board.rows();
    }

    for ( var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if(!board.hasAnyRooksConflicts()) {
        var temp = findSolution(row+1);
        if (temp) {
          return temp;
        }
      }
      board.togglePiece(row, col);
    }
  }

  var solution = findSolution(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({'n':n});

  var checkRow = function(rowVal) {
    for (var columnVal = 0; columnVal < n; columnVal++) {
      board.togglePiece(rowVal, columnVal);
      if (!board.hasAnyRooksConflicts()) {
        if (rowVal === n - 1) {
          solutionCount++;
          board.togglePiece(rowVal, columnVal);
        } else {
          checkRow(rowVal + 1);
          board.togglePiece(rowVal, columnVal);
        }
      } else {
         board.togglePiece(rowVal, columnVal);
      }
    }
  };

  checkRow(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;

};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});

  var findSolution = function(row) {
    if (row === n) {
      return board.rows();
    }

    for ( var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if(!board.hasAnyQueensConflicts()) {
        var temp = findSolution(row+1);
        if (temp) {
          return temp;
        }
      }
      board.togglePiece(row, col);
    }
  };

  var solution = findSolution(0);

  if (!solution) {
    var temp = new Board({n:n});
    solution = temp.rows();
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var solutionCount = 0;
  var board = new Board({n:n});

  var checkRow = function(rowVal) {
    for (var columnVal = 0; columnVal < n; columnVal++) {
      board.togglePiece(rowVal, columnVal);
      if (!board.hasAnyQueensConflicts()) {
        if (rowVal === n - 1) {
          solutionCount++;
          board.togglePiece(rowVal, columnVal);
        } else {
          checkRow(rowVal + 1);
          board.togglePiece(rowVal, columnVal);
        }
      } else {
         board.togglePiece(rowVal, columnVal);
      }

    }
  };

  checkRow(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;

};
