import React,{useState,useEffect,Fragment} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import {withRouter} from 'react-router-dom'

const EditarProducto = (props) => {

    const {id} = props.match.params

    //state del componente 
    const [producto,actualizarProducto] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    })
    const [archivo,guardarArchivo] = useState('');

    //consultar a la API por el producto a editar
    const consultarAPI = async()=> {
        const producto = await clienteAxios.get(`/productos/${id}`)
        //console.log(producto.data)
        actualizarProducto(producto.data)
    }

    useEffect(()=> {
        consultarAPI()
    },[])

    //editar producto
    const editarProducto = async (e) => {
        e.preventDefault();
        
        //tengo que crear un form data //esto se debe a que voy a enviar un archivo(imagen)
        const formData = new FormData();
        formData.append('nombre',producto.nombre);
        formData.append('precio',producto.precio);
        formData.append('imagen',archivo);

        //almacenarlo en la base de datos
        try {
            const res = await clienteAxios.put(`/productos/${id}`,formData,{
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            //lanzar una alerta
            if(res.status === 200) {
                Swal.fire(
                    'Editado Correctamente'
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
        actualizarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const leerArchivo = e => {
        guardarArchivo(
            e.target.files[0]
        )
    }

    //aplico destructuring al state
    const {nombre,precio,imagen} = producto

    return (  
        <Fragment>
            <h2>Editar Producto</h2>

            <form
               onSubmit={editarProducto} 
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        name="nombre" 
                        onChange={leerProducto}
                        defaultValue={nombre}
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
                        defaultValue={precio}
                        />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    {imagen ? 
                    (<img src={`http://localhost:5000/${imagen}`} alt="imagen" width="300"/>)
                    : null}
                    <input 
                        type="file"  
                        name="imagen" 
                        onChange={leerArchivo}
                        />
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Editar Producto"/>
                </div>
            </form>

        </Fragment>
    );
}
 
export default withRouter(EditarProducto);