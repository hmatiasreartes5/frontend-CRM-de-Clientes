import React,{Fragment,useState,useEffect} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

import FormBuscadorPedido from './FormBuscadorPedido';
import FormCantidadProducto from './FormCantidadProducto'

const NuevoPedido = (props) => {

    //obtener el id del cliente correspondiente al pedido 
    const {id} = props.match.params

    //state del componente
    const [cliente,guardarCliente] = useState({});
    const [busqueda,guardarBusqueda] = useState('');
    const [productos,guardarProductos] = useState([]);
    const [total,guardarTotal] = useState(0)

    //funcion que consulta en la API la informacion del cliente
    const consultarAPI = async () => {
        const cliente = await clienteAxios.get(`/clientes/${id}`)
        guardarCliente(cliente.data)
    }

    useEffect(()=> {
        consultarAPI();
        actualizarTotal();
    },[productos])

    const BuscarProducto = async e => {
        e.preventDefault()
        //obtener los datos de la busqueda
        const resultado = await clienteAxios.post(`/productos/busqueda/${busqueda}`)
        //console.log(resultado.data);

        if(resultado.data[0]){
            let resultadoProductos = resultado.data[0]

            //agregar la llave producto que es un copia del id
            resultadoProductos.producto = resultado.data[0]._id;
            resultadoProductos.cantidad = 0;

            guardarProductos([
                ...productos,
                resultadoProductos
            ])
            console.log(resultadoProductos)

        }else{
            Swal.fire({
                type: 'error',
                title:'No hay resultados',
                text: 'No hay resultados'
            })
        }
    }

    const LeerDatosBusqueda = e => {
        e.preventDefault();
        guardarBusqueda(e.target.value)
    }

    //funciones para actualizar la cantidad del pedido
    const restarProducto = i => {
        const todosProductos = [...productos]

        if(todosProductos[i].cantidad === 0) return;

        todosProductos[i].cantidad--;

        guardarProductos(todosProductos)
    }

    const sumarProducto= i => {
        const todosProductos = [...productos];

        todosProductos[i].cantidad++;

        guardarProductos(todosProductos);
    }

    //funcion para actualizar el total a pagar 
    const actualizarTotal = () => {
        //verifico si hay elementos en el array de productos
        if(productos.length === 0){
            guardarTotal(0);
            return;
        } 

        let nuevoTotal = 0;
        //recorro todos los productos, analizo sus cantidades y precios
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        guardarTotal(nuevoTotal);
    }

    //funcion para eliminar un producto del pedido 
    const eliminarProductoPedido = id => {
        const todosProductos = productos.filter(producto => producto._id !== id);

        guardarProductos(todosProductos);
    }

    //funcion para almacenar un pedido en DB
    const realizarPedido = async e => {
        e.preventDefault()

        //armar el objeto que se va a enviar a la API
        const pedido = {
            cliente: id,
            pedido : productos,
            total: total
        }

        //almacenar en la DB
        const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`,pedido);

        if(resultado.status === 200){
            Swal.fire({
                type: 'succes',
                title:'Correcto',
                text: resultado.data.msg
            })
        }else{
            Swal.fire({
                type: 'error',
                title:'Se Produjo un error',
                text: 'Vuelve a intetarlo'
            })
        }
    }

    return ( 
        <Fragment>
            <h2>Nuevo Pedido</h2>

                <div className="ficha-cliente">
                    <h3>Datos de Cliente</h3>
                    <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                    <p>Email: {cliente.email}</p>
                </div>

                <FormBuscadorPedido 
                    BuscarProducto={BuscarProducto}
                    LeerDatosBusqueda={LeerDatosBusqueda}
                />

                    <ul className="resumen">
                        {productos.map((producto,index)=>(
                            <FormCantidadProducto 
                                key={producto.producto}
                                producto={producto}
                                restarProducto={restarProducto}
                                sumarProducto={sumarProducto}
                                index={index}
                                eliminarProductoPedido={eliminarProductoPedido}
                            />
                        ))}
                    </ul>
                    
                    <p className="total">Total a Pagar: <spa>$ {total}</spa></p>
                    {total > 0 ?
                        (   <form
                                onSubmit={realizarPedido}
                            >
                                <input 
                                    type="submit"
                                    className="btn btn-verde btn-block"
                                    value="Realizar Pedido"
                                />
                            </form>
                        ) : null
                    }
                
        </Fragment>
     );
}
 
export default NuevoPedido;