



window.addEventListener("load", function() {


const formulario = document.getElementById("prof-form");


 formulario.addEventListener("submit", function(e){
    

let errors = [];

const professionId = document.querySelector("#professionId");

if (professionId.value == "") {
errors.push("Debe elegir una Profesión")};



//
const re = new RegExp(/[0-9]/);

const otherJob = document.querySelector("#otherJob");
if (otherJob.value != "") {if(otherJob.value.length <= 2 ){errors.push("Completa la Profesión(minimo 2 caracteres")}
 else if(otherJob.value.match(re) != null){errors.push("La Profesion no puede tener numeros")}
}

//

//const haveLicence = document.querySelector('#have-licence');         
var haveLicence = document.querySelector('input[name="haveLicence"]:checked');

var licence = document.querySelector("#licence");

if (haveLicence) {if(licence.value ==""){errors.push("Completa el numero de Licencia")}};
//

const workZone = document.querySelector("#workZone");

if (workZone.value == "") {
    errors.push("Debe elegir una Zona de Trabajo")};


//


//

const emergency = document.querySelector("#emergency");

if (emergency.value == "") {
    errors.push("El campo emergencia no puede estar vacio")};


//

//
var workDays = document.querySelector('input[name="dayShift"]:checked')
//const workDays = document.querySelector("#workDays:checked");   

if (!workDays) {
    errors.push("Debe elegir un horarios de Trabajo")};


//

//

const whyMe = document.querySelector("#whyMe");

if (whyMe.value == "") {
    errors.push("Debe completar el campo Razones para elegirme")}
    else if (whyMe.value.length < 50 || whyMe.value.length > 500  ) {errors.push("El mensaje debe contener entre 50 y 500 letras")}
    
    
    
    ;


//

//

const price = document.querySelector("#price");

if (price.value == "") {
    errors.push("Debe completar el campo Precio")}
    else if (whyMe.value.isNumber == false ) {errors.push("El Precio solo puede contener numeros")}
    
    
    
    ;


//

//

const cbu = document.querySelector("#cbu");

if (cbu.value == "") {
    errors.push("Debe completar el CBU")}
    else if (cbu.value.isNumber == false ) {errors.push("El CBU solo puede contener numeros")}
    
    else if (cbu.value.length != 22  ) {errors.push("El CBU debe contener 22 numeros")}   
    ;


//




;

if (errors.length > 0){e.preventDefault();


let ulErrors = document.querySelector("#prueba");


for(i=0 ; i < errors.length; i++){

ulErrors.innerHTML += "<li>" + errors[i] + "</li>"}



}})})