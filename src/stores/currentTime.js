

export default class CurrentTime {
    widget = null;

    constructor({widget}) {
        this.widget = widget;
    }

    bind() {
        console.log(this.widget);
    }
}

