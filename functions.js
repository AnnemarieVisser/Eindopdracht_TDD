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
            return plantYield;
    }
}

function calculateYieldInfluence(factor, yieldOfPlant) {
    const influence = calculateInfluenceOnYield(factor);
    return yieldOfPlant * influence;
}

function calculateInfluenceOnYield(factor) {
    return (100 + factor) / 100;
}

function getYieldForCrop(crop, environment) {
    if (environment == undefined) {
        return crop.crop.yield * crop.numCrops;
    }

    const numberOfCrops = crop.numCrops;
    const calculateYield = getYieldForPlant(crop.crop, environment);
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
    return crop.numCrops * crop.crop.saleprice;
}

function getProfitForCrop(crop, environment) {
    const costs = getCostsForCrop(crop);
    const yieldInKilos = getYieldForPlant(crop.crop, environment);
    const salePrice = getRevenueForCrop(crop);
    const totalSalePrice = yieldInKilos * salePrice;
    return Math.round(totalSalePrice - costs);
}

function getTotalProfit(crops, environment) {
    let profit = 0;
    crops.forEach(crop => profit = profit + getProfitForCrop(crop, environment));
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