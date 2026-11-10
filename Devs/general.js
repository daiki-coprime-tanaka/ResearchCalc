/** 実験用タブのグループ */
const channel = new BroadcastChannel("experiment");
/** リセット信号 */ 
const RESET = "Reset";
/** 難易度 */ 
const DIFFICULTY = "dif";
/** 問題数 */
const QUANTITY = "qty";
/** パラメータの初期値 */
const DEFAULT = {
    /** 難易度 */
    dif: 10,
    /** 問題数 */
    qty: 10
}

/**
 * @brief 送信機能
 * @param {string} sig - 送信する信号名
 */
function sendSignal(sig) {
    channel.postMessage({
        type: sig
    });
}

/**
 * @brief Session Storageから初期値をロードする.
 */
function resetParameters() {
    Object.entries(DEFAULT).forEach(
        ([key, value]) => {
            sessionStorage.setItem(key, value);
        }
    );
}

channel.onmessage = (event) => {
    if (event.data.type === RESET) {
        resetParameters();
        location.reload();
    }
};