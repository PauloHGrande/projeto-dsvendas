import axios from 'axios';
import { toast } from 'react-toastify';
import Pagination from 'components/Pagination/Seller';
import RemocaoSeller from 'components/Remocao/Seller';
import React, { useEffect, useState } from 'react';
import { SellerPage } from 'types/seller';
import { BASE_URL } from 'utils/requests';

const initialValue = {
    name: ''
}

const DataTableSeller = () => {

    // Responsavel pela inclusão do Form. Inicio.
    const [values, setValues] = useState(initialValue);

    function onChange(ev: { target: { name: any; value: any; }; }) {
        const { name, value } = ev.target;
        setValues({ ...values, [name]: value });
    }

    async function onSubmit(ev: { preventDefault: () => void; }) {
        ev.preventDefault();
        await axios.post(`${BASE_URL}/sellers/`, values)
            .then(() => {
                toast.success("Vendedor criado com Sucesso!");

                axios.get(`${BASE_URL}/sellers?page=${0}&size=20&sort=name,desc`)
                .then(response => {
                    SetPage(response.data);
                })
                setActivePage(0);
            })
            .catch(handleErrors);
            
    }
    // Responsavel pela inclusão do Form. Fim.
    
    // Responsavel pelo Grid e Paginação. Inicio.
    const [activePage, setActivePage] = useState(0);

    const [page, SetPage] = useState<SellerPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/sellers?page=${activePage}&size=20&sort=name,desc`)
            .then(response => {
                SetPage(response.data);
            })
    }, [activePage]);

    const changePage = (index: number) => {
        setActivePage(index);
    }
    // Responsavel pelo Grid e Paginação. FIm.

    // Responsavel pelo Grid e Remoção do Registro. Inicio.
    const removeVendedor = async (index: number) => {

        await axios.delete(`${BASE_URL}/sellers/remove/` + index)
            .then(() => { toast.success('Vendedor Removido com Sucesso!'); })
            .catch(handleErrors);

        axios.get(`${BASE_URL}/sellers?page=${0}&size=20&sort=name,desc`)
            .then(response => {
                SetPage(response.data);
            })
            .catch(handleErrors);

        setActivePage(0);
    }
    // Responsavel pelo Grid e Remoção do Registro. Fim.

    function handleErrors(error: { response: { data: any; status: any; headers: any; }; request: any; message: any; }) {
        if (error.response) {
            toast.error(error.response.data.message);
        } else if (error.request) {
            toast.error(error.request);
        } else {
            toast.error('Erro: ' + error.message);
        }
    }

    return (
        <>
            <div className="container">
                <h1>Cadastro de Vendedor.</h1>
                <form onSubmit={onSubmit}>
                    <div className="vendedor-form__group">
                        <label htmlFor="name">Nome:</label>
                        <input id="name" name="name" type="text" onChange={onChange} required></input>
                    </div>
                    <div>
                        <button type="submit">Salvar.</button>
                    </div>
                </form>
            </div>
            <div className="container">
                <Pagination page={page} onPageChange={changePage} />
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Vendedor</th>
                                <th>...</th>
                            </tr>
                        </thead>
                        <tbody>
                            {page.content?.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td><RemocaoSeller onPageChange={removeVendedor} id={item.id} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default DataTableSeller;