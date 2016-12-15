var readline = require('readline');

console.log('Game of Life');

/**
 * NOTE: state is now an integer, meaning:
 * 0: dead cell, was also dead in previous generation
 * 1: alive cell, was also alive in previous generation
 * 2: has just died, i.e. is dead now, but was alive in previous generation
 * 3: has just been born, i.e. is alive now, but was dead in previous generation
 */

// checks whether given state is alive or not
function isAlive(state) {

    return ((state === 1) || (state === 3));
}

// implements game of life rules
function nextState(currentState, neighbourCount) {

    // if cell is alive...
    if (isAlive(currentState)) {

        return ((neighbourCount === 2) || (neighbourCount === 3))? 1: 2;
    }
    // ... else, cell is dead
    else {

        return (neighbourCount === 3)? 3: 0;
    }
}

// counts elements in an array that contain alive cells
function countLivingCells(cells) {

    return cells.filter(function(a) {

        return isAlive(a);

    }).length;
}

// prints out complete board
function printBoard(board, index) {

    console.log('Round: ' + index);

    board.forEach(function(line) {

        var s = '';
        line.forEach(function(state) {

            var c = isAlive(state)? '\u2588\u258a': '\u2591\u2591';

            // change color for cells that have died or been born
            if ((state === 2) || (state === 3)) {

                c = '\x1b[36m' + c + '\x1b[0m';
            }
            s += c;
        });
        console.log(s);
    });

    readline.moveCursor(process.stdout, 0, -(board.length + 1));
}

// return new board with next generation
function tick(board) {

    var height = board.length;

    return board.map(function(line, x) {

        var width = line.length;

        return line.map(function(state, y) {

            // wrap neighbour cells around all edges of board
            var xBefore = (x === 0)? height - 1: x - 1;
            var xAfter = (x === (height - 1))? 0: x + 1;

            var yBefore = (y === 0)? width - 1: y - 1;
            var yAfter = (y === (width - 1))? 0: y + 1;

            return nextState(state, countLivingCells([

                board[xBefore][yBefore], board[xBefore][y], board[xBefore][yAfter],
                board[x][yBefore], board[x][yAfter],
                board[xAfter][yBefore], board[xAfter][y], board[xAfter][yAfter]
            ]));
        });
    });
}

// create initial board
function init(height, width, offsetX, offsetY, seedBoard) {

    return Array.from({length: height}, function(v, x) {

        return Array.from({length: width}, function(v, y) {

            // if within seed board, copy it in
            var seedX = x - offsetX;
            var seedY = y - offsetY;
            if ((seedX >= 0) && (seedX < seedBoard.length) && (seedY >= 0) && (seedY < seedBoard[seedX].length)) {

                return (seedBoard[seedX].charAt(seedY) !== '.')? 1: 0;
            }

            // else, leave cell empty
            return 0;
        });
    });
}

// main game loop
function loop(board, index, duration) {

    printBoard(board, index);

    setTimeout(function() {

        loop(tick(board), index + 1, duration);

    }, duration);
}

// initialize board and start game
var board = init(50, 80, 5, 5, [
/*
    // random stuff
    '..........',
    'XXX.......',
    '..........',
    '..........',
    '...XXX....',
    '...X...XX.',
    '..XX......',
    '.......XXX',
    '......XXX.',
    '..........'
*/
    // Gosper glider gun
    '......................................',
    '.........................X............',
    '.......................X.X............',
    '.............XX......XX............XX.',
    '............X...X....XX............XX.',
    '.XX........X.....X...XX...............',
    '.XX........X...X.XX....X.X............',
    '...........X.....X.......X............',
    '............X...X.....................',
    '.............XX.......................',
    '......................................'

]);
loop(board, 0, 50);
