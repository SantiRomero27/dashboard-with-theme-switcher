import { formatNumber } from "../../utils";

// Images
const imagesSrc = {
    logos: {
        facebook: require("url:../../images/icon-facebook.svg"),
        instagram: require("url:../../images/icon-instagram.svg"),
        youtube: require("url:../../images/icon-youtube.svg"),
        twitter: require("url:../../images/icon-twitter.svg"),
    },
    updates: {
        positive: require("url:../../images/icon-up.svg"),
        negative: require("url:../../images/icon-down.svg"),
    },
};

// Custom element
class OverviewCard extends HTMLElement {
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
        const overviewCardEl: Element =
            this.shadowRoot.querySelector(".overview-card");

        // DOM mutation observer
        const elementObserver: MutationObserver = new MutationObserver(
            (e: any) => {
                // Get the target element, and its theme
                const targetEl: Element = e[0].target;
                const changedTheme: string = targetEl.getAttribute("theme");

                // Change the element class
                overviewCardEl.classList.replace(
                    overviewCardEl.classList[1],
                    changedTheme
                );
            }
        );

        elementObserver.observe(this, {
            attributes: true,
            attributeFilter: ["theme"],
        });
    }

    // Render method
    render() {
        // Get attributes
        const theme: string = this.getAttribute("theme") || "light";
        const title = this.getAttribute("title");
        let socialMedia: string = this.getAttribute("social") || "facebook";
        const amount: number = Number(this.getAttribute("amount"));
        const updateNumber: number = Number(this.getAttribute("update-num"));
        const updateStatus = this.getAttribute("update-status") || "positive";

        // Aux variables
        socialMedia = socialMedia.toLowerCase();
        const formattedAmount: string = formatNumber(amount);
        const formattedUpdate: string = formatNumber(updateNumber);

        // Set content
        this.shadow.innerHTML = `
            <style>
                .overview-card {
                    display: grid;
                    gap: 25px;
                
                    padding: 25px;
                
                    border-radius: 10px;
                    cursor: pointer;
                }
                
                .overview-card, .overview-card * {
                    transition: all 0.3s ease;
                }

                .overview-card.light {
                    background-color: var(--Light-Grayish-Blue-Card-BG);
                }
                
                .overview-card.light:hover {
                    background-color: var(--Light-Grayish-Blue-Card-BG-hover);
                }

                .overview-card.dark {
                    background-color: var(--Dark-Desaturated-Blue-Card-BG);
                }
                
                .overview-card.dark:hover {
                    background-color: var(--Dark-Desaturated-Blue-Card-BG-hover);
                }
                                
                .overview-card__info,
                .overview-card__stats {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .overview-card__info__text {
                    font-weight: 700;
                }
                
                .overview-card.light .overview-card__info__text {
                    color: var(--Dark-Grayish-Blue-Text);
                }

                .overview-card.dark .overview-card__info__text {
                    color: var(--Desaturated-Blue-Text);
                }
                
                .overview-card__number {
                    font-size: 38px;
                    font-weight: 700;
                }
                
                .overview-card.light .overview-card__number {                    
                    color: var(--Very-Dark-Blue-Text);
                }

                .overview-card.dark .overview-card__number {
                    color: var(--White-Text);
                }
            
                .overview-card__update {
                    display: flex;
                    align-items: center;
                }
                
                .overview-card__update__image {
                    width: 12px;
                    margin-right: 5px;
                }
                
                .overview-card__update__number {
                    font-size: 14px;
                    font-weight: 700;
                }
                
                .overview-card__update.positive > .overview-card__update__number {
                    color: var(--Lime-Green);
                }
                
                .overview-card__update.negative > .overview-card__update__number {
                    color: var(--Bright-Red);
                }            
            </style>

            <div class="overview-card ${theme}">
                <div class="overview-card__info">
                    <span class="overview-card__info__text"
                        >${title}</span
                    >
                    <img
                        src="${imagesSrc["logos"][socialMedia]}"
                        alt="Social media"
                        class="overview-card__info__image"
                    />
                </div>
                <div class="overview-card__stats">
                    <span class="overview-card__number">${formattedAmount}</span>
                    <div class="overview-card__update ${updateStatus}">
                        <img
                            src="${imagesSrc["updates"][updateStatus]}"
                            alt="Update image"
                            class="overview-card__update__image"
                        />
                        <span class="overview-card__update__number"
                            >${formattedUpdate}%</span
                        >
                    </div>
                </div>
            </div>
        `;

        // Add listeners to the component
        this.addListeners();
    }
}

// Define the component
customElements.define("overview-card", OverviewCard);
