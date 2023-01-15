/**
 * googleカレンダーをチェックし、当日の予定をpostChat()を実行する。
 * postChatはbase.jsで定義
 */
function postScheduleToChat(){
  const postDate = new Date();
  const schedules = CALENDER.getEventsForDay(new Date());
  var body = "本日の予定：" + Utilities.formatDate(postDate, 'JST', 'yyyy/MM/dd') + "\n";

  for(let event of schedules){
    var title = event.getTitle(); //イベントのタイトル
    var start = Utilities.formatDate(event.getStartTime(), 'JST', 'HH:mm'); //イベントの開始時刻
    var end = Utilities.formatDate(event.getEndTime(), 'JST', 'HH:mm'); //イベントの終了時刻
    body = body + start + ' - ' + end + "  " + title + '\n'; //チャットワークに送る文字列にイベント内容を追加
  }
  postChat(body);
}
