class Producto{
    constructor(codigo,nombre,cantidad, costo){
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad =cantidad;
        this.costo = costo;
        this.next = null;
        this.ant = null;   
    }
    informacion(){
        return `Codigo: ${this.codigo}, Nombre: ${this.nombre}, Cantidad: ${this.cantidad}, Costo: ${this.costo} `;
    }
}
class Inventario{
    constructor(){
        this.primero = null; 
        this.ultimo = null;      

    }
    agregar(producto){
        if (this.primero) {
            let temp = this.primero;
                while (temp) {
                    if (producto.codigo < temp.codigo) {
                        producto.ant = temp.ant;
                        producto.next = temp;
                        temp.ant.next = producto;
                        temp.ant = producto;   
                        return true;               
                    }
                    temp = temp.next;
               }
               this.ultimo.next = producto;
               producto.ant = this.ultimo;
               this.ultimo = producto;
        }
        else{
            this.primero = producto;
            this.ultimo = producto;
        }

    }
    eliminar(codigo){
        if (this.primero) {
            if (this.primero.codigo === codigo) {
                if (this.primero.next != null) {
                    this.primero.ant = null;
                    this.primero = this.primero.next;
                }
                else{
                    this.primero = null;
                    this.ultimo = null;
                }
            }else if(this.ultimo.codigo === codigo){
                    this.ultimo.ant.next = null;
                    this.ultimo = this.ultimo.ant;
            }else{
                let temp = this.primero.next;
                while (temp) {
                    if (temp.codigo === codigo) {
                        temp.ant.next = temp.next;
                        temp.next.ant = temp.ant;
                    }
                    temp = temp.next;
                }
            }
        }
        return null;
     }
    buscar(codigo){
        if (this.primero != null) {
            if (this.primero.codigo === codigo) {
                return this.primero;
            }
        }else{
            let temp = this.primero;
            while (temp.next != null) {
                if (temp.next.codigo === codigo) {
                    return temp.next;
                }else{
                    temp = temp.next;
                }
            }
        }
       
      
    }
    listado(){
        if (this.primero) {
            let lista = "", temp = this.primero;
            while (temp) {
                lista += temp.informacion();
                temp = temp.next;
            }
            return lista;
        }
        return "NO HAY PRODUCTOS";
    }

    listadoInverso(){
        if (this.primero != null) {
            return listarInversoRecursivo(this.primero);
        }
        return "Productos no existentes";

        function listarInversoRecursivo(producto) {
            if (producto.next == null) {
                return `${producto.info()}`;
            }
            else {
                return `${listarInversoRecursivo(producto.next)}+ '.'+${producto.info()}`;
            }
        }

    }

}


let inventario = new Inventario();

let p1 = new Producto(1,"Coca cola",10,20);
console.log(inventario.agregar(p1));
let p2 = new Producto(3,"Coca cola",10,20);
console.log(inventario.agregar(p2));
let p3 = new Producto(2,"Coca cola",10,20);
console.log(inventario.agregar(p3));
let p4 = new Producto(6,"Coca cola",10,20);
inventario.agregar(p4);
let p5 = new Producto(9,"Coca cola",10,20);
inventario.agregar(p5);
let p6 = new Producto(8,"Coca cola",10,20);
inventario.agregar(p6);

console.log(inventario.listado());
console.log(inventario.eliminar(6));
console.log(inventario.listado());

// // inventario.listado();
// //  console.log(inventario.listadoInverso());
// //  console.log(inventario.buscar(123));