import React from 'react';
import { BiTrash } from 'react-icons/bi';

type Props = {
    onPageChange: Function;
    id: number;
}

const RemocaoSale = ({ onPageChange, id }: Props) => {
    return (
        <>
        <button className="button" type="submit" onClick={() => onPageChange(id)}><BiTrash /></button>
        </>
    );
}

export default RemocaoSale;