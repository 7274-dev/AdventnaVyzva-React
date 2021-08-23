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
    if (array.length === 0) return true;

    return false;
}

const sortArrayAlphabetically = (array) => {
    const sortedArray = [];

    for (const value of array) {
        let index = 0;
        for (const sortedValue of sortedArray) {
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

const changeOrder = (isHomeworkSection, token, order, values, setValues) => {
    if (['', 'SomethingWentWrong'].includes(values) || !order || isArrayEmpty(values)) {
        return;
    }

    const sortValues = async (values, id) => {
        let sortedValues = [];

        if ((id === 0 && !isHomeworkSection) || (id === 2 && isHomeworkSection)) {
            sortedValues = sortArrayAlphabetically(values);
        }
        else if (id === 0 && isHomeworkSection) {
            sortedValues = sortHomeworkByDate(values);
        }
        if (id === 1 || (id === 3 && isHomeworkSection)) {
            sortedValues = sortedValues.reverse();
        }

        return sortedValues;
    }

    const updateValues = async () => {
        const sortedValues = await sortValues(values, order.id);

        if (!areArraysEqual(sortedValues, values) && !isArrayEmpty(sortedValues) && values.length === sortedValues.length) {
            setValues([]);
            setValues(sortedValues);
        }
    }

    // warning: on students section was `r => {}`, check if there is no problem with this
    updateValues().catch(r => setValues('SomethingWentWrong'));
}

export { areArraysEqual, sortArrayAlphabetically, changeOrder };
