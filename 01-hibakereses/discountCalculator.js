function calculateDiscountedPrice(orderValue, isVip) {
    let discount = 0;
    if (orderValue > 10000 && orderValue < 25000) {
        discount = 0.05;
    } else if (orderValue >= 25000 && orderValue <= 50000) {
        discount = 0.10;
    } else if (orderValue > 50000) {
        discount = 0.15;
    }
    if (isVip === true) {
        discount += 5;
    }
    if (discount > 0.20) {
        discount = 0.20;
    }
    return orderValue - discount;
}

module.exports = { calculateDiscountedPrice };
