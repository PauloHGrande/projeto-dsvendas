import React from 'react';

type Props = {
    onPageChange: Function;
    id: number;
}

const RemocaoSeller = ({ onPageChange, id }: Props) => {
    return (
        <>
        <button type="submit" onClick={() => onPageChange(id)}>Remover...</button>
        </>
    );
}

export default RemocaoSeller;