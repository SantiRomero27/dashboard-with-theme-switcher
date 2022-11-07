// Number formatter function
function formatNumber(n: number): string {
    if (n < 1e3) return n.toString();
    if (n >= 1e3 && n < 1e6) return (n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return (n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return (n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return (n / 1e12).toFixed(1) + "T";
}

// Get total followers function
function getTotalFollowers(statsCardsArray): string {
    // Aux variable
    let counter: number = 0;

    // If there's no cards...
    if (statsCardsArray.length === 0) {
        return formatNumber(counter);
    }

    // Sum the followers
    statsCardsArray.forEach((card) => {
        // Get the people amount
        const peopleAmount: number = Number(card.getAttribute("people"));

        // Count
        counter += peopleAmount;
    });

    return formatNumber(counter);
}

// Export
export { formatNumber, getTotalFollowers };
