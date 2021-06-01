import React from "react";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import DataTableSale from "components/DataTable/Sale";

const CadSales = () => {    
    return (
        <>
        <NavBar />
        <DataTableSale />
        <Footer />
        </>
    );
}

export default CadSales;