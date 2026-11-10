const salt = "CalcThesis", answer = "tc3BHBcSs/rfP91jj2BFi7JjgPZc9rFNbxY/YkVOUsA=";
const PW = document.getElementById('PW');
const DIF = document.getElementById('dif');
const QTY = document.getElementById('qty');
const CORRECT = 1, WRONG = -1;

/**
 * @brief 初期化関数
 */
function init() {
    PageShift('Certification');
}

/**
 * @brief 表示ページを切り替える
 * @param {string} id - ページID
 */
function PageShift(id) {
    document.getElementById('mesg').innerHTML = "";
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0,0);
    if(id === 'Control') {
        const dif = sessionStorage.getItem('dif');
        const qty = sessionStorage.getItem('qty');
        if(dif != null) {
            // alert(dif.value);
            SetValue('dif', dif.value);
        }
        if(qty != null) {
            // alert(qty.value);
            SetValue('qty', qty.value);
        }
    }
}

/**
 * @brief idがobjであるコンポネントの値をvalで上書きする
 * @param {string} obj 
 * @param {number} val 
 */
function SetValue(obj, val) {
    document.getElementById(obj).innerHTML = val;
}

function SetStorage(obj, val) {
    sessionStorage.setItem(obj, val);
    SetValue(obj, val);
    document.getElementById('mesg').innerHTML = `  ${obj}の値を${val}で上書きしました.` + '\n' + document.getElementById('mesg').innerHTML;
}

PW.addEventListener('change', function() {
    hashPassword(PW.value);
}, false)

/*DIF.addEventListener('change', function() {
    SetStorage('dif', DIF.value);
}, false)

QTY.addEventListener('change', function() {
    SetStorage('qty', QTY.value);
}, false)*/

/**
 * @brief Session Storageから初期値をロードする.
 * @param {string} dif - 難易度
 * @param {string} qty - 問題数
 */
function dispValues(dif, qty) {
    if(DIFFICULTY != null) {
        SetStorage(DIFFICULTY, dif);
    }
    if(QUANTITY != null) {
        SetStorage(QUANTITY, qty);
    }
}

function operationReset() {
    sendSignal(RESET);
    resetParameters();
    dispValues(DEFAULT.dif, DEFAULT.qty);
}

function bufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    bytes.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary);
}

/**
 * ソルト付きパスワードハッシュ生成
 * @param {string} password - 平文パスワード
 */
async function hashPassword(password) {
    if (typeof password !== 'string' || password.length === 0) {
        throw new Error('パスワードは非空の文字列である必要があります');
    }

    // ソルトが指定されていない場合はランダム生成（16バイト）
    const generatedSalt = salt;

    // パスワードとソルトを結合
    const encoder = new TextEncoder();
    const data = encoder.encode(password + bufferToBase64(generatedSalt));

    // SHA-256でハッシュ化
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    hash = bufferToBase64(hashBuffer);

    if(hash == answer) {
        PageShift('Control');
        return CORRECT;
    }
    document.getElementById('mesg').innerHTML = "Wrong Input password!";
}