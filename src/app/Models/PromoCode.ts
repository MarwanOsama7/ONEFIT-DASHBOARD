
export interface PromoCode {
    id: number;
    promoCode: string;
    promoDiscount: number;
    usageLimit: number;
    // categorytype: CategoryType[];
}

export interface Page {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}

export interface PaginatedResponsePromoCode {
    content: PromoCode[];
    page: Page;
}