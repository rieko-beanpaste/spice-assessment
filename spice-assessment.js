'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
};

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        // 名前が空の時は処理を終了する
        return;
    }

    // 診断結果表示エリアの作成
    resultDivided.innerText = '';

    // headerDivided の作成
    const headerDivided = document.createElement('div');
    headerDivided.setAttribute('class', 'card-header');
    headerDivided.innerText = '診断結果';

    // bodyDivided の作成
    const bodyDivided = document.createElement('div');
    bodyDivided.setAttribute('class', 'card-body');

    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'card-text');
    const result = assessment(userName);
    paragraph.innerText = result;
    bodyDivided.appendChild(paragraph);

    // resultDivided にBootsrap のスタイルを適用する
    resultDivided.setAttribute('class', 'card');
    resultDivided.setAttribute('style', 'max-width: 700px;')

    // headerDivided と bodyDivided を resultDivided に差し込む
    resultDivided.appendChild(headerDivided);
    resultDivided.appendChild(bodyDivided);

    //　ツイートエリアの作成
    tweetDivided.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue =
        'https://twitter.com/intent/tweet?button_hashtag=' +
        encodeURIComponent('スパイス診断の結果') +
        '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #スパイス診断';
    tweetDivided.appendChild(anchor);

    // widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

const answers = [
    '{userName}はシナモンです。甘さだけではなく、スパイシーさもあるのが{userName}の特徴です。シナモンが体の冷えを取り除き血の巡りを良くするように、周囲の人へ刺激と癒しをもたらし、交流を活発にする人です。',
    '{userName}はクミンです。インド料理には欠かせないクミンのように、{userName}は周囲の人にとって欠かせない存在です。種のまま使ったり、パウダーとして使ったり、あらゆる料理（シーン）で大活躍します。',
    '{userName}はガーリックです。{userName}の存在が、チームの味に深みを与えてくれます。疲労回復効果もばつぐん。{userName}と一緒に過ごすことで、周りの人はエネルギッシュさを取り戻すでしょう。',
    '{userName}はローリエです。ほのかでさわやかな香りと苦味がある{userName}の存在は、チームに調和をもたらします。例えば少しクセのある人とでも、{userName}は難なく一緒に協調できるでしょう。ただし、無理をしすぎると苦味が出てしまうので、ほどほどが肝心です。',
    '{userName}はカルダモンです。強い清涼感があり、スパイスの王様とも言われるカルダモンのように、{userName}の存在は周囲に大きな影響を与えます。どんな料理（シーン）でも活躍しますが、少しやりすぎると周囲が{userName}の影響を受けすぎてしまうので、影響力を意識して行動すると良いでしょう。',
    '{userName}はコリアンダーです。マイルドでさわやかな香りと甘みがあり、{userName}と一緒にいることで周囲は心地よさを感じるでしょう。元はパクチーのたねであり、調和をもたらしつつも{userName}自身はパンクな気持ちも持っています。',
    '{userName}はチリです。{userName}のもつ辛み成分が周囲を勢いづけ、また空気が冷え切っている時は温めてくれます。猛烈なファンがいることも特徴です。',
    '{userName}はジンジャーです。{userName}がいることで、周囲はぽかぽかした温かい雰囲気になります。また、{userName}は少しクセのある人と一緒にいると、そのクセをやわらげます。',
    '{userName}はブラックペッパーです。さわやかな香りと強い辛み、独特の強い風味。{userName}がいることで、周囲はピリリと引き締まり、味の輪郭がはっきりしてより美味になります。様々な料理（シーン）で活躍するオールラウンダーです。',
    '{userName}はターメリックです。{userName}がチームに入ることでチームカラーが決まり、風味も強くなります。健康に優しい成分を含んでおり、お酒を飲み過ぎた人の世話をすることも多いでしょう。',
    '{userName}はサフランです。非常に高価なスパイスで、少量でも、{userName}が周囲に与える影響力は絶大です。それでも、近寄りがたい印象をあまり与えず、気軽さを持っているのが{userName}の良さです。',
    '{userName}はパプリカです。パプリカ♪ 花が咲いたら♪ でお馴染みのスパイスです。熱に強く、多少しんどい状況でも耐えて力を発揮します。{userName}の存在はチームの彩りとなり、あざやかな色合いが周囲に元気を与えます。',
    '{userName}はオレガノです。ややほろ苦さを感じるすっきりとした強い香り。{userName}がチームにJoinすることで、さわやかさが加わり、他のメンバーの持ち味をさらに強めます。少しクセのある人とでも同様で、その人の良いところを引き立てます。',
    '{userName}はクローブです。バニラのような香りと渋みを帯びたスパイシーな香り。エキゾチックで少しミステリアスな{userName}は、周囲からは憧れの存在です。冷えを改善したり、痛みを和らげる効果もあり、困った時に頼れる存在でもあります。'
];

/**
 *  名前の文字列を渡すと診断結果を返す関数
 *  @param {string} userName ユーザの名前
 *  @return {string} 診断結果
 */
function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replaceAll('{userName}', userName);
    return result;
}

// テストコード
console.assert(
    assessment('太郎') ===
    '太郎はシナモンです。甘さだけではなく、スパイシーさもあるのが太郎の特徴です。シナモンが体の冷えを取り除き血の巡りを良くするように、周囲の人へ刺激と癒しをもたらし、交流を活発にする人です。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
