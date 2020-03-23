import React,{Fragment,useState} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import {withRouter} from 'react-router-dom'
 
const NuevoProducto = (props) => {

    //states del componente 
    const [producto,guardarProducto] = useState({
        nombre:'',
        precio:''
    })

    const [archivo,guardarArchivo] = useState('');

    //agregar un nuevo producto a la API
    const agregarProducto = async e => {
        e.preventDefault();
        
        //tengo que crear un form data //esto se debe a que voy a enviar un archivo(imagen)
        const formData = new FormData();
        formData.append('nombre',producto.nombre);
        formData.append('precio',producto.precio);
        formData.append('imagen',archivo);

        //almacenarlo en la base de datos
        try {
            const res = await clienteAxios.post('/productos',formData,{
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            //lanzar una alerta
            if(res.status === 200) {
                Swal.fire(
                    'Agregado Correctamente',
                    res.data.mensaje,
                    'success'
                )
            }

            //redireccionar
            props.history.push('/productos')

        } catch (error) {
            console.log(error)
            //lanzar una alerta
            Swal.fire({
                type:'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            })
        }
    }

    //funciones para leer los datos del formulario
    const leerProducto = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const leerArchivo = e => {
        guardarArchivo(
            e.target.files[0]
        )
    }

    return (  
        <Fragment>
            <h2>Nuevo Producto</h2>

            <form
                onSubmit={agregarProducto}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        name="nombre" 
                        onChange={leerProducto}
                        />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input 
                        type="number" 
                        name="precio" 
                        min="0.00" 
                        step="0.01" 
                        placeholder="Precio" 
                        onChange={leerProducto}
                        />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <input 
                        type="file"  
                        name="imagen" 
                        onChange={leerArchivo}
                        />
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Agregar Producto"/>
                </div>
            </form>

        </Fragment>
    );
}
 
export default withRouter(NuevoProducto);