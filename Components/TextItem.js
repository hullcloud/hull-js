class TextItem extends AppComponent {
    #Txt;

    constructor() {
        super();

        this.#CreateTemplate();
        this.#SetupHandlers();
        this.#SetStyle();     
    }        

    #CreateTemplate() {
        this.ComponentBody.innerHTML = `
            <div>
                You picked:
                <text id="TextItem" class="TextItem"></text>
            </div>
        `;
    }

    #SetupHandlers() {
        this.#Txt = this.ComponentBody.querySelector("#TextItem");
    }

    #SetStyle() {
        let Style = `
            text {
                color: green;
            }
        `;

        this.UpdateStyle(Style);
    }

    UpdateValue(NewValue) {
        this.#Txt.innerText = NewValue;
    }
}