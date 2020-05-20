window.addEventListener('load', changeColor);

function changeColor() {
    var red = document.getElementById('red').value;
    var green = document.getElementById('green').value;
    var blue = document.getElementById('blue').value;
    var viewColoar = document.getElementById('viewColor');
    document.getElementById('valueRed').value = red;
    document.getElementById('valueGreen').value = green;
    document.getElementById('valueBlue').value = blue;

    viewColoar.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

}

sliderRed = document.getElementById('red');
sliderGreen = document.getElementById('green');
sliderBlue = document.getElementById('blue');

sliderRed.addEventListener('input', changeColor);
sliderGreen.addEventListener('input', changeColor);
sliderBlue.addEventListener('input', changeColor);