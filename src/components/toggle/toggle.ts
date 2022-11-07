import { formatNumber } from "../../utils";

class Toggle extends HTMLElement {
    // Initial properties
    shadow: ShadowRoot;

    // Constructor
    constructor() {
        // Inherit all properties
        super();

        // Create the Shadow DOM
        this.shadow = this.attachShadow({ mode: "open" });
    }

    // Connect the component to the DOM
    connectedCallback() {
        this.render();
    }

    // Add listeners method
    addListeners() {
        // Aux variables
        const toggleEl: Element = this.shadowRoot.querySelector(".toggle");
        const inputEl: any = this.shadowRoot.querySelector(".offscreen");

        // DOM mutation observer
        const elementObserver: MutationObserver = new MutationObserver(
            (e: any) => {
                // Get the target element, and its theme
                const targetEl: Element = e[0].target;
                const changedTheme: string = targetEl.getAttribute("theme");

                // Change the element class
                toggleEl.classList.replace(toggleEl.classList[1], changedTheme);
            }
        );

        elementObserver.observe(this, {
            attributes: true,
            attributeFilter: ["theme"],
        });

        // Click listener
        inputEl.addEventListener("change", () => {
            // Get the current theme
            const currentTheme: string = this.getAttribute("theme") || "light";

            // Change the theme
            if (currentTheme === "light") {
                this.setAttribute("theme", "dark");
            } else {
                this.setAttribute("theme", "light");
            }

            // Custom event
            const themeChangeEvent: CustomEvent = new CustomEvent(
                "themeChange",
                {
                    detail: {
                        theme: this.getAttribute("theme"),
                    },
                }
            );

            // Dispatch the event
            this.dispatchEvent(themeChangeEvent);
        });
    }

    // Render method
    render() {
        // Get attributes
        const theme: string = this.getAttribute("theme") || "light";

        // Set content
        this.shadow.innerHTML = `
            <style>
                .offscreen {
                    display: none;
                }
                
                .switch {
                    position: relative;
                    display: block;
                
                    width: 55px;
                    height: 27.5px;
                    border-radius: 50px;
                    cursor: pointer;

                    transition: all 0.3s ease;
                }

                .toggle.light .switch {
                    background-color: var(--Toggle-light);
                }

                .toggle.dark .switch {
                    background-image: linear-gradient(var(--Toggle-dark));
                }
                
                .switch::after {
                    content: "";
                    position: absolute;
                    top: 4px;
                    left: 5px;
                    width: 20px;
                    height: 20px;
                
                    border-radius: 30px;
                    
                    transition: all 0.3s ease;
                }

                .toggle.light .switch::after {
                    background-color: var(--Very-Pale-Blue-Top-BG-Pattern);
                }

                .toggle.dark .switch::after {
                    background-color: var(--Very-Dark-Blue-Top-BG-Pattern);
                }
                
                input[type="checkbox"]:checked + .switch:after {
                    transform: translateX(25.5px);
                }            
            </style>

            <div class="toggle ${theme}">
                <input type="checkbox" id="toggle" class="offscreen" />
                <label for="toggle" class="switch"></label>
            </div>
        `;

        // Add listeners to the custom element
        this.addListeners();
    }
}

// Define the component
customElements.define("custom-toggle", Toggle);
