# **リバーシゲーム**

## **概要**
このプロジェクトは、**HTML・CSS・JavaScript**で作成したリバーシ（オセロ）ゲームです。  
ブラウザ上で動作し、ユーザー同士が交互に石を置いて対戦することができます。

---

## **ゲームルール**
- 盤面は **8×8** のマス目で構成されています。  
- 初期配置は盤面中央の4マスに黒石2つ、白石2つを斜めに配置（右上と左下が黒石、左上と右下が白石）。  
- **先手は黒石**、白石と交互に打ちます。  
- 石を置くときは、必ず相手の石を**1つ以上挟む必要があります**。  
- 挟んだ相手の石は自動的に自分の石にひっくり返ります。  
- 挟める場所がない場合は**パス**となります。  
- 盤面が全て埋まるか、両者ともに挟める場所がなくなった時点で**ゲーム終了**です。  
- 石の数が多い方が**勝者**となります。

---

## **技術スタック**
- **HTML5**  
- **CSS3**（レスポンシブ対応、柔らかい配色）  
- **JavaScript**（ゲームロジック、操作管理）

---

## **使い方**
1. リポジトリをクローンまたはダウンロードしてください。  
2. `index.html` をブラウザで開くとゲームが始まります。  
3. 盤面の空いているマスをクリックして石を置いてください。  
4. 挟める石がなければ**パスボタン**が有効になります。  
5. ゲーム終了時に**勝者が表示**されます。

---

## **今後の改善点**
- AI対戦モードの実装  
- 対戦結果の保存機能  
- モバイル対応のUI改善  
- プレイヤー名入力やリプレイ機能の追加


