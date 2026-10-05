function calculateShippingCost(orderValue, weight, country, express) {
    let shippingCost = 0;

    if (country === "HU" && orderValue >= 20000) {
        return 0;
    }

    if (weight < 5) {
        shippingCost = 1500;
    } else if (weight > 5 && weight < 20) {
        shippingCost = 2500;
    } else {
        shippingCost = 5000;
    }

    if (country !== "HU") {
        shippingCost = shippingCost * 2;
    }

    if (express === true) {
        shippingCost = shippingCost + 50;
    }

    return shippingCost;
}
