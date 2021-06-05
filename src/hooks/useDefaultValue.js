// we use this if we don't want to use variable1 || variable2
// use is like this: useDefaultValue(variable1, variable2);
const useDefaultValue = (value, defaultValue = null) => {
    console.log(`Data from useDefaultValue: \n value: ${value} \n defaultValue: ${defaultValue}`)

    if ([null, undefined, ""].includes(value)) {
        return defaultValue;
    }

    return value;
}

export { useDefaultValue };
