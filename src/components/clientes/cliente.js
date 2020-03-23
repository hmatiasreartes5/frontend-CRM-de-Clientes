import React,{useEffect,useState,Fragment} from 'react';
import clienteAxios from '../../config/axios';
import ClienteSolo from './clienteSolo';
import {Link} from 'react-router-dom'

const Clientes = () => {

    //state del componente
    const [clientes,guardarClientes] = useState([])

    //query a la API
    const consultarApi = async () => {
        const clientes = await clienteAxios.get('/clientes');
        //console.log(clientes.data);
        guardarClientes(clientes.data);
    }

    useEffect(()=> {
        consultarApi();
    },[clientes])

    return (  
        <Fragment>
            <h1>Clientes</h1>
            <Link to={'/clientes/nuevo'} class="btn btn-verde nvo-cliente"> 
                <i class="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>
            <ul className="listado-clientes">
                    {clientes.map(cliente => (
                        <ClienteSolo 
                            key={cliente._id}
                            cliente={cliente}
                        />
                    ))}
            </ul>
        </Fragment>
    );
}
 
export default Clientes;