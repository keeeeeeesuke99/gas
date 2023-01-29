gasをgitでバージョン管理する

# gasをgitでバージョン管理する
- gas上のコードをclaspコマンドによってローカルに取り込む
  - `clasp pull`など
- ローカル環境にgitリポジトリを用意し、gitによってバージョン管理する。

# claspを使用する
- Node.jsをinstallする。https://nodejs.org/ja/download/
  - install後`node --version`、`npm --version`を実行し、バージョンが表示されればinstall済み
- calspをインストールする。`npm i @google/clasp -g`
- [Google Apps Script API](https://script.google.com/home/usersettings)を有効にする。
![image](https://user-images.githubusercontent.com/89967548/212508549-6140c296-acd0-40ee-bc18-a2162f5935dd.png)
- claspにloginする
  - ブラウザが起動し、権限を確認・許可する
- gasコードをバージョン管理するローカルリポジトリに移動する
- `clasp clone <スクリプトID>`を実行する
  - スクリプトIDはgas -> プロジェクトの設定 に記載されている
  - clone後は必要に応じて.gitignoreを作成

下記、実行log
```
PS C:\Users\keisuke> node --version
v18.13.0
PS C:\Users\keisuke> npm --version 
8.19.3
PS C:\Users\keisuke> npm i @google/clasp -g

added 264 packages, and audited 265 packages in 33s

80 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
PS C:\Users\keisuke> clasp login
Logging in globally…
🔑 Authorize clasp by visiting this url:
https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fscript.deployments%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fscript.projects%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fscript.webapp.deploy%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.file%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fservice.management%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Flogging.read%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloud-platform&response_type=code&client_id=1072944905499-vm2v2i5dvn0a0d2o4ca36i1vge8cvbn0.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A57194

Authorization successful.

Default credentials saved to: C:\Users\keisuke\.clasprc.json.
PS C:\Users\keisuke> cd .\private\  
PS C:\Users\keisuke\private> mkdir gas


    ディレクトリ: C:\Users\keisuke\private


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        2023/01/15      8:58                gas


PS C:\Users\keisuke\private> cd gas
PS C:\Users\keisuke\private\gas> clasp clone 14nJdtnTitJhd2XYsLIyGc9n4_krmqbcXYxI34NgHC8c6o3zQs0t2b0I0
Warning: files in subfolder are not accounted for unless you set a 'C:\Users\keisuke\private\gas\.claspignore' file.
Cloned 6 files.
└─ C:\Users\keisuke\private\gas/const.js
└─ C:\Users\keisuke\private\gas/postGmailToLine.js
└─ C:\Users\keisuke\private\gas/base.js
└─ C:\Users\keisuke\private\gas/appsscript.json
└─ C:\Users\keisuke\private\gas/postScheduleToChat.js
└─ C:\Users\keisuke\private\gas/postScheduleToLine.js
Not ignored files:
└─ C:/Users/keisuke/private/gas/appsscript.json
└─ C:/Users/keisuke/private/gas/base.js
└─ C:/Users/keisuke/private/gas/const.js
└─ C:/Users/keisuke/private/gas/postGmailToLine.js
└─ C:/Users/keisuke/private/gas/postScheduleToChat.js
└─ C:/Users/keisuke/private/gas/postScheduleToLine.js

Ignored files:
└─ C:/Users/keisuke/private/gas/.clasp.json
└─ C:/Users/keisuke/private/gas/.gitignore
PS C:\Users\keisuke\private\gas> git init
Initialized empty Git repository in C:/Users/keisuke/private/gas/.git/
```

# ローカル環境でgasを実行する
claspでログインする。<br>
loginコマンド実行後にブラウザが起動し、認証するユーザ・OAuthスコープを選択することでログインが完了する。
```
PS C:\Users\keisuke\private\gas> clasp login --creds .\creds.json
Warning: You seem to already be logged in *locally*. You have a ./.clasprc.json
Logging in locally…

Authorizing with the following scopes:
https://www.googleapis.com/auth/calendar
https://www.googleapis.com/auth/calendar.readonly
https://www.google.com/calendar/feeds
https://www.googleapis.com/auth/spreadsheets
https://www.googleapis.com/auth/gmail.readonly
https://www.googleapis.com/auth/gmail.modify
https://mail.google.com/
https://www.googleapis.com/auth/script.external_request
https://www.googleapis.com/auth/script.webapp.deploy

NOTE: The full list of scopes your project may need can be found at script.google.com under:
File > Project Properties > Scopes

Using credentials located here:
https://console.developers.google.com/apis/credentials?project=windy-lyceum-347315

🔑 Authorize clasp by visiting this url:
https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly%20https%3A%2F%2Fwww.google.com%2Fcalendar%2Ffeeds%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fspreadsheets%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.modify%20https%3A%2F%2Fmail.google.com%2F%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fscript.external_request%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fscript.webapp.deploy&response_type=code&client_id=1083661317526-rvlk1ltjlecadtr8pvtu3cq4ftauo72f.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A58170

Authorization successful.

Local credentials saved to: C:\Users\keisuke\private\gas\.clasprc.json.
*Be sure to never commit this file!* It's basically a password.
No access, refresh token, API key or refresh handler callback is set.
```
ログイン完了後、指定の関数をコマンドから実行可能
```
PS C:\Users\keisuke\private\gas> clasp run <関数名>
Running in dev mode.
No response.
```
※関数実行時に認証されていないAPIが必要の場合、エラーメッセージに記載されている要求されている権限を`appscript.json`の`oauthScopes`のリストに追加する。<br>
下記例では、<関数名>を実行するために`https://www.googleapis.com/auth/spreadsheets`の権限が必要だったため、`appscript.json`の`oauthScopes`のリストに`https://www.googleapis.com/auth/spreadsheets`を追加することで解決できた。

```
PS C:\Users\keisuke\private\gas> clasp run <関数名>       
Running in dev mode.
Exception: Exception: You do not have permission to call SpreadsheetApp.openById. Required permissions: https://www.googleapis.com/auth/spreadsheets [
  { function: 'getSearchQuery', lineNumber: 66 },
  { function: 'searchGmail', lineNumber: 40 },
  { function: 'postGmailToLine', lineNumber: 20 }
]
ScriptError
```


# 参考
- [claspでGASのソースをGit管理](https://qiita.com/zaki-lknr/items/b4954c222c1c1db92caf)
- [GAS のGoogle製CLIツール clasp](https://qiita.com/HeRo/items/4e65dcc82783b2766c03)
- [GAS用のCLIツール clasp を使ってGASをローカルで開発して実行するの巻。](https://qiita.com/jiroshin/items/dcc398285c652554e66a)
