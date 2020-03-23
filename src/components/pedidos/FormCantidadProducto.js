import React from 'react';

const FormCantidadProducto = ({producto}) => {

    const {nombre,precio,cantidad} = producto
    return ( 
                        <li>
                            <div className="texto-producto">
                                <p className="nombre">{nombre}</p>
                                <p className="precio">${precio}</p>
                            </div>
                            <div className="acciones">
                                <div className="contenedor-cantidad">
                                    <i className="fas fa-minus"></i>
                                    <p>{cantidad}</p>
                                    <i className="fas fa-plus"></i>
                                </div>
                                <button type="button" className="btn btn-rojo">
                                    <i className="fas fa-minus-circle"></i>
                                        Eliminar Producto
                                </button>
                            </div>
                        </li>
     );
}
 
export default FormCantidadProducto;