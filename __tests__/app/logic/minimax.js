import test from 'ava';
import Minimax from '../../../app/logic/minimax';

const minimax = new Minimax();

const failsForBoth = (t, board) => {
    t.false(minimax.winning(board, Minimax.HUMAN));
    t.false(minimax.winning(board, Minimax.AI));
};

test('Empty board has no winner', t => {
    failsForBoth(t, [[{}]]);
    failsForBoth(t, [[{}, {}], [{}, {}]]);
});

test('Non winning board', t => {
    let board = [[{ selectedBy: Minimax.HUMAN }, {}], [{}, {}]];
    failsForBoth(t, board);

    board = [[{ selectedBy: Minimax.HUMAN }, { selectedBy: Minimax.AI }], [{}, {}]];
    failsForBoth(t, board);

    board = [
        [{ selectedBy: Minimax.HUMAN }, { selectedBy: Minimax.AI }, {}],
        [{ selectedBy: Minimax.AI }, { selectedBy: Minimax.HUMAN }, {}],
        [{}, { selectedBy: Minimax.HUMAN }, {}]
    ];
    failsForBoth(t, board);
});

test('Diagonal winning board', t => {
    let board = [
        [{ selectedBy: Minimax.HUMAN }, { selectedBy: Minimax.AI }, {}],
        [{ selectedBy: Minimax.AI }, { selectedBy: Minimax.HUMAN }, {}],
        [{}, { selectedBy: Minimax.AI }, { selectedBy: Minimax.HUMAN }]
    ];

    t.true(minimax.winning(board, Minimax.HUMAN));

    board = [
        [{ selectedBy: Minimax.AI }, {}, { selectedBy: Minimax.HUMAN }],
        [{}, { selectedBy: Minimax.HUMAN }, { selectedBy: Minimax.AI }],
        [{ selectedBy: Minimax.HUMAN }, {}, {}]
    ];
    t.true(minimax.winning(board, Minimax.HUMAN));
});

test('Row winning board', t => {
    const board = [
        [{ selectedBy: Minimax.HUMAN }, { selectedBy: Minimax.HUMAN }, { selectedBy: Minimax.HUMAN }],
        [{ selectedBy: Minimax.AI }, { selectedBy: Minimax.HUMAN }, {}],
        [{}, { selectedBy: Minimax.AI }, { selectedBy: Minimax.AI }]
    ];

    t.true(minimax.winning(board, Minimax.HUMAN));
});

test('Column winning board', t => {
    const board = [
        [{ selectedBy: Minimax.HUMAN }, { selectedBy: Minimax.HUMAN }, { selectedBy: Minimax.AI }],
        [{ selectedBy: Minimax.AI }, { selectedBy: Minimax.HUMAN }, {}],
        [{}, { selectedBy: Minimax.HUMAN }, { selectedBy: Minimax.AI }]
    ];

    t.true(minimax.winning(board, Minimax.HUMAN));
});

test('Empty positions', t => {
    let board = [
        [{ selectedBy: Minimax.HUMAN }, { selectedBy: Minimax.HUMAN }],
        [{ selectedBy: Minimax.HUMAN }, {}]
    ];

    t.deepEqual(minimax.emptyPositions(board), [{ x: 1, y: 1 }]);

    board = [
        [{ selectedBy: Minimax.HUMAN }, {}],
        [{ selectedBy: Minimax.HUMAN }, {}]
    ];

    t.deepEqual(minimax.emptyPositions(board), [{ x: 1, y: 0 }, { x: 1, y: 1 }]);
});

test('Get best move', t => {
    const moves = [
        { position: { x: 0, y: 0 }, score: 10 },
        { position: { x: 1, y: 2 }, score: 0 },
        { position: { x: 2, y: 2 }, score: -10 }
    ];

    t.deepEqual({ x: 2, y: 2 }, minimax.getBestMove(moves, Minimax.HUMAN).position);
    t.deepEqual({ x: 0, y: 0 }, minimax.getBestMove(moves, Minimax.AI).position);
});

test('Actual game 1', t => {
    const board = [
        [{ selectedBy: Minimax.HUMAN }, { selectedBy: Minimax.AI }, { selectedBy: Minimax.HUMAN }],
        [{ selectedBy: Minimax.HUMAN }, { selectedBy: Minimax.AI }, {}],
        [{ selectedBy: Minimax.AI }, {}, {}]
    ];

    t.deepEqual({
        x: 1,
        y: 2
    }, minimax.minimax(board, Minimax.AI).position);
});

test('Actual game 2', t => {
    const board = [
        [{ selectedBy: Minimax.HUMAN }, {}, { selectedBy: Minimax.AI }],
        [{ selectedBy: Minimax.AI }, {}, { selectedBy: Minimax.AI }],
        [{}, { selectedBy: Minimax.HUMAN }, { selectedBy: Minimax.HUMAN }]
    ];

    t.deepEqual({
        x: 1,
        y: 1
    }, minimax.minimax(board, Minimax.AI).position);
});

test('Actual game 3', t => {
    const board = [
        [{ selectedBy: Minimax.AI }, {}, {}],
        [{}, { selectedBy: Minimax.HUMAN }, {}],
        [{ selectedBy: Minimax.HUMAN }, {}, {}]
    ];

    t.deepEqual({ x: 2, y: 0 }, minimax.minimax(board, Minimax.AI).position);
});
