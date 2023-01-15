/**
 * テキストをLineで送信する
 * 送信先はconst.jsで定義
 * @param text Lineに送信するテキスト
 */
function postLine(text) {
//メッセージを送信(push)する時に必要なurlでこれは、皆同じなので、修正する必要ありません。
//この関数は全て基本コピペで大丈夫です。
  var url = "https://api.line.me/v2/bot/message/push";
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  };

  var postData = {
    "to" : USERID,
    "messages" : [
      {
        'type':'text',
        'text':text,
      }
    ]
  };

  var options = {
    "method" : "post",
    "headers" : headers,
    "payload" : JSON.stringify(postData)
  };

  return UrlFetchApp.fetch(url, options);
}


/**
 * 指定のbotでChatを投稿する。
 * 
 * @param text 投稿するchatの内容
 */
function postChat(text) {

  // textをJSON文字列に変換し、ペイロード（POSTリクエストのボディ）を作成
  const payload = JSON.stringify({
    "text" : text
  });
  
  // リクエストのオプションを指定
  // ・method：HTTPメソッド
  // ・contentType：送信データのデータ形式・文字コード
  // ・payload：POSTリクエストのボディ
  const options = {
    "method" : "POST",
    "contentType" : "application/json; charset=utf-8",
    "payload" : payload
  }
  
  // リクエストを発行
  UrlFetchApp.fetch(CHAT_URL, options);
}



/**
 * 指定の時間で指定の関数を実行するトリガーを作成する。
 * 
 * @param time 関数を実行する時間
 * @param functionName 実行する関数の名前
 */
function setTrigger(time, functionName){

  ScriptApp.newTrigger(functionName).timeBased().at(time).create();
}

/**
 * 指定の関数のトリガーを全て削除する。
 * 
 * @param functionName 削除する関数の名前
 */
function deleteTrigger(functionName) {

  const triggers = ScriptApp.getProjectTriggers();

  for (let trigger of triggers) {
    if (trigger.getHandlerFunction() == functionName) {
      ScriptApp.deleteTrigger(trigger);
    }
  }
}

/**
 * 指定の時刻に指定された関数を実行するトリガーを作成する。
 * 
 * @functionName 作成するtriggerの関数名
 * @Trigger 毎日7～8時の間
 */
function resetPCTrigger(functionName) {

  // すべてのmainトリガーを削除
  //（実行済みのトリガーは残り続けるため、整理のため毎回削除しておきます）
  deleteTrigger(functionName);

  // mainトリガーの発動時刻を指定
  const triggerTime = new Date();
  triggerTime.setHours(21,55,0);

  // mainトリガーを作成
  setTrigger(triggerTime, functionName);
}

