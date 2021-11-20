import { isDefined } from "./isDefined";

// we use this if we don't want to use variable1 || variable2
// use is like this: useDefaultValue(variable1, variable2);

const useDefaultValue = (value, defaultValue = null) => {
    if (!isDefined(value)) {
        return defaultValue;
    }

    return value;
}

export { useDefaultValue }