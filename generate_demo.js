const fs = require('fs');
const path = require('path');

const members = [
  {
    id: 'sato_kenichi', name: '佐藤 健一', office: '東京本社', role: '営業部長',
    called_short: '佐藤部長・サトケンさん',
    called_full: '佐藤部長、または「サトケンさん」と呼んでもらえると親近感がわいて嬉しいです。',
    type: 'ドライバー（主導型）',
    type_desc: '仕事では成果を出すスピードを重視しますが、決して一方的にならず、全員が納得して動けるよう配慮することを心掛けています。',
    strengths: ['判断力：不測の事態でも、現場の混乱を防ぐために迅速かつ的確な道筋を示すよう意識しています。', 'バイタリティ：全国の営業所を回る体力と、どんな困難なプロジェクトでも完遂させるエネルギーには自信があります。', '責任感：部下の失敗は自分の責任と考え、最後まで逃げずにバックアップすることに誇りを持っています。'],
    hobby: '毎朝5時からのジョギング。皇居周辺を走りながら、その日の戦略を練るのが日課です。',
    food: '立ち食いそば（特に春菊天のせ）と、仕事終わりのキリッと冷えた辛口の日本酒。',
    motivation: '①誰もが不可能だと思った大型契約を勝ち取ったとき ②部下が自分の壁を乗り越えて成長した姿を見たとき ③新しい市場を切り拓いている実感があるとき',
    stress: 'サウナで「ととのう」こと。汗と一緒にすべての悩みも流し、水風呂で頭をリセットしています。',
    value: '「スピードは誠意」。返信の速さや対応の早さこそが、お客様や仲間への一番の敬意だと信じています。',
    support: 'ついつい予定を詰め込みすぎてしまうので、スケジュールに「移動時間」や「休憩」を無理やり差し込んでもらえると非常に助かります。',
    entrust: '他部署とのハードな利害調整や、トラブル発生時の最終責任の引き受け。最後は私が必ず何とかします。',
  },
  {
    id: 'ito_yui', name: '伊藤 結衣', office: '横浜営業所', role: '事務リーダー',
    called_short: '結衣さん',
    called_full: '結衣さん。名字だと少し固いので、気軽に名前で呼んでもらえると嬉しいです。',
    type: 'エミアブル（協調型）',
    type_desc: '周囲の顔色を伺うのではなく、みんなが心地よく働ける空気を作ることを意識しています。',
    strengths: ['おもてなし：来客対応はもちろん、社内のメンバーが気持ちよく働けるような「見えない気配り」を大切にしています。', '几帳面：書類の一文字、数字の一桁まで正確に整えることで、営業さんが安心して外回りに専念できるようにしています。', '共感力：相手の表情や声のトーンから、言葉にできない不安や不満をいち早く察知して寄り添いたいと考えています。'],
    hobby: '推しのアイドルのライブ遠征。全国の美味しいものを食べ歩くのもセットで楽しんでいます。',
    food: '外側がカリッとしたカヌレと、少し甘めのほうじ茶ラテ。',
    motivation: '①「伊藤さんがいてくれて助かった」と言われたとき ②煩雑だった事務フローをスッキリ整理できたとき ③営業所のみんなが笑顔で談笑しているとき',
    stress: 'お気に入りの入浴剤を入れて長風呂。好きな音楽を流しながら無心になる時間が大切です。',
    value: '「心理的安全性の確保」。ミスを隠すのではなく、誰でも「間違えました」とすぐに相談できる優しい環境でありたいと思っています。',
    support: '急な予定変更やルールの変更には少し動揺してしまうので、変更の理由を添えて早めに伝えていただけると安心します。',
    entrust: '営業所の備品管理の徹底や、新入社員の皆さんのメンタルケア。小さな変化にもすぐに気づきます。',
  },
  {
    id: 'takahashi_hiroki', name: '高橋 宏樹', office: '札幌営業所', role: '所長',
    called_short: '高橋所長・ヒロさん',
    called_full: '高橋所長、あるいは「ヒロさん」。',
    type: 'アナリティカル（分析型）',
    type_desc: '正確さや根拠を大切にしており、事前に情報を整理してから慎重に判断を下すタイプです。',
    strengths: ['分析力：市場のデータや過去の傾向から、最も成功率の高い販売戦略を導き出すことに情熱を注いでいます。', '冷静沈着：吹雪の中でも現場に向かうときのように、どんなトラブルが起きてもパニックにならず、解決策を淡々と考えます。', '探究心：業界の知識はもちろん、競合他社の動向や最新のシステムまで、掘り下げて調べるのが好きです。'],
    hobby: '冬キャンプ。マイナス10度の中で焚き火を見つめながら、静かに過ごす時間が最高の贅沢です。',
    food: '濃厚な味のジンギスカンと、地元のマイクロブルワリーで作られたクラフトビール。',
    motivation: '①緻密に立てた販売戦略が的中したとき ②データ戦で競合他社に勝ち抜いたとき ③長年開拓できなかった取引先と信頼を結べたとき',
    stress: '誰もいない林道を車でドライブすること。エンジン音だけを聞きながら自然の中に身を置くとリフレッシュできます。',
    value: '「事実は一つ、解釈は無限」。起きた現象を感情的に捉えず、客観的なデータとして分析し、次の打ち手に活かすことを信条としています。',
    support: 'データの分析に没頭すると周りの声が聞こえなくなるので、急ぎの用件のときは遠慮なく肩を叩いて呼び止めてください。',
    entrust: '地域の市場動向のシミュレーションや、複雑な利益率の計算。営業所の指針となる「勝てる地図」を描きます。',
  },
  {
    id: 'nakamura_yuki', name: '中村 勇気', office: '名古屋営業所', role: '所長',
    called_short: '中村所長・勇気さん',
    called_full: '中村所長、または「勇気さん」。',
    type: 'エクスプレッシブ（表現型）',
    type_desc: 'とにかく現場を盛り上げ、賑やかに楽しく仕事をすることをモットーにしています。',
    strengths: ['チャレンジ精神：前例がないことにも、「まずはやってみよう！」とポジティブに飛び込む勇気を忘れないようにしています。', 'ポジティブ思考：失敗しても引きずらず、それを笑い話に変えて次に活かす。営業所に暗い顔は持ち込みません。', '発想力：既存のやり方に捉われず、お客様が驚くような新しい売り方や販路を思いつくのが得意です。'],
    hobby: '草野球。ベンチからの声出しの大きさだけはリーグNo.1だと自負しています。',
    food: 'ガツンとくる味噌煮込みうどんと、キンキンに冷えたジョッキのハイボール。',
    motivation: '①朝礼でみんなの目が輝いているのを見たとき ②全員で高い壁を乗り越えて「乾杯」するとき ③お客様から「中村さんに任せてよかった」と言われたとき',
    stress: 'バッティングセンターで思いっきり打ち込むこと。空振りしても笑い飛ばすのが私流です。',
    value: '「楽しくなければ仕事じゃない」。辛いときこそ、あえて面白いことを言って笑い合う。そんな営業所を目指しています。',
    support: '細かい事務作業や書類の整理が壊滅的に苦手です……。ダブルチェックでミスを防いでもらえると泣いて喜びます。',
    entrust: '新規顧客への泥臭い飛び込み営業や、営業所のイベント企画。皆をワクワクさせることならお任せください。',
  },
  {
    id: 'kobayashi_keiko', name: '小林 恵子', office: '金沢営業所', role: 'リーダー',
    called_short: '小林さん・お恵さん',
    called_full: '小林さん、または「お恵さん」。',
    type: 'エミアブル（協調型）',
    type_desc: '相手の話を遮らず、最後までじっくり聞くことを何よりも大切にしています。',
    strengths: ['傾聴力：社内の相談もお客様の不満も、まずは「聴く」ことに徹することで、相手が本当に求めている答えを探します。', '誠実さ：できないことは「できない」と正直に伝え、その代わりに何ができるかを一緒に考える。嘘のない仕事を心掛けています。', '感謝：日々の小さな助け合いにも必ず「ありがとう」を言葉にする。当たり前のことを当たり前にやり続けたいです。'],
    hobby: '週末の御朱印集め。静かな境内を歩きながら、心を整える時間を大切にしています。',
    food: '近江町市場で食べる新鮮な海鮮丼と、香りの高い濃いめの緑茶。',
    motivation: '①揉めていた取引先と納得感のある着地点を見つけたとき ②若手が自分を信頼して本音の悩みを打ち明けてくれたとき ③長年の誠実さが実り、紹介で新しい契約をいただけたとき',
    stress: '家中の掃除。雑巾がけをしながら無心になると、心の曇りも晴れていく気がします。',
    value: '「三方よし」。自社の利益だけでなく、お客様も喜び、地域社会も良くなる。そのバランスを常に追求したいです。',
    support: '空気を読みすぎて、自分の意見を後回しにすることがあります。「小林さんはどう思いますか？」と促していただけると、本音を話しやすいです。',
    entrust: '感情的になっているお客様への対応や、長期的な関係構築が必要な伝統ある取引先への訪問。じっくりと時間をかけて信頼を築きます。',
  },
  {
    id: 'kato_shota', name: '加藤 翔太', office: '大阪営業所', role: '係長',
    called_short: '加藤さん・翔ちゃん',
    called_full: '加藤さん。後輩からは「翔ちゃん」と呼ばれることも。',
    type: 'ドライバー（主導型）',
    type_desc: '無駄を省き、いかに効率よく最高の結果を出すかに情熱を燃やしています。',
    strengths: ['実行力：決めたことは即、行動。スピード感を持って現場を動かし、停滞している案件を前進させます。', '論理的思考：感情論ではなく、数字や事実に基づいたロジックで納得感のある指示を出すよう心掛けています。', '判断力：複数の選択肢がある中で、利益とリスクのバランスを見極め、迷わずにGOサインを出すのが私の役目です。'],
    hobby: '週4回のサウナ。外気浴中に、新しいビジネスプランを思いつくことが多いです。',
    food: '大阪名物のたこ焼き（塩派）と、朝一番の濃いブラックコーヒー。',
    motivation: '①誰よりも早く、かつ完璧にタスクを完了させたとき ②営業所の売り上げグラフが大きく跳ねたとき ③自分の提案した仕組みが全社に採用されたとき',
    stress: 'ジムでの筋トレ。重いバーベルを持ち上げている間は、仕事の雑音を一切忘れて自分と向き合えます。',
    value: '「仕組みで解決する」。誰かの根性に依存するのではなく、誰がやっても同じ成果が出る「勝ちパターン」を作ることが使命だと思っています。',
    support: '結論を急ぐあまり過程の説明を省く癖があります。「今の話、もう少し詳しく」と突っ込んでもらえると助かります。',
    entrust: '慢性的な残業の削減や、営業プロセスのデジタル化。無駄を根こそぎカットしてみせます。',
  },
  {
    id: 'abe_kento', name: '阿部 健斗', office: '仙台営業所', role: '所長',
    called_short: '阿部所長',
    called_full: '阿部所長。',
    type: 'エクスプレッシブ（表現型）',
    type_desc: '情熱を持って語りかけることで周囲を動かしたいと思っています。',
    strengths: ['自己開示：自分の失敗談も隠さず話すことで、部下が心を開きやすい雰囲気を作るようにしています。', '情熱：商品の魅力やビジョンを熱っぽく語り、周囲に「この人と仕事がしたい」と思わせる熱量を持っていたいです。', 'チームワーク：一人の力は小さくても、営業所全員が協力し合えば力が何倍にも発揮できると信じています。'],
    hobby: '釣り（青物狙い）。釣った魚を捌いて、営業所の仲間に振る舞うのが楽しみです。',
    food: '本場の厚切り牛タンと、香ばしい芋焼酎の水割り。',
    motivation: '①営業所全員が一つの目標に向かって団結しているのを感じたとき ②飲み会でみんなの意外な一面を知ったとき ③結束力でライバル会社に勝利したとき',
    stress: '仲の良い仲間と昭和歌謡を熱唱すること。声を出すと昨日の悩みなんてどうでもよくなります。',
    value: '「同じ釜の飯を食う」。効率も大事ですが、顔を合わせて話し、一緒に食事をする。そんなウェットな人間関係こそが最後には強いチームを作ると信じています。',
    support: '気持ちが先走って話が脱線しやすいので、「阿部所長、今の話の着地点は？」と優しく軌道修正をお願いします。',
    entrust: '沈滞して元気のないチームの再建や、重要な商談でのプレゼンテーション。人の心を動かします。',
  },
  {
    id: 'sasaki_mai', name: '佐々木 舞', office: '広島営業所', role: '事務',
    called_short: '舞さん・佐々木ちゃん',
    called_full: '舞さん、または「佐々木ちゃん」。',
    type: 'アナリティカル（分析型）',
    type_desc: '正確さや根拠を大切にしており、一歩引いて全体を観察してから動くタイプです。',
    strengths: ['几帳面：たとえ社内向けの書類であっても、0.1%のミスも見逃さない緻密さを持って取り組んでいます。', '継続力：地味なルーチンワークであっても、飽きることなく高い質を維持し続けるのが私の持ち味です。', '使命感：自分の事務仕事が止まれば営業さんも困る。「後工程に迷惑をかけない」という強い責任を持って仕事に臨んでいます。'],
    hobby: 'ミステリー小説の読破。伏線が回収される瞬間の快感がたまりません。',
    food: '広島風お好み焼き（イカ天入り）と、最近ハマっているカフェラテ。',
    motivation: '①複雑な書類を一発で通したとき ②作成した資料が「分かりやすい」と褒められたとき ③自分のサポートで営業さんがスムーズに動けているとき',
    stress: '文房具店で新しいペンを物色すること。綺麗な道具に囲まれるだけで幸せな気持ちになれます。',
    value: '「神は細部に宿る」。事務の正確さが会社の信頼の基盤を支えているという自負を常に持っています。',
    support: '突発的な依頼が重なると優先順位に迷ってしまうので、「これは今日の何時まで」と期限を指定していただけると非常に助かります。',
    entrust: '非常に手間のかかる経費精算や、業務マニュアルの整備。私が営業所の「整頓」を引き受けます。',
  },
  {
    id: 'kimura_takuya', name: '木村 拓也', office: '福岡営業所', role: '所長',
    called_short: '木村所長・キムさん',
    called_full: '木村所長、または「キムさん」。',
    type: 'エミアブル（協調型）',
    type_desc: '人との関係性や安心感を大切にしており、相手の話をよく聞くことを常に心掛けています。',
    strengths: ['忍耐力：どんな苦境や無理難題を突きつけられても、どっしりと構えて解決の糸口を探し続ける強さがあります。', '思いやり：部下や取引先が何を求めているのかを常に考え、相手の立場に立った行動を心掛けています。', '失敗を活かす力：部下のミスに対しても、「これは良い経験だ」とポジティブに捉え、一緒に解決策を考えます。'],
    hobby: 'ゴルフとDIY。自宅のウッドデッキを自分で作り直すことに夢中になっています。',
    food: '飲んだ後の〆の長浜ラーメンと、すっきりしたレモンサワー。',
    motivation: '①部下が初めて自分一人の力で成約を勝ち取ってきたとき ②家族から応援されたとき ③営業所が活気に溢れ、誰かの笑い声が聞こえてきたとき',
    stress: '休日、海沿いの道を好きな音楽をかけてドライブ。何も考えない時間がリフレッシュです。',
    value: '「恩送り」。若い頃に先輩から受けた恩を、今の部下たちにそれ以上の形で返していくことを人生の指針にしています。',
    support: '私は褒められると伸びるタイプです（笑）。「所長、今日のは良かったです」という一言で、三日は徹夜できます。',
    entrust: '地元のベテラン取引先への時間をかけた粘り強い交渉。情理を尽くしてお話しし、信頼を築きます。',
  },
  {
    id: 'hayashi_naoki', name: '林 直樹', office: '高松営業所', role: 'リーダー',
    called_short: '林さん・直樹さん',
    called_full: '林さん、または「直樹さん」。',
    type: 'ドライバー（主導型）',
    type_desc: '成果を出すためにどう動くかを最優先に考え、指示を待たずに自ら動くスタイルです。',
    strengths: ['自律性：上からの指示を待つのではなく、自ら課題を見つけて解決する「個」としての強さを大切にしています。', '向上心：現状に満足することなく、もっと効率的な方法はないか、もっと高い成果は出せないかを常に追い求めています。', '自信：自分の提案や行動に責任と自信を持ち、迷わず突き進むことで周囲を牽引していきたいと思っています。'],
    hobby: 'ロードバイク。瀬戸大橋を眺めながら島々を巡り、足の限界まで追い込むのが好きです。',
    food: '喉越し重視の讃岐うどん（冷やしぶっかけ）と、エナジードリンク。',
    motivation: '①前例のない難プロジェクトを任せられたとき ②圧倒的なスピードで成果を出したとき ③自分の背中を見て後輩が自発的に動き始めたとき',
    stress: '坂道を必死で駆け上がること。筋肉の痛みを感じている間は、仕事のストレスも吹き飛びます。',
    value: '「自律型人間でありたい」。自ら考え、自ら動くプロフェッショナル集団でありたいと願っています。',
    support: '独断で進めすぎて周囲への共有が疎かになることがあります。「林さん、一旦ストップして説明を！」と遠慮なくブレーキをかけてください。',
    entrust: '新しい営業拠点の立ち上げや、新規事業の開拓。道なきところに道を作るのが得意分野です。',
  },
  {
    id: 'shimizu_sakura', name: '清水 さくら', office: '岡山営業所', role: '事務',
    called_short: 'さくらさん',
    called_full: 'さくらさん。',
    type: 'エミアブル（協調型）',
    type_desc: '周囲と協力しながら、みんなが心地よく働ける雰囲気づくりを大切にしています。',
    strengths: ['素直さ：新しい知識や周囲のアドバイスを真っ白な気持ちで吸収し、すぐに行動に移すよう心掛けています。', '協調性：一人の力よりも、周りと協力して物事を進める方が好きです。営業所の調整役になれればと思っています。', 'コミュニケーション：挨拶はもちろん、何気ない日常の会話を通じて、みんなの調子を伺うのが得意です。'],
    hobby: 'フラワーアレンジメント。',
    food: 'フルーツ（特に岡山の桃）と、甘いカフェオレ。',
    motivation: '①自分のちょっとした気遣いで誰かが笑顔になったとき ②みんなで目標を達成して喜び合ったとき ③新しい業務を覚えて一人で完結できたとき',
    stress: '大好きなスイーツを思いっきり食べる！',
    value: '「挨拶から始まる信頼」。',
    support: '重い荷物の運搬は、若手の皆さんに甘えさせていただけると助かります。',
    entrust: '営業所の美化と、来客への最高の笑顔での対応。',
  },
  {
    id: 'okada_jun', name: '岡田 准', office: '京都営業所', role: '所長',
    called_short: '岡田所長',
    called_full: '岡田所長。',
    type: 'アナリティカル（分析型）',
    type_desc: '情報を整理し、多角的に状況を判断してから慎重に決断を下すタイプです。',
    strengths: ['客観性：自分の感情や立場に捉われず、第三者の視点から冷静に状況を判断し、公平な決断を下すよう努めています。', '慎重さ：一つの行動がどのような影響を及ぼすかを多角的にシミュレーションし、大きな失敗を未然に防ぎます。', '変化への対応：伝統を守りつつ、デジタルの導入など新しい変化にも柔軟に対応していきたいです。'],
    hobby: '寺社仏閣の庭園を眺めること。',
    food: '上品な和菓子と、丁寧に入れたお煎茶。',
    motivation: '①伝統ある取引先から「Bloomさんに任せて良かった」と言われたとき ②無駄な会議を省いて業務がスムーズになったとき ③部下が論理的に成長したとき',
    stress: '枯山水の庭を眺めて瞑想すること。',
    value: '「温故知新」。',
    support: 'デジタルツールの最新機能については、若い世代に教えていただけると非常に勉強になります。',
    entrust: '地域の有力者との顔つなぎや、複雑な契約の調整。',
  },
  {
    id: 'yamaguchi_shinichi', name: '山口 真一', office: '長崎営業所', role: '係長',
    called_short: '山口さん',
    called_full: '山口さん。',
    type: 'エクスプレッシブ（表現型）',
    type_desc: '新しいことへの好奇心と行動力で、現場を明るく盛り上げていきたいと思っています。',
    strengths: ['好奇心：「これ面白い！」と思ったものにはすぐに首を突っ込んで学びます。', '柔軟性：一度決めたことに固執せず、現場の状況に合わせて即座にプランを変更できる身軽さを大切にしています。', '勇気：誰もやりたがらない難しい交渉や、失敗するかもしれない挑戦にこそ、一番に手を挙げる度胸があります。'],
    hobby: '街歩きとカメラ。長崎の坂道を撮影するのが好きです。',
    food: 'ちゃんぽんと、地元の冷たいサイダー。',
    motivation: '①面白いアイデアが採用されたとき ②イベントが成功して大いに盛り上がったとき ③部下が失敗を恐れず挑戦し始めたとき',
    stress: '夜の海を眺めながらドライブ。',
    value: '「笑う門には福来る」。',
    support: '話が脱線して長くなったら、時計をチラッと見て合図してください（笑）。',
    entrust: '社内イベントの司会進行や、新規販路のアイデア出し。',
  },
  {
    id: 'saito_kenji', name: '斎藤 健二', office: '新潟営業所', role: '所長',
    called_short: '斎藤所長',
    called_full: '斎藤所長。',
    type: 'ドライバー（主導型）',
    type_desc: '大きな目標に向かって、主体的かつ力強く突き進むスタイルです。',
    strengths: ['度胸：大型の商談やトラブル時でも肝が据わっており、ここぞという場面で逃げずに真っ向勝負を仕掛けます。', '主体性：指示を待たずに自分が何をすべきかを常に考え、真っ先に行動に移します。', '高い志：ただ売るだけでなく、大きな目標を常に心に掲げています。'],
    hobby: '魚釣り（新潟の荒波で）。',
    food: '新米のおむすびと、新潟の銘酒。',
    motivation: '①目標の数字を圧倒的な差で達成したとき ②部下が「勝ち」にこだわり始めたとき ③大型の新規契約が決まったとき',
    stress: '温泉の雪見風呂でゆっくりすること。',
    value: '「結果が全て」。',
    support: '集中すると怖い顔になっていることがありますが、怒っているわけではないので気軽に話しかけてください。',
    entrust: '停滞している目標達成へのラストスパートの鼓舞。',
  },
  {
    id: 'ishii_noriko', name: '石井 典子', office: '鹿児島営業所', role: '事務リーダー',
    called_short: '典子さん',
    called_full: '典子さん。',
    type: 'アナリティカル（分析型）',
    type_desc: '数日先を見越して優先順位を整理し、スムーズな業務の流れを作ることが得意です。',
    strengths: ['段取り：営業所全体の業務が滞らないよう、数日先を見越して優先順位を整理し、スムーズな流れを作ります。', '集中力：〆切前の膨大なデータ入力なども、驚異的な集中力でミスなく一気に片付ける自信があります。', '几帳面：誰が見ても分かりやすいファイリングや共有データの整理など、細部にまで気配りを行き届かせています。'],
    hobby: '整理整頓の動画を観ること。',
    food: 'さつま揚げと、熱い緑茶。',
    motivation: '①自分が組んだ段取り通りに完璧に仕事が回ったとき ②「データが見やすくなった」と言われたとき ③デスク周りがピカピカになったとき',
    stress: '部屋の模様替えを夜通し行うこと。',
    value: '「備えあれば憂いなし」。',
    support: 'パソコンのシステム不具合などのハード面には少し弱いので、詳しい方はぜひ助けてください。',
    entrust: '複雑な契約書類の不備チェックや、営業所の管理システムの整理。',
  },
  {
    id: 'kondo_makoto', name: '近藤 誠', office: '大分営業所', role: 'リーダー',
    called_short: '近藤さん',
    called_full: '近藤さん。',
    type: 'エミアブル（協調型）',
    type_desc: '一緒に働く仲間を大切にし、思いやりと感謝を持って接することを心掛けています。',
    strengths: ['思いやり：仲間の顔色が悪いときや、元気がないときは、そっと差し入れをして声をかけるようにしています。', '共感力：失敗して落ち込んでいる人の話を最後まで聴き、自分のことのように心を痛めて一緒に再生を目指します。', '感謝：周囲の助けがあっての自分だと自覚し、常に謙虚な姿勢と「ありがとう」の言葉を大切にしています。'],
    hobby: '温泉巡り（別府・由布院など）。',
    food: 'とり天と、冷たい麦茶。',
    motivation: '①部下が悩みを相談してくれ、解決したときに笑顔が見られたとき ②自分が教えた後輩が感謝されたとき ③みんなで穏やかに食事をしているとき',
    stress: '露天風呂でぼーっとすること。',
    value: '「まずは受け入れる」。',
    support: '頼まれると断れない性格なので、私が抱え込みすぎているように見えたら「手伝おうか？」と声をかけてもらえると救われます。',
    entrust: '営業所の人間関係の円滑化や、新人さんの悩み相談。',
  },
  {
    id: 'morita_go', name: '森田 剛', office: '静岡営業所', role: '所長',
    called_short: '森田所長',
    called_full: '森田所長。',
    type: 'エクスプレッシブ（表現型）',
    type_desc: '既存のやり方に固執せず、常にクリエイティブな発想で現場を盛り上げていきたいと思っています。',
    strengths: ['創造性：野菜の新しい食べ方の提案など、常にクリエイティブな発想を大切にしています。', '発想力：一つの物事を多角的に捉え、誰も思いつかないような面白い販促キャンペーンを考えるのが得意です。', 'チャレンジ精神：面白いと思ったことは即実行。全国を驚かせるようなプロジェクトを仕掛けていきたいです。'],
    hobby: '週末のキャンプ。',
    food: 'さわやかのハンバーグと、静岡茶のハイボール。',
    motivation: '①自分の出した斬新なアイデアに「面白い！」と言ってくれたとき ②誰も見たことがないような新しい販路を作ったとき ③営業所が活気に溢れているとき',
    stress: '波音を聞きながら海辺でコーヒー。',
    value: '「常識を疑う」。',
    support: 'アイデアを出すのは得意ですが、誤字脱字が多いので（笑）、公的な書類は念入りにチェックをお願いします。',
    entrust: '新商品のキャッチコピー考案や、他社がやっていない面白い展示の企画。',
  },
  {
    id: 'maeda_atsushi', name: '前田 敦', office: '宮崎営業所', role: '係長',
    called_short: 'あっちゃん',
    called_full: 'あっちゃん。',
    type: 'ドライバー（主導型）',
    type_desc: '考えるよりも先に体が動くタイプ。圧倒的な行動量で現場を引っ張ります。',
    strengths: ['実行力：考えるよりも先に体が動くタイプ。圧倒的な行動量で現場を制圧し、成果を強引にでも引き寄せます。', '情熱：宮崎の野菜への愛は誰にも負けません。この情熱でお客様を圧倒し、ファンを増やしていきます。', '失敗を活かす力：派手に転ぶこともありますが、そのたびに何かを掴んで立ち上がる。失敗は成功への投資だと思っています。'],
    hobby: 'サーフィン。',
    food: 'チキン南蛮と、宮崎の焼酎。',
    motivation: '①競合に勝って大型注文を獲ったとき ②「前田さんの熱意に負けたよ」と言われたとき ③数字が右肩上がりで伸びているとき',
    stress: '朝の海で波に乗ること。',
    value: '「明日やろうは馬鹿野郎」。',
    support: '走りながら考えるため、私の後ろにはいつもやり残した「片付け」があります。そこをフォローしていただけると最高に助かります。',
    entrust: '最短時間での配送ルートの最適化や、強気な交渉が必要な場面。',
  },
  {
    id: 'nakajima_mika', name: '中島 美香', office: '神戸営業所', role: 'リーダー',
    called_short: '中島さん・美香さん',
    called_full: '中島さん、美香さん。',
    type: 'アナリティカル（分析型）',
    type_desc: '優先順位を瞬時に判断し、論理的に納得した上で最高の結果を目指します。',
    strengths: ['冷静沈着：どんなに忙しく電話が鳴り止まない状況でも、優先順位を瞬時に判断し、涼しい顔で仕事をこなします。', '論理的思考：曖昧な指示は好まず、常に「なぜこの業務が必要か」を論理的に納得した上で、最高の結果を目指します。', 'プレゼンス：発言回数は多くありませんが、ここぞというときに一言で空気を引き締め、納得させる存在感を持っていたいです。'],
    hobby: 'ジャズ鑑賞とカフェ巡り。',
    food: '神戸牛のステーキと、キレのある辛口のワイン。',
    motivation: '①複雑なパズルのような在庫管理を完璧に解いたとき ②自分のプレゼン資料で大型クライアントが納得したとき ③無駄のない洗練された仕事ができたとき',
    stress: 'ホテルのラウンジで静かに読書。',
    value: '「洗練と合理性」。',
    support: '感情的に詰め寄られるのが苦手です。相談はSlackやメールなどで要点をまとめていただけると、よりスムーズに解決できます。',
    entrust: '重要なプレゼン資料のロジック構築や、営業所全体の数字の管理。',
  },
  {
    id: 'sakamoto_ryuhei', name: '坂本 龍平', office: '高知営業所', role: '所長',
    called_short: '坂本所長',
    called_full: '坂本所長。',
    type: 'エクスプレッシブ（表現型）',
    type_desc: '大きな夢を本気で語り続け、個性的なメンバーを束ね一つの大きなうねりにしていきたいと思っています。',
    strengths: ['高い志：大きな夢を常に抱き、それを本気で語り続ける志を持っています。', '自己開示：部下に対しても自分の弱みや本音を曝け出すことで、嘘のない信頼関係を築こうとしています。', 'チームワーク：個性的なメンバーを束ね、一つの大きなうねりにしていくリーダーシップを発揮したいです。'],
    hobby: '幕末の歴史探訪。',
    food: 'カツオのタタキと、土佐の強めの地酒。',
    motivation: '①産地の農家さんが自分たちを信頼して素晴らしい野菜を託してくれたとき ②飲み会でみんなが志を熱く語り合ったとき ③新しい流通の仕組みが成功したとき',
    stress: '太平洋を眺めながら「よし！」と心の中で叫ぶ。',
    value: '「改善し続ける」。現状に満足せず、営業所を、会社をより良くし続けることを誓っています。',
    support: '夢が大きすぎて足元がおろそかになることがあるので、現実的な「ツッコミ」を随時入れていただけると助かります。',
    entrust: '頑固な取引先との新規提携や、営業所のビジョンづくり。',
  },
];

