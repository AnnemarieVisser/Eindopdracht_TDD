function getYieldForPlant(plant, environment) {
    const yieldOfPlant = plant.yield;

    if (environment == undefined) {
        return yieldOfPlant;
    }
    let totalYieldAfterInfluences = yieldOfPlant;

    if (environment.sun !== undefined) {
        totalYieldAfterInfluences = calculateYieldWithInfluence(environment.sun, plant.factors.sun, totalYieldAfterInfluences);
    }

    if (environment.wind !== undefined) {
        totalYieldAfterInfluences = calculateYieldWithInfluence(environment.wind, plant.factors.wind, totalYieldAfterInfluences);
    }
    return totalYieldAfterInfluences;
}

function calculateYieldWithInfluence(influence, factor, plantYield) {
    switch (influence) {
        case 'low':
            return calculateYieldInfluence(factor.low, plantYield);
        case 'medium':
            return calculateYieldInfluence(factor.medium, plantYield);
        case 'high':
            return calculateYieldInfluence(factor.high, plantYield);
        default:
            console.log('no factors submitted');
    }
}

function calculateYieldInfluence(factor, yieldOfPlant) {
    let infulence = calculateInfluenceOnYield(factor);
    return yieldOfPlant * infulence;
}

function calculateInfluenceOnYield(factor) {
    return (100 + factor) / 100;
}

function getYieldForCrop(crop, environment) {

    if (environment == undefined) {
        return crop.crop.yield * crop.numCrops;
    }

    const numberOfCrops = crop.numCrops;
    let calculateYield = getYieldForPlant(crop.crop, environment);
    return calculateYield * numberOfCrops;

}

function getTotalYield(input) {
    let result = 0;
    input.crops.forEach(crop => result = result + getYieldForCrop(crop));
    return result;
}

function getCostsForCrop(crop) {
    return crop.numCrops * crop.crop.costOfCrop;
}

function getRevenueForCrop(crop) {
    return crop.numCrops * crop.crop.revenue;
}

function getProfitForCrop(crop, environment) {

    if (environment == undefined) {
        let costs = getCostsForCrop(crop);
        let revenue = getRevenueForCrop(crop);
        let profit = revenue - costs;
        return profit;
    }

    let costs = getCostsForCrop(crop);
    let revenue = getRevenueForCrop(crop);
    let profit = revenue - costs;
    return profit;
}

function getTotalProfit(input) {
    let costs = 0;
    input.crops.forEach(crop => costs = costs + getCostsForCrop(crop));
    let revenue = 0;
    input.crops.forEach(crop => revenue = revenue + getRevenueForCrop(crop));
    let profit = revenue - costs;
    return profit;
}

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
}  