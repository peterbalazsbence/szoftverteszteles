function toRoman(number) {
    if (!Number.isInteger(number) || number < 1 || number > 3999) {
        throw new RangeError("1 és 3999 közötti egész számot adj meg.");
    }

    const symbols = [
        [1000, "M"],
        [900, "CM"],
        [500, "D"],
        [400, "CD"],
        [100, "C"],
        [90, "XC"],
        [50, "L"],
        [40, "XL"],
        [10, "X"],
        [9, "IX"],
        [5, "V"],
        [4, "IV"],
        [1, "I"],
    ];
    let result = "";

    for (const [value, symbol] of symbols) {
        while (number >= value) {
            result += symbol;
            number -= value;
        }
    }

    return result;
}
