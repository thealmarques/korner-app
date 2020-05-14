export interface Business {
    id?: string;
    latitude: string,
    longitude: string,
    category: string,
    subcategory: string,
    description: string,
    notifyUpvotes: boolean,
    notifyCreated: boolean,
    distance: Number,
    schedule: object[],
    type: string
}