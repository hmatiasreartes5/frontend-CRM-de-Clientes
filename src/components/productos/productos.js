import React,{Fragment,useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Producto from './producto';

const Productos = () => {

    //state del componente
    const [productos,guardarProductos] = useState([]);

    //Consulta a la API //esta funcion puede ir tanto dentro como fuera del useEffect
    //en este caso opte por que fuera una funcion por fuera 
    const consultarApi = async () => {
        const productos = await clienteAxios.get('/productos');
        //console.log(productos.data);
        guardarProductos(productos.data);
    }

    useEffect(()=>{
        consultarApi();
    },[productos])

    return (  
        <Fragment>
            <h2>Productos</h2>

                <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                    Nuevo Producto
                </Link>

                <ul className="listado-productos">
                    {productos.map(producto => (
                        <Producto
                            key={producto._id}
                            producto={producto} 
                        />
                    ))}
                </ul>
        </Fragment>
    );
}
 
export default Productos;