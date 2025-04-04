
export interface Shipping {
    id: number;
    name: string;
    numberOfDay: string;
    price: number;
    freeShipping: boolean
    // categorytype: CategoryType[];
}

export interface Page {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}

export interface PaginatedResponseShipping {
    content: Shipping[];
    page: Page;
}