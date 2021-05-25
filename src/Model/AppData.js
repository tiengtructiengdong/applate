import {Plate} from "./Plate.js"

export class AppData {
    constructor() {
        // get data here?
        this.plates = []
    }

    checkin() {
        this.plates.push(new Plate("52V-232.11","11:55","Today"))
    }

    setupPlate(plates) {
        this.plates = plates
    }
}