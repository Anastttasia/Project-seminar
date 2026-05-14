let currentLang = "ru";

const MONTH_NAMES = {
    "ru": {
        0: "январь",
        1: "февраль",
        2: "март",
        3: "апрель",
        4: "май",
        5: "июнь",
        6: "июль",
        7: "август",
        8: "сентябрь",
        9: "октябрь",
        10: "ноябрь",
        11: "декабрь"
    }

}

const DAYS_NAMES = {
    "ru": {
        0: "пн",
        1: "вт",
        2: "ср",
        3: "чт",
        4: "пт",
        5: "сб",
        6: "вс"
    }
}

let currentURL = new URL(window.location.href);

const DATE_PICKER_ELEMENT = document.getElementById('datePicker');
const DATE_TEXT_ELEMENT = document.getElementById('dateText');

const TODAY = new Date();
let startDate = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);

let idPlayground = document.getElementById('idPlayground').value;

let dateData = null;

function getFormatDateForHTTP(date) {

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return date.getFullYear() + '-' + mm + '-' + dd;
}

async function getDateData() {
    if (startSelectedPeriodDate == null) return;

    await fetch(window.location.origin + '/getDateDataWithNames', {headers: { rentDate: getFormatDateForHTTP(startSelectedPeriodDate), idPlayground: idPlayground}})
        .then(response => response.json())
        .then(function(data) {
            dateData = data;
    });
}

/**/


let startSelectedPeriodDate = TODAY;
let endSelectedPeriodDate = null;

let isFullCalendar = false;

async function delRent()
{
    await fetch(window.location.origin + '/delRent', {headers: { rentDate: getFormatDateForHTTP(startSelectedPeriodDate), idPlayground: idPlayground, rentHour: event.currentTarget.parentElement.id}});
    updateCalendar();
}

async function createRentHours()
{
    await getDateData();

    const hoursRentedElement = document.getElementById('hoursRented');
    hoursRentedElement.replaceChildren();
    for (let i = 9; i < 21; i++)
    {
        let hourElement = document.createElement('div');
        hourElement.id = i;
        let hourTextElement = document.createElement('div');
        let emptyDivElement = document.createElement('div');
        let nameDivElement = null;
        let phoneDivElement = null;
        let delDivElement = null;

        hourElement.classList.add("hourText");
        emptyDivElement.classList.add("emptyDiv");

        hourTextElement.textContent = i + ':00 - ' + (i + 1) + ':00';

        hourElement.classList.add("freeHour");

        for (let n = 0; n < dateData["rentedHoursData"].length; n++)
        {

            if (dateData["rentedHoursData"][n].hour === i)
            {
                hourElement.classList.add("busyHour");

                nameDivElement = document.createElement('div');
                nameDivElement.textContent = dateData["rentedHoursData"][n].name;
                nameDivElement.classList.add("nameText");

                phoneDivElement = document.createElement('div');
                phoneDivElement.textContent = dateData["rentedHoursData"][n].phone;
                phoneDivElement.classList.add("phoneText");

                delDivElement = document.createElement('div');
                delDivElement.onclick = delRent;
                delDivElement.textContent = "Удалить";
                delDivElement.classList.add("delButton");

                hourElement.classList.remove("freeHour");
            }
        }

        hourElement.append(emptyDivElement);
        hourElement.append(hourTextElement);

        if (nameDivElement != null)
        {
            hourElement.append(emptyDivElement.cloneNode(true));
            hourElement.append(nameDivElement);
        }

        if (phoneDivElement != null)
        {
            hourElement.append(emptyDivElement.cloneNode(true));
            hourElement.append(phoneDivElement);
        }

        if (delDivElement != null)
        {
            hourElement.append(emptyDivElement.cloneNode(true));
            hourElement.append(delDivElement);
        }

        hoursRentedElement.append(hourElement);
    }
}

function setDateUrlParams()
{
    currentURL = new URL(window.location.href);

    let urlParams = currentURL.searchParams;
    if (startSelectedPeriodDate != null)
    {
        urlParams.set('start-date-input', startSelectedPeriodDate)
    }
    else {
        if (urlParams.has('start-date-input'))
        {
            urlParams.delete('start-date-input');
        }
    }

    if (endSelectedPeriodDate != null)
    {
        urlParams.set('end-date-input', endSelectedPeriodDate)
    }
    else {
        if (urlParams.has('end-date-input'))
        {
            urlParams.delete('end-date-input');
        }
    }
}

