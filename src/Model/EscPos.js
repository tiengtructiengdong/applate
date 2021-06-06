export class EscPos {
    constructor() {
        this.syntax = {
            "esc": 0x1B,
            "newline": 0x0A,
            "init": this.esc + "@",     // ESC @
        }
    }
    instance() {
        let obj = new EscPos()
        return obj
    }
}