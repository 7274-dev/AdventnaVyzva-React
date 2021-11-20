// with this you can use different values for mobile and pc
const useResponsiveValue = (pcValue, mobileValue, touchScreenMethod = false) => {
    if (!touchScreenMethod) {
        if (navigator.userAgent.toLowerCase().match(/mobile/i)) {
            return mobileValue;
        }

        return pcValue;
    }
    else {
        return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) ?
            mobileValue : pcValue;
    }
}

export { useResponsiveValue }
