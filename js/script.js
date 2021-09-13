// arreglo de imagenes
const imagenes = ["bg.jpeg", "bg-two.jpeg", "bg-three.jpeg"];

// función para cambiar fondo de la página -  versión escritorio
function cambiarFondo(){
    let randomNumber = Math.floor(Math.random() * imagenes.length);
    document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(./img/${imagenes[randomNumber]})`;
    document.body.style.backgroundSize = 'cover';
}

// cambia aleatoriamente el fondo al cargar la página 
    window.onload = cambiarFondo();

// evento al hacer click en el botón de calcular
$("#calcular").on('click', function(){
    // evento submit del formulario, evita recargar la página
    formulario.addEventListener('submit',(e) => e.preventDefault());

    // declaro variables con valores del formulario
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let edad = document.getElementById("edad").value;
    let peso = document.getElementById("peso").value; 
    let estatura = document.getElementById("estatura").value;
    let genero = document.getElementById("sexo").value;
    let actividad = document.getElementById("actividad").value;
    let objetivo = document.getElementById("objetivo").value;
        
    class Persona{
        // constructor de la clase persona
        constructor(peso, edad, estatura, genero, actividad, objetivo){
            this.peso = peso;
            this.edad = edad;
            this.estatura = estatura
            this.genero = genero;
            this.actividad = actividad;
            this.objetivo = objetivo;
        }
        
        // declaración de método metabolismo de la persona
        metabolismo = () => {
            // valores según formula de calculo para metabolismo basal
            peso = 10 * peso;
            edad = 5 * edad;
            estatura = 6.25 * estatura;
            
            // asignación de valores para cada genero
            switch (genero){
                case "H":
                    genero = 5;
                    break;
                case "M":
                    genero = 161;
                    break;
            }

            // calculo de metabolismo basal
            let basal = (peso + estatura) - edad;
            let basalFinal = genero === 5 ? basal + genero : basal - genero; //aplico un if ternario
            
            // retorno el resultado final para la función
            return basalFinal;
        }

        // método para calcular las Kcal de mantenimiento, según nivel de actividad física
        mantenimiento = (tmb) => tmb * actividad;
    }

    // ciclo que identifica todos los input del formulario vacíos, esto para simplificar el condicional de abajo
    let field = document.getElementsByClassName('field');
    for(let i = 0; i < field.length; i++){
        if (field[i].children[1].value === ""){
            field = 0; 
        } 
    }
    // controlo si hay input vacios del form, calculos e impresión sobre el documento HTML
    if (field != 0){
        // invocación del objeto Persona
        const persona = new Persona(peso, edad, estatura, genero, actividad, objetivo);
                
        // calculo de Kcal
        const tmb = Math.round(persona.metabolismo());
        const mantenimiento = Math.round(persona.mantenimiento(tmb));
        switch (objetivo){
            case "1":
                objetivo = mantenimiento - Math.round(mantenimiento * 0.2);
                break;
            case "2":
                objetivo = mantenimiento + Math.round(mantenimiento * 0.2);
                break;
            case "3":
                objetivo = mantenimiento;
                break;        
        }
                
        // renderizando el resultado
        $(".output").html(`<p><span>${nombre.toUpperCase()} ${apellido.toUpperCase()}</span> su gasto energético basal es de: <span>${new Intl.NumberFormat().format(tmb)} Kcal.</span></p>
                <p>Según el Nivel de Actividad Fisica y el Objetivo seleccionado usted debe consumir: <span>${new Intl.NumberFormat().format(objetivo)} Kcal</span></p>`).hide();
        $(".output").slideDown(1000); // oculto el elemento anterior para poder realizar el efecto de slideDown
    } else {
        $(".output").slideUp(1000); // efecto de sliedeUp en caso de estar algún elemento del formulario vacío
    } 
});