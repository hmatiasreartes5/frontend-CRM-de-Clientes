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

    //funcion que consulta en la API la informacion del cliente
    const consultarAPI = async () => {
        const cliente = await clienteAxios.get(`/clientes/${id}`)
        guardarCliente(cliente.data)
    }

    useEffect(()=> {
        consultarAPI()
    },[])

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
                            />
                        ))}
                    </ul>
                    <div className="campo">
                        <label>Total:</label>
                        <input type="number" name="precio" placeholder="Precio" readonly="readonly" />
                    </div>
                    <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Agregar Pedido"/>
                    </div>
                
        </Fragment>
     );
}
 
export default NuevoPedido;