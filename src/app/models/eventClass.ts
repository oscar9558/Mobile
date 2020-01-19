import { Geolocation } from './geolocationClass';

export class Event {

    _id: string;
    title: string;
    description: string;
    date: Date;
    duration: number;
    place: Geolocation;
    image: string;
    numberAttendees: number;
    capacityAttendees: number;
    senValid: boolean;

    constructor() { }
}