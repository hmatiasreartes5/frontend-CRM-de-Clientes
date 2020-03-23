import React from 'react';

const FormBuscadorPedido = (props) => {
    return ( 
                <form
                    onSubmit={props.BuscarProducto}
                >
                    <legend>Busca un Producto y agrega una cantidad</legend>

                    <div className="campo">
                        <label>Productos:</label>
                        <input 
                            type="text" 
                            placeholder="Nombre Productos" 
                            name="productos" 
                            onChange={props.LeerDatosBusqueda}
                            />
                    </div>

                    <input 
                        type="submit"
                        className="btn btn-azul btn-block"
                        value="Buscar Producto"
                    />
                </form>
     );
}
 
export default FormBuscadorPedido;