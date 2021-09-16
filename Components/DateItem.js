class DateItem extends AppComponent {
    #OnUpdateCB;
    #DatePicker;

    constructor(OnUpdate) {
        super();

        this.#OnUpdateCB = OnUpdate;

        this.#CreateTemplate();
        this.#SetupHandlers();
        this.#SetStyle();     
    }        

    #CreateTemplate() {
        this.ComponentBody.innerHTML = `
            <div>
                Pick a date:
                <input id="DatePicker" type="date" class="DatePicker"/>
            </div>
        `;
    }

    #SetupHandlers() {
        this.#DatePicker = this.ComponentBody.querySelector("#DatePicker");
        this.#DatePicker.onchange = () => this.#OnUpdateCB(this.#DatePicker.value);
    }

    #SetStyle() {
        let Style = `
            input {
                color: green;
            }
        `;

        this.UpdateStyle(Style);
    }
}