function readDateUrlParams()
{
    currentURL = new URL(window.location.href);

    let urlParams = currentURL.searchParams;

    if (urlParams.has('start-date-input'))
    {
        startSelectedPeriodDate = urlParams.get('start-date-input').length === 0 ? null : new Date(urlParams.get('start-date-input'));
    }

    if (urlParams.has('end-date-input'))
    {
        endSelectedPeriodDate = urlParams.get('end-date-input').length === 0 ? null : new Date(urlParams.get('end-date-input'));
    }
}

function getFormatDate(date) {

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}

document.addEventListener('click', (event) => {

    if (event.target === DATE_PICKER_ELEMENT) {
        return;
    }

    if (event.target === DATE_TEXT_ELEMENT) {
        return;
    }

    if (DATE_PICKER_ELEMENT.contains(event.target))
    {
        return;
    }

    if (DATE_TEXT_ELEMENT.contains(event.target))
    {
        return;
    }

    DATE_PICKER_ELEMENT.style.display = 'none'
});


DATE_PICKER_ELEMENT.classList.add("datePickerShort");
DATE_PICKER_ELEMENT.style.display = 'none';


if (DATE_TEXT_ELEMENT == null)
{
    DATE_PICKER_ELEMENT.style.display = 'flex';
}
else
{
    DATE_TEXT_ELEMENT.onclick = function() {
        let currentDisplay = DATE_PICKER_ELEMENT.style.display;

        if (currentDisplay == 'none')
        {
            DATE_PICKER_ELEMENT.style.display = 'flex'
        }
        else if (currentDisplay == 'flex')
        {
            DATE_PICKER_ELEMENT.style.display = 'none'
        }
    };
}

function trySwapRangeDates()
{
    let isNeedSwap = false;

    if (startSelectedPeriodDate.getFullYear() > endSelectedPeriodDate.getFullYear())
    {
        isNeedSwap = true;

    }
    else if (startSelectedPeriodDate.getMonth() > endSelectedPeriodDate.getMonth())
    {
        isNeedSwap = true;

    }
    else if (startSelectedPeriodDate.getDate() > endSelectedPeriodDate.getDate())
    {
        isNeedSwap = startSelectedPeriodDate.getMonth() == endSelectedPeriodDate.getMonth() && startSelectedPeriodDate.getFullYear() == endSelectedPeriodDate.getFullYear();
    }

    if (isNeedSwap)
    {
        let swapBuff = startSelectedPeriodDate;
        startSelectedPeriodDate = endSelectedPeriodDate;
        endSelectedPeriodDate = swapBuff;
    }
}

function updateDateText()
{
    const dateTextValueElement = document.getElementById('dateTextValue');

    if (dateTextValueElement != null)
    {
        if (startSelectedPeriodDate != null)
        {
            dateTextValueElement.textContent = getFormatDate(startSelectedPeriodDate);
        }
        else
        {
            dateTextValueElement.textContent = 'Дата бронирования';
        }
    }
}

function updateDateValuesInputs()
{
    const startDateInputElement = document.getElementById('start-date-input');
    const endDateInputElement = document.getElementById('end-date-input');

    if (startDateInputElement != null)
    {
        startDateInputElement.value = startSelectedPeriodDate != null ? startSelectedPeriodDate : '';
    }
    if (endDateInputElement != null)
    {
        endDateInputElement.value = endSelectedPeriodDate != null ? endSelectedPeriodDate : '';
    }
}

function clickOnDate(event) {
    startSelectedPeriodDate = event.currentTarget.dateValue;
    updateCalendar();

    updateDateValuesInputs();
    updateDateText();
    setDateUrlParams();

    event.stopPropagation();
}

function isFirstDateInRange(date) {

    if (startSelectedPeriodDate == null)
    {
        return false;
    }

    if (startSelectedPeriodDate.getFullYear() == date.getFullYear() && startSelectedPeriodDate.getMonth() == date.getMonth() && startSelectedPeriodDate.getDate() == date.getDate())
    {
        return true;
    }

    return false;
}

