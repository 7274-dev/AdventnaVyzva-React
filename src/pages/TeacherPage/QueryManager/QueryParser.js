const areArraysEqual = (array1, array2) => {
    if (array1 === array2) return true;
    if (array1 == null || array2 == null) return false;
    if (array1.length !== array2.length) return false;

    for (let i = 0; i < array1.length; ++i) {
        if (array1[i] !== array2[i]) return false;
    }

    return true;
}

const isArrayEmpty = (array) => {
    if (!array) return true;
    return array.length === 0;
}

// @param softFieldName : string - field you want to sort by, for example title, text, class, etc
const sortArrayAlphabetically = (array, sortFieldName) => {
    const sortedArray = [];

    for (const value of array) {
        if (!value) {
            continue;
        }

        let index = 0;

        for (const sortedValue of sortedArray) {
            if (!sortedValue) {
                continue;
            }
            if (value[sortFieldName] >= sortedValue[sortFieldName]) {
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

const getDaysFromHw = (hw) => {
    const fromDate = hw.fromDate.split('T')[0];
    const year = +fromDate.split('-')[0];
    const month = +fromDate.split('-')[1];
    const day = +fromDate.split('-')[2];

    return year * 360 + month * 30 + day;
}

const sortHomeworkByDate = (homework) => {
    const sortedHomework = [];

    for (const hw of homework) {
        const days = getDaysFromHw(hw);

        let index = 0;
        for (const sortedHw of sortedHomework) {
            const sortedDays = getDaysFromHw(sortedHw);

            if (sortedDays > days) {
                index++;
            }
            else {
                break;
            }
        }

        sortedHomework.splice(index, 0, hw)
    }

    return sortedHomework;
}

const changeOrder = (isHomeworkSection, token, order, values, setValues, sortFieldName) => {
    if (['', 'SomethingWentWrong'].includes(values) || !order) {
        return;
    }
    if (isArrayEmpty(values)) {
        return values;
    }

    const sortValues = (values, id) => {
        let sortedValues = [];

        if ([0, 1].includes(id)) {
            sortedValues = sortArrayAlphabetically(values, sortFieldName);
        }
        else if ([2, 3].includes(id) && isHomeworkSection) {
            sortedValues = sortHomeworkByDate(values);
        }
        if (id % 2 === 1) {
            sortedValues = sortedValues.reverse();
        }

        return sortedValues;
    }

    const sortedValues = sortValues(values, order.id);

    if (!areArraysEqual(sortedValues, values) && !isArrayEmpty(sortedValues)) {
        setValues(sortedValues);
    }
}

export { areArraysEqual, sortArrayAlphabetically, changeOrder }
