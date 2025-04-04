export interface order {
    id: number;
    requestOrderCode: string;
    requestOrderTotalPrice: number;
    requestOrderTotalQuantity: number;
    status: number;
    createdDate: string;
    createdTime: string;
    clientUsername: string;
    clientPhone: string;
    clientAddress: string;
    clientcity: string;
    promoCode:String;
    items: Items[];
}

export interface Items {
    name: string;
    colorName: string;
    img: string;
    size: string;
    price: number;
    quantity: number;
}
export interface Page {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}

export interface PaginatedResponseOrder {
    content: order[];
    page: Page;
}