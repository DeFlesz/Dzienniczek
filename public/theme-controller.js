//gathering local storage and root info
let root = document.documentElement;
let isContrast = localStorage.getItem('isContrast');
let themeColour = localStorage.getItem('themeColour');

//colour change coded to save space in other functions
function colourAndShade(colour){
    switch(colour){
        case 'lDefault':
            root.style.setProperty('--colorMain', '#DEDEDE');
            root.style.setProperty('--colorBackground', '#808080');
    
            document.getElementById('icon_contrast').src = "/svg/icons/contrast_lightGray.svg";
            document.getElementById('icon_color').src = "/svg/icons/color_lightGray.svg";
            document.getElementById('logo').src = "/svg/logo_pamietnik/logo_pamietnik_lightGrey.svg";
            break;
            
        case 'dDefault':
            root.style.setProperty('--colorMain', '#808080');
            root.style.setProperty('--colorBackground', '#DEDEDE');
            document.getElementById('icon_contrast').src = "/svg/icons/contrast_dark_gray.svg";
            document.getElementById('icon_color').src = "/svg/icons/color_darkGray.svg";
            document.getElementById('logo').src = "/svg/logo_pamietnik/logo_pamietnik_dark_gray.svg";
            break;

        case 'lPink':
            root.style.setProperty('--colorMain', '#AD727F');
            root.style.setProperty('--colorBackground', '#FABEC8');
            document.getElementById('icon_contrast').src = "/svg/icons/contrast_lightGray.svg";
            document.getElementById('icon_color').src = "/svg/icons/color_lightGray.svg";
            document.getElementById('logo').src = "/svg/logo_pamietnik/logo_pamietnik_lightGrey.svg";
            break;

        case 'dPink':
            root.style.setProperty('--colorMain', '#FABEC8');
            root.style.setProperty('--colorBackground', '#AD727F');
            document.getElementById('icon_contrast').src = "/svg/icons/contrast_lightGray.svg";
            document.getElementById('icon_color').src = "/svg/icons/color_lightGray.svg";
            document.getElementById('logo').src = "/svg/logo_pamietnik/logo_pamietnik_lightGrey.svg";
            break;

        default:
            colourAndShade('lDefault');
    }
}

function themeChange(){
    if (themeColour == 'default'){
        localStorage.setItem('themeColour', 'pink');
    }
    else if (themeColour == 'pink'){
        localStorage.setItem('themeColour', 'default');
    }
    console.log(localStorage);
    themeAndContrastController('themeChange');
    themeAndContrastController('contrastSwitch');
}

function contrastSwitch(){
    if (isContrast == 'true'){
        localStorage.setItem('isContrast', 'false');
    } else {
        localStorage.setItem('isContrast', 'true');
    }
    console.log(localStorage);
    themeAndContrastController('contrastSwitch');
    themeAndContrastController('themeChange');
}

//main function
function themeAndContrastController(action) {
    isContrast = localStorage.getItem('isContrast');
    themeColour = localStorage.getItem('themeColour');
    switch(action){
        case 'themeChange':
            if (themeColour == 'default'){
                if (isContrast == 'false'){
                    colourAndShade('lDefault');
                } else{
                    colourAndShade('dDefault');
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
                    colourAndShade('lDefault');
                } else{
                    colourAndShade('lPink');
                }
            } else{
                if (themeColour != 'pink'){
                    colourAndShade('dDefault');
                } else{
                    colourAndShade('dPink');
                }
            }    
            break;

        default:
            colourAndShade('lDefault');
    }
}

themeAndContrastController('contrastSwitch');
themeAndContrastController('themeChange');
