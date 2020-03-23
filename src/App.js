import React,{Fragment} from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Header from './components/layout/header';
import Navegacion from './components/layout/navegacion'
import Clientes from './components/clientes/cliente';
import Productos from './components/productos/producto';
import Pedidos from './components/pedidos/pedido';
import NuevoCliente from './components/clientes/NuevoCliente';
import EditarCliente from './components/clientes/EditarCliente';

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
                    <Route exact path="/pedidos" component={Pedidos} /> 
                </Switch>
            </main>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
