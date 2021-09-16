class AppComponent {
    // v1.0

    #ComponentRoot; // Only Accessible by this.ComponentRoot getter.

    constructor() {
        this.#ComponentRoot = document.createElement("app-component-root");

        let Shadow = this.#ComponentRoot.attachShadow({ mode: "closed" });

        this.Style = document.createElement("style");
        Shadow.appendChild(this.Style);
        this.UpdateStyle(this.GetStandardStyles());

        this.ComponentBody = Shadow.appendChild(document.createElement("app-component-body"));
        this.#ComponentRoot.AppComponent = this;

        this.ChildDialogs = [];
    }

    // Any component which extends AppComponent can access this. 
    Validate() {
        // Check component elements
        let inputs = this.ComponentBody.querySelectorAll('input, select');
        for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].checkValidity()) {
                inputs[i].reportValidity();
                return false;
            }
        }

        let ChildRoots = this.ComponentBody.querySelectorAll("app-component-root");

        for (let i = 0; i < ChildRoots.length; i++) {
            if (!ChildRoots[i].AppComponent.Validate()) {
                return false;
            }
        }

        return true;
    }

    UpdateStyle(StyleTxt) {
        this.Style.innerHTML += StyleTxt;
    }

    get ComponentRoot() {
        return this.#ComponentRoot;
    }

    GetStandardStyles() {
        return `
            * {
                user-select: none !important;
                font-family: Arial;
                font-size: 14px;
                line-height: 1.42857143;
                color: ${Theme.TextColour};
            }
            p, input {
                user-select: all !important;
            }
            h2 {
                margin-bottom: 0px;
                margin-top: 0px;
                font-size: 24px;
            }
            .PageTopContext {
                height: 46px;
            }
            .FlexPage {
                flex: 1 1 0%;
                display: flex;
                flex-flow: column;
                padding: 15px;                            
            }
            .PageTitleContainer {
                float: left;
                width: 50%;
                display: flex;
                align-items: center;
            }
        `;
    }
}

// Custom element to provide a root container for our component which the shadow DOM is attached to
class AppComponentRoot extends HTMLElement {
    #AppComponent; // Reference to provide access inside shadow DOM. Eg for validing components easily.

    constructor() {
        super();
    }

    get AppComponent() {
        return this.#AppComponent;
    }

    set AppComponent(_AppComponent) {
        this.#AppComponent = _AppComponent;
    }
}

customElements.define("app-component-root", AppComponentRoot);

// Custom element to provide a sub-element to hold the actual HTML of the component
class AppComponentBody extends HTMLElement {
    constructor() {
        super();
    }
}

customElements.define("app-component-body", AppComponentBody);