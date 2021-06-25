var count;
var b;
var flag = null;
var index;
var winner;
var player1 = null;
var player2 = null;
var flag = false;
var array;
var color1;
var color2;

enableHandlers();
document.getElementById("playagain").style.visibility="hidden";
document.getElementById("celebration").style.visibility="hidden";

function enableHandlers(){
    document.getElementById("t1").addEventListener("click", play);
    document.getElementById("t2").addEventListener("click", play);
    document.getElementById("t3").addEventListener("click", play);
    document.getElementById("m1").addEventListener("click", play);
    document.getElementById("m2").addEventListener("click", play);
    document.getElementById("m3").addEventListener("click", play);
    document.getElementById("b1").addEventListener("click", play);
    document.getElementById("b2").addEventListener("click", play);
    document.getElementById("b3").addEventListener("click", play);
}

document.getElementById("player2").addEventListener("keyup", function(event){
    if(event.keyCode===13){
        event.preventDefault();
        document.getElementById("startGame").click();
    }
})

document.getElementById("player1").addEventListener("keyup", function(event){
    if(event.keyCode===13){
        event.preventDefault();
        document.getElementById("player2").focus();
    }
})

function reset(){
    location.reload();
}

function setColors(){
    color1 = "background-color:" + document.getElementById("color1").value;
    color2 = "background-color:" + document.getElementById("color2").value;    
}

function readInputs(){
    count = 0;
    b = [0,0,0,0,0,0,0,0,0];
    winner = null;
    var p1 = document.getElementById("player1")
    var p2 = document.getElementById("player2")
    player1 = p1.value;
    player2 = p2.value;
    if(player1===""){
        alert("Enter Player 1 name");
        return;
    }
    if(player2===""){
        alert("Enter player 2 name");
        return;
    }
    setColors();
    console.log(color1, color2);
    p1.setAttribute("readonly","on")
    p2.setAttribute("readonly","on")
    enableHandlers();
    document.getElementById("startGame").disabled="true";
    
    flag = true;
}

function playAgain(){
    count = 0;
    b = [0,0,0,0,0,0,0,0,0];
    winner = null;
    array = document.querySelectorAll("td");
    array.forEach(element => {
        element.removeAttribute("style")
    });
    enableHandlers();
    setColors();
    document.getElementById("celebration").style.visibility="hidden";
    document.getElementById("playagain").style.visibility="hidden";
    document.getElementById("winner").innerHTML = "";
    flag = true;
}

function validateWinner(board){

    if((board[0]==board[1]&&board[1]==board[2]&&board[2]=="p1") || (board[3]==board[4]&&board[4]==board[5]&&board[5]=="p1") || (board[6]==board[7]&&board[7]==board[8]&&board[8]=="p1") 
    || (board[0]==board[3]&&board[3]==board[6]&&board[6]=="p1") || (board[1]==board[4]&&board[4]==board[7]&&board[7]=="p1") || (board[2]==board[5]&&board[5]==board[8]&&board[8]=="p1")
    || (board[0]==board[4]&&board[4]==board[8]&&board[8]=="p1") || (board[2]==board[4]&&board[4]==board[6]&&board[6]=="p1")){
        return player1;
    }
    
    else if((board[0]==board[1]&&board[1]==board[2]&&board[2]=="p2") || (board[3]==board[4]&&board[4]==board[5]&&board[5]=="p2") || (board[6]==board[7]&&board[7]==board[8]&&board[8]=="p2") 
    || (board[0]==board[3]&&board[3]==board[6]&&board[6]=="p2") || (board[1]==board[4]&&board[4]==board[7]&&board[7]=="p2") || (board[2]==board[5]&&board[5]==board[8]&&board[8]=="p2")
    || (board[0]==board[4]&&board[4]==board[8]&&board[8]=="p2") || (board[2]==board[4]&&board[4]==board[6]&&board[6]=="p2")){
        return player2;
    }

    return null;
}

function removeHandlers(){
    document.getElementById("t1").removeEventListener("click", play);
    document.getElementById("t2").removeEventListener("click", play);
    document.getElementById("t3").removeEventListener("click", play);
    document.getElementById("m1").removeEventListener("click", play);
    document.getElementById("m2").removeEventListener("click", play);
    document.getElementById("m3").removeEventListener("click", play);
    document.getElementById("b1").removeEventListener("click", play);
    document.getElementById("b2").removeEventListener("click", play);
    document.getElementById("b3").removeEventListener("click", play);
}

function celebrate(){
    document.getElementById("winner").innerHTML = "<h2>" + winner + " won </h2>";
    removeHandlers();
    document.getElementById("playagain").style.visibility="visible";
    document.getElementById("celebration").style.visibility="visible";
}

function play(event){
    if(!flag){
        alert("Enter Players name and click on 'Start Game'");
        return;
    }
    var id = (event.target.getAttribute("id"));
    index = parseInt(id.slice(1))-1;
    switch(id.slice(0,1)){
        case "m": index += 3; break;
        case "b": index += 6; break;
    }
    if(b[index]==0){
        count++;
        if(count%2!=0){
            document.getElementById(id).setAttribute("style", color1);
            b[index] = 'p1';
        }
        else{
            document.getElementById(id).setAttribute("style", color2);
            b[index] = 'p2';
        }
        
        if(count>4){
            winner = validateWinner(b);
        }

        if(winner!=null){
            celebrate();
        }

        if(count==9 && winner==null){
            document.getElementById("winner").innerHTML = "<h2> Match Drawn </h2>";
            document.getElementById("playagain").style.visibility="visible";
        }
    }
}
