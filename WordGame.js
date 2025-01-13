let turn = 0;
let letterBoxCount = 0
let wordInput = "";
function enterWord(){
    // Shows the typed word from the textbox in the console.
    wordInput = document.getElementById("Textbox").value;
    console.log("Chosen word: ",wordInput);
    wordLenCheck();
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
    return letterBoxCount;
}