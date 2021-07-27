var display = document.getElementById("display");
var buttons = document.getElementsByClassName("buttons");

let result = "";
let numericresult = 0;

for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click",function(){
        if(buttons[i].innerHTML == "AC"){
            result = "";
            display.innerHTML = result;
        } else if(buttons[i].innerHTML == "="){
            numericresult = eval(result);
            result = numericresult;
            display.innerHTML = result;
        } else {
            result += buttons[i].innerHTML;
            display.innerHTML = result;
        }
    })
}