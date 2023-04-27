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
        if(b == 0){
            throw new Error("No se puede dividir por cero");
        }else{
            toR = divide(a,b);
        }
    }
    return toR;
}



//Variables que uso para mantener los 2 operandos
let resultado = 0; // No se hizo ninguna operacion todabia 
let num1 = null;
let num2 = null;
let clicksOperadorDisponible = 2;
let operadorClickeado1 = null;
let operadorClickeado2 = null;
let numeroEscribiendo = 1;
let resultadoActualString = "";
let punto1Disponible = 1;
let punto2Disponible = 1;


//Obtener informacion del html
const nums = document.querySelectorAll("button");
let resultadoHtml = document.querySelector(".resultado");
let cuentaActualHtml = document.querySelector(".cuenta-actual");


nums.forEach( elem => elem.addEventListener("click", function agregarListener(elem){
    
        let buttonContent = elem.target.innerText;

        if(buttonContent != "clear" && buttonContent != "delete" ){
            if( (punto1Disponible >= 1 && numeroEscribiendo == 1) || 
                (punto2Disponible >= 1 && numeroEscribiendo == 2)){
                    cuentaActualHtml.innerText = cuentaActualHtml.innerText + buttonContent;
            }else {
                if(buttonContent != '.'){
                    cuentaActualHtml.innerText = cuentaActualHtml.innerText + buttonContent;
                }
            }
        }

        //Si clickearon una operacion
        if( buttonContent == '+' || buttonContent == '-' ||buttonContent == '*' ||buttonContent == '/'){
            if(clicksOperadorDisponible == 2){
                clicksOperadorDisponible--;
                operadorClickeado1 = buttonContent;
                if( num1 != null ){ //Caso en que ingresan + y todabia no es escribio ningun numero
                    numeroEscribiendo = 2;
                }else{  //Caso en que se escribio numero y presiono + => 100 + 
                    numeroEscribiendo = 1;
                }
                
            }else if( clicksOperadorDisponible == 1){//Es decir + num1 + , entonces significa que tengo que hacer lo primero (+ num1)
                clicksOperadorDisponible--;
                operadorClickeado2 = buttonContent;
                numeroEscribiendo = 2;
            }

        //Si clickearon un numero
        }else if( buttonContent == '0' || buttonContent == '1' || buttonContent == '2' || buttonContent == '3' ||
                buttonContent == '4' || buttonContent == '5' || buttonContent == '6' ||
                buttonContent == '7' || buttonContent == '8' || buttonContent == '9' ){
            if( numeroEscribiendo == 1 ){
                if(num1 == null){
                    num1 = "" + buttonContent;
                }else{
                    num1 = num1 + buttonContent;
                }
            }else{
                if(num2 == null){
                    num2 = "" + buttonContent;
                }else{
                    num2 = num2 + buttonContent;
                }
            }
            
        //Si clickearon =
        }else if(buttonContent == "."){
            if(numeroEscribiendo == 1 && punto1Disponible >= 1){
                if(num1 != null){
                    num1 = num1 + buttonContent;
                }else{
                    num1 = ""+buttonContent;
                }
                punto1Disponible--;
            }else if(numeroEscribiendo == 2 && punto2Disponible >= 1){
                if(num2 != null){
                    num2 = num2 + buttonContent;
                }else{
                    num2 = ""+buttonContent;
                }
                punto2Disponible--;
            }
        }if( buttonContent == "delete"){
            borrarUltimoCaracter();
        }else if( buttonContent == '=' ){

            try{
                if( operadorClickeado1 != null && operadorClickeado2 != null ){ //Caso: escribi +5+5 => resultado = resultado + 5 + 5
                    resultado = operate(resultado, +num1, operadorClickeado1);
                    resultado = operate(resultado, +num2, operadorClickeado2);
                }else if( operadorClickeado1 != null ){
                    if( num1 != null && num2 != null ){  //Caso: escribi 5+5 => resultado = 5 + 5 (no +5+5)
                        resultado = operate(+num1, +num2, operadorClickeado1); 
                    }else{ //Caso: tengo un resultado y escribi +5 => resultado = resultado +5
                        resultado = operate(resultado, +num1, operadorClickeado1);
                    }
                }else{ //Caso: escribi 5 => resultado = 5;
                    resultado = +num1;
                }
                cuentaActualHtml.innerText = "";
                resultadoHtml.innerText = `${resultado.toFixed(4)}`;
                reseteo();
            }catch(e){
                resultadoHtml.innerText = "Error, no se puede dividir por cero";
            }


        //Si clickearon "clear"
        }else if( buttonContent == "clear"){
            reseteo();
            cuentaActualHtml.innerText = "";
            resultadoHtml.innerText = "";
        }
    
}));


function reseteo(){
    num1 = null;
    num2 = null;
    operadorClickeado1 = null;
    operadorClickeado2 = null;
    clicksOperadorDisponible = 2;
    numeroEscribiendo = 1;
    resultadoActualString = "";
    punto1Disponible = 1;
    punto2Disponible = 1;
}


function borrarUltimoCaracter(){
    /* 
        Caso1 = + num1 + num2 => borro num2
        Caso2 = + num1 + null => borro op2
        Caso3 = + num1 null null => borro num1
        Caso4 = + null null null => borro op1
        Caso5 = null null null null => no hago nada
    */  
        cuentaActualHtml.innerText = cuentaActualHtml.innerHTML.substring(0, cuentaActualHtml.innerHTML.length-1);
        if( num2 != null ){
                if(num2.length == 1){
                    num2 = null;
                }else{
                    num2 = num2.substring(0, num2.length-1);
                }
        }else if(operadorClickeado2 != null){
                operadorClickeado2 = null;
        }else if(num1 != null){
                if(num1.length == 1){
                    num1 = null;
                }else{
                    num1 = num1.substring(0, num1.length-1);
                }
        }else if(operadorClickeado1 != null){
                operadorClickeado1 = null;
        }
}
