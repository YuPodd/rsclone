class DayNightMode {
    constructor() {
        this.init();
    }

    init() {
        document.querySelector('#customSwitch1').addEventListener('click', () => this.changeMode());
        // this.switcher.addEventListener('click', );
        this.checkTime();
    }

    checkTime() {
        let currentTime = new Date().getHours();
        if (currentTime > 18 || currentTime < 6) {
            this.changeMode();
        }
        this.callEveryHour();
    }

    callEveryHour() {
        setInterval(this.checkTime(), 1000 * 60 * 60);
    }

    changeMode() {
        document.documentElement.classList.add('night');
    }
}

export default DayNightMode;
