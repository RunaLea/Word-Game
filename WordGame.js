function enterWord(){
    // Shows the typed word from the textbox in the console.
    let wordInput = document.getElementById("Textbox").value;
    console.log(wordInput);
};
function enterCheck(event){
    let key = event.key;
    if(key == "Enter"){
        enterWord();
    }
}