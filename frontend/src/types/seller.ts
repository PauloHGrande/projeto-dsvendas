export type Seller = {
    id: number;
    name: string;
}

export type SellerPage = {
    content?: Seller[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}