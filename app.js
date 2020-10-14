////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//ParagraphCtr
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
const ParagraphCrt = ( function() {

    let data = {
        essay: '',
        characters: [],
        words: [],
        sentences: [],
        paragraphs: [],
        currentCharacter: '',
        previousCharacter: '',
        currentWord: '',
        previousWord:'',
        keyCodes: [],
        currentKeyCode: -1,
        previousKeyCode: -1

    }

    function wordSpliter() { //each second finds all of the words in the essay
        setInterval(() => {
            data.words = data.essay.split(' ');
        }, 1000);
    }
    wordSpliter();

    

    return {
        addInput: function(input) {
            data.essay = input;

        },
        keyboardMovements(keyNumber) {
            data.keyCodes.push(keyNumber);

            if (data.keyCodes.length >= 2) {
                data.currentKeyCode = data.keyCodes[data.keyCodes.length - 1];
                data.previousKeyCode = data.keyCodes[data.keyCodes.length - 2]
            }
        },
        getData: function() {
            return data;
        }
    }
})();
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//UICtr
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

const UIctr = ( function() {

    const DOMstrings = {
        totalWordTitleValue: '.total-word-value-title',
        totalCharacterTitleValue: '.total-character-value-title',
        inputBox: '#exampleFormControlTextarea1',
        totalWordDetailValue: '.total-word-value-detail',
        totalCharacterDetailValue: '.total-character-value-detail',
        totalSentenceDetailValue: '.total-sentence-value-detail',
        totalParagraphDetailValue: '.total-paragraph-value-detail',
        totalReadingTimeDetailValue: '.total-readingTime-value-detail',
        totalSpeakingTimeDetailValue: '.total-speakingTime-value-detail',
        detailsContainer: "#details-container"
    }
  
    

    return {
       
        getInput: function() {
            return(document.querySelector(DOMstrings.inputBox).value);
        },
        getDomStrings: function() {
            return DOMstrings;
        }
    }

})();

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//AppControl
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
const AppControl = ( function(ParagraphControl,UIcontrol ) {


    const Dom = UIcontrol.getDomStrings();

    
    function setEventListeners() {


        //AFTER a key is pressed
        document.addEventListener('keyup', (event) =>{
            console.log(event.keyCode);
            handleTyping(event.keyCode);
        });

        
        
    }

    function handleTyping(pressedKey) {

        
        //get input
        let input = UIcontrol.getInput();

        //save keyboard movements
        ParagraphControl.keyboardMovements(pressedKey);

        //Send the input to the ParagraphControl
        ParagraphControl.addInput(input);


        
    }

    
    

    return {
        initial: function() {

            document.querySelector(Dom.inputBox).focus();
            setEventListeners();
        }
    }

})(ParagraphCrt, UIctr);


(function() {
    AppControl.initial();
})();

