//gathering local storage and root info
const root = document.documentElement;
let isContrast = localStorage.isContrast;
let themeColour = localStorage.themeColour;

if (!isContrast){
    localStorage.isContrast = 'false';
}
if (!themeColour){
    localStorage.themeColour = 'default';
}
//colour change coded to save space in other functions
function colourAndShade(colour){
    switch(colour){
        case 'lDefault':
            root.style.setProperty('--colorMain', '#DEDEDE');
            root.style.setProperty('--colorBackground', '#808080');
            document.getElementById('logo').src = "/svg/logo_pamietnik/logo_pamietnik_lightGrey.svg";
            break;
            
        case 'dDefault':
            root.style.setProperty('--colorMain', '#808080');
            root.style.setProperty('--colorBackground', '#DEDEDE');
            document.getElementById('logo').src = "/svg/logo_pamietnik/logo_pamietnik_dark_gray.svg";
            break;

        case 'lPink':
            root.style.setProperty('--colorMain', '#AD727F');
            root.style.setProperty('--colorBackground', '#FABEC8');
            document.getElementById('logo').src = "/svg/logo_pamietnik/logo_pamietnik_darkPink.svg";
            break;

        case 'dPink':
            root.style.setProperty('--colorMain', '#FABEC8');
            root.style.setProperty('--colorBackground', '#AD727F');
            document.getElementById('logo').src = "/svg/logo_pamietnik/logo_pamietnik_lightPink.svg";
            break;

        default:
            colourAndShade('lDefault');
    }
}

function themeChange(){
    if (themeColour == 'default'){
        localStorage.themeColour = 'pink';
    }
    else if (themeColour == 'pink'){
        localStorage.themeColour = 'default';
    }
    console.log(localStorage);
    themeAndContrastController('themeChange');
    themeAndContrastController('contrastSwitch');
}

function contrastSwitch(){
    if (isContrast == 'true'){
        localStorage.isContrast = 'false';
    } else {
        localStorage.isContrast = 'true';
    }
    console.log(localStorage);
    themeAndContrastController('contrastSwitch');
    themeAndContrastController('themeChange');
}

//main function
function themeAndContrastController(action) {
    isContrast = localStorage.isContrast;
    themeColour = localStorage.themeColour;
    switch(action){
        case 'themeChange':
            if (themeColour == 'default'){
                if (isContrast == 'false'){
                    colourAndShade('dDefault');
                } else{
                    colourAndShade('lDefault');
                }
            } else{
                if (isContrast == 'false'){
                    colourAndShade('lPink');
                } else{
                    colourAndShade('dPink');
                }
            }
            break;

        case 'contrastSwitch':
            if (isContrast == 'false'){
                if (themeColour == 'default'){
                    colourAndShade('dDefault');
                } else{
                    colourAndShade('lPink');
                }
            } else{
                if (themeColour != 'pink'){
                    colourAndShade('lDefault');
                } else{
                    colourAndShade('dPink');
                }
            }    
            break;

        default:
            colourAndShade('lDefault');
    }
}

function changeTab(tabName, actTab) {
    var i, tabcontent, tabchanges;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tabchanges = document.getElementsByClassName("tabchange");
    for (i = 0; i < tabchanges.length; i++) {
        tabchanges[i].style.textDecoration = "none";
    }
    document.getElementById(tabName).style.display = "block";
    actTab.style.textDecoration = 'underline';
}

function underLine(number){
    switch(number){
        case 1:
            document.getElementsByName('Meal')[0].click();
            break;

        case 2:
            document.getElementsByName('Workout')[0].click();
            break;

        case 3:
            document.getElementsByName('Weight')[0].click();
            break;

        case 4:
            document.getElementsByName('Day_grade')[0].click();
            break;
    }
}

themeAndContrastController('contrastSwitch');
themeAndContrastController('themeChange');
if (document.getElementById('defaultOpen')){
    document.getElementById("defaultOpen").click();
}

class Calendar {
    constructor(){
        this.months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
        
        this.date = new Date();

        this.day_of_week = this.date.getDay();
        this.day_of_month = this.date.getDate();
        this.month = this.date.getMonth();
        this.year = this.date.getFullYear();

        this.divCalendar = document.getElementById('calendar');
        this.divCalendarHeader = document.getElementById('calendar-header');
        this.divCalendarTable = document.getElementById('calendar-table');
        this.divCalendarMonthAndYear = document.getElementById('calendar-month-year');
        this.divCalendarButtons = document.getElementById('calendar-buttons');
        this.divCalendarPrev = document.getElementById('prev');
        this.divCalendarNext = document.getElementById('next');
        this.divCalendarLastRecord = document.getElementById('days-record6');

        this.divCellsListQue = document.getElementsByName("day_cell");
        this.divCellsList = Array.prototype.slice.call(this.divCellsListQue, 0 );

        this.current_day = this.divCellsList[this.date.getDate()];

    }

    setMonthAndYear() {
        this.divCalendarMonthAndYear.innerHTML = this.months[this.month] + " " + this.year;
    }

    setDaysInTable(){
        for (let i = 0; i < this.divCellsList.length; i++) {
            this.divCellsList[i].innerHTML = "";
            this.divCellsList[i].style = "";
        }

        const daysInMonth = new Date(this.year, this.month+1, 0).getDate();
        const tempDate = new Date(this.year, this.month, 1);
        let firstMonthDay = tempDate.getDay();

        if (firstMonthDay === 0) {
            firstMonthDay = 7;
        }

        const monthEnd = daysInMonth + firstMonthDay - 1;

        if (monthEnd >= 36){
            root.style.setProperty('--size', '465px');
            this.divCalendarLastRecord.style.opacity ='1';
        } else {
            root.style.setProperty('--size', '400px');
            this.divCalendarLastRecord.style.opacity ='0';
        }

        for (let i=0; i<firstMonthDay-1; i++) {
            this.divCellsList[i].innerHTML = "";
            this.divCellsList[i].style.backgroundColor = "var(--colorMain)";
            this.divCellsList[i].style.cursor = "default";
        }
        for (let i=monthEnd; i<this.divCellsList.length; i++) {
            this.divCellsList[i].style.backgroundColor = "var(--colorMain)";
            this.divCellsList[i].style.cursor = "default";
        }

        for (let i = firstMonthDay-1; i<monthEnd; i++) {
            this.divCellsList[i].innerHTML = (i - firstMonthDay + 2).toString();
            
            if (this.year === this.date.getFullYear() && this.month === this.date.getMonth() && this.day_of_month === i - firstMonthDay + 2) {
                let element = this.divCellsList[i];
                element.className = "cell_highlighted";
                this.current_day = this.divCellsList[i];
            }
            else if(this.current_day.className == 'cell_highlighted'){
                let element = this.divCellsList[i];
                element.className = "cell";
            }

        }

    }

    setButtons() {
        this.divCalendarPrev.addEventListener("click", e => {
            this.month--;
            if (this.month < 0) {
                this.month = 11;
                this.year--;
            }
            this.setMonthAndYear();
            this.setDaysInTable();
            
        });
        this.divCalendarNext.addEventListener("click", e => {
            this.month++;
            if (this.month > 11) {
                this.month = 0;
                this.year++;
            }
            this.setMonthAndYear();
            this.setDaysInTable();
            
        });
    }

    init(){
        this.setMonthAndYear();
        this.setDaysInTable();
        this.setButtons();
    }
}

if (document.getElementById('calendar')){
    const calendar = new Calendar();
    calendar.init()
}