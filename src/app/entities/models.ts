export interface Persona {
    name: string;
    imageUrl: string;
    biography: string;
}

export interface MenuItem {
    name: string;
    routerLink: string;
}

export interface Gallery extends GalleryItem {
    id: string;
}

export interface GalleryImage extends GalleryItem {
    orientation: string;
    location: GeoLocation
    author: string;
}

export interface GalleryItem {
    title: string;
    imageUrl: string;
    tags: [string];
}

export interface GeoLocation {
    geoLocationName: string;
    lat: string;
    lon: string;
}

export interface SnackbarOptions {
    dismissible?: boolean;
    message: string;
    duration?: SnackbarDuration;
    action?: SnackbarAction;
}

export interface SnackbarAction {
    label: string;
    callback: () => void;
}

export enum SnackbarDuration {
    SHORT,
    INTERMEDIATE,
    LONG
}

export type CardTypes = 'blog';
export interface Card {
    id: string;
    header: string;
    subHeader: string;
    imageUrl: string;
    summaryText: string;
    type: CardTypes;
    navigable: true | false;
}

/**
 * Blog
 */
export interface BlogPostCard extends Card {
    type: 'blog'; // ToDo: find out why this value is undefined without mapping in service
    galleryLink: string;
}

export interface BlogPost {
    id: string;
    header: string;
    subHeader: string;
    imageUrl: string;
    summaryText: string;
    introduction: string;
    body: string;
    datePosted: Date;
    // Holds locations of trip to display on Map
    geoData: [GeoLocation]
}