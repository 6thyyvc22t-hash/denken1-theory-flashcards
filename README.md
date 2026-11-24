# 電験一種 理論｜図付きデジタル単語帳

更新日：2026-11-25

- **公開先**: https://6thyyvc22t-hash.github.io/denken1-theory-flashcards/
- **GitHub**: https://github.com/6thyyvc22t-hash/denken1-theory-flashcards
- **共通問題の正本**: `questions.json` （現時点で1問 `den1-001`「不平衡三相回路のY-Δ変換」）
- **専用Firebaseプロジェクト**: `denken1-theory-sync`
- **原本**: https://github.com/6thyyvc22t-hash/ap-flashcards
- **引継ぎ仕様**: https://github.com/6thyyvc22t-hash/my-knowledge-base/blob/main/ai-prompts/reusable-flashcard-app-handoff.md

応用情報のデータ・問題ID・Firebase・キャッシュ・成績・メモは取り込んでいません。元の応用情報リポジトリも変更していません。

## 主な機能

1. **図付きの表裏カード**：問題の表面に回路図、裏面に正答・解説・試験対策ポイント・出典。必要に応じてKaTeX数式を描画し、読込できない場合は文字式を表示。
2. **4つの出題モード**：順番、ランダム、間違えた問題のみ、未学習のみ。分野を絞って出題可能。
3. **途中から開始**：順番・未学習・復習モードでは「開始する問題を選ぶ」→「ここから開始」で任意の問題へ移動。移動するだけでは正誤履歴を変更しません。
4. **正誤・復習**：回答確認後に正解/不正解を選択。間違えた問題は復習対象、次の正解で解除。スキップは採点なし。
5. **学習状況**：問題数、学習済み、正解/不正解回数、正答率、復習対象、メモあり件数。
6. **問題別メモ**：最大2000文字、オフライン送信待ち、別端末へのFirebase同期、JSON書出し/復元。
7. **問題管理**：追加、編集、保管、復元、完全削除、本文検索、JSON書出し/取込み。
8. **個人用問題変更の同期**：GitHub共通版の上にFirebaseの `users/{uid}/deckChanges/{cardId}` を重ねる。端末間で個人の追加/編集/保管/完全削除を反映。GitHub共通問題は変更されません。
9. **成績の同期**：`users/{uid}/cards/{cardId}` に記録し、`operations` で二重送信を防止。
10. **バックアップとオフライン**：問題・成績・メモのJSON出力。HTML/JS/CSS/問題・図の基本データはService Workerでキャッシュ。

## 大切な安全ルール

- 共通問題は **`questions.json` を正本**とし、個人用に保管/削除された問題は共通GitHubファイルを編集しません。
- 個人用の問題変更はFirebaseに保存（ログアウト時の操作は端末の下書き）。`deck-sync.js` はID単位で差分を統合します。既存の出題順や問題文の位置ではなく、**不変のカードID**で成績・メモを管理します。
- 新規の個人用問題IDはUUID方式（`u...`）、共通問題は `den1-001` 形式。公開版と個人追加のID衝突を防ぎます。意味が変わる問題は新しいIDにします。
- 完全削除した共通ID（`retiredIds`）を古い個人用差分から復活させません。
- ログイン中、問題JSONの一括読込は制限。以前の端末下書きは、差分を確認して移行する方法を使用してください。
- **個人用差分を含む問題JSONを、そのままGitHubの共通questions.jsonに上書きしないでください。** 個人の削除設定が共通問題に広がる危険があります。
- 成績やメモの一括復元/リセット前にバックアップを保存してください。オフライン端末の未送信変更は、端末データ消去で失われる場合があります。
- メモ・成績・個人用変更は本人UIDのFirestoreだけで共有。サービスアカウントの秘密鍵、パスワード、個人メモはGitHubにコミットしません。

## **重要：新しいFirestoreルールの公開が必要（2026-11-25更新）**

アプリに `deckChanges` を追加したため、**以前Firebase Consoleで公開したルールでは、問題編集の端末間同期が拒否されます**。次の操作を必ず実施してください。

1. Firebase Console → `denken1-theory-sync` → Firestore Database → **ルール（Rules）**。
2. GitHubのこのリポジトリの **`firestore.rules`** を全文コピー。
3. Firebaseのルールエディタの内容を全文置換して **公開（Publish）**。
4. アプリをSafariで再表示し、メールアドレス/パスワードでログイン。「問題データをクラウドと同期済み」が表示されるか確認。
5. iPhoneで「問題の追加」を1件テストしてiPadにも反映されるか確認。テスト問題は保管しても復元可能で、完全削除時はIDを再利用しません。

**GitHubのrulesファイルを更新するだけでは、Firebase側のルールは自動更新されません。**

FirebaseのWebアプリ設定は専用 `firebase-config.json` に登録済み。AuthenticationとFirestoreの設定はユーザー側で作成済みですが、**実Firebase通信・iPhone/iPadでの同期の実機検証は未完了**です。

## 運用と公開

GitHub Pages: Settings → Pages → Deploy from branch → main / (root)。

初期問題：`questions.json`、回路図：`images/den1-001-y-delta.svg`。公開版の追加・修正はGitHubの正本を直接更新する方式です。個人用編集結果を共通版に上書きしないでください。

iPhone / iPad のSafariで公開URLを開き、「ホーム画面に追加」が可能です。ChatGPT内のHTMLプレビューではJavaScriptが無効になる場合があるので、Safariの公開URLを使います。

## 2026-11-25　実装・テスト

- `app.js`: 任意の開始位置、個人用問題差分管理、既存ID・メモ・採点キーの保持、回路図・LaTeX対応。
- `index.html`: 問題ジャンプと個人同期表示・画像表示を追加。読み込みURLを更新して古いJS/CSSキャッシュを回避。
- `styles.css`: iPhone向け表示と問題ジャンプのスタイル。
- `deck-sync.js`: Firestore `deckChanges` の差分同期。画像・LaTeXの情報を保持。公開版で退役済みのIDを復活させない。
- `firestore.rules`: 専用の7分野、画像、LaTeX、個人用問題差分のアクセス制御。
- `sw.js`: 新しいJS/CSSと `deck-sync.js` のキャッシュ。

**テスト済み（模擬DOM・同期差分の18ケース）**：構文、問題ID保持、カード表示、表裏切替、正誤判定、復習フラグ、端末記録のキー分離、任意位置ジャンプ、メモ保持、個人用追加/保管、GitHub公開問題追加時の非復活、退役IDの保護、画像/数式の維持、HTML要素対応。**実機Safariと実Firestoreによる通信は未検証**。

## 主なファイル

`index.html`, `styles.css`, `app.js`, `questions.json`, `images/den1-001-y-delta.svg`, `cloud-sync.js`, `memo-sync.js`, `deck-sync.js`, `firebase-config.json`, `firestore.rules`, `sw.js`, `README.md`。
