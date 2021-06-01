import axios from 'axios';
import Pagination from 'components/Pagination/DashBoard';
import React, { useEffect, useState } from 'react';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { SalePage } from 'types/sale';
import { formatLocalDate } from 'utils/format';
import { BASE_URL } from 'utils/requests';
import RemocaoSale from 'components/Remocao/Sale';
import { Field, Form, Formik } from 'formik';

const comboboxValues = [{
    value: '',
    label: ''
}]

const DataTableSale = () => {

    // Responsavel pela inclusão do Form. Inicio.   
    function onSubmit(values, { resetForm }) {
        
        axios.post(`${BASE_URL}/sales/`, values)
            .then(() => {
                toast.success("Venda criada com Sucesso!");

                axios.get(`${BASE_URL}/sales?page=${activePage}&size=20&sort=date,desc`)
                    .then(response => {
                        SetPage(response.data);
                    })
                setActivePage(0);
                resetForm({});
            })
            .catch(handleErrors);
    }
    // Responsavel pela inclusão do Form. Fim.


    // Responsavel pelo Grid e Paginação. Inicio.
    const [activePage, setActivePage] = useState(0);

    const [page, SetPage] = useState<SalePage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });

    useEffect(() => {
        // Carrega todas as vendas.
        axios.get(`${BASE_URL}/sales?page=${activePage}&size=20&sort=date,desc`)
            .then(response => {
                SetPage(response.data);
            })
        // Carrega os vendedores do ComboBox
        axios.get(`${BASE_URL}/sellers/combobox`)
            .then(res => {
                setCombobox(res.data);
            })
    }, [activePage]);

    const changePage = (index: number) => {
        setActivePage(index);
    }
    // Responsavel pelo Grid e Paginação. FIm.

    function handleErrors(error: { response: { data: any; status: any; headers: any; }; request: any; message: any; }) {
        if (error.response) {
            if (error.response.data.message === "") {
                toast.error('Erro Na Chamada Status: ' + error.response.data.status);
            } else {
                toast.error(error.response.data.message);
            }

        } else if (error.request) {
            toast.error(error.request);
        } else {
            toast.error('Erro: ' + error.message);
        }
    }

    // Combo-Box - Inicio.
    const [combobox, setCombobox] = useState(comboboxValues);
    // Combo-Box - Fim.

    // Responsavel pelo Grid e Remoção do Registro. Inicio.
    const removeVenda = async (index: number) => {

        await axios.delete(`${BASE_URL}/sales/remove/` + index)
            .then(() => { toast.success('venda Removida com Sucesso!'); })
            .catch(handleErrors);

        axios.get(`${BASE_URL}/sales?page=${activePage}&size=20&sort=date,desc`)
            .then(response => {
                SetPage(response.data);
            })
            .catch(handleErrors);

        setActivePage(0);
    }
    // Responsavel pelo Grid e Remoção do Registro. Fim.    

    return (
        <>
            <div className="container">
                <h1 className="text-primary py-3">Cadastro de Vendas.</h1>
                <Formik
                    onSubmit={onSubmit}
                    initialValues={{
                        visited: '0',
                        deals: '0',
                        amount: '0',
                        value: ''
                    }}
                    render={({ values }) => (
                        <Form>
                            <div className="row">
                                <div className="vendedor-form__group">
                                    <label>Vendedor:</label>
                                    <Field as="select" name="value">
                                        <option key={-1} value={0}>Selecione Vendedor.</option>
                                        {
                                            combobox.map((item, i) => (
                                                <option key={item.value} value={item.value}>{item.label}</option>
                                            ))
                                        }
                                    </Field>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="vendedor-form__group">
                                        <label>Total de Visitas:</label>
                                        <Field name="visited" type="number" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="vendedor-form__group">
                                        <label>Total de Negocios Fechados:</label>
                                        <Field name="deals" type="number" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="vendedor-form__group">
                                        <label>Valor:</label>
                                        <Field name="amount" type="number" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4"></div>
                                <div className="col-md-4">
                                    <div className="row">
                                        <button className="button" type="submit"><BiMessageSquareAdd /> Salvar.</button>
                                    </div>
                                </div>
                                <div className="col-md-4"></div>
                            </div>
                        </Form>
                    )}
                />
            </div>
            <br></br>
            <div className="container">
                <div className="row">
                    <Pagination page={page} onPageChange={changePage} />
                </div>
                <div className="row">
                    <div className="table-responsive">
                        <table className="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Vendedor</th>
                                    <th>Clientes visitados</th>
                                    <th>Negocios fechados</th>
                                    <th>Valor</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {page.content?.map(item => (
                                    <tr key={item.id}>
                                        <td>{formatLocalDate(item.date, "dd/MM/yyyy")}</td>
                                        <td>{item.seller.name}</td>
                                        <td>{item.visited}</td>
                                        <td>{item.deals}</td>
                                        <td>{item.amount.toFixed(2)}</td>
                                        <td><RemocaoSale onPageChange={removeVenda} id={item.id} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DataTableSale;