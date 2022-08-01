const getBucketResult = (buckets: number[], weights: number[]) => {
    const weightsSum = weights.reduce((a, b) => a + b, 0);
    const random = Math.random() * weightsSum;

    let sum = 0;

    let result = 0;

    for (let i = 0; i < buckets.length; i += 1) {
        sum += weights[i];

        if (random <= sum) {
            result = i;

            break;
        }

        if (i === buckets.length - 1) {
            result = i;
        }
    }

    return result;
};

export default getBucketResult;
