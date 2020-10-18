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
        wordDensity:[],
        sentences: [],
        totalSentence: 0,
        totalParagraph: 0,
        keyCodes: [],

    }

    function characterCounter() {
        data.totalCharacter = data.essay.length
    }
    function wordSpliterAndCounter() { //each second finds all of the words in the essay
        let tempEssay = data.essay;

        while(true) {
            tempEssay = tempEssay.replace('\n', '');
            if (tempEssay.indexOf('\n') === -1) {
                break;
            }
        }
        data.words.length = 0;
        let tempEssayArr =  tempEssay.split(' ');

        if (tempEssayArr[tempEssayArr.length - 1] === '') {
            tempEssayArr.pop();
        }
        tempEssayArr.forEach(el => {
            if ((el.charCodeAt(el.length - 1) < 65 || el.charCodeAt(el.length - 1) > 90) && (el.charCodeAt(el.length - 1) < 97 || el.charCodeAt(el.length - 1) > 122) && el.length > 1) {
                el = el.substring(0, el.length - 1)
                data.words.push(el);
            } else {
                el === ''? null: data.words.push(el);
            }
        })
        data.totalWord = data.words.length;

    }
    function wordDensity() {
        data.wordDensity.length = 0;
        data.wordDensity = [{word: '', times: 0}];
        const nonCountableWords = ['as', 'As', 'in', 'In', 'on', 'On', 'at', 'At', 'that','my', 'My', 'his', 'His', 'be', 'Be','Him', 'and', 'And', 'then', 'Then', 'Or', 'or', 'him', 'Her', 'Hers', 'your', 'Your', 'yours', 'Yours', 'their', 'Their', 'Theirs', 'theirs', 'to', 'To', 'That', 'of', 'Of','I', 'am', 'Am', 'is', 'Is', 'are', 'Are', 'we', 'We', 'he', 'He', 'she', 'She', 'the', 'they', 'The', 'They', 'you', 'You', 'it', 'It', 'has', 'had', 'have', 'Has', 'Have', 'Had', 'would', 'Would', 'a', 'an', 'A', 'An'];

        for (let i = 0; i < data.words.length; i++) {
            if (nonCountableWords.indexOf(data.words[i]) !== -1 || !isNaN(parseInt(data.words[i]/*ignore numbers*/))) {
                continue;
            }
            let found = false;
            data.wordDensity.forEach(el => {
                if (el.word === data.words[i]) {
                     el.times++;
                     found = true;
                }
            }); 
            !found? data.wordDensity.push({word: data.words[i],times: 1}): null;
        }
    }
    function wordUsagePercentage() {
        let first, second, third, fourth, fifth;
        first = {
            word: '',
            times: 0,
            per: 0
        }; 
        second = {
            word: '',
            times: 0,
            per: 0
        }; 
        third = {
            word: '',
            times: 0,
            per: 0
        }; 
            fourth = {
            word: '',
            times: 0,
            per: 0
        }; 
        fifth = {
            word: '',
            times: 0,
            per: 0
        }; 

        for (let i = 0; i < data.wordDensity.length; i++) {

            if (data.wordDensity[i].times > first.times) {
                first.times = data.wordDensity[i].times;
                first.word = data.wordDensity[i].word;
                first.per = Math.round(((first.times / data.totalWord) * 100));
                i = 0;
            }
            if (data.wordDensity[i].times > second.times && data.wordDensity[i].word !== first.word) {
                second.times = data.wordDensity[i].times;
                second.word = data.wordDensity[i].word;
                second.per = Math.round(((second.times / data.totalWord) * 100));
                i = 0;
            }
            if (data.wordDensity[i].times > third.times && data.wordDensity[i].word !== second.word && data.wordDensity[i].word !== first.word) {
                third.times = data.wordDensity[i].times;
                third.word = data.wordDensity[i].word;
                third.per = Math.round(((third.times / data.totalWord) * 100));
                i = 0;
            }
            if (data.wordDensity[i].times > fourth.times && data.wordDensity[i].word !== third.word && data.wordDensity[i].word !== second.word && data.wordDensity[i].word !== first.word) {
                fourth.times = data.wordDensity[i].times;
                fourth.word = data.wordDensity[i].word;
                fourth.per = Math.round(((fourth.times / data.totalWord) * 100));
                i = 0;
            }
            if (data.wordDensity[i].times > fifth.times && data.wordDensity[i].word !== fourth.word && data.wordDensity[i].word !== third.word && data.wordDensity[i].word !== second.word && data.wordDensity[i].word !== first.word) {
                fifth.times = data.wordDensity[i].times;
                fifth.word = data.wordDensity[i].word;
                fifth.per = Math.round(((fifth.times / data.totalWord) * 100));
            }
        }
        return [first, second, third, fourth, fifth];
        
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

1) if white space after ".", "?", "!" OR new line OR space+newline --> a sentence

2) if there is a white space after. if yes {

    1) check if it is end of the string. if yes, it is a sentence. push else: 

    2)check if the char value is a capital letter after white space. if yes, it is a sentence, push. else continue
}if no, it is not a sentece. else continue
                */
               if (data.essay[i + 1] === undefined || data.essay[i + 1] === '\n' || data.essay[i + 2] === '\n') {
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

    function paragraphCounter() {
        let paragraphNum = 0;
        for (let i = 0; i < data.essay.length; i++) {
            if (data.essay[i] === '\n') {
                paragraphNum++;
            }
        }
        data.totalParagraph = paragraphNum;
    }

    return {
        addInput: function(input) {
            data.essay = input;

        },
        keyboardMovements(keyNumber) {


            characterCounter();
            wordSpliterAndCounter();
            sentenceSplitter();
            sentenceCounter();
            paragraphCounter();

        },
        getTotals: function() {
            return {
                characterNumber: data.totalCharacter,
                wordNumber: data.totalWord,
                sentenceNumber: data.totalSentence,
                paragraphNumber: data.totalParagraph
            }
        },
        getDensityPer: function() {
            if (data.words.length > 10) {
                wordDensity();
                return wordUsagePercentage();
            } else {
                return -1;
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

        //get density percentage
        console.log(ParagraphControl.getDensityPer());


        
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

