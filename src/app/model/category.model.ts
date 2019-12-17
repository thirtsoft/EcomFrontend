export interface Category {
    id:number;
    name:string;
    photo:string;
    description:string;
    _links: {
        self: {
            href:string;
        },
        category: {
            href:string
        },
        products: {
            href:string;
        }
    }
}