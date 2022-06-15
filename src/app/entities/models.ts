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