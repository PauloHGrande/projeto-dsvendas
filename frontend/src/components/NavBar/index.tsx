import React from 'react';
import ImgDsDark from "assets/img/Logo.svg";
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-light border-bottom shadow-sm">
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <Link to="/">
                            <img src={ImgDsDark} alt="DevSuperior" width="120" />
                        </Link>
                    </div>
                    <div className="col-md-3">
                        <Link className="btn btn-primary btn-lg" to="/cadvendedor">
                            Cadastrar Vendedor.
                    </Link>
                    </div>
                    <div className="col-md-3">
                        <Link className="btn btn-primary btn-lg" to="/cadvendas">
                            Cadastrar Vendas.
                    </Link>
                    </div>
                    <div className="col-md-3">
                        <Link className="btn btn-primary btn-lg" to="/dashboard">
                            DashBoard.
                    </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default NavBar;