const groups = [
  { label: '東京本社', members: ['sato_kenichi', 'ito_yui'] },
  { label: '札幌営業所', members: ['takahashi_hiroki'] },
  { label: '仙台営業所', members: ['abe_kento'] },
  { label: '新潟営業所', members: ['saito_kenji'] },
  { label: '横浜営業所', members: ['ito_yui'] },
  { label: '名古屋営業所', members: ['nakamura_yuki'] },
  { label: '金沢営業所', members: ['kobayashi_keiko'] },
  { label: '京都営業所', members: ['okada_jun'] },
  { label: '大阪営業所', members: ['kato_shota'] },
  { label: '神戸営業所', members: ['nakajima_mika'] },
  { label: '広島営業所', members: ['sasaki_mai'] },
  { label: '高松営業所', members: ['hayashi_naoki'] },
  { label: '高知営業所', members: ['sakamoto_ryuhei'] },
  { label: '福岡営業所', members: ['kimura_takuya'] },
  { label: '長崎営業所', members: ['yamaguchi_shinichi'] },
  { label: '宮崎営業所', members: ['maeda_atsushi'] },
  { label: '大分営業所', members: ['kondo_makoto'] },
  { label: '静岡営業所', members: ['morita_go'] },
  { label: '岡山営業所', members: ['shimizu_sakura'] },
  { label: '鹿児島営業所', members: ['ishii_noriko'] },
];

