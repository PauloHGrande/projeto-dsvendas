import React from 'react';
import { SellerPage } from 'types/seller';
import { BiFirstPage, BiLastPage } from 'react-icons/bi';

type Props = {
    page: SellerPage;
    onPageChange: Function;
}

const Pagination = ( { page, onPageChange } : Props ) => {
       
    return (
        <div className="col-sm-12 d-flex justify-content-center">
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${page.first ? 'disabled' : ''} `}>
                        <button className="button page-link btn btn-primary btn-lg" onClick={() => onPageChange(page.number - 1)}><BiFirstPage /></button>
                    </li>
                    <li className="page-item disabled">
                        <span className="button page-link btn btn-primary btn-lg">{page.number + 1}</span>
                    </li>
                    <li className={`page-item ${page.last ? 'disabled' : ''} `}>
                        <button className="button page-link btn btn-primary btn-lg" onClick={() => onPageChange(page.number + 1)}><BiLastPage /></button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;