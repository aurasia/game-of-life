var assert = require('assert');
var game = require('../game.js');

describe('In Game of Life', function() {

    it('a dead cell is not alive', function() {

        var currentState = 0;
        assert.strictEqual(game.isAlive(currentState), false);
    });

    it('a living cell is alive', function() {

        var currentState = 1;
        assert.strictEqual(game.isAlive(currentState), true);
    });

    it('a cell that just died is not alive', function() {

        var currentState = 2;
        assert.strictEqual(game.isAlive(currentState), false);
    });

    it('a cell that just came alive is alive', function() {

        var currentState = 3;
        assert.strictEqual(game.isAlive(currentState), true);
    });


    describe('a living cell', function() {

        var currentState = 1;

        it('dies if it has 0 neighbours', function() {

            const neighbourCount = 0;
            assert.strictEqual(game.nextState(currentState, neighbourCount), 2);
        });

        it('stays alive if it has 2 neighbours', function() {

            const neighbourCount = 2;
            assert.strictEqual(game.nextState(currentState, neighbourCount), 1);
        });

        it('stays alive if it has 3 neighbours', function() {

            const neighbourCount = 3;
            assert.strictEqual(game.nextState(currentState, neighbourCount), 1);
        });

        it('dies if it has 4 neighbours', function() {

            const neighbourCount = 4;
            assert.strictEqual(game.nextState(currentState, neighbourCount), 2);
        });
    });


    describe('a dead cell', function() {

        var currentState = 0;

        it('stays dead if it has 0 neighbours', function() {

            const neighbourCount = 0;
            assert.strictEqual(game.nextState(currentState, neighbourCount), 0);
        });

        it('comes alive if it has 3 neighbours', function() {

            const neighbourCount = 3;
            assert.strictEqual(game.nextState(currentState, neighbourCount), 3);
        });

        it('stays dead if it has 4 neighbours', function() {

            const neighbourCount = 4;
            assert.strictEqual(game.nextState(currentState, neighbourCount), 0);
        });
    });


    describe('an array of', function() {

        it('0 cells contains 0 living cells', function() {

            var cells = [];
            assert.strictEqual(game.countLivingCells(cells), 0);
        });

        it('4 cells contains 2 living cells', function() {

            var cells = [0, 1, 2, 3];
            assert.strictEqual(game.countLivingCells(cells), 2);
        });

        it('12 cells contains 6 living cells', function() {

            var cells = [0, 1, 0, 1, 2, 2, 3, 3, 0, 1, 2, 3];
            assert.strictEqual(game.countLivingCells(cells), 6);
        });
    });
});