function isEndDateInRange(date) {
    if (endSelectedPeriodDate == null)
    {
        return false;
    }

    if (endSelectedPeriodDate.getFullYear() == date.getFullYear() && endSelectedPeriodDate.getMonth() == date.getMonth() && endSelectedPeriodDate.getDate() == date.getDate())
    {
        return true;
    }

    return false;
}

function isBetweenSelectedDates(date) {
    if (startSelectedPeriodDate == null)
    {
        return false;
    }

    if (endSelectedPeriodDate == null)
    {
        return false;
    }

    if (startSelectedPeriodDate.getFullYear() <= date.getFullYear() && date.getFullYear() <= endSelectedPeriodDate.getFullYear())
    {
        if (startSelectedPeriodDate.getMonth() <= date.getMonth() && date.getMonth() <= endSelectedPeriodDate.getMonth())
        {
            if (endSelectedPeriodDate.getMonth() == date.getMonth() && startSelectedPeriodDate.getMonth() == date.getMonth())
            {
                return startSelectedPeriodDate.getDate() <= date.getDate() && date.getDate() <= endSelectedPeriodDate.getDate();
            }

            if (startSelectedPeriodDate.getDate() <= date.getDate() && startSelectedPeriodDate.getMonth() == date.getMonth())
            {
                return true;
            }

            if (endSelectedPeriodDate.getMonth() == date.getMonth() && date.getDate() <= endSelectedPeriodDate.getDate())
            {
                return true;
            }

            if (endSelectedPeriodDate.getMonth() != date.getMonth() && startSelectedPeriodDate.getMonth() != date.getMonth())
            {
                return true;
            }

            return false;
        }
        return false;
    }
    return false;
}

