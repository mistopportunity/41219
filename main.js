const titleElement = document.getElementById("title")
const textFeedElement = document.getElementById("text-feed");
const buttonContainer = document.getElementById("buttons");

const adventureVariables = {};

function setTitle(title) {
    titleElement.innerHTML = title;
}
function setTextFeed(text) {
    textFeedElement.innerHTML = text;
}
function processDynamicText(text) {
    let newText = "";
    let variableBuffer = "";
    let capturing = false;
    for(let i = 0;i<text.length;i++) {
        const character = text[i];
        if(capturing) {
            switch(character) {
                default:
                    variableBuffer += character;
                    break;
                case "}":
                    newText += adventureVariables[variableBuffer];
                    capturing = false;
                    variableBuffer = "";
                    break;
                case "{":
                    throw "Unexpected bracket in dynamic text sequence";
            }
        } else {
            switch(character) {
                default:
                    newText += character;
                    break;
                case "{":
                    capturing = true;
                    break;
                case "}":
                    throw "Unexpected bracket in dynamic text sequence";
            }
        }
    }
    return newText;
}
function setVariable(variableName,value) {
    adventureVariables[variableName] = value;
}
function createButton(text,callback,callbackArguments) {
    const buttonElement = document.createElement("button");
    buttonElement.appendChild(document.createTextNode(text));
    if(callback) {
        buttonElement.onclick = function buttonCallback() {
            callback.apply(null,callbackArguments);
        }
    }
    return buttonElement;
}
function setButtons(buttons,buttonVariable) {
    while(buttonContainer.lastChild) {
        buttonContainer.removeChild(buttonContainer.lastChild);
    }
    buttons.forEach(button => {
        let newButton;
        const buttonText = button.text ? button.text : button.value;
        let buttonPath = computePathHandler(button.toPath);
        if(buttonPath) {
            const buttonCallback = buttonVariable && button.value ? function setPathAndVariable(path) {
                setVariable(buttonVariable,button.value);
                changePath(path);
            } : changePath;
            newButton = createButton(
                buttonText,
                buttonCallback,
                [buttonPath]
            );
        } else {
            const buttonCallback = buttonVariable && button.value ? function callbackAndSetVariable(callbackArguments) {
                setVariable(buttonVariable,button.value);
                button.callback(callbackArguments);
            } : button.callback;
            newButton = createButton(
                buttonText,
                buttonCallback,
                button.arguments
            );
        }
        buttonContainer.appendChild(newButton);
    });
}
function processPathJunction(junction,initialPath) {
    switch(junction.type) {
        default:
        case "filter":
            if(junction.values[adventureVariables[junction.target]]) {
                return junction.path1 || initialPath;
            } else {
                return junction.path2 || initialPath;
            }
        case "switch":
            const path = junction.values[
                adventureVariables[
                    junction.target
                ]
            ];
            if(path) {
                return path;
            }
            return initialPath;
        case "binary":
            if(adventureVariables[junction.target] === junction.value) {
                return junction.path1 || initialPath;
            } else {
                return junction.path2 || initialPath;
            }
    }
}
function computePathHandler(toPath) {
    if(!toPath) {
        return null;
    }
    let computedPath = null;
    if(toPath) {
        switch(typeof toPath) {
            case "object":
                computedPath = processPathJunction(
                    toPath,
                    toPath.default
                );
                break;
            case "string":
                computedPath = toPath;
                break;
            default:
                throw `Invalid value for toPath of '${pathID}'`;
        }
    }
    return computedPath;
}
function changePath(pathID) {
    const path = paths[pathID];
    if(!path) {
        alert(`'${pathID}' is missing from the paths dictionary!`);
        return;
    }
    if(path.dynamicTitle) {
        setTitle(processDynamicText(path.dynamicTitle));
    } else if(path.title) {
        setTitle(path.title);
    }
    if(path.dynamicText) {
        setTextFeed(processDynamicText(path.dynamicText));
    } else if(path.text) {
        setTextFeed(path.text);
    }
    if(path.buttons) {
        const computedPath = computePathHandler(path.toPath);
        if(computedPath) {
            path.buttons.forEach(button => {
                if(!button.toPath) {
                    button.toPath = computedPath;
                }
            });
        }
        setButtons(
            path.buttons,
            path.buttonVariable
        );
    } else {
        console.warn(`Warning: ${pathID} may be missing its buttons`);
    }
}
