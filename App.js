var _App;

class App extends AppComponent {
    #AppTitle = "Hull JS Test Application";

    constructor() {
        super();

        _App = this;

        document.title = this.#AppTitle;    

        this.#Setup();
    }
 	
    #Setup() {
        this.#CreateTemplate();
        this.#SetupHandlers();
        this.#SetStyle();

        window.onpopstate = function() {
            history.pushState({}, '');
        }; 
            
        history.pushState({}, '');        

        document.body.style = ``;
        document.body.innerHTML = ``;
        document.body.appendChild(this.ComponentRoot);
        
        // Create some test components

        // A text item 
        let TI = new TextItem();
        this.Page.appendChild(TI.ComponentRoot);
        
        // A date picker, passed with ref to text item update method
        let DI = new DateItem((Value) => TI.UpdateValue(Value));
        this.Page.appendChild(DI.ComponentRoot);
    }

    #CreateTemplate() {
        this.ComponentBody.innerHTML = `
            <div class="MainContainer">
                <div id="MenuBar" class="Header">
                    <text id="BrandTxt" class="Brand">${this.#AppTitle}</text>
                </div>
                <div id="PageContainer" class="PageContainer">
                    <div id="SideBar" class="SideBar"></div>
                    <div id="PageContent" class="PageContent"></div>
                </div> 
                <div id="FooterBar" class="Footer">Copyright &#169 ${new Date().getFullYear()}</div>
            </div>
        `;
    }

    #SetupHandlers() {
        this.Menu = this.ComponentBody.querySelector("#MenuBar");
        this.SideBar = this.ComponentBody.querySelector("#SideBar");
        this.Page = this.ComponentBody.querySelector("#PageContent");
        this.Footer = this.ComponentBody.querySelector("#FooterBar");
        this.ComponentBody.querySelector("#BrandTxt").onclick = () => this.OpenMainMenu();
    }

    #SetStyle() {
        let Style = `            
            .MainContainer {
                display: flex;
                flex-direction: column;
                width: 100vw;
                height: 100vh;
                top: 0;
                left: 0;
                position: absolute;
                overflow: hidden;
            }
            .Header {
                width: 100%;
                border-bottom: 1px solid black;
                overflow: hidden;
                background-color: ${Theme.HeaderBackColour};
                border: none;
                height: ${Theme.HeaderHeight};
                min-height: ${Theme.HeaderHeight};
                margin-bottom: 0px;
            }
            .Brand {
                font-size: 20px;
                color: white;
                float: right;
                padding: 15px 15px;
                line-height: 20px;
                text-decoration: none;
                background: none;
                cursor: pointer;
            }            
            .PageContainer {
                flex: 1; 
                display: flex;
                overflow: hidden;
            }
            .PageContent {
                flex: 1 0;
                padding: 15px;
                overflow: hidden;
            }
            .Footer {
                width: 100%;
                height: ${Theme.FooterHeight};
                min-height: ${Theme.FooterHeight};
                line-height: ${Theme.FooterHeight};
                overflow: hidden;
                bottom: 0px;
                padding-left: 15px;
                padding-right: 15px;
                border-top: 1px solid ${Theme.ThirdBackColour};
                background-color: white;
                z-index: 1000;
            }
        `;
        this.UpdateStyle(Style);
    }

    SetView(ComponentRoot) {
        this.Page.innerHTML = ``;
        this.Page.appendChild(ComponentRoot);
    }
}