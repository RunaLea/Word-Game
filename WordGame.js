let turn = 0;
let letterBoxCount = 0
let wordInput = "";
let correctWord = "words";
let correctWordList = [];
for (let x=0; x<correctWord.length; x++){
    correctWordList.push(correctWord[x]);
}
console.log(correctWordList);
function enterWord(){
    // Shows the typed word from the textbox in the console.
    wordInput = document.getElementById("textBox").value;
    console.log("Chosen word: ",wordInput);
    wordLenCheck();
    document.getElementById("textBox").value = "";
    return wordInput;
};
function enterCheck(event){
    // Checks if a key is pressed and if it's enter it will run enterWord().
    let key = event.key;
    if(key == "Enter"){
        enterWord();
    }
};
function wordLenCheck(){
    document.getElementById("textMessage").innerHTML = "";
    // Checks if the input is 5 characters.
    if(wordInput.length==5){
        turn += 1;
        console.log("Turn: ",turn);
        displayRow();
    }
    // Shows a message if the word is not the right length
    else if(wordInput.length!=5){
        document.getElementById("textMessage").innerHTML = "The word should be 5 characters.";
    }
}
function displayRow(){ 
    // Creates an array for the letters
    wordChoiceList = [];
    for (let x=0; x<wordInput.length; x++){
        wordChoiceList.push(wordInput[x]);
    };
    console.log(wordChoiceList);
    // Places all letters in their respective letterboxes
    document.getElementById("letterBox"+(letterBoxCount+1)).innerHTML = wordChoiceList[0];
    document.getElementById("letterBox"+(letterBoxCount+2)).innerHTML = wordChoiceList[1];
    document.getElementById("letterBox"+(letterBoxCount+3)).innerHTML = wordChoiceList[2];
    document.getElementById("letterBox"+(letterBoxCount+4)).innerHTML = wordChoiceList[3];
    document.getElementById("letterBox"+(letterBoxCount+5)).innerHTML = wordChoiceList[4];
    wordCheck();
    return wordChoiceList;
}
function turnCheck(){
    // Checks if the last turn happened and shows the game over message and restart button
    if(turn==5){
        document.getElementById("gameResult").innerHTML = "You lost";
        document.getElementById("textMessage").innerHTML = `The word was: ${correctWord.toUpperCase()}.`
        document.getElementById("restartButton").style.display = "block";
        document.getElementById("textBox").style.display = "none";
        document.getElementById("enterButton").style.display = "none";
    }
}
function winCheck(){
    console.log("winCheck")
    // If the correct word is submitted you see the win message and restart button
    if(correctWord==wordInput){
        document.getElementById("gameResult").innerHTML = "You won";
        if(turn == 1){
            document.getElementById("textMessage").innerHTML = "You guessed the word in a single attempt."
        }
        else{
            document.getElementById("textMessage").innerHTML = `You guessed the word in ${turn} attempts.`
        }
        document.getElementById("restartButton").style.display = "block";
        document.getElementById("textBox").style.display = "none";
        document.getElementById("enterButton").style.display = "none";
    }
    else{
        letterBoxCount = (letterBoxCount+5);
        turnCheck();
    }
}
function wordCheck(){
    var correctColor = "rgb(47, 255, 57)"
    var includeColor = "rgb(241, 255, 50)"
    // Checks per letter if the correct word is the same as the chosen word
    for(let x=0; x<wordChoiceList.length; x++){
        if(wordChoiceList[x]==correctWordList[x]){
            console.log("Correct letter: "+x);
            // Changes the color of the correct letters
            document.getElementById("letterBox"+(x+letterBoxCount+1)).style.color=correctColor;
            document.getElementById("letterBox"+(x+letterBoxCount+1)).style.borderColor=correctColor;
        }
            // Changes the color of correct letters in the wrong position
        else if(correctWordList.includes(wordChoiceList[x])){
            document.getElementById("letterBox"+(x+letterBoxCount+1)).style.color=includeColor;
            document.getElementById("letterBox"+(x+letterBoxCount+1)).style.borderColor=includeColor;
        }
    }
    winCheck()
    return letterBoxCount;
}
function restartGame(){
    // Changes elements so the game is back to it's initial state
    var startColor = "rgb(255, 255, 255)";
    turn = 0
    letterBoxCount = 0
    for (let x=0; x<25; x++){
        document.getElementById("letterBox"+(x+1)).innerHTML = "";
        document.getElementById("letterBox"+(x+1)).style.color = startColor;
        document.getElementById("letterBox"+(x+1)).style.borderColor = startColor;
    }
    document.getElementById("gameResult").innerHTML = "";
    document.getElementById("textMessage").innerHTML = "Try to guess the word in 5 attempts.";
    document.getElementById("restartButton").style.display = "none";
    document.getElementById("textBox").style.display = "inline-block";
    document.getElementById("enterButton").style.display = "inline-block";
}