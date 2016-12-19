var readline = require('readline');

console.log('Game of Life');


function nextState(currentState, neighbourCount) {

    if (currentState === false) {

        return (neighbourCount === 3);
    }
    else {

        return (neighbourCount === 2) || (neighbourCount === 3);
    }
}

function calculateGrid(grid) {

    var currentState = grid[1][1];

    var flattenedGrid = grid.reduce(function(a, b) {

        return a.concat(b);

    }, []);
    var neighbourCount = flattenedGrid.reduce(function(a, b) {

        return b? a + 1: a;

    }, 0);

    if (currentState === true) {

        neighbourCount -= 1;
    }

    return nextState(currentState, neighbourCount);
}

function printBoard(board) {

    for (var x = 0; x < board.length; x += 1) {

        var line = board[x];
        var s = '';

        for (var y = 0; y < line.length; y += 1) {

            s = s + ((line[y] === true)? 'X': '.');
         }
        console.log(s);
    }
    readline.moveCursor(process.stdout, 0, -board.length);
}

function nextBoard(initialBoard) {

    var height = initialBoard.length;
    var width = initialBoard[0].length;

    var nextBoard = [];

    for (var x = 0; x < height; x += 1) {

        nextBoard[x] = [];

        for (var y = 0; y < width; y += 1) {

            var xBefore = (x === 0)? height - 1: x - 1;
            var xAfter = (x === (height - 1))? 0: x + 1;

            var yBefore = (y === 0)? width - 1: y - 1;
            var yAfter = (y === (width - 1))? 0: y + 1;

            nextBoard[x][y] = calculateGrid([
                [initialBoard[xBefore][yBefore], initialBoard[xBefore][y], initialBoard[xBefore][yAfter]],
                [initialBoard[x][yBefore], initialBoard[x][y], initialBoard[x][yAfter]],
                [initialBoard[xAfter][yBefore], initialBoard[xAfter][y], initialBoard[xAfter][yAfter]]
            ]);
        }
    }

    return nextBoard;
}

var bigBoard = [];
var height = 35;
var width = 127;

for (var x = 0; x < height; x += 1) {

    bigBoard[x] = [];

    for (var y = 0; y < width; y += 1) {

        bigBoard[x][y] = false;
    }
}


var initialBoard = [
    [false, false, false, false, false, false, false, false, false, false],
    [true, true, true, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, true, true, true, false, false, false, false],
    [false, false, false, true, false, false, false, true, true, false],
    [false, false, true, true, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, true, true, true],
    [false, false, false, false, false, false, true, true, true, false],
    [false, false, false, false, false, false, false, false, false, false]
];

for (var x = 0; x < initialBoard.length; x += 1) {

    for (var y = 0; y < initialBoard[0].length; y += 1) {

        bigBoard[x + 10][y + 35] = initialBoard[x][y];
    }
}



function gameLoop(board) {

    printBoard(board);

    setTimeout(function() {

        gameLoop(nextBoard(board));
    }, 1000);
}

gameLoop(bigBoard);
