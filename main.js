function add(a, b){return a+b;}
function subtract(a,b){return a-b;}
function multiply(a,b){return a*b;}
function divide(a,b){return a/b;}

function operate(a, b, operator){
    let toR = 0;
    if(operator == '+'){
        toR = add(a,b);
    }else if(operator == '-'){
        toR = subtract(a,b);
    }else if(operator == '*'){
        toR = multiply(a,b);
    }else{
        toR = divide(a,b);
    }
    return toR;
}

//Variables que uso para mantener los 2 operandos
let resultado = 0; // No se hizo ninguna operacion todabia 
let num1 = 0;
let num2 = 0;
let clicksOperadorDisponible = 2;
let operadorClickeado1 = null;
let operadorClickeado2 = null;
let numeroEscribiendo = 1;

//Obtener informacion del html
const nums = document.querySelectorAll("button");
nums.forEach( elem => elem.addEventListener("click", function agregarListener(elem){
    let buttonContent = elem.target.innerText;
    if( buttonContent == '+' || buttonContent == '-' ||buttonContent == '*' ||buttonContent == '/'){
        if(clicksOperadorDisponible == 2){
            clicksOperadorDisponible--;
            operadorClickeado1 = buttonContent;
            if( num1 != 0 ){ //Caso en que ingresan + y todabia no es escribio ningun numero
                numeroEscribiendo = 2;
            }else{  //Caso en que se escribio numero y presiono + => 100 + 
                numeroEscribiendo = 1;
            }
            
        }else if( clicksOperadorDisponible == 1){//Es decir + num1 + , entonces significa que tengo que hacer lo primero (+ num1)
            clicksOperadorDisponible--;
            operadorClickeado2 = buttonContent;
            numeroEscribiendo = 2;
        }
    }else if( buttonContent == '0' || buttonContent == '1' || buttonContent == '2' || buttonContent == '3' ||
              buttonContent == '4' || buttonContent == '5' || buttonContent == '6' ||
              buttonContent == '7' || buttonContent == '8' || buttonContent == '9' ){
        if( numeroEscribiendo == 1 ){
            num1 = num1 + buttonContent;
        }else{
            num2 = num2 + buttonContent;
        }
        
    }else if( buttonContent == '=' ){ //Apretaron =
        if( operadorClickeado1 != null && operadorClickeado2 != null ){ //Caso: escribi +5+5 => resultado = resultado + 5 + 5
            resultado = operate(resultado, +num1, operadorClickeado1);
            resultado = operate(resultado, +num2, operadorClickeado2);
        }else if( operadorClickeado1 != null ){
            if( num1 != 0 && num2 != 0){  //Caso: escribi 5+5 => resultado = 5 + 5 (no +5+5)
                resultado = operate(+num1, +num2, operadorClickeado1); 
            }else{ //Caso: tengo un resultado y escribi +5 => resultado = resultado +5
                resultado = operate(resultado, +num1, operadorClickeado1);
            }
        }else{ //Caso: escribi 5 => resultado = 5;
            resultado = +num1;
        }
        reseteo();
    }
    console.log(`Num1 escribiendo: ${+num1}`);
    console.log(`Num2 escribiendo: ${+num2}`);
    console.log(`Resultado: ${resultado}`)
}));


function reseteo(){
    num1 = 0;
    num2 = 0;
    operadorClickeado1 = null;
    operadorClickeado2 = null;
    clicksOperadorDisponible = 2;
    numeroEscribiendo = 1;
}


/*
op1, op2, num1, num2

op1 = +
num1 = 123
enter =
//Este caso opera con operacion(resultado, num1, op1)



op1 = *
num1 = 12
op2 = /
num2 = 110
//Este caso operado operacion(resultado, num1, op1) y operacion(resultado, num2, op2)


op1 = vacio
num1 = 10
op2 = *
num2 = 10
//Si op1 es vacio se resetea la cuenta


si (elem = operando){
    si( opDisponible == 2 ){
        op1 = elem;
        opDisponible--;
        numEscribiendo = 2
    } Si (opDisponible == 1){
        op2 = elem;
        opDisponible--;
    }
}
Si( elem = numero ){
    Si(numEscribiendo = 1){
        num1 = 
    }Sino{
        num2 = 
    }
}
Si( elem = '='){
    resultado = operacion(resultado, num1, op1);
    resultado = operacion(resutlado, num2, op2);
}

*/

