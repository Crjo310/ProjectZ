import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SelectOptionService {
    public listOfGameModes = [
        {value: 1, label: 'Freestyle'}
    ]
}