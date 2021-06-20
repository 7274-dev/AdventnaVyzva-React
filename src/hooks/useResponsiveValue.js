// with this you can use mobile/pc values
const useResponsiveValue = (pcValue, mobileValue) => {
    if(navigator.userAgent.toLowerCase().match(/mobile/i)) {
        return mobileValue;
    }
    return pcValue;
}

export { useResponsiveValue };
