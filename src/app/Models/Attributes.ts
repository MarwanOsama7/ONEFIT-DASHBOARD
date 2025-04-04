export interface Color {
    id: number; // Ensure this is included
    attibutename: string;
    attibutevalue: string;
}
export interface Size {
    id: number; // Ensure this is included
    attibutevalue: string;
}

export interface Page {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}

export interface PaginatedResponseColors {
    content: Color[];
    page: Page;
}
export interface PaginatedResponseSize {
    content: Size[];
    page: Page;
}
