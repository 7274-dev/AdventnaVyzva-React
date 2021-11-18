const extensions = {
    'image': ['jpg', 'png', 'webp', 'gif', 'tiff', 'psd', 'raw', 'bmp', 'jpeg', 'heif', 'indd', 'svg'],
    'video': ['mp4', 'webm', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'ogg', 'm4p', 'm4v', 'avi', 'wmv', 'mov', 'qt', 'flv', 'swf']
}

const getFileType = (extension) => {
    for (let i in extensions) {
        if (extensions[i].includes(extension.toLowerCase())) {
            return i.toString();
        }
    }

    return undefined;
}

export { getFileType }
