let turn = 0;
let letterBoxCount = 0
let wordInput = "";
let correctWord = "_____";
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
    letterBoxCount = (letterBoxCount+5);
    turnCheck();
    return letterBoxCount;
}
function turnCheck(){
    if(turn==5){
        document.getElementById("gameResult").innerHTML = "You lost";
        document.getElementById("textMessage").innerHTML = `The word was: ${correctWord.toUpperCase()}.`
        document.getElementById("restartButton").style.display = "block";
        document.getElementById("textBox").style.display = "none";
        document.getElementById("enterButton").style.display = "none";
    }
}
function restartGame(){
    turn = 0
    letterBoxCount = 0
    for (let x=0; x<25; x++){
        document.getElementById("letterBox"+(x+1)).innerHTML = "";
    }
    document.getElementById("gameResult").innerHTML = "";
    document.getElementById("textMessage").innerHTML = "Try to guess the word in 5 attempts.";
    document.getElementById("restartButton").style.display = "none";
    document.getElementById("textBox").style.display = "inline-block";
    document.getElementById("enterButton").style.display = "inline-block";
}