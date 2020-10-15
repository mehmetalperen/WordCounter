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
        totalCharacter: 0,
        words: [],
        totalWord: 0,
        sentences: [],
        totalSentence: 0,
        totalParagraph: 0,
        currentCharacter: '',
        previousCharacter: '',
        currentWord: '',
        previousWord:'',
        keyCodes: [],
        currentKeyCode: -1,
        previousKeyCode: -1

    }

    function characterCounter() {
        data.totalCharacter = data.essay.length
    }
    function wordSpliterAndCounter() { //each second finds all of the words in the essay
        data.words.length = 0;
        data.words = data.essay.split(' ');
        if (data.words[data.words.length - 1] === '') {
            data.words.pop();
        }
        data.totalWord = data.words.length;

    }

    function sentenceCounter() {
        data.totalSentence = data.sentences.length;
    }

    function sentenceSplitter() {
        let sentence ='';
        data.sentences.length = 0;
        for (let i = 0; i < data.essay.length; i++) {
            if (data.essay[i] === '.' || data.essay[i] === '?' || data.essay[i] === '!') {
                /*
we get uncorrect output becuse it assumes a sentence ends whenever it sees the punctuation above.
 but there are cases of a sentence not ending even after ".", "?", "!"
 for example: 
 To get the sentence count we have to split the value by periods (‘.’). then we follow the same dance as with the word count, removing the ‘breaks’ and empty elements.
my solution is: 

1) if there is a white space after. if yes {

    1) check if it is end of the string. if yes, it is a sentence. push else: 

    2)check if the char value is a capital letter after white space. if yes, it is a sentence, push. else continue
}if no, it is not a sentece. else continue
                */
               if (data.essay[i + 1] === undefined) {
                data.sentences.push(sentence);
                sentence = '';

                } else if (data.essay[i + 1] === ' ') {

                    if (data.essay[i + 2] === undefined) {
                        data.sentences.push(sentence);
                        sentence = '';
                    } else if (data.essay[i + 2].charCodeAt(0) >= 65 && data.essay[i + 2].charCodeAt(0) <= 90) {
                        data.sentences.push(sentence);
                        sentence = '';
                    }
                } 
            }
         sentence += data.essay[i];
        }
    }

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
            characterCounter();
            wordSpliterAndCounter();
            sentenceSplitter();
            sentenceCounter();

        },
        getTotals: function() {
            return {
                characterNumber: data.totalCharacter,
                wordNumber: data.totalWord,
                sentenceNumber: data.totalSentence,
                paragraphNumber: data.totalParagraph

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
        },
        manipulateDetails: function (totCharacter, totWord, totSentence, totParagraph) {
            document.querySelector(DOMstrings.totalCharacterTitleValue).innerHTML = totCharacter;
            document.querySelector(DOMstrings.totalWordTitleValue).innerHTML = totWord;

            document.querySelector(DOMstrings.totalCharacterDetailValue).innerHTML = totCharacter;
            document.querySelector(DOMstrings.totalWordDetailValue).innerHTML = totWord;
            document.querySelector(DOMstrings.totalSentenceDetailValue).innerHTML = totSentence;
            document.querySelector(DOMstrings.totalParagraphDetailValue).innerHTML = totParagraph;
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
            handleTyping(event.keyCode);
        });

        
        
    }

    function handleTyping(pressedKey) {

        
        //get input
        let input = UIcontrol.getInput();

        //Send the input to the ParagraphControl
        ParagraphControl.addInput(input);

        //save and analyze keyboard movements
        ParagraphControl.keyboardMovements(pressedKey);

        //get totals (total character, total words, total sentence, total paragraphs)
        let totals = ParagraphControl.getTotals();

        //send the totals to UI
        UIcontrol.manipulateDetails(totals.characterNumber, totals.wordNumber, totals.sentenceNumber, totals.paragraphNumber);




        
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

