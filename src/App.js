import React,{Fragment} from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Header from './components/layout/header';
import Navegacion from './components/layout/navegacion'

import Clientes from './components/clientes/cliente';
import NuevoCliente from './components/clientes/NuevoCliente';
import EditarCliente from './components/clientes/EditarCliente';

import Productos from './components/productos/productos';
import NuevoProducto from './components/productos/NuevoProducto';
import EditarProducto from './components/productos/EditarProducto';

import Pedidos from './components/pedidos/pedido';
import NuevoPedido from './components/pedidos/NuevoPedido'


function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <div className="grid contenedor contenido-principal">
            <Navegacion />
            <main className="caja-contenido col-9">
                <Switch>
                    <Route exact path="/" component={Clientes} />
                    <Route exact path="/clientes/nuevo" component={NuevoCliente} />
                    <Route exact path="/clientes/editar/:id" component={EditarCliente} />

                    <Route exact path="/productos" component={Productos} /> 
                    <Route exact path="/productos/nuevo" component={NuevoProducto} />
                    <Route exact path="/productos/editar/:id" component={EditarProducto} />

                    <Route exact path="/pedidos" component={Pedidos} /> 
                    <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />
                </Switch>
            </main>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