// グループを本社・営業所で整理（重複除去）
const groupsClean = [
  { label: '東京本社', ids: ['sato_kenichi', 'ito_yui'] },
  { label: '札幌営業所', ids: ['takahashi_hiroki'] },
  { label: '仙台営業所', ids: ['abe_kento'] },
  { label: '新潟営業所', ids: ['saito_kenji'] },
  { label: '名古屋営業所', ids: ['nakamura_yuki'] },
  { label: '金沢営業所', ids: ['kobayashi_keiko'] },
  { label: '京都営業所', ids: ['okada_jun'] },
  { label: '大阪営業所', ids: ['kato_shota'] },
  { label: '神戸営業所', ids: ['nakajima_mika'] },
  { label: '広島営業所', ids: ['sasaki_mai'] },
  { label: '高松営業所', ids: ['hayashi_naoki'] },
  { label: '高知営業所', ids: ['sakamoto_ryuhei'] },
  { label: '福岡営業所', ids: ['kimura_takuya'] },
  { label: '長崎営業所', ids: ['yamaguchi_shinichi'] },
  { label: '宮崎営業所', ids: ['maeda_atsushi'] },
  { label: '大分営業所', ids: ['kondo_makoto'] },
  { label: '静岡営業所', ids: ['morita_go'] },
  { label: '岡山営業所', ids: ['shimizu_sakura'] },
  { label: '鹿児島営業所', ids: ['ishii_noriko'] },
];

