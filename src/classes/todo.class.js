
export class Todo{

    static fromJson( {id, tarea, comletado, creado} ){
        const tempTodo = new Todo(tarea);

        tempTodo.id         = id;
        tempTodo.comletado  = comletado;
        tempTodo.creado     = creado;

        return tempTodo;
    }

    constructor(tarea){
        this.tarea = tarea;

        this.id    = new Date().getTime(); // Muestra la hora exacta y la fecha actual
        this.comletado = false;
        this.creado = new Date(); 
    }

    imprimirClase(){
        console.log(`${this.tarea} - ${this.id}`); 

    }
}
