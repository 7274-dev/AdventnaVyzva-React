const getPxByRem = (rem) => {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export { getPxByRem }
