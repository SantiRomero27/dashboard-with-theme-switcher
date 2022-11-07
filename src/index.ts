import "./components/stats-card/stats-card";
import "./components/overview-card/overview-card";
import "./components/toggle/toggle";

import { getTotalFollowers } from "./utils";

// Main function
(function () {
    // Aux variables
    const totalFollowersEl: Element = document.querySelector(
        ".page-header__info__followers"
    );
    const customToggle: Element = document.querySelector("custom-toggle");
    const statsCards = document.querySelectorAll("stats-card");
    const overviewCards = document.querySelectorAll("overview-card");

    // Get the total followers and set them
    const followersAmount: string = getTotalFollowers(statsCards);
    totalFollowersEl.textContent = `Total Followers: ${followersAmount}`;

    // Toggle event
    customToggle.addEventListener("themeChange", (e: any) => {
        // Get the theme
        const selectedTheme: string = e.detail.theme;

        // Change the body class
        document.body.className = `${selectedTheme}-theme`;

        // Change the components theme
        statsCards.forEach((card) => card.setAttribute("theme", selectedTheme));
        overviewCards.forEach((card) =>
            card.setAttribute("theme", selectedTheme)
        );
    });
})();
