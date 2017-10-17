# 変更箇所の説明
ユーザが変更しなければいけない３つの仕組み．
- アプリ設定 (Bundle IDなど)
- アプリの見た目
- アプリのアイコンの設定



## アプリ設定編
[Config.xml](https://github.com/TetsuyaNegishi/ngs-ichikawa/blob/master/config.xml)を変更します
```
1 <?xml version='1.0' encoding='utf-8'?>
2 <widget id="ngs.tsukuba.hukurepo" version="1.0.0">
3     <name>HukuRepo</name>
4     <description>
5         HukuRepo is an application for posting problems in Tsukuba for foreign visitors.
6     </description>
7     <author email="tsukuba.ngs@gmail.com">
8         Team NGS
9     </author>
```
>2行目 Bundle ID
"ngs.tsukuba.hukurepo" -> "◯.◯.◯"

>3行目 アプリ名
HukuRepo -> "◯◯"

>5行目 アプリの説明

>7行目 メールアドレス

>8行目　団体名


## アプリ見た目編
[style.css](https://github.com/TetsuyaNegishi/ngs-ichikawa/blob/master/src/style.css)を変更します
[config.scss]()の各項目を変更します
```
1 $main-color: #01a8ec;
```
>1行目 アプリ全体のメインカラーを指定

**あとで追加**
____

## アイコン編
[App Icon Resizer](https://resizeappicon.com/)
好きな画像でアプリのアイコンを生成しましょう
