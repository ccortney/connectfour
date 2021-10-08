describe("Make Board", function() {
    beforeEach(function () {
       board = [];
       const HEIGHT = 6;
       const WIDTH = 7;
    });

    it ('should correctly make an array with HEIGHT arrays on makeBoard()', function() {
        makeBoard();
        expect(board.length).toEqual(6);
    });

    it ('should have each array contain WIDTH nulls on makeBoard()', function() {
        makeBoard();
        expect(board[0].length).toEqual(7);
        expect(board[1].length).toEqual(7);
        expect(board[2].length).toEqual(7);
    });
    afterAll(function() {
        board = [];
    });
});

// describe("Make HTML Board", function() {

//     it ('should create a 7x6 table on makeHtmlBoard()', function() {
//         let currentTable = document.getElementsByTagName('table');

//         expect(currentTable.length).toEqual(7);
//         expect(currentTable[0].length).toEqual(7);
//     });

// });

describe("Find Spot For Column", function(){
    it ('should correctly find lowest space in column on findSpotForCol()', function() {
        board = [
            [null, null, null, null, null, null, 'player1'],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null]
        ];
        x = 0;
        y = findSpotForCol(x);
        expect(y).toEqual(5);
    });

    afterAll(function() {
        board = [];
    });

});

// describe("Handle Click", function(){
//     it ('should switch players', function() {
//         let targets = document.querySelectorAll('#column-top');
//         targets.getAttribute('id');
//         handleClick(targets);
//         expect(currPlayer).toEqual('player2');

//     });

// });

describe("Check for Win", function(){
    it ('should correctly identify a win on checkForWin()', function() {
        board = [
            [null, null, null, null, null, null, 'player1'],
            [null, null, null, null, null, 'player1', null],
            [null, null, null, null, 'player1', null, null],
            [null, null, null, 'player1', null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null]
        ];
        let status = checkForWin();
        expect(status).toBeTrue();
    });
    it ('should correctly identify a not-win on checkForWin()', function() {
        board = [
            [null, null, null, null, null, null, 'player1'],
            [null, null, null, null, null, 'player1', null],
            [null, null, null, null, 'player1', null, null],
            [null, null, null, 'player2', null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null]
        ];
        let status = checkForWin();
        expect(status).toBeUndefined();
    });

});

describe("Check for Tie", function(){
    it ('should correctly identify a tie on checkForTie()', function() {
        board = [
            ['player1', 'player1', 'player2', 'player2', 'player1', 'player1', 'player1'],
            ['player1', 'player1', 'player2', 'player2', 'player1', 'player1', 'player1'],
            ['player1', 'player1', 'player2', 'player2', 'player1', 'player1', 'player1'],
            ['player2', 'player2', 'player1', 'player1', 'player2', 'player2', 'player2'],
            ['player1', 'player1', 'player2', 'player2', 'player1', 'player1', 'player1'],
            ['player1', 'player1', 'player2', 'player2', 'player1', 'player1', 'player1']
        ];
        let status = checkForTie();
        expect(status).toBeTrue();
    });
});