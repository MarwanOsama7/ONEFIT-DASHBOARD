
export interface CategoryType {
    id: number; // Ensure this is included
    name: string;
}

export interface Category {
    id: number; // Ensure this is included
    name: string;
    categorytype: CategoryType[];
}

export interface Page {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}

export interface PaginatedResponse {
    content: Category[];
    page: Page;
}
