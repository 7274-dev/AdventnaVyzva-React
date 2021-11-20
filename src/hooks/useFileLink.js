import * as Api from "../api";

const useFileLink = (id) => `${Api.backendUrl}/api/file/download?fileId=${id}`

export { useFileLink }
