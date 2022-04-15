# Next.js Template

- ルート配下に直でプロジェクトを置く
- Node.js、各種モジュールのバージョンなどは、日々アップデートされていくものなので適宜選定する。

## branches

|name|description|
|---|---|
|master|一番汎用的な最小構成|
|example/three|Three.js使用時の最小構成, glsl-loaderなど追加|
|example/redux|Redux使用時, Redux関連の技術選定は別途行う前提のため、モジュールインストールはしていない|

## src

- 開発者が頻繁に触るようなファイル群は、src以下に配置する（直下に配置すると、アルファベット順で並んでいる時に、間にnode_modulesなどの開発者が触らないファイルが挟まって見にくい）。

|path|description|
|---|---|
|src/cms|CMS関連モジュール|
|src/components|.tsxコンポーネントはこの中でcommonやページごとにディレクトリ分けする|
|src/constants|定数をまとめる|
|src/pages|各ページのエントリーポイント。データの受け渡しのみ|
|src/styles|スタイルシート|
|src/types|型定義関連ファイル(d.tsとinterface, type系)|
|src/utils|便利関数など|
|src/lib|ライブラリとしてcomponentに依存していないモジュール|


## tsconfig.json

|name|value|description|
|--|--|--|
|baseUrl|.|モジュールパスの起点|


## .vscode/settings.json

|name|value|description|
|--|--|--|
|editor.formatOnSave|true|保存時にフォーマットする|
|typescript.format.semicolons|true|tsはセミコロンありで統一|


## svg

- SVGはインラインでインポートする
- 絶対パスで読み込み可能
- コンパイル時に埋め込まれるので、svgはpublicフォルダ以外に置いても良いかも

```tsx
import Icon from 'public/icon.svg'

<Icon className={styles.icon} />
```


## CSS

- CSS Moduleを使用