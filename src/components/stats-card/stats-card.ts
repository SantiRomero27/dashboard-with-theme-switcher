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
class StatsCard extends HTMLElement {
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
        const statsCardEl: Element =
            this.shadowRoot.querySelector(".stats-card");

        // DOM mutation observer
        const elementObserver: MutationObserver = new MutationObserver(
            (e: any) => {
                // Get the target element, and its theme
                const targetEl: Element = e[0].target;
                const changedTheme: string = targetEl.getAttribute("theme");

                // Change the element class
                statsCardEl.classList.replace(
                    statsCardEl.classList[1],
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
        const username = this.getAttribute("username");
        let socialMedia: string = this.getAttribute("social") || "facebook";
        const peopleAmount: number = Number(this.getAttribute("people"));
        const updateNumber: number = Number(this.getAttribute("update-num"));
        const updateStatus = this.getAttribute("update-status") || "positive";

        // Aux variables
        socialMedia = socialMedia.toLowerCase();
        const formattedAmount: string = formatNumber(peopleAmount);
        const formattedUpdate: string = formatNumber(updateNumber);
        const peopleType: string =
            socialMedia === "youtube" ? "Subscribers" : "Followers";
        const normalBackground: string = `background-color: var(--${socialMedia});`;
        const gradientBackground: string = `background-image: linear-gradient(var(--${socialMedia}));`;
        const backgroundType: string =
            socialMedia === "instagram" ? gradientBackground : normalBackground;

        // Set content
        this.shadow.innerHTML = `
            <style>
                .stats-card {
                    position: relative;
                    display: grid;
                    justify-items: center;
                    gap: 25px;
                
                    padding: 25px;
                
                    border-radius: 0 0 10px 10px;
                    cursor: pointer;
                }

                .stats-card, .stats-card * {
                    transition: all 0.3s ease;
                }

                .stats-card.light {
                    background-color: var(--Light-Grayish-Blue-Card-BG);
                }
                
                .stats-card.light:hover {
                    background-color: var(--Light-Grayish-Blue-Card-BG-hover);
                }

                .stats-card.dark {
                    background-color: var(--Dark-Desaturated-Blue-Card-BG);
                }
                
                .stats-card.dark:hover {
                    background-color: var(--Dark-Desaturated-Blue-Card-BG-hover);
                }
                
                .stats-card::before {
                    content: "";
                    position: absolute;
                    top: -5px;
                
                    width: 100%;
                    height: 5px;
                
                    ${backgroundType}
                    border-radius: 10px 10px 0 0;
                }
                                
                .stats-card__user {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    align-items: center;
                    gap: 7.5px;
                
                    width: min-content;
                }
                
                .stats-card__user__name {
                    font-size: 14px;
                    font-weight: 700;
                }

                .stats-card.light .stats-card__user__name {
                    color: var(--Dark-Grayish-Blue-Text);
                }

                .stats-card.dark .stats-card__user__name {
                    color: var(--Desaturated-Blue-Text);
                }
                
                .stats-card__followers {
                    display: grid;
                
                    text-align: center;
                }
                
                .stats-card__followers__count {
                    font-size: 56px;
                    font-weight: 700;
                }

                .stats-card.light .stats-card__followers__count {
                    color: var(--Very-Dark-Blue-Text);
                }

                .stats-card.dark .stats-card__followers__count {
                    color: var(--White-Text);
                }
                
                .stats-card__followers__title {
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 5px;
                }

                .stats-card.light .stats-card__followers__title {
                    color: var(--Dark-Grayish-Blue-Text);
                }

                .stats-card.dark .stats-card__followers__title {
                    color: var(--Desaturated-Blue-Text);
                }
                
                .stats-card__update {
                    display: flex;
                    align-items: center;
                }
                
                .stats-card__update__image {
                    width: 12px;
                    margin-right: 5px;
                }
                
                .stats-card__update__number {
                    font-size: 14px;
                    font-weight: 700;
                }
                
                .stats-card__update.positive > .stats-card__update__number {
                    color: var(--Lime-Green);
                }
                
                .stats-card__update.negative > .stats-card__update__number {
                    color: var(--Bright-Red);
                }            
            </style>

            <div class="stats-card ${theme}">
                <div class="stats-card__user">
                    <img
                        src="${imagesSrc["logos"][socialMedia]}"
                        alt="Social Media"
                        class="stats-card__user__image"
                    />
                    <span class="stats-card__user__name">@${username}</span>
                </div>

                <article class="stats-card__followers">
                    <span class="stats-card__followers__count">${formattedAmount}</span>
                    <span class="stats-card__followers__title"
                        >${peopleType}</span
                    >
                </article>

                <div class="stats-card__update ${updateStatus}">
                    <img
                        src="${imagesSrc["updates"][updateStatus]}"
                        alt="Update image"
                        class="stats-card__update__image"
                    />
                    <span class="stats-card__update__number">${formattedUpdate} Today</span>
                </div>
            </div>
        `;

        // Add listeners to the component
        this.addListeners();
    }
}

// Define the component
customElements.define("stats-card", StatsCard);
