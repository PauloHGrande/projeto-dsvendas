import React from 'react';
import { SalePage } from 'types/sale';
import { BiFirstPage, BiLastPage } from 'react-icons/bi';

type Props = {
    page: SalePage;
    onPageChange: Function;
}

const Pagination = ( { page, onPageChange } : Props ) => {
    return (
        <div className="col-sm-12 d-flex justify-content-center">
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${page.first ? 'disabled' : ''} `}>
                        <button className="page-link btn btn-primary btn-lg" onClick={() => onPageChange(page.number - 1)}><BiFirstPage /></button>
                    </li>
                    <li className="page-item disabled">
                        <span className="page-link btn btn-primary btn-lg">{page.number + 1}</span>
                    </li>
                    <li className={`page-item ${page.last ? 'disabled' : ''} `}>
                        <button className="page-link btn btn-primary btn-lg" onClick={() => onPageChange(page.number + 1)}><BiLastPage /></button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;