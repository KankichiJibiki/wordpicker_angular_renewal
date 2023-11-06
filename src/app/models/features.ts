import { MainFeature } from "../interfaces/main-feature";

export class Features{
  features: MainFeature[] = [
    {
      title: "ワードセット作成",
      icon: "arrow_back",
      paragraph: "英語辞書にワードセットを登録して自分だけの'辞書'を作ろう！ 覚えられない単語を登録してWord pickerで出現させることができるよ。",
      route: "/index",
    },
    {
      title: "My Dictionary",
      icon: "arrow_back",
      paragraph: "自分自身の英語辞書を確認できるよ。自由に編集したりお気に入り登録してカスタマイズしてみよう！",
      route: "/dictionary",
    },
    {
      title: "クイズ",
      icon: "arrow_back",
      paragraph: "英語辞書にワードセットを登録して自分だけの'辞書'を作ろう！ 覚えられない単語を登録してWord pickerで出現させることができるよ。",
      route: "",
    },
    {
      title: "単語ピック",
      icon: "arrow_back",
      paragraph: "英語辞書にワードセットを登録して自分だけの'辞書'を作ろう！ 覚えられない単語を登録してWord pickerで出現させることができるよ。",
      route: "",
    },
    {
      title: "発音トレーニング",
      icon: "arrow_back",
      paragraph: "練習したい単語や文章を入力して、再生されるレコードを真似してみよう。声に出すことによって定着率があがるよ！",
      route: "/pronounce",
    },
    {
      title: "History",
      icon: "arrow_back",
      paragraph: "英語辞書にワードセットを登録して自分だけの'辞書'を作ろう！ 覚えられない単語を登録してWord pickerで出現させることができるよ。",
      route: "",
    },
  ];
}