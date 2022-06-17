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
    location: ImageGeoLocation
    author: string;
}

export interface GalleryItem {
    title: string;
    imageUrl: string;
    tags: [string];
}

export interface ImageGeoLocation {
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
    LONG,
    INDEFINITE
}