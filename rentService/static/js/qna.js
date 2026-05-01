const questionBlockCollection = document.getElementsByClassName("questionBlock");

for ( let i = 0; i < questionBlockCollection.length; i++ ) {
    let questionBlock = questionBlockCollection[i];
    questionBlock.onclick = function (event) {
        const questionSignCollection = event.currentTarget.getElementsByClassName("questionSign");
        const questionAnswerCollection = event.currentTarget.getElementsByClassName("questionAnswer");

        let questionSignElement = questionSignCollection[0];

        if (questionSignElement.textContent === '+')
        {
            questionSignElement.textContent = '-';
        }
        else
        {
            questionSignElement.textContent = '+';
        }

        let questionAnswerElement = questionAnswerCollection[0];
        let currentDisplayValue = questionAnswerElement.style.display;

        if (currentDisplayValue == 'block')
        {
            questionAnswerElement.style.display = 'none'
        }
        else
        {
            questionAnswerElement.style.display = 'block'
        }
    };
}