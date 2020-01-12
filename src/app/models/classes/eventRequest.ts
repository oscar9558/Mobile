import { Geolocation } from './geolocationClass';

export class EventRequest {
    username: String;
    title: String;
    description: String;
    date: Date;
    duration: number;
    place: Geolocation;
    image: String;
    numberAttendees: number;
    capacityAttendees: number;
}