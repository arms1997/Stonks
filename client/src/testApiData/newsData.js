const newsTestData = [
  {
    source: {
      id: null,
      name: "Tinhte.vn",
    },
    author: "duyluandethuong@gmail.com (Duy Luân), Duy Luân",
    title: "Nghĩ về ô tô điện tại Việt Nam",
    description:
      "Foxconn mới đây đề nghị VinFast bán lại dây chuyền làm xe điện của họ, nhưng VinFast thì nói họ muốn hợp tác để phát triển hơn là bán đứt. Điều này nghe cũng hợp lý, và mình thấy rằng thị trường...",
    url: "https://tinhte.vn/thread/nghi-ve-o-to-dien-tai-viet-nam.3296568/",
    urlToImage:
      "https://photo2.tinhte.vn/data/attachment-files/2021/03/5399769_cover_home_xe_dien_vinfast.jpg",
    publishedAt: "2021-03-20T14:14:21Z",
    content:
      "Khi chúng ta có nhiu la chn v mu mã, ngoi hình và cu hình, xe in chc chn s ph bin.\r\nMt vn khác mà các nhà sn xut xe cng ang c gng gii quyt ó là làm sao sc xe nhanh. Hin nay bn có th phi ch vài ting m… [+494 chars]",
  },
  {
    source: {
      id: null,
      name: "Novate.ru",
    },
    author: "sayasha info@novate.ru",
    title:
      "Общество: Правила изменились: что сегодня спрашивают на собеседованиях в Фейсбук, Гугл, Амазон",
    description:
      "О том, что попасть в крупнейшие мировые корпорации на работу – задача весьма трудная, знает всякий. Кроме того, по просторам Интернета давно гуляют списки занимательных вопросов и логических задачек, которые спрашивают там у соискателей во время собеседований…",
    url: "https://novate.ru/blogs/200321/58247/",
    urlToImage: "https://novate.ru/preview/58247s3.jpg?122",
    publishedAt: "2021-03-20T14:05:00Z",
    content:
      ", , . HR- , , . . \r\n1. Microsoft\r\n Microsoft , . /: tadviser.com\r\nHR- , , , . , , , . \r\nHR- Microsoft , : «, , ?»« , ?».\r\n2. Sony\r\n, , Sony. , , HR- : « Sony, ?».\r\n, Sony . : « , ?». , , , , , , «», … [+542 chars]",
  },
  {
    source: {
      id: null,
      name: "Haber7.com",
    },
    author: "haber7.com",
    title: "Bitcoin 60 bin dolara yaklaşmaya başladı",
    description:
      "ABD Merkez Bankası (Fed) Başkanı Jerome Powell'ın, faizlerin yüzde 0.00-0.25 aralığında sabit tutulması kararı sonrası yaptığı açıklamada, gerektiğinde ek likidite desteği verileceğini vurgulaması üzerine gelen spot alımlarla 60,000 doları aşan Bitcoin, kâr s…",
    url:
      "https://ekonomi.haber7.com/ekonomi/haber/3079830-bitcoin-60-bin-dolara-yaklasmaya-basladi",
    urlToImage:
      "https://i12.haber7.net//haber/haber7/photos/2021/11/bitcoin_altindan_daha_iyi_iddiasi_1616151949_2977.jpg",
    publishedAt: "2021-03-20T14:01:00Z",
    content:
      "Son 24 saat içinde 57,847.14 ve 59,498.38 dolar arasnda dalgalanan Bitcoin, yüzde 1.47 artla 58,043.28 dolara yükselirken, birimin haftalk kazanc da yüzde 3.61 olarak hesapland. Bitcoin'in toplam piy… [+2777 chars]",
  },
  {
    source: {
      id: null,
      name: "New York Post",
    },
    author: "Jon Levine",
    title: "Elon Musk denies Tesla cars were used to spy in China",
    description:
      "Tesla boss Elon Musk said his cars were not spying in China. “There’s a very strong incentive for us to be very confidential with any information,” Musk said during a virtual meeting of the China Development Forum Saturday, Reuters reported. “If Tesla used ca…",
    url:
      "https://nypost.com/2021/03/20/elon-musk-denies-tesla-cars-were-used-to-spy-in-china/",
    urlToImage:
      "https://nypost.com/wp-content/uploads/sites/2/2021/03/elon-musk-003.jpg?quality=90&strip=all&w=1200",
    publishedAt: "2021-03-20T14:00:05Z",
    content:
      "Tesla boss Elon Musk said his cars were not spying in China.\r\nTheres a very strong incentive for us to be very confidential with any information, Musk said during a virtual meeting of the China Devel… [+601 chars]",
  },
  {
    source: {
      id: null,
      name: "Motley Fool",
    },
    author: "newsfeedback@fool.com (Brian Feroldi)",
    title: "Top 10 Investing Lessons for Our Younger Selves",
    description:
      "What would you go back and tell your younger self if you had the chance?",
    url:
      "https://www.fool.com/investing/2021/03/20/top-10-investing-lessons-for-our-younger-selves/",
    urlToImage:
      "https://g.foolcdn.com/editorial/images/617189/saving-young.jpg",
    publishedAt: "2021-03-20T14:00:00Z",
    content:
      "We all dream of going back in time and telling our younger selves to buy as many shares as possible of Tesla, Apple, and Amazon and never sell.\r\nWhile that's not how the world works, the good news is… [+1157 chars]",
  },
  {
    source: {
      id: "bbc-news",
      name: "BBC News",
    },
    author: "https://www.facebook.com/bbcnews",
    title: "Russian pleads guilty to Tesla ransomware plot",
    description:
      "He allegedly offered an employee $1m (£721,000) to install ransomware at a Nevada battery plant.",
    url: "https://www.bbc.co.uk/news/world-us-canada-56469475",
    urlToImage:
      "https://ichef.bbci.co.uk/news/1024/branded_news/1045E/production/_117645666_tv030221397.jpg",
    publishedAt: "2021-03-20T13:56:47Z",
    content:
      "image captionCalifornia-based company Tesla makes electric cars\r\nA Russian man in the US has pleaded guilty to plotting to extort money from the electric car company Tesla.\r\nEgor Igorevich Kriuchkov … [+1964 chars]",
  },
  {
    source: {
      id: null,
      name: "BBC News",
    },
    author: "https://www.facebook.com/bbcnews",
    title: "Russian pleads guilty to Tesla ransomware plot",
    description:
      "He allegedly offered an employee $1m (£721,000) to install ransomware at a Nevada battery plant.",
    url: "https://www.bbc.com/news/world-us-canada-56469475",
    urlToImage:
      "https://ichef.bbci.co.uk/news/1024/branded_news/1045E/production/_117645666_tv030221397.jpg",
    publishedAt: "2021-03-20T13:56:47Z",
    content:
      "image captionCalifornia-based company Tesla makes electric cars\r\nA Russian man in the US has pleaded guilty to plotting to extort money from the electric car company Tesla.\r\nEgor Igorevich Kriuchkov … [+1964 chars]",
  },
  {
    source: {
      id: null,
      name: "M3.idg.se",
    },
    author: null,
    title: "Kinas regering begränsar användningen av Teslas bilar",
    description: "Anledningen ska vara oro för datainsamling.",
    url:
      "https://m3.idg.se/2.1022/1.748470/kinas-regering-begransar-anvandningen-av-teslas-bilar",
    urlToImage:
      "https://www.idg.se/editorial/1200/path/1.748470.1616248331!imageUploader/3104603366.jpg",
    publishedAt: "2021-03-20T13:52:11Z",
    content:
      "Kinas regering förbjuder nu myndighetspersoner, landets militär och anställda inom statligt ägda företag att köra Teslas fordon. Detta med anledning av en möjlig risk för datainsamling, rapporterar T… [+746 chars]",
  },
  {
    source: {
      id: null,
      name: "CleanTechnica",
    },
    author: "Johnna Crider",
    title:
      "Grant Program Proposal That Would Fund EV Charging Stations But Tax Electric Vehicles Advances In FL Senate",
    description:
      "WFSU Public Media reports that a proposal meant to support the construction of more EV charging stations passed its first committee stop today. This proposal would create a grant program that will allow state agencies, local governments, and more to apply and…",
    url:
      "https://cleantechnica.com/2021/03/20/grant-program-proposal-that-would-fund-ev-charging-stations-but-tax-electric-vehicles-advances-in-fl-senate/",
    urlToImage:
      "https://cleantechnica.com/files/2021/02/Tesla-Model-3-Fleet-White-and-Blue-Supercharging-Florida-National-Drive-Electric-Week-Girls-1-Watermark.jpg",
    publishedAt: "2021-03-20T13:46:39Z",
    content:
      "WFSU Public Media reports that a proposal meant to support the construction of more EV charging stations passed its first committee stop today. This proposal would create a grant program that will al… [+3665 chars]",
  },
  {
    source: {
      id: "engadget",
      name: "Engadget",
    },
    author: "https://www.engadget.com/about/editors/mat-smith",
    title:
      "The Morning After: A ransomware gang is demanding $50 million from Acer",
    description:
      "Acer is reportedly suffering a ransomware attack, and we're taking a look at the future of Twitter.",
    url: "https://www.engadget.com/acer-ransomware-134043106.html",
    urlToImage:
      "https://s.yimg.com/os/creatr-uploaded-images/2021-03/3081d8c0-897f-11eb-8d49-1687efc8ea9a",
    publishedAt: "2021-03-20T13:40:43Z",
    content:
      "On Friday night, The Record and Bleeping Computer reported that PC manufacturer Acer has been hit by a ransomware attack on its back-office network. According to information theyve seen posted on the… [+5101 chars]",
  },
  {
    source: {
      id: null,
      name: "Vesti.ru",
    },
    author: null,
    title: "2279790",
    description:
      "Основатель Tesla Илон Маск опроверг сообщения о том, что электрокары компании могут использоваться с целью шпионажа в Китае.",
    url: "https://www.vesti.ru/video/2279790",
    urlToImage: "https://cdn-st1.rtr-vesti.ru/vh/pictures/xw/120/617/2.jpg",
    publishedAt: "2021-03-20T13:38:00Z",
    content: ". , \r\n Ctrl+Enter.",
  },
  {
    source: {
      id: null,
      name: "Slashdot.org",
    },
    author: "feedfeeder",
    title:
      "Musk says Tesla would be shut down if its cars spied in China, elsewhere - Fox Business",
    description:
      "Musk says Tesla would be shut down if its cars spied in China, elsewhereFox Business China to Restrict Tesla Use by Military and State EmployeesThe Wall Street Journal China restricting Tesla use uncovers a significant challenge for Elon Musk: expertYahoo Fin…",
    url: "https://slashdot.org/firehose.pl?op=view&amp;id=144123394",
    urlToImage: null,
    publishedAt: "2021-03-20T13:32:49Z",
    content:
      "The Fine Print: The following comments are owned by whoever posted them. We are not responsible for them in any way.",
  },
  {
    source: {
      id: null,
      name: "Trouw.nl",
    },
    author: "Vincent Dekker",
    title:
      "Het lijkt erop dat er binnenkort een schreeuwend gebrek aan batterijen zal zijn",
    description:
      "Nieuwe auto's in Europa moeten in 2030 37,5 procent minder CO2 uitstoten. Nieuwe auto's in Europa moeten in 2030 allemaal elektrisch zijn. Volkswagen denkt in 2030 niet 30 procent maar al 60 procent elektrische auto's te verkopen. En het gaat batterijen maken…",
    url:
      "https://www.trouw.nl/duurzaamheid-natuur/het-lijkt-erop-dat-er-binnenkort-een-schreeuwend-gebrek-aan-batterijen-zal-zijn~bc3c877d/",
    urlToImage:
      "https://images0.persgroep.net/rcs/qSKzQa6Hi9kS0o8CFMby0KCjyiY/diocontent/153473056/_fitwidth/763?appId=93a17a8fd81db0de025c8abd1cca1279&quality=0.8",
    publishedAt: "2021-03-20T13:28:00Z",
    content:
      "Nieuwe auto's in Europa moeten in 2030 37,5 procent minder CO2 uitstoten. Nieuwe auto's in Europa moeten in 2030 allemaal elektrisch zijn. Volkswagen denkt in 2030 niet 30 procent maar al 60 procent … [+6907 chars]",
  },
  {
    source: {
      id: null,
      name: "CleanTechnica",
    },
    author: "Zachary Shahan",
    title: "Attacks On Elon Musk For His Wealth Are Truly Ridiculous",
    description:
      "There are humongous issues with inequality in the world at large and in the United States in particular, and that growing problem in the United States has been leading us to a more and more unstable place. It’s one of the top problems facing the United States…",
    url:
      "https://cleantechnica.com/2021/03/20/attacks-on-elon-musk-for-his-wealth-are-ridiculous/",
    urlToImage:
      "https://cleantechnica.com/files/2021/03/Screen-Shot-2021-03-20-at-9.17.32-AM.png",
    publishedAt: "2021-03-20T13:21:23Z",
    content:
      "There are humongous issues with inequality in the world at large and in the United States in particular, and that growing problem in the United States has been leading us to a more and more unstable … [+5438 chars]",
  },
  {
    source: {
      id: null,
      name: "Tech Times",
    },
    author: "Lee Mercado",
    title:
      "Elon Musk to China: Tesla Would Be Shut Down If Cars Were Used for Spying",
    description:
      "Tesla CEO denies China's claims that the company uses its car to spy on any country.",
    url:
      "https://www.techtimes.com/articles/258233/20210320/elon-musk-china-tesla-shut-down-cars-used-spying.htm",
    urlToImage:
      "https://1734811051.rsc.cdn77.org/data/images/full/382214/telsa-ceo-elon-musk-unveils-new-vehicle.jpg",
    publishedAt: "2021-03-20T13:15:33Z",
    content:
      "Tesla CEO Elon Musk denied China's claims that their cars were being used to spy on their country, saying that the global lockdown will face the company would be shut down if they did.\r\nAccording to … [+3449 chars]",
  },
  {
    source: {
      id: null,
      name: "Protothema.gr",
    },
    author: "Πρώτο Θέμα",
    title: "Έλον Μασκ: Θα βάλω οριστικό λουκέτο στην Tesla αν…",
    description:
      "Έλον Μασκ: Θα βάλω οριστικό λουκέτο στην Tesla αν… | Οικονομία",
    url:
      "https://www.protothema.gr/economy/article/1106468/elon-mask-tha-valo-oristiko-louketo-stin-tesla-an-other/",
    urlToImage:
      "https://i1.prth.gr/images/640x360share/files/2021-03-20/musk.jpg",
    publishedAt: "2021-03-20T13:13:17Z",
    content:
      ': Tesla \r\no \r\n span"], "TriggerActiveClass": "active" }\'&gt;',
  },
  {
    source: {
      id: "cnn",
      name: "CNN",
    },
    author: "Opinion by Jim Breyer for CNN Business Perspectives",
    title:
      "VC Jim Breyer: Silicon Valley still has a bright future. But Austin's time is now",
    description:
      "My decision to start Breyer Capital Austin has more to do with Austin's strengths than any of the Bay Area's flaws.",
    url:
      "https://www.cnn.com/2021/03/20/perspectives/jim-breyer-austin-silicon-valley/index.html",
    urlToImage:
      "https://cdn.cnn.com/cnnnext/dam/assets/210319175609-austin-skyline-file-super-tease.jpg",
    publishedAt: "2021-03-20T13:11:10Z",
    content:
      "Jim Breyer is the founder and CEO of Breyer Capital, a premier venture capital firm based in Menlo Park, California and Austin, Texas. The opinions expressed in this commentary are his own. \r\nMore th… [+5553 chars]",
  },
  {
    source: {
      id: "independent",
      name: "Independent",
    },
    author: "Yilei Sun",
    title: "Elon Musk says Tesla would be shut down if its cars spied in China",
    description:
      "Comments come after Chinese military banned firm’s vehicles from entering its complexes citing security concerns over cameras",
    url:
      "https://www.independent.co.uk/asia/east-asia/elon-musk-tesla-china-spying-b1819970.html",
    urlToImage:
      "https://static.independent.co.uk/2021/03/15/12/elon%20musk%20technoking%20tesla.jpg?width=1200&auto=webp&quality=75",
    publishedAt: "2021-03-20T13:05:27Z",
    content:
      "Tesla chief executive Elon Musk said on Saturday his company would be shut down if its cars were used to spy, his first comments on news that Chinas military has banned Teslas from its facilities.\r\nT… [+1211 chars]",
  },
  {
    source: {
      id: null,
      name: "CarScoops",
    },
    author: "Chris Chilton",
    title:
      "BMW i4, Kia Stinger’s 45HP Boost, Hyundai Staria, Peugeot 308 Hybrids: Your Weekly Brief",
    description:
      "Plus Sabine Schmitz loses cancer fight and Ford, GM and Stellantis offer lease extensions.",
    url:
      "https://www.carscoops.com/2021/03/bmw-i4-kia-stingers-45hp-boost-hyundai-staria-peugeot-308-hybrids-your-weekly-brief/",
    urlToImage:
      "https://www.carscoops.com/wp-content/uploads/2021/03/WEEKLYM.jpg",
    publishedAt: "2021-03-20T13:04:28Z",
    content:
      "Morning! Welcome to our weekly digest of automotive news from around the globe, starting with…\r\nKia Stinger Gets More Power, Costs More Money\r\nKias 2022 Stinger sports sedan costs $3,000 more than th… [+2260 chars]",
  },
  {
    source: {
      id: null,
      name: "Frandroid",
    },
    author: "Bob Jouy",
    title: "Comment préparer ses longs trajets en voiture électrique ?",
    description:
      "En 2021, les grands trajets en voiture électrique peuvent être soit une formalité, soit un casse-tête. Des outils sont à notre disposition pour anticiper les consommations et les durées de charge, mais peut-on vraiment bien planifier ses déplacements à traver…",
    url:
      "https://www.frandroid.com/produits-android/automobile/voitures-electriques/869433_comment-preparer-ses-longs-trajets-en-voiture-electrique ",
    urlToImage:
      "https://images.frandroid.com/wp-content/uploads/2021/03/jp-valery-s5arluxtyg-unsplash-scaled.jpg",
    publishedAt: "2021-03-20T13:00:48Z",
    content:
      "En 2021, les grands trajets en voiture électrique peuvent être soit une formalité, soit un casse-tête. Des outils sont à notre disposition pour anticiper les consommations et les durées de charge, ma… [+17061 chars]",
  },
];
