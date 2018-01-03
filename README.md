# 投稿アプリと回答アプリの構築方法

## 対応プラットフォーム

- Android4.4以上
- iOS10.0以上

## 用意するもの

### 事前にインストールが必要なライブラリ

- node (v6.5.0で動作確認済み)
- npm (v5.3.0で動作確認済み)
- cordova (v7.0.1で動作確認済み)
- Android SDK (API level 25で動作確認済み, Androidアプリをビルドする場合のみ必要)
- Xcode (iOSアプリをビルドする場合のみ必要, macOSでのみ利用可能)

node, npm, cordovaがインストールされているかどうかは以下のシェルコマンドから確認できます。

```
$ node -v
v6.5.0
$ npm -v
5.3.0
$ cordova -v
7.0.1
```

インストールしていないライブラリがある場合は以下を参考にしてインストールして下さい。

- [Node.js](https://nodejs.org/ja/)
- [Creating your first Cordova app - Apache Cordova](https://cordova.apache.org/docs/en/7.x/guide/cli/index.html)
- [Android Studio](https://developer.android.com/studio/index.html?hl=ja)
- [Xcode](https://itunes.apple.com/jp/app/xcode/id497799835?mt=12)

### 必要なAPIキー

- Google Map APIキー (地図表示に必要)
- Google Translate APIキー (回答アプリでの日→英翻訳に必要)
- google-service.json (Androidアプリをビルドする場合のみ必要)
    - パッケージ名が'ngs.[任意の英字文字列].hukurepo','ngs.[任意の英字文字列].hukurepo.reply'のものを１つずつ用意
- GoogleService-Info.plist (iOSアプリをビルドする場合のみ必要)
    - google-service.jsonと同等のものを用意

Google Map APIキーおよびGoogle Translate APIキーは以下のWebサイトを参照して用意してください。

- [キーの取得、認証(Google Map APIキー)[https://developers.google.com/maps/documentation/javascript/get-api-key?hl=ja]](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=ja)
- [クイックスタート(Google Translate APIキー)[https://cloud.google.com/translate/docs/getting-started?hl=ja]](https://cloud.google.com/translate/docs/getting-started?hl=ja)

google-service.jsonおよびGoogleService-Info.plistはFirebase Consoleからプロジェクトファイルを作成し、ダウンロードしてください。

### Web API

アプリを利用するにはWeb APIを事前に準備しておく必要があります。
以下に示すWeb APIの構築方法を参考にして準備してください。
[ふくレポWeb APIサーバの構築方法](https://github.com/tsukubangs/hukurepo-server
)

## 投稿アプリのビルド

### プロジェクトのダウンロード

プロジェクトをリポジトリからcloneしてください。

```
$ git clone https://github.com/tsukubangs/hukurepo-post-app
```

### パッケージのインストール

必要なnode.jsのパッケージをインストールする。

```
$ cd hukurepo-post-app
$ npm install
```

### 環境変数の設定


```
$ cp .env.example.js .env.js
```

.env.jsを事前に用意したAPIキーとWeb APIを使って以下のように変更してください。

```
export const GOOGLE_MAP_API = '[Google Map APIキー]';
export const WEB_API_URL = '[サーバ側URL]';
```

### Androidアプリのビルド

パッケージ名が'ngs.[任意の英字文字列].hukurepo.reply'のgoogle-service.jsonをプロジェクト直下にコピーしてください。

```
hukurepo-post-app
    |
    |- google-service.json
```

Android端末をPCと接続して以下のコマンドを実行すればアプリをビルド・インストールできます。
投稿アプリケーションが起動されたらインストール成功です。

```
$ cordova platform add android
$ npm run android
```

### iOSアプリのビルド

パッケージ名が'ngs.[任意の英字文字列].hukurepo.reply'のGoogleService-Info.plistをプロジェクト直下にコピーしてください。

```
hukurepo-post-app
    |
    |- GoogleService-Info.plist
```

以下のコマンドを実行してiOSのプロジェクトファイルを生成してください。

```
$ cordova platform add ios
$ npm run build:ios
```

Xcodeでプロジェクトファイルを開き、以下のコマンドを実行すればアプリをビルド・インストールできます。
投稿アプリケーションが起動されたらインストール成功です。

```
$ open platforms/ios/HukuRepo.xcodeproj
```

## 回答アプリのビルド

### プロジェクトのダウンロード

プロジェクトをリポジトリからcloneしてください。

```
$ git clone https://github.com/tsukubangs/hukurepo-response-app
```

### パッケージのインストール

必要なnode.jsのパッケージをインストールしてください。

```
$ cd hukurepo-response-app
$ npm install
```

### 環境変数の設定

```
$ cp .env.example.js .env.js
```

.env.jsを以下のように変更してください。

```
export const GOOGLE_MAP_API = '[Google Map APIキー]';
export const GOOGLE_TRANSLATE_API_KEY = '[Google Translate APIキー]'
export const WEB_API_URL = '[サーバ側URL]';
```

### Androidアプリのビルド

パッケージ名が'ngs.[任意の英字文字列].hukurepo.reply'のgoogle-service.jsonをプロジェクト直下にコピーしてください。

```
hukurepo-response-app
    |
    |- google-service.json
```

Android端末をPCと接続して以下のコマンドを実行すればアプリをビルド・インストールできます。
回答アプリケーションが起動されたらインストール成功です。

```
$ cordova platform add android
$ npm run android
```

### iOSアプリのビルド

パッケージ名が'ngs.tsukuba.hukurepo.reply'のGoogleService-Info.plistをプロジェクト直下にコピーしてください。

```
hukurepo-response-app
    |
    |- GoogleService-Info.plist
```

以下のコマンドを実行してiOSのプロジェクトファイルを生成してください。

```
$ cordova platform add ios
$ npm run build:ios
```

Xcodeでプロジェクトファイルを開き、iOS端末とPCを接続して以下のコマンドを実行すればアプリをビルド・インストールできます。
回答アプリケーションが起動されたらインストール成功です。

```
$ open platforms/ios/HukuRepo\ Reply.xcodeproj 
```

## アプリのリリース

Google PlayやApp Storeにアプリを公開したい場合は以下を参考にしてください。

- [Androidアプリのリリース](https://developer.android.com/studio/publish/index.html?hl=ja)
- [iOSアプリのリリース](https://help.apple.com/itunes-connect/developer/#/dev34e9bbb5a)

