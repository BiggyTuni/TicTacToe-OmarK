const game = {
    xTurn: true,
    xState: [],
    oState: [],
    xScore: 0, // X's score
    oScore: 0, // O's score
    tieScore: 0, // Tie score
    winningStates: [
        ['0','1','2'],
        ['3','4','5'],
        ['6','7','8'],
        ['0','3','6'],
        ['1','4','7'],
        ['2','5','8'],
        ['0','4','8'],
        ['2','4','6']
    ]
};
// xTurn will be used to switch turns
// xstate shows the state of X
// ostate shows the state of Y
// winning states declares the states needed to win by shows which numbers should be clicked
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// document allows us to interact with the whole webpage and manipulate it how we want
// add event listener is used to make the webpage listen to any clicks and then allows u to code it to tell it what to do
// click is the event we want to listen for and event => is where you put the logic
//! we use classes to decide if the click event was triggered 
//? isCell checks if the clicked target has a class called grid cell if not it will return false this way it checks if the user actually clicked the grid or not
//? isDisabled checks if the grid has been used or not to prevent the user from inputing a turn in it again

    document.addEventListener('click',event =>{
        const target = event.target
        const isCell = target.classList.contains ('gridCell')
        const isDisabled = target.classList.contains('disabled')


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Only if both are true does the code inside this if block execute, meaning it will only act on active cells that haven’t been played yet.
        if (isCell && !isDisabled){
            //! uses cellvalue to know which cell was clicked since we turned them into numbers
            const cellValue = target.dataset.value
            //!checks if it is X's turn or O's turn so if game.xturn is ture then its X's turn otherwise its o's turn
            game.xTurn ===true
                ?game.xState.push(cellValue)
                :game.oState.push(cellValue)

            //! adds the diabled class to clicked cells
            target.classList.add('disabled')

            //! adds the X or O sign depending on the turn
            target.classList.add(game.xTurn ? 'x' : 'o')

            //! switches it from ture to false or from false to true
            game.xTurn = !game.xTurn
        }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//! this is where it checks if the match was a draw

if (!document.querySelectorAll('.gridCell:not(.disabled)').length) {
    document.querySelector('.gameOver').classList.add('visible');
    document.querySelector('.game-over-text').textContent = 'Draw!';

    // Increment tie score
    game.tieScore++;
    document.getElementById('Tie').textContent = `Tie: ${game.tieScore}`;
}
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //! this next block of code will loop through all possible winning states and display the winner once an array is matched
    //? we use the for each method because we have multiple winning states so this will go through each array 
    //? the '=>' is used to make code shorter in other words its like saying for each item do this

    game.winningStates.forEach(winningStates => {
        const xWins = winningStates.every(state => game.xState.includes(state))
        const oWins = winningStates.every(state => game.oState.includes(state))

    //? || is the OR operator
    //! query selector all chooses everything in the element of the css that we chose and then excuted for each to disable all cells so no more turns can be played //
    //? here we use a ternary operator to do an if else for if xwins this play this else display that

        if (xWins || oWins){
            document.querySelectorAll('.gridCell').forEach(cell => cell.classList.add('disabled'));
            document.querySelector('.gameOver').classList.add('visible');
            document.querySelector('.game-over-text').textContent = xWins ? 'X Wins!' : 'O Wins!';

            if (xWins) {
                game.xScore++;
                document.getElementById('xScore').textContent = `X: ${game.xScore}`;
            } else if (oWins) {
                game.oScore++;
                document.getElementById('oScore').textContent = `O: ${game.oScore}`;
            }
        }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//? listens for a click event then calls the restart class then once that happens the class list remove will remove the visible class for the game over screen then will go through each grid cell and remove the disabled class and all the xs and os and there for resets the game
//! makes it xs turn to start first and xstate and ostate are empty to track from the beggining again 
document.querySelector('.restart').addEventListener('click', () => {
    document.querySelector('.gameOver').classList.remove('visible');
    document.querySelectorAll('.gridCell').forEach(cell => {
        cell.classList.remove('disabled', 'x', 'o');
    });
    game.xTurn = true;
    game.xState = [];
    game.oState = [];
});
    });



