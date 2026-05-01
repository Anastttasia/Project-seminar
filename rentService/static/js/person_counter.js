const PERSON_COUNTER_ELEMENT = document.getElementById('personsPicker');
PERSON_COUNTER_ELEMENT.classList.add("personsCounterContainer");
PERSON_COUNTER_ELEMENT.style.display = 'none';

const PERSONS_TEXT_ELEMENT = document.getElementById('personsText');

let adultCount = 0;
let childCount = 0;

function setPersonsUrlParams()
{
    currentURL = new URL(window.location.href);

    let urlParams = currentURL.searchParams;
    if (adultCount != 0)
    {
        urlParams.set('adults-input', adultCount)
    }
    else {
        if (urlParams.has('adults-input'))
        {
            urlParams.delete('adults-input');
        }
    }

    if (childCount != 0)
    {
        urlParams.set('children-input', childCount)
    }
    else {
        if (urlParams.has('children-input'))
        {
            urlParams.delete('children-input');
        }
    }
}

function readPersonsUrlParams()
{
    currentURL = new URL(window.location.href);

    let urlParams = currentURL.searchParams;
    if (urlParams.has('adults-input'))
    {
        adultCount = parseInt(urlParams.get('adults-input'));
        if (Number.isNaN(adultCount)) {
            adultCount = 0;
        }
    }

    if (urlParams.has('children-input'))
    {
        childCount = parseInt(urlParams.get('children-input'));
        if (Number.isNaN(childCount)) {
            childCount = 0;
        }
    }
}

function updatePersonsValuesInputs()
{
    const adultsInputElement = document.getElementById('adults-input');
    const childrenInputElement = document.getElementById('children-input');

    if (adultsInputElement != null)
    {
        adultsInputElement.value = adultCount;
    }
    if (childrenInputElement != null)
    {
        childrenInputElement.value = childCount;
    }
}

document.addEventListener('click', (event) => {

    if (event.target === PERSON_COUNTER_ELEMENT) {
        return;
    }

    if (event.target === PERSONS_TEXT_ELEMENT) {
        return;
    }

    if (PERSON_COUNTER_ELEMENT.contains(event.target))
    {
        return;
    }

    if (PERSONS_TEXT_ELEMENT.contains(event.target))
    {
        return;
    }

    PERSON_COUNTER_ELEMENT.style.display = 'none'
});

if (PERSONS_TEXT_ELEMENT == null)
{
    PERSON_COUNTER_ELEMENT.style.display = 'block';
}
else
{
    PERSONS_TEXT_ELEMENT.onclick = function() {
        let currentDisplay = PERSON_COUNTER_ELEMENT.style.display;

        if (currentDisplay == 'none')
        {
            PERSON_COUNTER_ELEMENT.style.display = 'block'
        }
        else if (currentDisplay == 'block')
        {
            PERSON_COUNTER_ELEMENT.style.display = 'none'
        }
    };
}



function updateCounters()
{
    let adultCounterText = document.getElementById('adultCounterText');
    if (adultCounterText != null)
    {
        adultCounterText.textContent = adultCount.toString();
    }

    let childCounterText = document.getElementById('childCounterText');
    if (childCounterText != null)
    {
        childCounterText.textContent = childCount.toString();
    }

    const personsTextValueElement = document.getElementById('personsTextValue');

    if (personsTextValueElement != null)
    {
        if (adultCount != 0 || childCount != 0)
        {
            personsTextValueElement.textContent = 'Взрослые: ' + adultCount.toString() + '; ' + 'Дети: ' + childCount.toString();
        }
        else
        {
            personsTextValueElement.textContent = 'Количество гостей';
        }
    }

    updatePersonsValuesInputs();
}

function addAdultDate(event)
{
    adultCount += 1;
    updateCounters();
    setPersonsUrlParams();
}

function removeAdultDate(event)
{
    if (adultCount == 0)
    {
        return;
    }

    adultCount -= 1;
    updateCounters();
}

function addChildDate(event)
{
    childCount += 1;
    updateCounters();
    setPersonsUrlParams();
}

function removeChildDate(event)
{
    if (childCount == 0)
    {
        return;
    }

    childCount -= 1;
    updateCounters();
}

function createCounterView(isAdult)
{
    let counterBox = document.createElement('div');
    counterBox.classList.add("counterBox");
    counterBox.id = isAdult ? "adultCounterBox" : "childCounterBox";

    let reduce = document.createElement('div');
    reduce.classList.add("reduce");

    let reduceText = document.createElement('p');
    reduceText.classList.add("reduceText");
    reduceText.textContent = "-";
    reduce.append(reduceText);
    reduce.onclick = isAdult ? removeAdultDate : removeChildDate;

    let counterText = document.createElement('div');
    counterText.classList.add("counterText");
    counterText.id = isAdult ? "adultCounterText" : "childCounterText";
    counterText.textContent = isAdult ? adultCount.toString() : childCount.toString();

    let add = document.createElement('div');
    add.classList.add("add");

    let addText = document.createElement('p');
    addText.classList.add("addText");
    addText.textContent = "+";
    add.append(addText);
    add.onclick = isAdult ? addAdultDate : addChildDate;

    counterBox.append(reduce);
    counterBox.append(counterText);
    counterBox.append(add);

    return counterBox;
}

function createCounters()
{
    let adultCounter = document.createElement('div');
    adultCounter.classList.add("adultCounter");
    adultCounter.id = "adultCounter";

    let descriptionAdults = document.createElement('div');
    descriptionAdults.classList.add("descriptionCounter");

    let adultMainText = document.createElement('div');
    adultMainText.classList.add("mainTextCounter");
    adultMainText.textContent = "Взрослые";

    let adultSecText = document.createElement('div');
    adultSecText.classList.add("secondaryTextCounter");
    adultSecText.textContent = "12 лет и старше";

    descriptionAdults.append(adultMainText);
    descriptionAdults.append(adultSecText);
    adultCounter.append(descriptionAdults);
    adultCounter.append(createCounterView(true));

    let childCounter = document.createElement('div');
    childCounter.classList.add("childCounter");
    childCounter.id = "childCounter";

    descriptionAdults = document.createElement('div');
    descriptionAdults.classList.add("descriptionCounter");

    adultMainText = document.createElement('div');
    adultMainText.classList.add("mainTextCounter");
    adultMainText.textContent = "Дети";

    adultSecText = document.createElement('div');
    adultSecText.classList.add("secondaryTextCounter");
    adultSecText.textContent = "от 2 до 11 лет";

    descriptionAdults.append(adultMainText);
    descriptionAdults.append(adultSecText);
    childCounter.append(descriptionAdults);
    childCounter.append(createCounterView(false));

    let countersDivider = document.createElement('div');
    countersDivider.classList.add("countersDivider");

    PERSON_COUNTER_ELEMENT.append(adultCounter);
    PERSON_COUNTER_ELEMENT.append(countersDivider);
    PERSON_COUNTER_ELEMENT.append(childCounter);
}

readPersonsUrlParams();
createCounters();
updateCounters();