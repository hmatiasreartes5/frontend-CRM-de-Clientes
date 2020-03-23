import React,{Fragment,useState} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom'

const NuevoCliente = ({history}) => {

    //state del componente
    const [cliente,guardarCliente] = useState({
        nombre:'',
        apellido:'',
        empresa: '',
        email: '',
        telefono: ''
    })

    //funcion para actualizar el state
    const actualizarState = e => {
        e.preventDefault();
    
        //guardar los cambios en el state cuando el usuario llene los campos
        guardarCliente({
            //copia del state
            ...cliente,
            //guardo cambios en el state
            [e.target.name] : e.target.value
        })
    }

    //Añade un nuevo cliente en la API
    const agregarCliente = e => {
        e.preventDefault();

        //enviar la peticion
        clienteAxios.post('/clientes',cliente)
        .then(res => {
            //validar si hay errores en mongo
            if(res.data.code === 11000){
                Swal.fire({
                    type: 'error',
                    title: 'Hubo un error',
                    text: 'Ese cliente ya esta registrado'
                })
            }else{
                Swal.fire(
                    'Se agregó el Cliente',
                    res.data.mensaje,
                    'success'
                )
            }
            //redireccionar
            history.push('/')
        });

    }

    //funcion pars validar los campos
    const validarCampos = () => {
        const {nombre,apellido,empresa,email,telefono} = cliente
        if(nombre==='' || apellido==='' || empresa==='' || email==='' || telefono==='') return true;

        return false;
    }

    return (  
        <Fragment>
            <h1>Nuevo Cliente</h1>

            <form
                onSubmit={agregarCliente}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                           placeholder="Nombre Cliente" 
                           name="nombre"
                           onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input  type="text" 
                            placeholder="Apellido Cliente" 
                            name="apellido"
                            onChange={actualizarState}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input  type="text" 
                            placeholder="Empresa Cliente"  
                            name="empresa"
                            onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input  type="email" 
                            placeholder="Email Cliente" 
                            name="email"
                            onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input  type="tel" 
                            placeholder="Teléfono Cliente" 
                            name="telefono"
                            onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                        <input  type="submit" 
                                className="btn btn-azul"   
                                value="Agregar Cliente"
                                disabled={validarCampos()}
                        />
                </div>

            </form>
        </Fragment>
    );
}
 //hide order component (HOC), es una función que toma un componente y retorna un nuevo componente
export default withRouter(NuevoCliente);