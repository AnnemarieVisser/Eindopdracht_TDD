const { getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit } = require("./functions");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });

    test("Calculate total yield with high sun", () => {
        const corn = {
            name: "corn",
            yield: 30,
            costOfCrop: 1,
            revenue: 2,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            },
        };

        const environmentFactors = {
            sun: "high",
        };

        expect(getYieldForPlant(corn, environmentFactors)).toBe(45);
    });

    test("Calculate total yield with medium sun", () => {
        const corn = {
            name: "corn",
            yield: 30,
            costOfCrop: 1,
            revenue: 2,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            },
        };

        const environmentFactors = {
            sun: "medium",
        };

        expect(getYieldForPlant(corn, environmentFactors)).toBe(30);
    });

    test("Calculate total yield with low sun", () => {
        const corn = {
            name: "corn",
            yield: 30,
            costOfCrop: 1,
            revenue: 2,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            },
        };

        const environmentFactors = {
            sun: "low",
        };

        expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
    });

    test("Calculate total yield with low sun and medium wind", () => {
        const corn = {
            name: "corn",
            yield: 30,
            costOfCrop: 1,
            revenue: 2,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: -60,
                    medium: 0,
                    high: 60,
                },
            },
        };

        const environmentFactors = {
            sun: "low",
            wind: "medium"
        };

        expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
    });

    test("Calculate total yield with low sun and high wind", () => {
        const corn = {
            name: "corn",
            yield: 30,
            costOfCrop: 1,
            revenue: 2,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: -60,
                    medium: 0,
                    high: 60,
                },
            },
        };

        const environmentFactors = {
            sun: "low",
            wind: "high"
        };

        expect(getYieldForPlant(corn, environmentFactors)).toBe(24);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });

    test("Get yield for crop with environment", () => {
        const corn = {
            name: "corn",
            yield: 30,
            costOfCrop: 1,
            revenue: 2,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: -60,
                    medium: 0,
                    high: 60,
                },
            },
        };

        const environmentFactors = {
            sun: "low",
            wind: "medium"
        };

        const input = {
            crop: corn,
            numCrops: 100,
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(1500);
    });
});

describe("getTotalYield", () => {

    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe("getCostsForCrop", () => {

    test("Get costs for crop", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costOfCrop: 1,
        };
        const input = {
            crop: corn,
            numCrops: 10,

        };
        expect(getCostsForCrop(input)).toBe(10);
    });
});

describe("getRevenueForCrop", () => {

    test("Calculate total revenue for crop", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costOfCrop: 1,
            saleprice: 2
        };
        const input = {
            crop: corn,
            numCrops: 10,

        };
        expect(getRevenueForCrop(input)).toBe(20);
    });
});

describe("getProfitForCrop", () => {

    test("Calculate profit for a crop", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costOfCrop: 1,
            saleprice: 2,

        };

        const input = {
            crop: corn,
            numCrops: 10,

        };
        expect(getProfitForCrop(input)).toBe(50);
    });

    test("Calculate profit for a crop with medium environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            costOfCrop: 5,
            saleprice: 15,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: -60,
                    medium: 0,
                    high: 60,
                },
            },
        };

        const environmentFactors = {
            sun: "medium",
            wind: "medium"
        };

        const input = {
            crop: corn,
            numCrops: 10,

        };
        expect(getProfitForCrop(input, environmentFactors)).toBe(4450);
    });

    test("Calculate profit for a crop with high environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            costOfCrop: 5,
            saleprice: 15,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: -60,
                    medium: 0,
                    high: 60,
                },
            },
        };

        const environmentFactors = {
            sun: "high",
            wind: "high"
        };

        const input = {
            crop: corn,
            numCrops: 10,

        };
        expect(getProfitForCrop(input, environmentFactors)).toBe(10750);
    });

    test("Calculate profit for a crop with low environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            costOfCrop: 5,
            saleprice: 15,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: -60,
                    medium: 0,
                    high: 60,
                },
            },
        };

        const environmentFactors = {
            sun: "low",
            wind: "low"
        };

        const input = {
            crop: corn,
            numCrops: 10,

        };
        expect(getProfitForCrop(input, environmentFactors)).toBe(850);
    });
});

describe("getTotalProfit", () => {

    test("Calculate total profit with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costOfCrop: 1,
            saleprice: 2
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            costOfCrop: 1,
            saleprice: 4
        };
        const crops = [
            { crop: corn, numCrops: 50 },
            { crop: pumpkin, numCrops: 20 },
        ];
        expect(getTotalProfit(crops)).toBe(550);
    });

    test("Calculate total profit with multiple crops and low environment influence", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costOfCrop: 1,
            saleprice: 2,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: -60,
                    medium: 0,
                    high: 60,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            costOfCrop: 1,
            saleprice: 4,
            factors: {
                sun: {
                    low: -40,
                    medium: 0,
                    high: 60,
                },
                wind: {
                    low: -50,
                    medium: 0,
                    high: 60,
                },
            },
        };

        const environmentFactors = {
            sun: "low",
            wind: "low"
        };

        const crops = [
            { crop: corn, numCrops: 50 },
            { crop: pumpkin, numCrops: 30 },
        ];
        expect(getTotalProfit(crops, environmentFactors)).toBe(124);
    });

    test("Calculate total profit with multiple crops and medium environment influence", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costOfCrop: 1,
            saleprice: 2,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: -60,
                    medium: 0,
                    high: 60,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            costOfCrop: 1,
            saleprice: 4,
            factors: {
                sun: {
                    low: -40,
                    medium: 0,
                    high: 60,
                },
                wind: {
                    low: -50,
                    medium: 0,
                    high: 60,
                },
            },
        };

        const environmentFactors = {
            sun: "medium",
            wind: "medium"
        };

        const crops = [
            { crop: corn, numCrops: 50 },
            { crop: pumpkin, numCrops: 30 },
        ];
        expect(getTotalProfit(crops, environmentFactors)).toBe(700);
    });

    test("Calculate total profit with multiple crops and high environment influence", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costOfCrop: 1,
            saleprice: 2,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: -60,
                    medium: 0,
                    high: 60,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            costOfCrop: 1,
            saleprice: 4,
            factors: {
                sun: {
                    low: -40,
                    medium: 0,
                    high: 60,
                },
                wind: {
                    low: -50,
                    medium: 0,
                    high: 60,
                },
            },
        };

        const environmentFactors = {
            sun: "high",
            wind: "high"
        };

        const crops = [
            { crop: corn, numCrops: 50 },
            { crop: pumpkin, numCrops: 30 },
        ];
        expect(getTotalProfit(crops, environmentFactors)).toBe(1869);
    });
});
