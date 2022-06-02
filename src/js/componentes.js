import { Todo } from "../classes";
import {todoList} from '../index';

// Referencias HTML
// Seleciona la clase todo-list del HTML
const divTodoList = document.querySelector('.todo-list'); 
const txtImput = document.querySelector('.new-todo');
const btnBorar = document.querySelector('.clear-completed');
const ulFiltors = document.querySelector('.filters');
const anchoFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {

    const htmlTodo = 
            //Si todo.completado es true se completo la tarea  
    ` <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' } >
        <label>${ todo.tarea }</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
</li> `;

    const div = document.createElement('div'); //Crea un div
    div.innerHTML = htmlTodo; //div = const htmlTodo

    divTodoList.append(div.firstElementChild); // Agrega el primer hijo del DIV seleccionado
                                               // En este caso el primer li

    return div.firstElementChild;


}

//Eventos
txtImput.addEventListener('keyup', (event) =>{ // keyup -> cuando se suelta la tecla - event -> que tecla presiono
    //Si se apreta enter y no esta vacio el campo.
    if (event.keyCode === 13 && txtImput.value.length > 0){ 
      // Envia lo que se escribio a Todo
        const nuevoTodo = new Todo( txtImput.value );
        // Lo agrega como un nuevoTodo
        todoList.nuevoTodo(nuevoTodo);

        //Inserta nuevoTodo en el HTML
        crearTodoHtml( nuevoTodo );
        //Despues de presionar enter se borra lo que se escribio
        txtImput.value = '';
    };

});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName; // puede ser imput, boton, label
    const todoElemento   = event.target.parentElement.parentElement; //Selecciono el li
    const todoId         = todoElemento.getAttribute('data-id'); // ID del elemento

    if ( nombreElemento.includes('input')){ //Si el elemento es imput Marca la casilla
        todoList.marcarCompletado(todoId); 
        todoElemento.classList.toggle('completed');
    } else if ( nombreElemento.includes('button') ){ // Si el elemento es buttom (x) borra la tarea
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }


    //console.log(todoElemento);
    // console.log(todoId);

});

//Borar todos los completados
btnBorar.addEventListener('click', () =>{
    todoList.eliminarCompletados();
        //ciclo for inverso
    for (let i= divTodoList.children.length-1; i>= 0; i--){
        const elemento = divTodoList.children[i]; 
        if(elemento.classList.contains('completed') ){ // si el elemento contiene la clase completed 
            divTodoList.removeChild(elemento); // lo elimina
        }

    }

})

ulFiltors.addEventListener('click', (event) =>{

    const filtro = event.target.text;
    if (!filtro) {return;}

    anchoFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ){

            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;

        }

    }
})
