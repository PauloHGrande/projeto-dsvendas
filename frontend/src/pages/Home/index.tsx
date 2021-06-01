import Footer from "components/Footer";
import NavBar from "components/NavBar";
import React from "react";

const Home = () => {
    return (
        <>
            <NavBar />
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">DSVendas</h1>
                    <p className="lead">Analise o desempenho das suas vendas por diferentes perspectivas</p>
                    <hr />
                    <p>Exibir um dashboard a partir de dados fornecidos por um back end construido com Spring Boot.</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;