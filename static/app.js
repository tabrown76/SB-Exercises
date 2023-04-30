function clearTextInput() {
    document.getElementById('textInput').value = '';
}

function deselectRadioButtons() {
    const radioButtons = document.getElementsByName('choice');
    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].checked = false;
    }
}