const areArraysEqual = (array1, array2) => {
    if (array1 === array2) return true;
    if (array1 == null || array2 == null) return false;
    if (array1.length !== array2.length) return false;

    for (let i = 0; i < array1.length; ++i) {
        if (array1[i] !== array2[i]) return false;
    }

    return true;
}

const sortArrayAlphabetically = (array) => {
    const sortedArray = [];

    for (let value of array) {
        let index = 0;
        for (let sortedValue of sortedArray) {
            if (value > sortedValue) {
                index++;
            }
            else {
                break;
            }
        }

        sortedArray.splice(index, 0, value);
    }

    return sortedArray;
}

export { areArraysEqual, sortArrayAlphabetically };