const memberMap = {};
members.forEach(m => memberMap[m.id] = m);

function getInitial(name) { return name.replace(/\s/g, '')[0]; }

// カラーパレット（ネイビー系・複数トーン）
const colors = ['#1e3a5f','#2c5282','#1a365d','#2b4c7e','#243b55','#1e4d8c','#162d4a'];

// パスワードページ
const indexHTML = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>私のトリセツ | Bloom商事</title>
<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;700&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
  :root {
    --navy: #1e3a5f;
    --navy-dark: #162d4a;
    --navy-light: #eef2f7;
    --gold: #c9a84c;
    --gold-light: #f5edda;
    --white: #ffffff;
    --text: #1a2535;
    --text-light: #5a6a80;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Noto Sans JP', sans-serif;
    background: var(--navy-light);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
  body::before {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: 
      radial-gradient(ellipse at 20% 20%, rgba(30,58,95,0.08) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 80%, rgba(201,168,76,0.06) 0%, transparent 60%);
    pointer-events: none;
  }

  .wrap {
    width: 90%;
    max-width: 400px;
    animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .brand {
    text-align: center;
    margin-bottom: 36px;
  }
  .brand-icon {
    width: 60px; height: 60px;
    background: var(--navy);
    border-radius: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    box-shadow: 0 8px 24px rgba(30,58,95,0.25);
  }
  .brand-icon svg {
    width: 32px; height: 32px;
    fill: var(--gold);
  }
  .brand h1 {
    font-family: 'Shippori Mincho', serif;
    font-size: 11px;
    color: var(--text-light);
    letter-spacing: 0.2em;
    margin-bottom: 6px;
    font-weight: 400;
  }
  .brand h2 {
    font-family: 'Shippori Mincho', serif;
    font-size: 24px;
    font-weight: 700;
    color: var(--navy);
    letter-spacing: 0.08em;
  }

  .card {
    background: var(--white);
    border-radius: 20px;
    padding: 36px 32px;
    box-shadow: 0 12px 48px rgba(30,58,95,0.1), 0 2px 8px rgba(0,0,0,0.04);
    border: 1px solid rgba(30,58,95,0.06);
  }
  .card p {
    text-align: center;
    font-size: 13px;
    color: var(--text-light);
    line-height: 1.8;
    margin-bottom: 28px;
  }

  .input-wrap { position: relative; margin-bottom: 14px; }
  .input-wrap input {
    width: 100%;
    padding: 14px 48px 14px 16px;
    border: 1.5px solid #dde3ec;
    border-radius: 12px;
    font-size: 15px;
    font-family: 'Noto Sans JP', sans-serif;
    color: var(--text);
    background: var(--navy-light);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    letter-spacing: 0.1em;
  }
  .input-wrap input:focus {
    border-color: var(--navy);
    box-shadow: 0 0 0 3px rgba(30,58,95,0.08);
    background: white;
  }
  .eye { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-light); font-size: 16px; }

  .btn {
    width: 100%;
    padding: 15px;
    background: var(--navy);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    font-family: 'Noto Sans JP', sans-serif;
    cursor: pointer;
    letter-spacing: 0.12em;
    transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
    box-shadow: 0 4px 16px rgba(30,58,95,0.3);
  }
  .btn:hover { background: var(--navy-dark); box-shadow: 0 6px 20px rgba(30,58,95,0.4); }
  .btn:active { transform: scale(0.98); }

  .err { text-align: center; color: #c0392b; font-size: 12px; margin-top: 12px; display: none; animation: shake .3s; }
  @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }

  .footer { text-align: center; margin-top: 24px; font-size: 11px; color: var(--text-light); opacity: 0.6; }
  .gold-line { width: 40px; height: 2px; background: var(--gold); margin: 0 auto 20px; border-radius: 2px; }
</style>
</head>
<body>
<div class="wrap">
  <div class="brand">
    <div class="brand-icon">
      <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
    </div>
    <h1>BLOOM SHOJI CO., LTD.</h1>
    <h2>私のトリセツ</h2>
  </div>
  <div class="card">
    <div class="gold-line"></div>
    <p>このサイトは社内専用です。<br>パスワードを入力してご覧ください。</p>
    <div class="input-wrap">
      <input type="password" id="pw" placeholder="パスワードを入力" autocomplete="off">
      <button class="eye" onclick="togglePw()">👁</button>
    </div>
    <button class="btn" onclick="login()">ログイン</button>
    <p class="err" id="err">パスワードが違います</p>
  </div>
  <p class="footer">© Bloom商事株式会社　人材・組織開発部</p>
</div>
<script>
  const PW = 'bloom26';
  document.getElementById('pw').addEventListener('keydown', e => { if(e.key==='Enter') login(); });
  function login() {
    if(document.getElementById('pw').value === PW) {
      sessionStorage.setItem('auth','1');
      location.href = 'list.html';
    } else {
      const e = document.getElementById('err');
      e.style.display='block'; e.style.animation='none';
      setTimeout(()=>e.style.animation='shake .3s',10);
      document.getElementById('pw').value='';
    }
  }
  function togglePw() {
    const i = document.getElementById('pw');
    i.type = i.type==='password'?'text':'password';
  }
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'index.html'), indexHTML, 'utf8');
console.log('✓ index.html');

