import Dashboard from "pages/Dashboard";
import CadSeller from "pages/Forms/Saller/Cadastro";
import CadSales from "pages/Forms/Sales/Cadastro";
import Home from "pages/Home";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>   
                <Route path="/cadvendedor">
                    <CadSeller />
                </Route>    
                <Route path="/cadvendas">
                    <CadSales />
                </Route>                                           
            </Switch>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default Routes;