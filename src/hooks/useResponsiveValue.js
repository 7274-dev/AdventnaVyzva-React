// with this you can use different values for mobile and pc
const useResponsiveValue = (pcValue, mobileValue) => {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) ? mobileValue : pcValue;
}

export { useResponsiveValue }
