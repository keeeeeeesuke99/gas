/**
 * 目的：gmailで埋もれてはいけないメールを受信した場合、LINEに通知することで確認し忘れを防止する
 * 
 * 下記処理を12時間ごとに実行する
 * ①指定のスプレッドシートに記載されているメールの受信有無をチェックする
 * ②受信されている場合、lineに通知する
 * 
 */

// スプレッドシート
var SHEET_ID__SEARCHQUERY = "11kk93rkw3APDK-vHRZ5DGZN6vKKngyuyzaVnlK9y-SQ"
var SHEET_NAME__SEARCHQUERY = "seqchQuery"
var SEARCHQUERY__ROW = 2 //スプレッドシート内に記載されたgmailのsearchQueryの行数
var SEARCHQUERY__COL = 6 //スプレッドシート内に記載されたgmailのsearchQueryの列数

/**
 * 要通知のメールをgmailから検索し、検索結果をLineに通知する
 */
function postGmailToLine(){
  gmailList = searchGmail()

  if(gmailList.length != 0){
    var lineBody = "下記のメールが届きました。確実に内容を確認してください。\n"
    gmailList.forEach(gmail => {
      lineBody += "【" + gmail.subject + "】\n"
      + "受信日時:" + gmail.date + "\n"
      + "送信元:" + gmail.from + "\n";
      lineBody += "\n"
    })

    postLine(lineBody);
  }
}

/**
 * 前日から当日にかけて受信したgmailのうち、特定の条件を満たすものを検索し結果をリストで返却する
 */
function searchGmail(){
  var searchQuery = getSearchQuery();
  // var searchQuery = 'newer_than:2d from:budgets@costalerts.amazonaws.com'; //検索条件
  var threads = GmailApp.search(searchQuery);
  var mymsgs=[];
  var msgs = GmailApp.getMessagesForThreads(threads);

  for(var i = 0; i < msgs.length; i++) { 
    mymsgs[i]={}; //連想配列を宣言
    for(var j = 0; j < msgs[i].length; j++) {
      mymsgs[i].date = Utilities.formatDate(msgs[i][j].getDate(), 'JST', 'yyyy/MM/dd hh:mm:ss');
      mymsgs[i].from = msgs[i][j].getFrom();
      mymsgs[i].subject = msgs[i][j].getSubject().trim();
      mymsgs[i].body = msgs[i][j].getPlainBody().replace(/\s+/g, "");
    }
  }
  mymsgs.forEach(msg => {
    console.log('date : ' + msg.date)
    console.log('from : ' + msg.from)
    console.log('subject : ' + msg.subject)
    console.log('body : ' + msg.body)
    console.log('----------------------')
  })
  return mymsgs
}

function getSearchQuery(){
  var sheet = SpreadsheetApp.openById(SHEET_ID__SEARCHQUERY).getSheetByName(SHEET_NAME__SEARCHQUERY);
  return sheet.getRange(SEARCHQUERY__ROW, SEARCHQUERY__COL).getValue()
}
