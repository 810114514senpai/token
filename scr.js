// --- Password Protection ---
const passwordInput = document.getElementById('password-input');
const passwordSubmit = document.getElementById('password-submit');
const passwordScreen = document.getElementById('password-screen');
const mainContent = document.getElementById('main');
const correctPassword = 'ruru114514';

passwordSubmit.addEventListener('click', () => {
    if (passwordInput.value === correctPassword) {
        passwordScreen.style.display = 'none';
        mainContent.style.display = 'block';
        initializeLiff(); // Initialize LIFF after password is correct
    } else {
        alert('パスワードが違います');
        passwordInput.value = ''; // Clear input on wrong password
    }
});

// --- LIFF Initialization ---
const LIFF_ID = "2007556850-NzoOlegE"; // Your LIFF ID

function initializeLiff() {
    liff.init({
        liffId: LIFF_ID
    }).then(() => {
        if (liff.isLoggedIn()) {
            liff.getAccessToken().then(accessToken => {
                document.getElementById('token').value = accessToken;
            }).catch(err => {
                console.error("Failed to get access token: ", err);
                document.getElementById('err').textContent = 'トークン取得エラー: ' + err;
            });
        } else {
            document.getElementById('err').textContent = 'LIFFにログインしていません。';
        }
    }).catch((err) => {
        console.error("LIFF initialization failed: ", err);
        document.getElementById('err').textContent = 'LIFF初期化エラー: ' + err;
    });
}


// --- Existing Functions (with minor adjustments for clarity) ---

function set() {
    // This function doesn't seem to do anything with the token based on the original HTML.
    // If you intend to save the token, you'd need to add that logic here.
    alert("トークンを設定しました (この機能は現在、表示のみです)");
}

function pc() {
    const token = document.getElementById('token').value;
    if (liff.isApiAvailable('shareTargetPicker')) {
        liff.shareTargetPicker([{
            "type": "text",
            "text": "LIFFトークン: " + token
        }]).then(() => {
            alert('トークンを転送しました');
        }).catch((err) => {
            console.error("トークン転送失敗: ", err);
            alert('トークン転送に失敗しました: ' + err);
        });
    } else {
        alert('この環境ではトークン転送機能は利用できません。');
    }
}

function clos() {
    // Keeping token with Cookies
    const token = document.getElementById('token').value;
    if (token && token !== 'null') {
        Cookies.set('liff_token', token, { expires: 7 }); // Saves for 7 days
        alert('トークンを保持して閉じます');
    } else {
        alert('保持するトークンがありません');
    }
    liff.closeWindow();
}

function openB() {
    const currentUrl = window.location.href;
    liff.openWindow({
        url: currentUrl,
        external: true
    });
}

function test() {
    const message = document.getElementById('test').value;
    if (liff.isApiAvailable('sendMessage')) {
        liff.sendMessages([{
            'type': 'text',
            'text': message
        }]).then(() => {
            alert('メッセージを送信しました');
        }).catch((err) => {
            console.error("メッセージ送信失敗: ", err);
            alert('メッセージ送信に失敗しました: ' + err);
        });
    } else {
        alert('この環境ではメッセージ送信機能は利用できません。');
    }
}

function kuni() {
    alert('Unicode解析機能が呼び出されました。この機能の実装が必要です。');
    // 実装例: ユーザーからの入力を受け取り、Unicodeを解析して表示する
}

function url() {
    alert('通報リンク変換機能が呼び出されました。この機能の実装が必要です。');
    // 実装例: URLを入力させ、通報リンク形式に変換して表示する
}

function uni() {
    alert('ユニコード自動連投機能が呼び出されました。この機能の実装が必要です。');
    // 実装例: Unicode文字の連投ロジック
}

function flex() {
    alert('Flexメッセージ生成機能が呼び出されました。この機能の実装が必要です。');
    // 実装例: FlexメッセージのJSONを生成するUIとロジック
}

function tUni() {
    alert('多機能連投機能が呼び出されました。この機能の実装が必要です。');
    // 実装例: 複数のメッセージタイプや条件での連投ロジック
}

function help() {
    alert('このツールはLIFFの様々な機能を試すためのものです。\n\n各ボタンで対応する機能が実行されます。\n\nより詳しい使い方については、それぞれの機能の実装をご覧ください。');
}

// Check for existing token in cookie when page loads
window.onload = () => {
    const storedToken = Cookies.get('liff_token');
    if (storedToken) {
        document.getElementById('token').value = storedToken;
    }
    // No direct LIFF init here. It will be called after password is entered.
};
