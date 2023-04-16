import { ElLoading } from "element-plus";

let loadingInstance = null;

function openLoading() {
  loadingInstance = ElLoading.service({ fullscreen: true });
}

function closeLoading() {
  loadingInstance.close();
}

export { openLoading, closeLoading };
