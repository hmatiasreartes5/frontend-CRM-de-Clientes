import React,{Fragment,useState,useEffect} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom'

const EditarCliente = (props) => {

    //obtener el id del cliente a editar
    const {id} = props.match.params
    //console.log(id)

    //state del componente
    const [cliente,datosCliente] = useState({
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
        datosCliente({
            //copia del state
            ...cliente,
            //guardo cambios en el state
            [e.target.name] : e.target.value
        })
    }

    //obetener el cliente desde la API
    const obtenerCliente = async() => {
        const cliente = await clienteAxios.get(`/clientes/${id}`)
        //console.log(cliente.data)
        datosCliente(cliente.data);
    }
    
    useEffect(() => {
        obtenerCliente()
    },[])

    //Actualizar cliente
    const actualizarCliente = (e) => {
        e.preventDefault()

        clienteAxios.put(`/clientes/${cliente._id}`,cliente)
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
                    'Correcto',
                    'Cambios Guardados',
                    'success'
                )
            }
            props.history.push('/');
        })
    }

    //funcion pars validar los campos
    const validarCampos = () => {
        const {nombre,apellido,empresa,email,telefono} = cliente
        if(nombre==='' || apellido==='' || empresa==='' || email==='' || telefono==='') return true;

        return false;
    }

    return (  
        <Fragment>
            <h1>Editar Cliente</h1>

            <form
                onSubmit={actualizarCliente}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                           placeholder="Nombre Cliente" 
                           name="nombre"
                           onChange={actualizarState}
                           value={cliente.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input  type="text" 
                            placeholder="Apellido Cliente" 
                            name="apellido"
                            onChange={actualizarState}
                            value={cliente.apellido}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input  type="text" 
                            placeholder="Empresa Cliente"  
                            name="empresa"
                            onChange={actualizarState}
                            value={cliente.empresa}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input  type="email" 
                            placeholder="Email Cliente" 
                            name="email"
                            onChange={actualizarState}
                            value={cliente.email}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input  type="tel" 
                            placeholder="Teléfono Cliente" 
                            name="telefono"
                            onChange={actualizarState}
                            value={cliente.telefono}
                    />
                </div>

                <div className="enviar">
                        <input  type="submit" 
                                className="btn btn-azul"   
                                value="Guardar"
                                disabled={validarCampos()}
                        />
                </div>

            </form>
        </Fragment>
    );
}
 //hide order component (HOC), es una función que toma un componente y retorna un nuevo componente
export default withRouter(EditarCliente);