const getPercentage = (a: number, b: number) : number => {
    const percentage = Math.min(
        Math.round((((a / b) * 100) + Number.EPSILON) * 10000) / 10000,
        10000,
    );

    return Number.isNaN(percentage) ? 0 : Number(percentage.toFixed(2));
};

export default getPercentage;
