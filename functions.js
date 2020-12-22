function getYieldForPlant(plant) {
    return plant.yield;
}

function getYieldForCrop(crop) {
    return crop.crop.yield * crop.numCrops;
}

function getTotalYield(input) {
    let result = 0;
    input.crops.forEach(crop => result = result + getYieldForCrop(crop));
    return result;
}

function getCostsForCrop(crop) {
    return crop.numCrops * crop.costOfCrop;
}

function getRevenueForCrop(crop) {

}

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
}  