function updateCalendar()
{
    const collection = document.getElementsByClassName("monthDrawer");
    let drawerToUpdateCount = collection.length;

    for (let i = 0; i < drawerToUpdateCount; i++)
    {
        let monthDrawer = collection[i];
        let dateToUpdate = new Date(startDate);
        dateToUpdate.setMonth(dateToUpdate.getMonth() + i);
        monthDrawer.textContent = MONTH_NAMES[currentLang][dateToUpdate.getMonth()] + " " + dateToUpdate.getFullYear();
    }

    const prevMonthCollection = document.getElementsByClassName("prevMonth");

    let prevMonthToUpdateCount = prevMonthCollection.length;

    for (let i = 0; i < prevMonthToUpdateCount; i++)
    {
        let dateToUpdate = new Date(startDate);
        dateToUpdate.setMonth(dateToUpdate.getMonth() + i);

        let prevMonth = prevMonthCollection[i];
        if (TODAY.getFullYear() == dateToUpdate.getFullYear() && TODAY.getMonth() == dateToUpdate.getMonth() || i != 0)
        {
            prevMonth.style.visibility = 'hidden';
            prevMonth.onclick = null;
        }
        else
        {
            prevMonth.style.visibility = 'visible';
            prevMonth.onclick = setPrevMonth;
        }
    }

    let calendarContainer = document.getElementById('calendarContainer');
    let oldDatesContainer = document.getElementById('datesContainer');

    let datesContainer = document.createElement('div');
    datesContainer.classList.add("datesContainer");
    datesContainer.id = "datesContainer";

    let currentDateToDraw = new Date(startDate);

    for (let week = 0; week < 6; week++)
    {
        let dateRow = document.createElement('div');
        dateRow.classList.add("dateRow");

        let daysCount = 7;
        let currentDay = 1;

        while (daysCount > 0)
        {
            if (currentDateToDraw.getDay() == currentDay && currentDateToDraw.getMonth() == startDate.getMonth())
            {
                let dateNumber = document.createElement('div');
                dateNumber.classList.add("dateNumber");
                dateNumber.dateValue = new Date(currentDateToDraw.getFullYear(), currentDateToDraw.getMonth(), currentDateToDraw.getDate());
                dateNumber.onclick = clickOnDate;

                if (isFirstDateInRange(dateNumber.dateValue))
                {
                    dateNumber.classList.add("dateRangeFirst");
                }
                else if (isEndDateInRange(dateNumber.dateValue))
                {

                    dateNumber.classList.add("dateRangeLast");
                }
                else if (isBetweenSelectedDates(dateNumber.dateValue))
                {
                    dateNumber.classList.add("dateInRange");
                }

                let textDate = document.createElement('p');
                textDate.classList.add("textDate");

                if (TODAY.getDate() <= currentDateToDraw.getDate() || TODAY.getMonth() < currentDateToDraw.getMonth())
                {

                    textDate.style.opacity = 1.0;
                }
                else
                {
                    textDate.style.opacity = 0.3;
                    dateNumber.onclick = null;
                }

                textDate.textContent = currentDateToDraw.getDate();
                dateNumber.append(textDate);
                dateRow.append(dateNumber);

                currentDateToDraw.setDate(currentDateToDraw.getDate() + 1);
            }
            else
            {
                let dateNumber = document.createElement('div');
                dateNumber.classList.add("dateNumberEmpty");
                dateRow.append(dateNumber);
            }

            currentDay = currentDay != 6 ? currentDay + 1 : 0;
            daysCount--;
        }

        datesContainer.append(dateRow);
    }

    oldDatesContainer.remove();
    calendarContainer.append(datesContainer);

    let calendarContainer2 = document.getElementById('calendarContainer2');

    if (calendarContainer2 != null)
    {
        let oldDatesContainer2 = document.getElementById('datesContainer2');

        let datesContainer2 = document.createElement('div');
        datesContainer2.classList.add("datesContainer");
        datesContainer2.id = "datesContainer2";

        let currentDateToDraw = new Date(startDate);
        currentDateToDraw.setMonth(currentDateToDraw.getMonth() + 1);

        for (let week = 0; week < 6; week++)
        {
            dateRow = document.createElement('div');
            dateRow.classList.add("dateRow");

            let daysCount = 7;
            let currentDay = 1;

            while (daysCount > 0)
            {
                if (currentDateToDraw.getDay() == currentDay && currentDateToDraw.getMonth() == (startDate.getMonth() + 1))
                {
                    let dateNumber = document.createElement('div');
                    dateNumber.classList.add("dateNumber");
                    dateNumber.dateValue = new Date(currentDateToDraw.getFullYear(), currentDateToDraw.getMonth(), currentDateToDraw.getDate());
                    dateNumber.onclick = clickOnDate;

                    if (isFirstDateInRange(dateNumber.dateValue))
                    {
                        dateNumber.classList.add("dateRangeFirst");
                    }
                    else if (isEndDateInRange(dateNumber.dateValue))
                    {

                        dateNumber.classList.add("dateRangeLast");
                    }
                    else if (isBetweenSelectedDates(dateNumber.dateValue))
                    {
                        dateNumber.classList.add("dateInRange");
                    }

                    let textDate = document.createElement('p');
                    textDate.classList.add("textDate");

                    if (TODAY.getDate() <= currentDateToDraw.getDate() || TODAY.getMonth() < currentDateToDraw.getMonth())
                    {

                        textDate.style.opacity = 1.0;
                    }
                    else
                    {
                        textDate.style.opacity = 0.3;
                        dateNumber.onclick = null;
                    }

                    textDate.textContent = currentDateToDraw.getDate();
                    dateNumber.append(textDate);
                    dateRow.append(dateNumber);

                    currentDateToDraw.setDate(currentDateToDraw.getDate() + 1);
                }
                else
                {
                    let dateNumber = document.createElement('div');
                    dateNumber.classList.add("dateNumberEmpty");
                    dateRow.append(dateNumber);
                }

                currentDay = currentDay != 6 ? currentDay + 1 : 0;
                daysCount--;
            }

            datesContainer2.append(dateRow);
        }

        oldDatesContainer2.remove();
        calendarContainer2.append(datesContainer2);
    }
    createRentHours();
}

function setNextMonth() {
    startDate.setMonth(startDate.getMonth() + 1);
    updateCalendar();
}

function setPrevMonth() {
    startDate.setMonth(startDate.getMonth() - 1);
    updateCalendar();
}

