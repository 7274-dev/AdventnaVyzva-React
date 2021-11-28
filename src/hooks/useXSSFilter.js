const useXSSFilter = () => {
    return {
        filter: (xss) => xss
            .replace("<", "&lt;")
            .replace(">", "&gt;")
    }
}

export { useXSSFilter }
