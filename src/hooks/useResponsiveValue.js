// with this you can use mobile/pc values
const useResponsiveValue = (pcValue, mobileValue, border = 1000) => {
    if(navigator.userAgent.toLowerCase().match(/mobile/i)) {
        return mobileValue;
    }
    return pcValue;
}

export { useResponsiveValue };
