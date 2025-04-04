export interface Product {
    id: number;
    name: string;
    description: string;
    gender: string;
    price: string;
    priceAfterdiscount: number;
    discount: string;
    categoryId: number;
    categoryTypeId: number;
    slug: string;
    metaTitle: string;
    metaDescription: string;
    productSizes: ProductSize[]; // Add productSizes
    images: Image[];
}
export class Image {
    id: number;
    imageUrl: string;
}

export interface Colors {
    id: number;
    attibutename: string;
    attibutevalue: string;
}

export interface ProductSize {
    colorId: number;
    sizes: Sizes[];
}
export interface ProductSizes {
    sizeId: number;
    sizeValue: string;
    stockQuantity: number;
    productId: number;
    colorId: number;
    colorValue: string;
}
export interface Image {
    id: number;
    imageUrl: string;
    colorName?: string | null;
    colorId: number;
}

export class Sizes {
    sizeId: number;
    stockQuantity: number;
}

export interface Size {
    id: number;
    attributeValue: string;
}

export interface Page {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}

export interface PaginatedResponseProduct {
    content: Product[];
    page: Page;
}