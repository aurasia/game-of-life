var assert = require('assert');
var game = require('../game.js');

describe('In Game of Life', function() {

    describe('a living cell', function() {

        const currentState = 1;

        it('is alive', function() {

            assert.strictEqual(game.isAlive(currentState), true);
        });

        it('ticks to dead if it has 0, 1, 4 or 8 neighbours', function() {
            'use strict';

            let neighbourCount = 0;
            assert.strictEqual(game.nextState(currentState, neighbourCount), 2);

            neighbourCount = 1;
            assert.strictEqual(game.nextState(currentState, neighbourCount), 2);

            neighbourCount = 4;
            assert.strictEqual(game.nextState(currentState, neighbourCount), 2);

            neighbourCount = 8;
            assert.strictEqual(game.nextState(currentState, neighbourCount), 2);
        });

        it('ticks to alive if it has 2 or 3 neighbours', function() {
            'use strict';

            let  neighbourCount = 2;
            assert.strictEqual(game.nextState(currentState, neighbourCount), 1);

            neighbourCount = 3;
            assert.strictEqual(game.nextState(currentState, neighbourCount), 1);
        });
    });


    describe('a dead cell', function() {

        const currentState = 0;

        it('is not alive', function() {

            assert.strictEqual(game.isAlive(currentState), false);
        });

        it('ticks to dead if it has 0, 2, 4 or 8 neighbours', function() {
            'use strict';

            let neighbourCount = 0;
            assert.strictEqual(game.nextState(currentState, neighbourCount), 0);

            neighbourCount = 1;
            assert.strictEqual(game.nextState(currentState, neighbourCount), 0);

            neighbourCount = 4;
            assert.strictEqual(game.nextState(currentState, neighbourCount), 0);

            neighbourCount = 8;
            assert.strictEqual(game.nextState(currentState, neighbourCount), 0);
        });

        it('ticks to alive if it has exactly 3 neighbours', function() {

            const neighbourCount = 3;
            assert.strictEqual(game.nextState(currentState, neighbourCount), 3);
        });
    });


    describe('a cell that just died', function() {

        const currentState = 2;

        it('is not alive', function() {

            assert.strictEqual(game.isAlive(currentState), false);
        });
    });


    describe('a cell that just came alive', function() {

        const currentState = 3;

        it('is alive', function() {

            assert.strictEqual(game.isAlive(currentState), true);
        });
    });


    describe('an array of', function() {

        it('0 cells contains 0 living cells', function() {

            const cells = [];
            assert.strictEqual(game.countLivingCells(cells), 0);
        });

        it('4 cells contains 2 living cells', function() {

            const cells = [0, 1, 2, 3];
            assert.strictEqual(game.countLivingCells(cells), 2);
        });

        it('12 cells contains 6 living cells', function() {

            const cells = [0, 1, 0, 1, 2, 2, 3, 3, 0, 1, 2, 3];
            assert.strictEqual(game.countLivingCells(cells), 6);
        });
    });


    describe('a board', function() {

        it('is correctly initialized', function() {

            const board = game.init(5, 5, 2, 2, [
                'X.',
                '.X'
            ]);

            assert.deepEqual(board, [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0]
            ]);
        });

        it('with no living cells ticks to an empty board', function() {

            const board = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];

            assert.deepEqual(game.tick(board), [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ]);
        });

        it('with 3 living cells forming a corner ticks to 2x2 living cells', function() {

            const board = [
                [0, 0, 0, 0],
                [0, 3, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0]
            ];

            assert.deepEqual(game.tick(board), [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 3, 0],
                [0, 0, 0, 0]
            ]);
        });

        it('with 2 living cells (touching diagonally) ticks to an empty board', function() {

            const board = [
                [0, 0, 0, 0],
                [0, 0, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0]
            ];

            assert.deepEqual(game.tick(board), [
                [0, 0, 0, 0],
                [0, 0, 2, 0],
                [0, 2, 0, 0],
                [0, 0, 0, 0]
            ]);
        });

        it('with a Gosper glider (phase 1) gun ticks to a Gosper glider (phase 2)', function() {

            const board = [
                [3, 2, 0, 0, 0],
                [0, 1, 3, 0, 0],
                [1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ];

            assert.deepEqual(game.tick(board), [
                [2, 3, 0, 0, 0],
                [0, 2, 1, 0, 0],
                [1, 1, 3, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ]);
        });

        it('with a Gosper glider (phase 2) gun ticks to a Gosper glider (phase 3)', function() {

            const board = [
                [2, 3, 0, 0, 0],
                [0, 2, 1, 0, 0],
                [1, 1, 3, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ];

            assert.deepEqual(game.tick(board), [
                [0, 2, 0, 0, 0],
                [3, 0, 1, 0, 0],
                [2, 1, 1, 0, 0],
                [0, 3, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ]);
        });

        it('with a Gosper glider (phase 3) gun ticks to a Gosper glider (phase 4)', function() {

            const board = [
                [0, 2, 0, 0, 0],
                [3, 0, 1, 0, 0],
                [2, 1, 1, 0, 0],
                [0, 3, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ];

            assert.deepEqual(game.tick(board), [
                [0, 0, 0, 0, 0],
                [2, 0, 1, 0, 0],
                [3, 2, 1, 0, 0],
                [0, 1, 3, 0, 0],
                [0, 0, 0, 0, 0]
            ]);
        });

        it('with a Gosper glider (phase 4) gun ticks to a Gosper glider (phase 1)', function() {

            const board = [
                [0, 0, 0, 0, 0],
                [2, 0, 1, 0, 0],
                [3, 2, 1, 0, 0],
                [0, 1, 3, 0, 0],
                [0, 0, 0, 0, 0]
            ];

            assert.deepEqual(game.tick(board), [
                [0, 0, 0, 0, 0],
                [0, 3, 2, 0, 0],
                [2, 0, 1, 3, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 0, 0, 0]
            ]);
        });
    });
});
