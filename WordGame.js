let turn = 0;
let letterBoxCount = 0;
let wordInput = "";
let correctWordList = [];
wordFetch();
let correctWord;
// Below (line 8) is for bugfixing:
// wordSplit(); 
function wordFetch(){
    // Fetches the wordlist
    fetch("WordList.txt")
        .then(Response=>Response.text())
        .then(data=>pickRandWord(data))
        .catch(error => console.error("Error loading word list:", error));
}
function pickRandWord(data){
    // Picks a random word from the wordlist
    const wordList = data.split("\n").map(word=>word.trim());
    let randWord = wordList[Math.floor(Math.random() * wordList.length)];
    correctWord = randWord;
    console.log("Random word: "+correctWord)
    wordSplit();
}
    function wordSplit(){
        // Splits the correct word into an array.
    for (let x=0; x<correctWord.length; x++){
        correctWordList.push(correctWord[x]);
    }
    console.log(correctWordList);
    return correctWordList;
}
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
    let letterSkip = [];
    // Checks per letter if the correct word is the same as the chosen word
    for(let x=0; x<wordChoiceList.length; x++){
        letterCheck(x,letterSkip);
    }
    winCheck()
    return letterBoxCount;
}
function letterCheck(x,letterSkip){
    var correctColor = "rgb(47, 255, 57)"
    var includeColor = "rgb(241, 255, 50)"
    if(wordChoiceList.indexOf(wordChoiceList[x])!=wordChoiceList.lastIndexOf(wordChoiceList[x])){
        // if there's multiple letters
        console.log(`${x} has multiple letters`)
        if(correctWordList.includes(wordChoiceList[x])&&correctWordList.indexOf(wordChoiceList[x])!=correctWordList.lastIndexOf(wordChoiceList[x])){
            // Changes the color of the right letters in the wrong place if there's multiple right letters
            console.log("there are multiple right letters")
            document.getElementById("letterBox"+(x+letterBoxCount+1)).style.color=includeColor;
            document.getElementById("letterBox"+(x+letterBoxCount+1)).style.borderColor=includeColor;
            if(wordChoiceList[x]==correctWordList[x]){
                // Changes the color of the correct letter
                console.log("Correct letter: "+x);
                document.getElementById("letterBox"+(x+letterBoxCount+1)).style.color=correctColor;
                document.getElementById("letterBox"+(x+letterBoxCount+1)).style.borderColor=correctColor;
            }
        } 
        else if(correctWordList.includes(wordChoiceList[x])&&correctWordList.indexOf(wordChoiceList[x])==correctWordList.lastIndexOf(wordChoiceList[x])){
            // Changes the color of the first right letter in the wrong place if there's only 1 right letter
            console.log("There's only 1 right letter")
            if(letterSkip.includes(wordChoiceList[x])){
                console.log(`The ${letterSkip} is skipped`);
                return;
            }
            letterSkip.push(wordChoiceList[x]);
            let firstCorrect = wordChoiceList.indexOf(wordChoiceList[x]);
            document.getElementById("letterBox"+(firstCorrect+letterBoxCount+1)).style.color=includeColor;
            document.getElementById("letterBox"+(firstCorrect+letterBoxCount+1)).style.borderColor=includeColor;
            if(wordChoiceList[x]==correctWordList[x]){
                // Changes the color of the correct letter
                console.log("Correct letter: "+x);
                document.getElementById("letterBox"+(x+letterBoxCount+1)).style.color=correctColor;
                document.getElementById("letterBox"+(x+letterBoxCount+1)).style.borderColor=correctColor;
            }
        }
    }
    else if(wordChoiceList.indexOf(wordChoiceList[x])==wordChoiceList.lastIndexOf(wordChoiceList[x])){
        console.log("There are no multiple letters")
        // if there are no multiple letters
        if(wordChoiceList[x]==correctWordList[x]){
            // Changes the color of the correct letter
            console.log("Correct letter: "+x);
            document.getElementById("letterBox"+(x+letterBoxCount+1)).style.color=correctColor;
            document.getElementById("letterBox"+(x+letterBoxCount+1)).style.borderColor=correctColor;
        }
        else if(correctWordList.includes(wordChoiceList[x])&&wordChoiceList[x]!=correctWordList[x]){
            // Changes the color of the right letter in the wrong place
            document.getElementById("letterBox"+(x+letterBoxCount+1)).style.color=includeColor;
            document.getElementById("letterBox"+(x+letterBoxCount+1)).style.borderColor=includeColor;
        }
    }
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
    correctWordList = [];
    wordFetch();
}