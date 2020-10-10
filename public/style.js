changeContrast()

//clock
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('clock').innerHTML = h + ":" + m;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}


function changeContrast(contrast = localStorage.getItem('isContrast')) {

    let root = document.documentElement

    if(getComputedStyle(document.documentElement).getPropertyValue('--colorMain') == '#808080') {
        root.style.setProperty('--colorMain', '#DEDEDE');
        root.style.setProperty('--colorBackground', '#808080');

        document.getElementById('icon_contrast').src = "/svg/icons/contrast_lightGray.svg";
        document.getElementById('icon_color').src = "/svg/icons/color_lightGray.svg";
        document.getElementById('logo').src = "/svg/logo_pamietnik/logo_pamietnik_lightGrey.svg";
        if (contrast){
            localStorage.setItem('isContrast', false);
        }
    }

    else if(getComputedStyle(document.documentElement).getPropertyValue('--colorMain') == '#DEDEDE') {
        root.style.setProperty('--colorMain', '#808080');
        root.style.setProperty('--colorBackground', '#DEDEDE');

        document.getElementById('icon_contrast').src = "/svg/icons/contrast_dark_gray.svg";
        document.getElementById('icon_color').src = "/svg/icons/color_darkGray.svg";
        document.getElementById('logo').src = "/svg/logo_pamietnik/logo_pamietnik_dark_gray.svg";
        if (!contrast){
            localStorage.setItem('isContrast', true);
        }
    }
}