function createCalendar(isSecondCalendar) {
    let calendarContainer = document.createElement('div');
    calendarContainer.classList.add("calendarContainer");
    calendarContainer.id = isSecondCalendar ? "calendarContainer2" : "calendarContainer";

    let dateToCreate = new Date(startDate);

    if (isSecondCalendar)
    {
        dateToCreate.setMonth(dateToCreate.getMonth() + 1);
    }

    let monthContainer = document.createElement('div');
    monthContainer.classList.add("monthContainer");

    let prevMonth = document.createElement('div');
    prevMonth.classList.add("prevMonth");

    if (TODAY.getFullYear() == dateToCreate.getFullYear() && TODAY.getMonth() == dateToCreate.getMonth() || isSecondCalendar)
    {
        prevMonth.style.visibility = 'hidden';
        prevMonth.onclick = null;
    }
    else
    {
        prevMonth.style.visibility = 'visible';
        prevMonth.onclick = setPrevMonth;
    }

    let nextMonth = document.createElement('div');
    nextMonth.classList.add("nextMonth");


    if (!isFullCalendar || isSecondCalendar)
    {
        nextMonth.style.visibility = 'visible';
        nextMonth.onclick = setNextMonth;
    }
    else
    {
        nextMonth.style.visibility = 'hidden';
        nextMonth.onclick = null;
    }

    let monthDrawer = document.createElement('div');
    monthDrawer.classList.add("monthDrawer");

    monthDrawer.textContent = MONTH_NAMES[currentLang][dateToCreate.getMonth()] + " " + dateToCreate.getFullYear();

    calendarContainer.append(monthContainer);
    monthContainer.append(prevMonth);
    monthContainer.append(monthDrawer);
    monthContainer.append(nextMonth);

    let daysContainer = document.createElement('div');
    daysContainer.classList.add("daysContainer");

    for (let i = 0; i < 7; i++)
    {
        let dayName = document.createElement('div');
        dayName.classList.add("dayName");
        let textName = document.createElement('p');
        textName.classList.add("textName");
        textName.textContent = DAYS_NAMES[currentLang][i];
        dayName.append(textName);
        daysContainer.append(dayName);
    }

    calendarContainer.append(daysContainer);

    let datesContainer = document.createElement('div');
    datesContainer.classList.add("datesContainer");
    datesContainer.id = isSecondCalendar ? "datesContainer2" : "datesContainer" ;

    let currentDateToDraw = new Date(dateToCreate);

    for (let week = 0; week < 6; week++)
    {
        let dateRow = document.createElement('div');
        dateRow.classList.add("dateRow");

        let daysCount = 7;
        let currentDay = 1;

        while (daysCount > 0)
        {
            if (currentDateToDraw.getDay() == currentDay && currentDateToDraw.getMonth() == dateToCreate.getMonth())
            {
                let dateNumber = document.createElement('div');
                dateNumber.classList.add("dateNumber");
                dateNumber.dateValue = new Date(currentDateToDraw.getFullYear(), currentDateToDraw.getMonth(), currentDateToDraw.getDate());
                dateNumber.onclick = clickOnDate;

                if (isFirstDateInRange(dateNumber.dateValue))
                {
                    dateNumber.classList.add("dateRangeFirst");
                }
                else if (isEndDateInRange(dateNumber.dateValue))
                {

                    dateNumber.classList.add("dateRangeLast");
                }
                else if (isBetweenSelectedDates(dateNumber.dateValue))
                {
                    dateNumber.classList.add("dateInRange");
                }

                let textDate = document.createElement('p');
                textDate.classList.add("textDate");

                if (TODAY.getDate() <= currentDateToDraw.getDate() || TODAY.getMonth() < currentDateToDraw.getMonth())
                {

                    textDate.style.opacity = 1.0;
                }
                else
                {
                    textDate.style.opacity = 0.3;
                    dateNumber.onclick = null;
                }

                textDate.textContent = currentDateToDraw.getDate();
                dateNumber.append(textDate);
                dateRow.append(dateNumber);

                currentDateToDraw.setDate(currentDateToDraw.getDate() + 1);
            }
            else
            {
                let dateNumber = document.createElement('div');
                dateNumber.classList.add("dateNumberEmpty");
                dateRow.append(dateNumber);
            }

            currentDay = currentDay != 6 ? currentDay + 1 : 0;
            daysCount--;
        }

        datesContainer.append(dateRow);
    }

    calendarContainer.append(datesContainer);
    DATE_PICKER_ELEMENT.append(calendarContainer);
    createRentHours();
}

readDateUrlParams();
createCalendar(false);

if (isFullCalendar)
{
    createCalendar(true);
}

updateDateValuesInputs();
updateDateText();