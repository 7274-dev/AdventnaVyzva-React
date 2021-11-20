const isDefined = (value) => {
    return !['undefined', undefined, 'null', null, '', 0].includes(value);
}

export { isDefined }
