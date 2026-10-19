function toRoman(number) {
    const symbols = [

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
