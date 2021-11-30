const useXSSFilter = () => {
    return {
        filter: (xss) => xss
            // .replace("<", "&lt;")
            // .replace(">", "&gt;")
            // .replace("\"", "&quot;")
            // .replace("'", "&#39;")
            // .replace("/", "&#47;")
            // .replace("\\", "&#92;")
            // .replace("%", "&#37;")
            // .replace("$", "&#36;")
            // .replace("@", "&#64;")
            // .replace("!", "&#33;")
            // .replace("^", "&#94;")
            // .replace("*", "&#42;")
            // .replace("(", "&#40;")
            // .replace(")", "&#41;")
            // .replace("-", "&#45;")
            // .replace("+", "&#43;")
            // .replace("=", "&#61;")
            // .replace("|", "&#124;")
            // .replace("{", "&#123;")
            // .replace("}", "&#125;")
            // .replace("[", "&#91;")
            // .replace("]", "&#93;")
            // .replace(":", "&#58;")
            // .replace("?", "&#63;")
            // .replace(".", "&#46;")
    }
}

export { useXSSFilter }
