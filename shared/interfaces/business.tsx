export interface Business {
    id?: string;
    latitude: string,
    longitude: string,
    category: string,
    subcategory: string,
    description: string,
    notifyUpvotes: boolean,
    notifyCreated: boolean,
    distance: number,
    schedule: object[],
    type: string,
    upvotes: string[],
    downvotes: string[],
    creator?: string,
    creationDate?: string
}