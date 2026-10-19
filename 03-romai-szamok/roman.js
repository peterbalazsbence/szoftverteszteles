function toRoman(number) {
    const symbols = [
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
