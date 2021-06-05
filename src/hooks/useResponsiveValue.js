// with this you can use mobile/pc values
const useResponsiveValue = (pcValue, mobileValue, border = 1000) => {
    // eslint-disable-next-line
    if (screen.width < border) {
        return mobileValue;
    }

    return pcValue;
}

export { useResponsiveValue };
