//gathering local storage and root info
let root = document.documentElement;
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
            root.style.setProperty('--svgColour', '#DEDEDE');
            document.getElementById('logo').src = "/svg/logo_pamietnik/logo_pamietnik_lightGrey.svg";
            break;
            
        case 'dDefault':
            root.style.setProperty('--colorMain', '#808080');
            root.style.setProperty('--colorBackground', '#DEDEDE');
            root.style.setProperty('--svgColour', '#808080');
            document.getElementById('logo').src = "/svg/logo_pamietnik/logo_pamietnik_dark_gray.svg";
            break;

        case 'lPink':
            root.style.setProperty('--colorMain', '#AD727F');
            root.style.setProperty('--colorBackground', '#FABEC8');
            root.style.setProperty('--svgColour', '#AD727F');
            document.getElementById('logo').src = "/svg/logo_pamietnik/logo_pamietnik_darkPink.svg";
            break;

        case 'dPink':
            root.style.setProperty('--colorMain', '#FABEC8');
            root.style.setProperty('--colorBackground', '#AD727F');
            root.style.setProperty('--svgColour', '#FABEC8');
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

themeAndContrastController('contrastSwitch');
themeAndContrastController('themeChange');