// 一覧ページ
const groupsJSON = JSON.stringify(groupsClean);
const membersJSON = JSON.stringify(members.map(m => ({id:m.id, name:m.name, office:m.office, role:m.role, called_short:m.called_short})));

const listHTML = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>メンバー一覧 | 私のトリセツ</title>
<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;700&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
  :root {
    --navy: #1e3a5f; --navy-dark: #162d4a; --navy-light: #eef2f7;
    --gold: #c9a84c; --gold-light: #f5edda;
    --white: #fff; --text: #1a2535; --text-light: #5a6a80;
    --border: #dde3ec;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Noto Sans JP', sans-serif; background: var(--navy-light); min-height: 100vh; color: var(--text); padding-bottom: 48px; }

  header {
    background: var(--navy);
    padding: 0 20px;
    height: 60px;
    display: flex;
    align-items: center;
    gap: 12px;
    position: sticky; top: 0; z-index: 100;
    box-shadow: 0 2px 16px rgba(30,58,95,0.3);
  }
  .hlogo { width: 32px; height: 32px; background: var(--gold); border-radius: 8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .hlogo svg { width:18px; height:18px; fill:var(--navy); }
  .htitle { font-family:'Shippori Mincho',serif; font-size:17px; font-weight:700; color:white; letter-spacing:.05em; }
  .hsub { font-size:10px; color:rgba(255,255,255,.6); letter-spacing:.1em; display:block; }

  .search-area { padding: 20px 16px 4px; max-width: 600px; margin: 0 auto; position: relative; }
  .search-area input {
    width: 100%; padding: 13px 16px 13px 44px;
    border: 1.5px solid var(--border); border-radius: 50px;
    font-size: 14px; font-family: 'Noto Sans JP', sans-serif;
    background: white; color: var(--text); outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  .search-area input:focus { border-color: var(--navy); box-shadow: 0 0 0 3px rgba(30,58,95,.08); }
  .search-icon { position:absolute; left:30px; top:50%; transform:translateY(-18%); font-size:17px; color:var(--text-light); pointer-events:none; }

  .count { text-align:center; font-size:11px; color:var(--text-light); padding:8px 0 2px; letter-spacing:.05em; }

  .list { padding: 8px 16px; max-width: 600px; margin: 0 auto; }

  .group-label {
    font-family: 'Shippori Mincho', serif;
    font-size: 12px; font-weight: 700;
    color: var(--navy);
    letter-spacing: .1em;
    padding: 16px 4px 6px;
    display: flex; align-items: center; gap: 8px;
  }
  .group-label::after { content:''; flex:1; height:1px; background:var(--border); }

  .card {
    background: white;
    border-radius: 14px;
    padding: 14px 18px;
    display: flex; align-items: center; gap: 14px;
    text-decoration: none; color: var(--text);
    margin-bottom: 8px;
    box-shadow: 0 2px 8px rgba(30,58,95,.06);
    border: 1px solid var(--border);
    transition: transform .15s, box-shadow .15s, border-color .15s;
    animation: fadeUp .4s ease both;
  }
  .card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(30,58,95,.12); border-color: rgba(30,58,95,.2); }
  @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

  .avatar {
    width: 46px; height: 46px; border-radius: 50%;
    background: var(--navy); color: white;
    display:flex; align-items:center; justify-content:center;
    font-size:17px; font-weight:900; flex-shrink:0;
  }
  .info { flex:1; min-width:0; }
  .name { font-size:15px; font-weight:700; margin-bottom:2px; }
  .role { font-size:11px; color:var(--gold); font-weight:700; letter-spacing:.05em; margin-bottom:2px; }
  .called { font-size:11px; color:var(--text-light); }
  .arr { color:var(--border); font-size:20px; }

  .no-result { text-align:center; padding:60px 20px; color:var(--text-light); font-size:14px; display:none; }
</style>
</head>
<body>
<header>
  <div class="hlogo"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
  <div>
    <span class="hsub">BLOOM SHOJI CO., LTD.</span>
    <div class="htitle">私のトリセツ</div>
  </div>
</header>
<div class="search-area">
  <span class="search-icon">🔍</span>
  <input type="search" id="q" placeholder="名前・営業所・役職で検索" oninput="search()">
</div>
<p class="count" id="count"></p>
<div class="list" id="list"></div>
<p class="no-result" id="noResult">該当するメンバーが見つかりません</p>

<script>
  if(!sessionStorage.getItem('auth')) location.href='index.html';
  const groups = ${groupsJSON};
  const allMembers = ${membersJSON};
  const memberMap = {};
  allMembers.forEach(m => memberMap[m.id] = m);

  function initial(name) { return name.replace(/\\s/g,'')[0]; }

  function cardHTML(m, i) {
    return \`<a class="card" href="\${m.id}.html" style="animation-delay:\${i*.04}s">
      <div class="avatar">\${initial(m.name)}</div>
      <div class="info">
        <div class="name">\${m.name}</div>
        <div class="role">\${m.office}　\${m.role}</div>
        <div class="called">「\${m.called_short}」と呼んでください</div>
      </div>
      <div class="arr">›</div>
    </a>\`;
  }

  function renderGroups() {
    let html = ''; let total = 0; let i = 0;
    groups.forEach(g => {
      const ms = g.ids.map(id => memberMap[id]).filter(Boolean);
      if(!ms.length) return;
      html += \`<div class="group-label">📍 \${g.label}</div>\`;
      ms.forEach(m => { html += cardHTML(m, i++); total++; });
    });
    document.getElementById('noResult').style.display = 'none';
    document.getElementById('count').textContent = \`\${total}名のトリセツ\`;
    document.getElementById('list').innerHTML = html;
  }

  function search() {
    const q = document.getElementById('q').value.trim();
    if(!q) { renderGroups(); return; }
    const filtered = allMembers.filter(m =>
      m.name.includes(q) || m.office.includes(q) || m.role.includes(q) || m.called_short.includes(q)
    );
    document.getElementById('count').textContent = \`\${filtered.length}名\`;
    if(!filtered.length) {
      document.getElementById('list').innerHTML = '';
      document.getElementById('noResult').style.display = 'block';
    } else {
      document.getElementById('noResult').style.display = 'none';
      document.getElementById('list').innerHTML = filtered.map((m,i) => cardHTML(m,i)).join('');
    }
  }

  renderGroups();
</script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'list.html'), listHTML, 'utf8');
console.log('✓ list.html');

// 個人ページ生成
members.forEach((m, idx) => {
  const color = colors[idx % colors.length];
  const strengthsHTML = m.strengths.map(s => `<li>${s}</li>`).join('');

  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${m.name} のトリセツ | Bloom商事</title>
<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;700&family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
  :root {
    --navy: #1e3a5f; --navy-light: #eef2f7;
    --gold: #c9a84c; --gold-light: #f5edda;
    --white: #fff; --text: #1a2535; --text-light: #5a6a80;
    --border: #dde3ec; --accent: ${color};
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Noto Sans JP', sans-serif; background: var(--navy-light); min-height: 100vh; color: var(--text); padding-bottom: 48px; }

  .hero {
    background: var(--accent);
    padding: 0 0 28px;
    position: relative; overflow: hidden;
  }
  .hero::before { content:''; position:absolute; top:-60px; right:-60px; width:240px; height:240px; background:rgba(255,255,255,.06); border-radius:50%; }
  .hero::after  { content:''; position:absolute; bottom:-80px; left:-40px; width:200px; height:200px; background:rgba(201,168,76,.12); border-radius:50%; }

  .back { display:inline-flex; align-items:center; gap:6px; color:rgba(255,255,255,.8); text-decoration:none; font-size:13px; padding:16px 20px 8px; font-weight:500; position:relative; z-index:1; }
  .back:hover { color:white; }

  .hero-body { padding: 12px 24px 0; position:relative; z-index:1; }
  .office-tag { display:inline-block; background:rgba(255,255,255,.18); color:white; font-size:10px; padding:3px 12px; border-radius:50px; margin-bottom:10px; letter-spacing:.08em; font-weight:700; }
  .role-tag { display:inline-block; background:var(--gold); color:var(--navy); font-size:10px; padding:3px 10px; border-radius:50px; margin-left:6px; font-weight:700; letter-spacing:.05em; }

  .name-row { display:flex; align-items:center; gap:14px; }
  .avatar { width:60px; height:60px; border-radius:50%; background:rgba(255,255,255,.2); border:3px solid rgba(255,255,255,.35); display:flex; align-items:center; justify-content:center; font-size:24px; font-weight:900; color:white; flex-shrink:0; }
  .hero h1 { font-family:'Shippori Mincho',serif; font-size:26px; font-weight:700; color:white; letter-spacing:.05em; }

  .content { padding: 20px 16px; max-width: 600px; margin: 0 auto; display:flex; flex-direction:column; gap:12px; }

  .sec { background:white; border-radius:14px; padding:18px 20px; box-shadow:0 2px 8px rgba(30,58,95,.06); border:1px solid var(--border); animation:fadeUp .4s ease both; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  .sec:nth-child(1){animation-delay:.05s} .sec:nth-child(2){animation-delay:.1s} .sec:nth-child(3){animation-delay:.15s}
  .sec:nth-child(4){animation-delay:.2s} .sec:nth-child(5){animation-delay:.25s} .sec:nth-child(6){animation-delay:.3s}
  .sec:nth-child(7){animation-delay:.35s} .sec:nth-child(8){animation-delay:.4s}

  .sec-label { font-size:10px; font-weight:700; color:var(--accent); letter-spacing:.12em; margin-bottom:5px; }
  .sec-title { font-size:13px; font-weight:700; color:var(--text-light); margin-bottom:10px; padding-bottom:8px; border-bottom:1px solid var(--border); display:flex; align-items:center; gap:5px; }
  .sec-body { font-size:14px; line-height:1.8; color:var(--text); }

  .type-box { background:var(--navy-light); border-left:3px solid var(--accent); border-radius:0 10px 10px 0; padding:12px 14px; margin-bottom:8px; }
  .type-name { font-weight:700; font-size:14px; color:var(--accent); margin-bottom:5px; }

  .strengths { list-style:none; display:flex; flex-direction:column; gap:8px; }
  .strengths li { background:var(--navy-light); border-radius:10px; padding:10px 14px 10px 28px; font-size:13px; line-height:1.65; position:relative; }
  .strengths li::before { content:'◆'; position:absolute; left:10px; top:12px; color:var(--gold); font-size:8px; }

  .gold-highlight { background:var(--gold-light); border-left:3px solid var(--gold); border-radius:0 10px 10px 0; padding:12px 14px; font-size:14px; line-height:1.8; color:var(--text); }
</style>
</head>
<body>
<div class="hero">
  <a class="back" href="list.html">‹ 一覧に戻る</a>
  <div class="hero-body">
    <div>
      <span class="office-tag">${m.office}</span>
      <span class="role-tag">${m.role}</span>
    </div>
    <div class="name-row">
      <div class="avatar">${getInitial(m.name)}</div>
      <h1>${m.name}</h1>
    </div>
  </div>
</div>

<div class="content">
  <div class="sec">
    <div class="sec-label">A-1</div>
    <div class="sec-title">🏷️ 呼ばれたい名前</div>
    <div class="sec-body">${m.called_full}</div>
  </div>
  <div class="sec">
    <div class="sec-label">A-5</div>
    <div class="sec-title">💬 コミュニケーションスタイル</div>
    <div class="type-box">
      <div class="type-name">${m.type}</div>
      <div class="sec-body">${m.type_desc}</div>
    </div>
  </div>
  <div class="sec">
    <div class="sec-label">A-6</div>
    <div class="sec-title">✨ 持ち味（3つ）</div>
    <ul class="strengths">${strengthsHTML}</ul>
  </div>
  <div class="sec">
    <div class="sec-label">B-1 / B-2</div>
    <div class="sec-title">🎯 趣味・好きなもの</div>
    <div class="sec-body">
      <p style="margin-bottom:8px"><strong>趣味・マイブーム：</strong>${m.hobby}</p>
      <p><strong>好きな食べ物・飲み物：</strong>${m.food}</p>
    </div>
  </div>
  <div class="sec">
    <div class="sec-label">C-1</div>
    <div class="sec-title">🔥 やる気がでるとき</div>
    <div class="sec-body">${m.motivation}</div>
  </div>
  <div class="sec">
    <div class="sec-label">D-3</div>
    <div class="sec-title">💆 ストレス発散方法</div>
    <div class="sec-body">${m.stress}</div>
  </div>
  <div class="sec">
    <div class="sec-label">大切にしている価値観</div>
    <div class="sec-title">💡 仕事上の価値観</div>
    <div class="gold-highlight">${m.value}</div>
  </div>
  <div class="sec">
    <div class="sec-label">サポート情報</div>
    <div class="sec-title">🤝 サポートしてもらえると助かること</div>
    <div class="sec-body" style="margin-bottom:14px">${m.support}</div>
    <div class="sec-title" style="margin-top:12px">⭐ 任せてほしいこと</div>
    <div class="sec-body">${m.entrust}</div>
  </div>
</div>

<script>
  if(!sessionStorage.getItem('auth')) location.href='index.html';
</script>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, `${m.id}.html`), html, 'utf8');
  console.log(`✓ ${m.name} → ${m.id}.html`);
});

console.log(`\n完了！ ${members.length + 2}ファイル生成しました。`);
