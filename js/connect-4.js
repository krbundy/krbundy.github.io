

//www.101Computing.net/connect4-challenge/

const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const API_TARGET_ADDRESS = "https://connect4api.kennethbundy.com/";
var human_player = 1;
var player=1; //1 for Yellow, 2 for Red
var grid = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];
var row_counts = [0,0,0,0,0,0,0];
const rows = 5;//index from zero
const columns = 6;
let game_over = false;
var game_winner = null;

var config = {
    headers: {
        'crossorigin': true,
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
}




function checkWinner(){
    let winner = null;

    for(var i=0;i<= columns;i++){
        for(var j=rows; j>0;j--){

            //check rows (and make sure not out of bounds)
            if(j-3>=0){
                if(grid[j][i] != 0 && grid[j][i] == grid[j-1][i] && grid[j][i] == grid[j-2][i] && grid[j][i] == grid[j-3][i]){
                    game_over = true;
                    winner = grid[j][i];
                };
            };
            //check columns
            if(i+3<=columns){
                if(grid[j][i] != 0 && grid[j][i] == grid[j][i+1] && grid[j][i] == grid[j][i+2] && grid[j][i] == grid[j][i+3]){
                    game_over = true;
                    winner = grid[j][i];
                };
            };
            //check the upward sloping diagonals
            if(i+3<=columns && j+3<=rows){
                if(grid[j][i] != 0 && grid[j][i] == grid[j+1][i+1] && grid[j][i] == grid[j+2][i+2] && grid[j][i] == grid[j+3][i+3]){
                    game_over = true;
                    winner = grid[j][i];
                };
            };
            //check the downward sloping diagonals
            if(i+3<=columns && j-3>=0){
                if(grid[j][i] != 0 && grid[j][i] == grid[j-1][i+1] && grid[j][i] == grid[j-2][i+2] && grid[j][i] == grid[j-3][i+3]){
                    game_over = true;
                    winner = grid[j][i];
                };
            }
        };
    };
    if(winner == 1){
        document.getElementById("colorTurn").innerHTML="<h1>Yellow Player Wins!</h1>";
        $("#yellowModal").modal("show")
    }
    if(winner == 2){
        document.getElementById("colorTurn").innerHTML="<h1>Red Player Wins!</h1>";
        $("#redModal").modal("show")
    }
    return winner;
};

function checkFull(){
    isFull = true;
    for(var i=0;i<columns;i++){
        isFull = isFull && (row_counts[i]==6);
    }
    return isFull;
}



//A function used to add a token (when possible) based on the slected column
function selectColumn(col) {
//This function is incomplete.
//The following code should check if the column is not already full and if it is ask the user to chose another column.
//It should also place the token on top of any existing token in the selected column
//It should then check if after placing the token the game continues or if the player has aligned 4 tokens.
 //Finally it should check if the grid is full (Game ends on a draw!) 
    

    let play_row = rows - row_counts[col];

    player = 1;

    grid[play_row][col]=1;
    player=2;
        
    document.getElementById("colorTurn").innerHTML="MCTS Turn";

    row_counts[col]++;

    refreshGrid();
    console.log(grid)

    let game_over = false;
    game_winner = checkWinner();
    if(game_winner){
        game_over = true;
        console.log("Winner:");
        console.log(winner);
        //resetGrid();
    }
    if(checkFull()){
        game_over = true;
        console.log("Grid Full");
        resetGrid();
        document.getElementById("colorTurn").innerHTML="Grid Full!  Starting New Game!";
    }




  if(game_winner != 1){
    var gridPayload = {state: grid}

    fetchMove(gridPayload);
  } else {
    axios.post(API_TARGET_ADDRESS, grid, config)
    .then(response => {
        console.log(response)
    })
    .catch(error => console.error(error));  
  }


  
  //refreshGrid();
};


//A function used to refresh the connect4 grid on screen
function refreshGrid() {

  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 7; col++) {
      if (grid[row][col]==0) { 
                document.getElementById("cell"+row+col).style.backgroundColor="#FFFFFF";
      } else if (grid[row][col]==1) { //1 for yellow
                document.getElementById("cell"+row+col).style.backgroundColor="#FFFF00";
      } else if (grid[row][col]==2) { //1 for yellow
                document.getElementById("cell"+row+col).style.backgroundColor="#FF0000";
       }
    }
  }  
}

function resetGrid() {
  //Reset all values to 0 in the grid array
  //ADD CODE HERE

  game_over = false;
  game_winner = null;
  document.getElementById("colorTurn").innerHTML="Player Turn";

  grid = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];

  row_counts = [0,0,0,0,0,0,0];

  refreshGrid();
  
}

const fetchMove = (payload) => {
    axios.post(API_TARGET_ADDRESS, payload, config)
        .then(response => {
            const state = response.data.state;
            grid = state;
            console.log(grid)
            row_counts[response.data.action]++;
            refreshGrid();
            game_winner = checkWinner();
            player=1;
            if(!game_winner){
                document.getElementById("colorTurn").innerHTML="Player Turn";
            }
            
        })
        .catch(error => console.error(error));  
    };

