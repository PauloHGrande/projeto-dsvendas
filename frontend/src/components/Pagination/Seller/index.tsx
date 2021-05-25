import React from 'react';
import { SellerPage } from 'types/seller';

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
                        <button className="page-link btn btn-primary btn-lg" onClick={() => onPageChange(page.number - 1)}>Anterior</button>
                    </li>
                    <li className="page-item disabled">
                        <span className="page-link btn btn-primary btn-lg">{page.number + 1}</span>
                    </li>
                    <li className={`page-item ${page.last ? 'disabled' : ''} `}>
                        <button className="page-link btn btn-primary btn-lg" onClick={() => onPageChange(page.number + 1)}>Proxima</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;