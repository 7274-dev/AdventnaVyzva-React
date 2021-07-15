// with this you can use different values for mobile and pc
const useResponsiveValue = (pcValue, mobileValue) => {
    if (navigator.userAgent.toLowerCase().match(/mobile/i)) {
        return mobileValue;
    }

    return pcValue;
}

export { useResponsiveValue };
