import Dashboard from "pages/Dashboard";
import FormCadSeller from "pages/Forms/Saller/Cadastro";
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
                    <FormCadSeller />
                </Route>                              
            </Switch>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default Routes;