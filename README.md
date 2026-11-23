# 電験一種 理論｜図付きデジタル単語帳

更新：2026-11-23。初期登録 **1問のみ**：`den1-001`「不平衡三相回路のY-Δ変換」。

既存の応用情報 [ap-flashcards](https://github.com/6thyyvc22t-hash/ap-flashcards) を参考にした**独立アプリ**です。問題データ、成績、メモ、端末保存キー、Firebaseアプリ名を分離しています。元のリポジトリは変更していません。

## GitHub Pagesの公開設定

リポジトリの **Settings → Pages → Build and deployment** から、**Source: Deploy from a branch / Branch: main / (root) → Save** を選択。

公開予定URL： https://6thyyvc22t-hash.github.io/denken1-theory-flashcards/

Safari（iPad / iPhone）で開いて、必要なら共有メニューから「ホーム画面に追加」してください。HTMLをChatGPT内で直接プレビューするとJavaScriptが無効で、問題が表示されない場合があります。

## 機能

- 図付きのカードをタップして表面/裏面を切り替え
- 正解・不正解・スキップ、復習対象の自動管理
- 順番/ランダム/不正解のみ/未学習のみ、分野別表示
- 学習統計、メモの自動保存とJSONバックアップ
- 問題の追加・編集・削除・復元（初期IDは不変）
- 数式はLaTeX記法とKaTeXに対応（読み込めない場合は文字式を表示）
- GitHub Pages上で初回読み込み後は基本データをオフラインキャッシュ
- Firebaseを設定すれば学習記録・メモのクラウド同期にも対応

初期問題は `questions.json`、画像は `images/den1-001-y-delta.svg` に格納しています。カード画面で問題を追加/編集した場合、まず端末内の下書きになります。公開版を更新するには「問題データを書き出す」→ `questions.json` をGitHubで置換してください。

## Firebaseの設定（まだ**未接続**）

`firebase-config.json` は**空欄**です。応用情報の Firebase（`ap-study-sync`）は流用しないでください。

1. https://console.firebase.google.com/ で**電験一種専用の新規プロジェクト**を作成。
2. 新しいWebアプリを登録し、Firebase Web設定を取得。
3. Authenticationで Email/Password を有効化。Authorized domains に `6thyyvc22t-hash.github.io` を必要に応じて追加。
4. Firestore Databaseを作成。**`firestore.rules` の内容をFirebaseコンソールでPublish**。GitHubに置くだけでは反映されません。
5. 単語帳内「Firebase設定」でWeb設定を貼り付ければ端末単位で試せます。接続を共通化するときは、アプリの「設定ファイルを書き出す」で得た `firebase-config.json` をリポジトリへ反映。
6. iPhone・iPadで同じメールアドレスとパスワードを使ってログイン。同期状況と正誤・メモの反映を確認。

**注意**：Firebaseのサービスアカウントや秘密鍵は絶対にリポジトリにアップロードしないでください。GitHub PagesのサイトとFirebase側の公開は別設定です。新Firebaseプロジェクトが未設定の段階では端末内保存のみです。オフライン中の未同期操作はブラウザデータ消去で失われる可能性があるため、適宜JSONバックアップを保存してください。

## 出典

初期カードは参考書『第2章 電気回路』p.144 問題11（平成29年度 電験一種二次 問5）のY-Δ変換の論点を抜き出した派生問題です。原題全文をそのまま転載したカードではありません。

## ファイル

`index.html`, `styles.css`, `app.js`, `questions.json`, `images/den1-001-y-delta.svg`, `cloud-sync.js`, `memo-sync.js`, `firebase-config.json`, `firestore.rules`, `sw.js`.
