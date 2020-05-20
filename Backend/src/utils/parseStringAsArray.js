module.exports = function parseStringAsArray(arrayAsString) {
    return techsArray = arrayAsString.split(',').map(tech => tech.trim());
}