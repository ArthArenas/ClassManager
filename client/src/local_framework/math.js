export const toFloat = (num, precision) => {
    return parseFloat(num).toFixed(precision);
}

export const calculateGradeAsPercent = (points, scale) => {
    return toFloat(points / scale * 100, 0);
}

export const calculateGradeContribution = (points, scale, weight) => {
    return toFloat(points / scale * weight * 10, 1);
}