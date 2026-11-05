export interface RawExamInput {
  id: string;
  teil: 1 | 2 | 3;
  indexInTeil: number;
  title: string;
  firstWords: string;
  code: string;
  altCodeNote?: string;
  richtigMap: Record<string, { text: string; triggers: string[] }>;
  falschMap?: Record<string, string>;
  darijaStory: string;
  darijaRhythmHint?: string;
  audioSlug: string;
  isNew2026?: boolean;
  isTrap?: boolean;
  trapGroupId?: string;
  trapVersionLabel?: string;
  trapDistinguishingWord?: string;
}

export const TEIL1_RAW_EXAMS: RawExamInput[] = [
  {
    id: 't1-1',
    teil: 1,
    indexInTeil: 1,
    title: 'Lufthansa (الأساسي)',
    firstWords: 'Bei der Lufthansa ist die Zahl der verkauften Tickets...',
    code: '23',
    richtigMap: {
      '2': {
        text: 'Bei der Lufthansa ist die Zahl der verkauften Tickets gestiegen.',
        triggers: ['Zahl der verkauften Tickets gestiegen', 'Tickets gestiegen'],
      },
      '3': {
        text: 'Die Lufthansa hat eine andere Fluggesellschaft übernommen.',
        triggers: ['andere Fluggesellschaft übernommen', 'übernommen'],
      },
    },
    falschMap: {
      '1': 'Die Lufthansa musste im letzten Jahr hohe Verluste hinnehmen.',
      '4': 'Langstreckenflüge ab Frankfurt werden ab sofort eingestellt.',
      '5': 'Das Bodenpersonal hat für nächste Woche einen Streik angekündigt.',
    },
    darijaStory:
      'لوفتهانزا (23): باعت تذاكر بزاف (Tickets gestiegen) وشرات شركة طيران أخرى (übernommen).',
    audioSlug: 'lufthansa.m4a',
  },
  {
    id: 't1-2',
    teil: 1,
    indexInTeil: 2,
    title: 'Lufthansa (المعدل)',
    firstWords: 'Bei der Lufthansa nahmen die Ticketverkäufe zu...',
    code: '23',
    richtigMap: {
      '2': {
        text: 'Die Ticketverkäufe bei der Lufthansa nahmen deutlich zu.',
        triggers: ['Ticketverkäufe nahmen zu', 'nahmen zu'],
      },
      '3': {
        text: 'Das Unternehmen hat eine andere Fluggesellschaft gekauft.',
        triggers: ['andere Fluggesellschaft gekauft', 'gekauft'],
      },
    },
    falschMap: {
      '1': 'Die Flugpreise innerhalb Deutschlands wurden halbiert.',
      '4': 'Alle Kurzstreckenflüge werden durch Züge ersetzt.',
      '5': 'Neue Flugzeuge werden erst in fünf Jahren geliefert.',
    },
    darijaStory:
      'لوفتهانزا المعدل (23): نفس الكود 23! التذاكر زادو (nahmen zu) وشرات شركة أخرى (gekauft).',
    audioSlug: 'lufthansa.m4a',
  },
  {
    id: 't1-3',
    teil: 1,
    indexInTeil: 3,
    title: 'in den Alpen (الأساسي ⚠️)',
    firstWords: 'In den Alpen sind laut Statistik Unfälle selten...',
    code: '23',
    isTrap: true,
    trapGroupId: 'trap-alpen',
    trapVersionLabel: 'الأساسي',
    trapDistinguishingWord: 'Unfälle selten',
    richtigMap: {
      '2': {
        text: 'Viele Unfälle beim Wandern sind auf Leichtsinn zurückzuführen.',
        triggers: ['Unfälle beim Wandern', 'Leichtsinn zurückzuführen'],
      },
      '3': {
        text: 'Viele Wintersportler überschätzen ihr eigenes Können.',
        triggers: ['Wintersportler überschätzen ihr Können', 'überschätzen'],
      },
    },
    falschMap: {
      '1': 'In den Alpen sind laut Statistik Unfälle selten geworden.',
      '4': 'Die Bergrettung verfügt über zu wenige Hubschrauber.',
      '5': 'Wanderwege über 2.000 Meter werden im Herbst komplett gesperrt.',
    },
    darijaStory:
      'جبال الألب الأساسي (23): الحوادث فالمشي سببها التهور (Leichtsinn)، وصحاب التزلج كيتصحاب ليهم راسهم واعرين (überschätzen Können).',
    audioSlug: 'alpen.m4a',
  },
  {
    id: 't1-4',
    teil: 1,
    indexInTeil: 4,
    title: 'in den Alpen (المعدل ⚠️)',
    firstWords: 'Die Zahl der Bergunfälle in den Alpen ist gesunken...',
    code: '235',
    isTrap: true,
    trapGroupId: 'trap-alpen',
    trapVersionLabel: 'المعدل',
    trapDistinguishingWord: 'Bergunfälle ... gesunken',
    richtigMap: {
      '2': {
        text: 'Unfälle beim Wandern sind häufig auf Leichtsinn zurückzuführen.',
        triggers: ['Unfälle beim Wandern', 'Leichtsinn'],
      },
      '3': {
        text: 'Wintersportler überschätzen oft ihr sportliches Können.',
        triggers: ['Wintersportler überschätzen', 'Können'],
      },
      '5': {
        text: 'Viele Verunglückte hatten vor der Tour ihre Ausrüstung nicht geprüft.',
        triggers: ['vor der Tour ihre Ausrüstung nicht geprüft', 'Ausrüstung nicht geprüft'],
      },
    },
    falschMap: {
      '1': 'Die Zahl der Bergunfälle in den Alpen ist im letzten Jahr stark gesunken.',
      '4': 'Bergführer sind ab diesem Sommer für alle Touristen verpflichtend.',
    },
    darijaStory:
      'جبال الألب المعدل (235): نفس الجوج اللولين (التهور + الغرور) وزيد عليهم الجملة 5: ما كيقلبوش المعدات ديالهم قبل الخرجة (Ausrüstung nicht geprüft)!',
    audioSlug: 'alpen.m4a',
  },
  {
    id: 't1-5',
    teil: 1,
    indexInTeil: 5,
    title: 'Bierkonsum (الأساسي)',
    firstWords: 'Der Bierkonsum in Deutschland...',
    code: '24',
    richtigMap: {
      '2': {
        text: 'In Europa verbraucht nur ein Land mehr Bier als Deutschland.',
        triggers: ['nur ein Land mehr Bier als Deutschland', 'nur ein Land mehr'],
      },
      '4': {
        text: 'Im Sommer kauften die Deutschen deutlich mehr Bier.',
        triggers: ['Im Sommer kauften die Deutschen mehr Bier', 'Im Sommer mehr Bier'],
      },
    },
    falschMap: {
      '1': 'Der Bierkonsum in Deutschland hat einen neuen historischen Rekord erreicht.',
      '3': 'Alkoholfreies Bier wird von den Brauereien kaum noch produziert.',
      '5': 'Die Biersteuer soll im kommenden Jahr abgeschafft werden.',
    },
    darijaStory:
      'البيرة الأساسي (24): دولة وحدة فـ أوروبا كتشرب البيرة كثر من ألمانيا (nur ein Land mehr)، وفالصيف الألمان كيشريو البيرة كثر (Im Sommer mehr Bier).',
    audioSlug: 'bierkonsum.m4a',
  },
  {
    id: 't1-6',
    teil: 1,
    indexInTeil: 6,
    title: 'Bierkonsum (المعدل)',
    firstWords: 'Der Bierkonsum in Deutschland hat sich verändert...',
    code: '24',
    richtigMap: {
      '2': {
        text: 'Nur ein europäisches Land hat einen höheren Bierverbrauch als Deutschland.',
        triggers: ['Nur ein europäisches Land', 'höheren Bierverbrauch'],
      },
      '4': {
        text: 'Im Sommer stieg der Bierabsatz in Deutschland spürbar an.',
        triggers: ['Im Sommer stieg der Bierabsatz', 'stieg der Bierabsatz'],
      },
    },
    falschMap: {
      '1': 'Deutsche Brauereien exportieren kein Bier mehr nach Asien.',
      '3': 'Junge Erwachsene trinken heute doppelt so viel Bier wie früher.',
      '5': 'Kleine regionale Brauereien mussten alle schließen.',
    },
    darijaStory:
      'البيرة المعدل (24): نفس الكود 24 ونفس المعنى (دولة وحدة كثر من ألمانيا + فالصيف كيتزاد البيع stieg Bierabsatz).',
    audioSlug: 'bierkonsum.m4a',
  },
  {
    id: 't1-7',
    teil: 1,
    indexInTeil: 7,
    title: 'Die Piloten der Lufthansa',
    firstWords: 'Die Piloten der Lufthansa...',
    code: '35',
    richtigMap: {
      '3': {
        text: 'Der Streik im April dauerte länger als einen Tag.',
        triggers: ['Streik im April dauerte länger als einen Tag', 'länger als einen Tag'],
      },
      '5': {
        text: 'Für das 3. Quartal werden wieder bessere Zahlen erwartet.',
        triggers: ['3. Quartal', 'bessere Zahlen erwartet'],
      },
    },
    falschMap: {
      '1': 'Die Piloten der Lufthansa haben heute Morgen einen neuen Streik begonnen.',
      '2': 'Alle Flüge innerhalb Europas fielen im gesamten Frühjahr aus.',
      '4': 'Die Gewerkschaft fordert kürzere Urlaubszeiten für neue Piloten.',
    },
    darijaStory:
      'طيارين لوفتهانزا (35): الإضراب فـ أبريل دوز كثر من نهار (Streik länger als einen Tag)، وفالربع الثالث كتسناهم أرقام مزيانة (3. Quartal bessere Zahlen).',
    audioSlug: 'piloten.m4a',
  },
  {
    id: 't1-8',
    teil: 1,
    indexInTeil: 8,
    title: 'Bio-Siegels',
    firstWords: 'Wegen des Bio-Siegels kaufen Verbraucher...',
    code: '15',
    richtigMap: {
      '1': {
        text: 'Verbraucher kaufen immer häufiger Bio-Lebensmittel im Supermarkt.',
        triggers: ['Verbraucher kaufen häufiger Bio-Lebensmittel', 'kaufen häufiger Bio'],
      },
      '5': {
        text: 'Für manche Kunden sind Bio-Produkte im Alltag noch zu teuer.',
        triggers: ['Bio-Produkte zu teuer', 'zu teuer'],
      },
    },
    falschMap: {
      '2': 'Das staatliche Bio-Siegel wird im nächsten Monat abgeschafft.',
      '3': 'Deutschland importiert überhaupt kein Bio-Gemüse aus dem Ausland.',
      '4': 'Discounter dürfen keine Produkte mit dem Bio-Siegel verkaufen.',
    },
    darijaStory:
      'بيو سيغل (15): الناس ولاو كيشريو الماكلة Bio بزاف (kaufen häufiger Bio)، ولكن لبعض الكليان راها غالية بزاف (zu teuer).',
    audioSlug: 'biosiegel.m4a',
  },
  {
    id: 't1-9',
    teil: 1,
    indexInTeil: 9,
    title: 'In der Europäischen Union',
    firstWords: 'In der Europäischen Union gibt es immer mehr...',
    code: '12',
    richtigMap: {
      '1': {
        text: 'In der EU gibt es immer mehr ältere Erwerbstätige.',
        triggers: ['ältere Erwerbstätige', 'immer mehr ältere'],
      },
      '2': {
        text: 'Die Zahl der Unfälle am Arbeitsplatz ist in der EU gesunken.',
        triggers: ['Unfälle am Arbeitsplatz ist gesunken', 'Arbeitsplatz gesunken'],
      },
    },
    falschMap: {
      '3': 'Das Rentenalter wurde in allen EU-Staaten auf 60 Jahre gesenkt.',
      '4': 'Im Baugewerbe gibt es überhaupt keine Sicherheitsvorschriften mehr.',
      '5': 'Junge Arbeitnehmer wechseln nie ihren ersten Arbeitgeber.',
    },
    darijaStory:
      'الاتحاد الأوروبي (12): الناس الكبار باقين خدامين كثر (ältere Erwerbstätige)، وحوادث الخدمة نقصات (Unfälle am Arbeitsplatz gesunken).',
    audioSlug: 'eu.m4a',
  },
  {
    id: 't1-10',
    teil: 1,
    indexInTeil: 10,
    title: 'Erdbeben',
    firstWords: 'Nach dem Erdbeben verbrachten viele Menschen...',
    code: '15',
    richtigMap: {
      '1': {
        text: 'Viele Menschen verbrachten die Nacht nach dem Erdbeben im Freien.',
        triggers: ['verbrachten die Nacht im Freien', 'Nacht im Freien'],
      },
      '5': {
        text: 'Manche Straßen in den betroffenen Gebieten sind derzeit unpassierbar.',
        triggers: ['Straßen in den betroffenen Gebieten sind unpassierbar', 'unpassierbar'],
      },
    },
    falschMap: {
      '2': 'Das Erdbeben wurde von den Experten schon eine Woche vorher angekündigt.',
      '3': 'Alle Krankenhäuser in der Region wurden vollständig zerstört.',
      '4': 'Internationale Hilfsorganisationen dürfen nicht in das Gebiet einreisen.',
    },
    darijaStory:
      'الزلزال (15): الناس باتو فالزنقة على برا (Nacht im Freien)، وبعض الطرقان تقطعو (Straßen unpassierbar).',
    audioSlug: 'erdbeben.m4a',
  },
  {
    id: 't1-11',
    teil: 1,
    indexInTeil: 11,
    title: 'Bürger suchten nach dem Beben (جديد 2026 🔥)',
    firstWords: 'Bürger suchten nach dem Beben im Freien Schutz...',
    code: '15',
    isNew2026: true,
    richtigMap: {
      '1': {
        text: 'Bürger suchten nach dem Beben im Freien Schutz vor weiteren Nachbeben.',
        triggers: ['Bürger suchten nach dem Beben im Freien Schutz', 'im Freien Schutz'],
      },
      '5': {
        text: 'Aufgrund von Straßenschäden sind einige Orte nur schwer erreichbar.',
        triggers: ['Straßenschäden', 'schwer erreichbar'],
      },
    },
    falschMap: {
      '2': 'Der Zugverkehr in der gesamten Region läuft ohne jede Einschränkung.',
      '3': 'Es gab keinerlei Schäden an älteren Wohngebäuden.',
      '4': 'Die Regierung lehnt jede finanzielle Soforthilfe ab.',
    },
    darijaStory:
      'الزلزال الجديد 2026 (15): نفس الكود 15! المواطنين خرجو لبرا يحميو راسهم (im Freien Schutz) وبعض البلايص صعيب توصل ليها بسبب الطرقان (Straßenschäden).',
    audioSlug: 'erdbeben_neu.m4a',
  },
  {
    id: 't1-12',
    teil: 1,
    indexInTeil: 12,
    title: 'Die Wahlbeteiligungen',
    firstWords: 'Die Wahlbeteiligung lag über dem Durchschnitt...',
    code: '13',
    richtigMap: {
      '1': {
        text: 'Die Wahlbeteiligung lag diesmal deutlich über dem Durchschnitt.',
        triggers: ['Wahlbeteiligung lag über dem Durchschnitt', 'über dem Durchschnitt'],
      },
      '3': {
        text: 'Jugendliche interessierten sich stark für die politische Wahl.',
        triggers: ['Jugendliche interessierten sich stark', 'Jugendliche'],
      },
    },
    falschMap: {
      '2': 'Briefwahl war bei dieser Abstimmung gesetzlich verboten.',
      '4': 'Die Wahllokale schlossen bereits um 12 Uhr mittags.',
      '5': 'Das amtliche Endergebnis wird erst in zwei Monaten veröffentlicht.',
    },
    darijaStory:
      'المشاركة فالانتخابات (13): المشاركة فاتت المعدل (über dem Durchschnitt)، والشباب اهتمو بزاف بالانتخابات (Jugendliche stark interessiert).',
    audioSlug: 'wahlbeteiligung.m4a',
  },
  {
    id: 't1-13',
    teil: 1,
    indexInTeil: 13,
    title: 'Die 50 Euro',
    firstWords: 'Der neue 50-Euro-Schein wird eingeführt...',
    code: '3',
    altCodeNote: 'أو 13 فـ Alpha',
    richtigMap: {
      '3': {
        text: 'Der neue 50-Euro-Schein ist deutlich sicherer gegen Fälschungen.',
        triggers: ['sicherer gegen Fälschungen', '50-Euro-Schein'],
      },
    },
    falschMap: {
      '1': 'Alte 50-Euro-Scheine verlieren schon morgen ihre Gültigkeit.',
      '2': 'Der neue Geldschein besteht komplett aus recyceltem Plastik.',
      '4': 'Automaten nehmen den neuen Schein im ersten Jahr überhaupt nicht an.',
      '5': 'Die Europäische Zentralbank schafft das Bargeld bis 2027 ab.',
    },
    darijaStory:
      'ورقة 50 أورو (3 أو 13): الورقة الجديدة ديال 50 أورو محمية مزيان ضد التزوير (sicherer gegen Fälschungen)، وهي الأكثر استعمالاً فـ أوروپا.',
    audioSlug: '50euro.m4a',
  },
  {
    id: 't1-14',
    teil: 1,
    indexInTeil: 14,
    title: 'Meeresküsten',
    firstWords: 'An den deutschen Meeresküsten mussten Rettungsschwimmer...',
    code: '25',
    richtigMap: {
      '2': {
        text: 'An den Meeresküsten mussten Rettungsschwimmer häufiger eingreifen.',
        triggers: ['Rettungsschwimmer mussten häufiger eingreifen', 'Rettungsschwimmer'],
      },
      '5': {
        text: 'Viele Badegäste beachten die Warnflaggen am Strand nicht.',
        triggers: ['beachten Warnflaggen nicht', 'Warnflaggen'],
      },
    },
    falschMap: {
      '1': 'Aufgrund des kalten Sommers blieben die Strände an Nord- und Ostsee leer.',
      '3': 'Alle Kinder unter zehn Jahren können in Deutschland sicher schwimmen.',
      '4': 'Das Baden im Meer ist ab August grundsätzlich kostenpflichtig.',
    },
    darijaStory:
      'سواحل البحر (25): المنقذين تدخلو بزاف (Rettungsschwimmer häufiger)، حيت العوامة ما كيحترموش الرايات ديال الخطر (Warnflaggen nicht beachten).',
    audioSlug: 'meereskuesten.m4a',
  },
  {
    id: 't1-15',
    teil: 1,
    indexInTeil: 15,
    title: 'Unwetterschäden',
    firstWords: 'Die Unwetterschäden in der Landwirtschaft...',
    code: '14',
    richtigMap: {
      '1': {
        text: 'Stürme und Hagel verursachten hohe Schäden in der Landwirtschaft.',
        triggers: ['Schäden in der Landwirtschaft', 'Stürme und Hagel'],
      },
      '4': {
        text: 'Die Versicherungen rechnen in diesem Jahr mit hohen Auszahlungen.',
        triggers: ['Versicherungen rechnen mit hohen Auszahlungen', 'hohen Auszahlungen'],
      },
    },
    falschMap: {
      '2': 'Der Süden Deutschlands blieb von den Unwettern völlig verschont.',
      '3': 'Die Feuerwehr musste in keiner einzigen Stadt ausrücken.',
      '5': 'Der Wetterdienst erwartet ab sofort monatelange Trockenheit ohne Regen.',
    },
    darijaStory:
      'أضرار العواصف (14): العواصف والتبروري خربو الفلاحة (Schäden in Landwirtschaft)، وشركات التأمين غتخلص فلوس صحيحة (Versicherungen hohe Auszahlungen).',
    audioSlug: 'unwetter.m4a',
  },
  {
    id: 't1-16',
    teil: 1,
    indexInTeil: 16,
    title: 'Bei den Europawahlen (CDU und CSU)',
    firstWords: 'Bei den Europawahlen bleiben CDU und CSU...',
    code: '135',
    richtigMap: {
      '1': {
        text: 'CDU und CSU bleiben bei den Europawahlen stärkste politische Kraft.',
        triggers: ['CDU und CSU bleiben stärkste Kraft', 'stärkste Kraft'],
      },
      '3': {
        text: 'Die Grünen konnten deutlich Stimmen hinzugewinnen.',
        triggers: ['Grünen konnten Stimmen hinzugewinnen', 'Stimmen hinzugewinnen'],
      },
      '5': {
        text: 'Die Wahlbeteiligung lag höher als beim letzten Mal.',
        triggers: ['Wahlbeteiligung höher als beim letzten Mal', 'Wahlbeteiligung höher'],
      },
    },
    falschMap: {
      '2': 'Die Sozialdemokraten erreichten über 50 Prozent der Stimmen.',
      '4': 'In Deutschland durften erstmals Kinder ab zwölf Jahren wählen.',
    },
    darijaStory:
      'انتخابات CDU/CSU (135 — الفرديين): حزب CDU بقى هو الأول (stärkste Kraft)، الخضر ربحو أصوات (Grünen hinzugewinnen)، والمشاركة طلعات (Wahlbeteiligung höher).',
    audioSlug: 'europawahlen_cdu.m4a',
  },
  {
    id: 't1-17',
    teil: 1,
    indexInTeil: 17,
    title: 'Bei den Europawahlen (Linksparteien)',
    firstWords: 'Bei den Europawahlen mussten Linksparteien...',
    code: '35',
    richtigMap: {
      '3': {
        text: 'Rechtspopulistische Parteien gewannen in mehreren Ländern hinzu.',
        triggers: ['gewannen in mehreren Ländern', 'Rechtspopulistische Parteien'],
      },
      '5': {
        text: 'Die Wahlbeteiligung stieg im Vergleich zur letzten Wahl deutlich an.',
        triggers: ['Wahlbeteiligung stieg deutlich an', 'Wahlbeteiligung stieg'],
      },
    },
    falschMap: {
      '1': 'Die Linksparteien stellten in allen Mitgliedsstaaten die absolute Mehrheit.',
      '2': 'Das Europäische Parlament hat seinen Sitz dauerhaft nach Berlin verlegt.',
      '4': 'Weniger als zwanzig Prozent der Wahlberechtigten gingen zur Wahl.',
    },
    darijaStory:
      'انتخابات Linksparteien (35): الأحزاب الشعبوية ربحات فعدة دول (gewannen in mehreren Ländern)، ونسبة المشاركة طلعات (Wahlbeteiligung stieg).',
    audioSlug: 'europawahlen_links.m4a',
  },
  {
    id: 't1-18',
    teil: 1,
    indexInTeil: 18,
    title: 'BILD AM SONNTAG',
    firstWords: 'Laut einer Umfrage der Bild am Sonntag...',
    code: '123',
    richtigMap: {
      '1': {
        text: 'Die Mehrheit der Deutschen ist mit dem Gesundheitssystem zufrieden.',
        triggers: ['Mehrheit der Deutschen', 'Gesundheitssystem zufrieden'],
      },
      '2': {
        text: 'Viele Patienten klagen über lange Wartezeiten beim Facharzt.',
        triggers: ['klagen über lange Wartezeiten', 'lange Wartezeiten'],
      },
      '3': {
        text: 'Besonders auf dem Land fehlen immer mehr Hausärzte.',
        triggers: ['Auf dem Land fehlen Hausärzte', 'fehlen Hausärzte'],
      },
    },
    falschMap: {
      '4': 'Krankenkassenbeiträge werden für alle Versicherten komplett gestrichen.',
      '5': 'Krankenhäuser auf dem Land haben zu viele freie Ärzte.',
    },
    darijaStory:
      'جريدة Bild am Sonntag (123 — الثلاثة اللولين): الألمان راضيين على الصحة (zufrieden)، ولكن كيتشكاو من النوبة الطويلة (lange Wartezeiten)، وطباء العائلة ناقصين فالبوادي (Auf dem Land fehlen Hausärzte).',
    audioSlug: 'bild.m4a',
  },
  {
    id: 't1-19',
    teil: 1,
    indexInTeil: 19,
    title: 'Deutsche Filmmuseum',
    firstWords: 'Das Deutsche Filmmuseum zeigt eine neue...',
    code: '24',
    richtigMap: {
      '2': {
        text: 'Die Sonderausstellung zeigt originale Kostüme und Requisiten.',
        triggers: ['Kostüme und Requisiten', 'Sonderausstellung'],
      },
      '4': {
        text: 'Besucher können im Museum selbst berühmte Filmszenen nachspielen.',
        triggers: ['selbst Filmszenen nachspielen', 'Filmszenen nachspielen'],
      },
    },
    falschMap: {
      '1': 'Das Deutsche Filmmuseum wird wegen Renovierung für drei Jahre geschlossen.',
      '3': 'Der Eintritt ist nur für professionelle Schauspieler gestattet.',
      '5': 'Fotografieren und Filmen ist in allen interaktiven Räumen strengstens untersagt.',
    },
    darijaStory:
      'متحف الأفلام (24): المعرض فيه حوايج وديكورات الأفلام (Kostüme und Requisiten)، والزوار يقدرو يمثلو مشاهد بيديهم (Filmszenen nachspielen).',
    audioSlug: 'filmmuseum.m4a',
  },
  {
    id: 't1-20',
    teil: 1,
    indexInTeil: 20,
    title: 'Der Bau (Dubai)',
    firstWords: 'Der Bau des neuen Turms in Dubai...',
    code: '135',
    richtigMap: {
      '1': {
        text: 'In Dubai entsteht derzeit ein neues Rekordgebäude.',
        triggers: ['In Dubai entsteht ein neues Rekordgebäude', 'Rekordgebäude'],
      },
      '3': {
        text: 'Die genaue Höhe des Turms bleibt bis zur Eröffnung geheim.',
        triggers: ['genaue Höhe bleibt bis zur Eröffnung geheim', 'Höhe geheim'],
      },
      '5': {
        text: 'Das Gebäude soll rechtzeitig zur Weltausstellung fertig sein.',
        triggers: ['zur Weltausstellung fertig sein', 'Weltausstellung fertig'],
      },
    },
    falschMap: {
      '2': 'Der neue Turm wird ausschließlich aus Holz errichtet.',
      '4': 'Touristen dürfen die Aussichtsplattformen später nicht betreten.',
    },
    darijaStory:
      'برج دبي (135 — الفرديين): كيبنيو برج قياسي فدبي (Rekordgebäude)، الطول ديالو سري (Höhe geheim)، وغادي يوجد للمعرض العالمي (Weltausstellung fertig).',
    audioSlug: 'dubai.m4a',
  },
  {
    id: 't1-21',
    teil: 1,
    indexInTeil: 21,
    title: 'Die Zahl der Arbeitslosen (Mexiko und Russland)',
    firstWords: 'Die Zahl der Arbeitslosen unter Jugendlichen...',
    code: '124',
    richtigMap: {
      '1': {
        text: 'Weltweit suchen weiterhin Millionen Jugendliche eine feste Arbeit.',
        triggers: ['Millionen Jugendliche Arbeit', 'Weltweit suchen'],
      },
      '2': {
        text: 'In Mexiko und Russland sank die Jugendarbeitslosigkeit zuletzt.',
        triggers: ['Mexiko und Russland sank', 'Jugendarbeitslosigkeit'],
      },
      '4': {
        text: 'Eine gute Ausbildung schützt am besten vor Arbeitslosigkeit.',
        triggers: ['Gute Ausbildung schützt vor Arbeitslosigkeit', 'Gute Ausbildung schützt'],
      },
    },
    falschMap: {
      '3': 'In allen Industrieländern liegt die Jugendarbeitslosigkeit bei null Prozent.',
      '5': 'Ein Universitätsstudium garantiert heute nirgendwo mehr ein Einkommen.',
    },
    darijaStory:
      'البطالة فالمكسيك وروسيا (124): الملايين د الشباب كيقلبو على خدمة، فالمكسيك وروسيا البطالة هبطات (Mexiko und Russland sank)، والتكوين المزيان كيحمي من البطالة (Gute Ausbildung schützt).',
    audioSlug: 'arbeitslosen.m4a',
  },
  {
    id: 't1-22',
    teil: 1,
    indexInTeil: 22,
    title: 'Die Stadt Friedrichsberg',
    firstWords: 'Die Stadt Friedrichsberg plant ein neues Verkehrskonzept...',
    code: '235',
    richtigMap: {
      '2': {
        text: 'Die Innenstadt von Friedrichsberg soll künftig autofrei werden.',
        triggers: ['Innenstadt soll autofrei werden', 'autofrei'],
      },
      '3': {
        text: 'Manche Einzelhändler befürchten dadurch einen Umsatzrückgang.',
        triggers: ['Einzelhändler befürchten Umsatzrückgang', 'Umsatzrückgang'],
      },
      '5': {
        text: 'Am Wochenende sind kostenlose Busse für Besucher geplant.',
        triggers: ['Kostenlose Busse am Wochenende', 'Kostenlose Busse'],
      },
    },
    falschMap: {
      '1': 'In Friedrichsberg werden neue Parkhäuser direkt auf dem Marktplatz gebaut.',
      '4': 'Fahrradfahren wird in der gesamten Fußgängerzone dauerhaft verboten.',
    },
    darijaStory:
      'مدينة فريدريشسبيرغ (235): وسط المدينة غيولي بلا طوموبيلات (autofrei)، التجار خايفين ينقص البيع (Einzelhändler befürchten)، والطوبيسات فابور فالويكاند (Kostenlose Busse).',
    audioSlug: 'friedrichsberg.m4a',
  },
  {
    id: 't1-23',
    teil: 1,
    indexInTeil: 23,
    title: 'Studentenparty in Frankreich',
    firstWords: 'Bei einer Studentenparty in Frankreich...',
    code: '35',
    richtigMap: {
      '3': {
        text: 'Über Facebook wurden versehentlich Tausende Gäste eingeladen.',
        triggers: ['Über Facebook wurden Tausende Gäste eingeladen', 'Facebook Tausende Gäste'],
      },
      '5': {
        text: 'Die Polizei musste anrücken und die große Feier auflösen.',
        triggers: ['Polizei musste die Feier auflösen', 'Feier auflösen'],
      },
    },
    falschMap: {
      '1': 'Die Veranstaltung fand in einer gemieteten Sporthalle der Universität statt.',
      '2': 'Nur zwanzig enge Freunde kamen tatsächlich zu der Geburtstagsparty.',
      '4': 'Der Bürgermeister feierte bis zum Morgen mit den Studierenden mit.',
    },
    darijaStory:
      'حفلة الطلبة ففرنسا (35): تعرضو آلاف الناس فـ فيسبوك (Facebook Tausende Gäste)، والبوليس جاو سالاو الحفلة (Polizei Feier auflösen).',
    audioSlug: 'studentenparty.m4a',
  },
  {
    id: 't1-24',
    teil: 1,
    indexInTeil: 24,
    title: 'Die Sprecherin ist verheiratet',
    firstWords: 'Die Sprecherin ist verheiratet und berichtet...',
    code: '134',
    richtigMap: {
      '1': {
        text: 'Die Sprecherin ist glücklich verheiratet.',
        triggers: ['Die Sprecherin ist verheiratet', 'verheiratet'],
      },
      '3': {
        text: 'Ihr Mann arbeitet unter der Woche im Ausland.',
        triggers: ['Ihr Mann arbeitet im Ausland', 'Mann im Ausland'],
      },
      '4': {
        text: 'Sie führen gemeinsam eine Fernbeziehung am Wochenende.',
        triggers: ['Fernbeziehung am Wochenende', 'Fernbeziehung'],
      },
    },
    falschMap: {
      '2': 'Das Ehepaar wohnt seit zehn Jahren zusammen in derselben Kleinstadt.',
      '5': 'Die Sprecherin möchte ihren eigenen Beruf sofort aufgeben.',
    },
    darijaStory:
      'المتحدثة مزوجة (134): السيدة مزوجة (verheiratet)، راجلها خدام برا (Mann im Ausland)، وكيتلاقاو فالويكاند (Fernbeziehung).',
    audioSlug: 'verheiratet.m4a',
  },
  {
    id: 't1-25',
    teil: 1,
    indexInTeil: 25,
    title: 'Ein deutsches Schiff',
    firstWords: 'Ein deutsches Forschungsschiff ist aufgebrochen...',
    code: '125',
    richtigMap: {
      '1': {
        text: 'Ein deutsches Forschungsschiff erforscht das Polarmeer.',
        triggers: ['erforscht das Polarmeer', 'Polarmeer'],
      },
      '2': {
        text: 'Wissenschaftler an Bord untersuchen die Folgen des Klimawandels.',
        triggers: ['untersuchen den Klimawandel', 'Klimawandel'],
      },
      '5': {
        text: 'Die wissenschaftliche Expedition dauert mehrere Monate.',
        triggers: ['Expedition dauert mehrere Monate', 'mehrere Monate'],
      },
    },
    falschMap: {
      '3': 'Auf dem Schiff reisen überwiegend zahlende Kreuzfahrttouristen mit.',
      '4': 'Die Mission musste schon nach zwei Tagen wegen Eises abgebrochen werden.',
    },
    darijaStory:
      'السفينة الألمانية (125): سفينة ألمانية كتبحث فالمحيط القطبي (Polarmeer)، العلماء كيدرسو تغير المناخ (Klimawandel)، والرحلة فيها شهور (mehrere Monate).',
    audioSlug: 'schiff.m4a',
  },
  {
    id: 't1-26',
    teil: 1,
    indexInTeil: 26,
    title: 'Vögel',
    firstWords: 'Viele Zugvögel verändern ihr Verhalten...',
    code: '345',
    richtigMap: {
      '3': {
        text: 'Wegen milder Winter bleiben manche Vögel ganzjährig in Mitteleuropa.',
        triggers: ['milder Winter bleiben manche Vögel', 'milde Winter bleiben'],
      },
      '4': {
        text: 'Naturschützer raten im Winter zur richtigen Fütterung der Vögel.',
        triggers: ['richtigen Fütterung', 'Naturschützer raten'],
      },
      '5': {
        text: 'Die natürlichen Lebensräume vieler Vogelarten sind stark bedroht.',
        triggers: ['Lebensräume der Vögel sind bedroht', 'Lebensräume bedroht'],
      },
    },
    falschMap: {
      '1': 'In Deutschland hat sich die Zahl der Singvögel in fünf Jahren verdoppelt.',
      '2': 'Das Füttern von Wildvögeln auf dem Balkon wird bundesweit mit Bußgeld bestraft.',
    },
    darijaStory:
      'الطيور (345 — الثلاثة اللخرين): بسبب الشتاء الدافئ الطيور كتبقى فـ أوروبا (milde Winter bleiben)، حماة الطبيعة كينصحو بالماكلة الصحيحة (Fütterung)، والمساكن ديالهم مهددة (Lebensräume bedroht).',
    audioSlug: 'voegel.m4a',
  },
  {
    id: 't1-27',
    teil: 1,
    indexInTeil: 27,
    title: 'Insel Bali',
    firstWords: 'Auf der Insel Bali kämpfen Bewohner gegen...',
    code: '45',
    richtigMap: {
      '4': {
        text: 'Touristen produzieren auf Bali große Mengen Plastikmüll.',
        triggers: ['große Mengen Plastikmüll', 'Plastikmüll'],
      },
      '5': {
        text: 'Schüler sammeln Plastikmüll, um damit ihre Schulgebühren zu bezahlen.',
        triggers: ['Schüler sammeln Müll für ihre Schulgebühren', 'Schulgebühren'],
      },
    },
    falschMap: {
      '1': 'Die Insel Bali hat den internationalen Tourismus komplett verboten.',
      '2': 'Alle Hotels auf Bali sind seit zehn Jahren vollständig plastikfrei.',
      '3': 'Die Schulen auf der Insel sind während der Regenzeit geschlossen.',
    },
    darijaStory:
      'جزيرة بالي (45 — الجوج اللخرين): السياح كيخليو الزبل د البلاستيك بزاف (Plastikmüll)، والتلاميذ كيجمعو الزبل باش يخلصو قرايتهم (Schüler sammeln Müll).',
    audioSlug: 'bali.m4a',
  },
  {
    id: 't1-28',
    teil: 1,
    indexInTeil: 28,
    title: 'In Frankfurt haben Manager (München Lebensqualität)',
    firstWords: 'München bietet laut einer Studie die höchste Lebensqualität...',
    code: '123',
    richtigMap: {
      '1': {
        text: 'München bietet die höchste Lebensqualität in Deutschland.',
        triggers: ['München bietet die höchste Lebensqualität', 'München höchste'],
      },
      '2': {
        text: 'Die österreichische Hauptstadt Wien belegt weltweit den ersten Platz.',
        triggers: ['Wien belegt weltweit den ersten Platz', 'Wien ersten Platz'],
      },
      '3': {
        text: 'Wichtige Kriterien waren Sicherheit, Umwelt und öffentlicher Verkehr.',
        triggers: ['Kriterien waren Sicherheit, Umwelt und Verkehr', 'Kriterien'],
      },
    },
    falschMap: {
      '4': 'Keine einzige deutsche Stadt schaffte es unter die besten fünfzig.',
      '5': 'Bei der Studie wurden ausschließlich die Mietpreise verglichen.',
    },
    darijaStory:
      'جودة الحياة ميونخ وفيينا (123): ميونخ هي الأولى فـ ألمانيا (München höchste)، فيينا هي الأولى فالعالم (Wien ersten Platz)، والمعايير هما الأمن والبيئة والنقل (Kriterien).',
    audioSlug: 'frankfurt_manager.m4a',
  },
  {
    id: 't1-29',
    teil: 1,
    indexInTeil: 29,
    title: 'Die Bundesländer (Karneval)',
    firstWords: 'In vielen Bundesländern ist die Karnevalszeit...',
    code: '125',
    richtigMap: {
      '1': {
        text: 'Die Karnevalszeit ist für viele Regionen ein wichtiger Wirtschaftsfaktor.',
        triggers: ['Karnevalszeit ist ein wichtiger Wirtschaftsfaktor', 'Wirtschaftsfaktor'],
      },
      '2': {
        text: 'Hotels und Gaststätten machen an den tollen Tagen hohe Umsätze.',
        triggers: ['Hotels und Gaststätten machen hohe Umsätze', 'hohe Umsätze'],
      },
      '5': {
        text: 'Die Polizei sorgt mit mehr Personal für die Sicherheit der Feiernden.',
        triggers: ['Polizei sorgt mit mehr Personal für Sicherheit', 'Polizei Sicherheit'],
      },
    },
    falschMap: {
      '3': 'Straßenumzüge finden in diesem Jahr nur noch in geschlossenen Hallen statt.',
      '4': 'Kostüme dürfen im öffentlichen Nahverkehr nicht mehr getragen werden.',
    },
    darijaStory:
      'الكارنافال فالـ Bundesländer (125): الكارنافال مهم للاقتصاد (Wirtschaftsfaktor)، الأوطيلات والمطاعم كيربحو مزيان (Hotels hohe Umsätze)، والبوليس كيزيدو الأمن (Polizei Sicherheit).',
    audioSlug: 'bundeslaender.m4a',
  },
  {
    id: 't1-30',
    teil: 1,
    indexInTeil: 30,
    title: 'Bei der Sportveranstaltung',
    firstWords: 'Bei der Sportveranstaltung am Sonntag...',
    code: '24',
    richtigMap: {
      '2': {
        text: 'Am großen Stadtmarathon nahmen tausende Läufer teil.',
        triggers: ['tausende Läufer teil', 'Marathon'],
      },
      '4': {
        text: 'Einige Straßen im Stadtzentrum waren für den Autoverkehr gesperrt.',
        triggers: ['Einige Straßen im Zentrum waren gesperrt', 'Straßen gesperrt'],
      },
    },
    falschMap: {
      '1': 'Wegen starken Regens musste der Marathon kurzfristig abgesagt werden.',
      '3': 'Nur Profisportler aus dem Ausland durften an den Start gehen.',
      '5': 'Alle Zuschauer mussten ein teures Ticket für die Innenstadt kaufen.',
    },
    darijaStory:
      'التظاهرة الرياضية (24): شاركو آلاف العدائين فالماراطون (tausende Läufer)، وبعض الطرقان فـ السنطر تسدو (Straßen gesperrt).',
    audioSlug: 'sportveranstaltung.m4a',
  },
  {
    id: 't1-31',
    teil: 1,
    indexInTeil: 31,
    title: 'Das Bundesfamilienministerium',
    firstWords: 'Das Bundesfamilienministerium hat neue Zahlen veröffentlicht...',
    code: '24',
    richtigMap: {
      '2': {
        text: 'Immer mehr Väter nehmen in Deutschland Elternzeit in Anspruch.',
        triggers: ['Mehr Väter nehmen Elternzeit in Anspruch', 'Väter Elternzeit'],
      },
      '4': {
        text: 'Der staatlich geförderte Ausbau von Kita-Plätzen geht weiter.',
        triggers: ['Ausbau von Kita-Plätzen geht weiter', 'Kita-Plätzen'],
      },
    },
    falschMap: {
      '1': 'Das Elterngeld wird ab dem kommenden Jahr vollständig gestrichen.',
      '3': 'In allen deutschen Großstädten gibt es bereits zu viele freie Kita-Plätze.',
      '5': 'Unternehmen dürfen Vätern keinen Urlaub mehr genehmigen.',
    },
    darijaStory:
      'وزارة الأسرة (24): الآباء ولاو كياخذو عطلة الأبوة كثر (Väter Elternzeit)، وبناء الحضانات غادي وكيتزاد (Kita-Plätze Ausbau).',
    audioSlug: 'familienministerium.m4a',
  },
  {
    id: 't1-32',
    teil: 1,
    indexInTeil: 32,
    title: 'Ein Treffen bei der Integrationsbeauftragten',
    firstWords: 'Ein Treffen bei der Integrationsbeauftragten...',
    code: '135',
    richtigMap: {
      '1': {
        text: 'Gezielte Sprachförderung soll schon im Kindergarten beginnen.',
        triggers: ['Sprachförderung soll schon im Kindergarten beginnen', 'Kindergarten'],
      },
      '3': {
        text: 'Lokale Vereine helfen aktiv bei der Integration vor Ort.',
        triggers: ['Vereine helfen bei der Integration', 'Vereine helfen'],
      },
      '5': {
        text: 'Ausländische Berufsabschlüsse sollen künftig schneller anerkannt werden.',
        triggers: ['Ausländische Abschlüsse sollen schneller anerkannt werden', 'schneller anerkannt'],
      },
    },
    falschMap: {
      '2': 'Kostenlose Sprachkurse für Erwachsene werden bundesweit eingestellt.',
      '4': 'Sportvereine erhalten keine staatlichen Fördermittel mehr.',
    },
    darijaStory:
      'اجتماع الاندماج (135 — الفرديين): اللغة تبدا من الروض (Kindergarten)، الجمعيات كتعاون فـ الاندماج (Vereine helfen)، والشواهد الأجنبية غيتعترف بيها دغيا (Abschlüsse schneller anerkannt).',
    audioSlug: 'integration.m4a',
  },
  {
    id: 't1-33',
    teil: 1,
    indexInTeil: 33,
    title: 'Frau Jürgens',
    firstWords: 'Frau Jürgens engagiert sich seit Jahren...',
    code: '345',
    richtigMap: {
      '3': {
        text: 'Frau Jürgens engagiert sich ehrenamtlich für alleinstehende Senioren.',
        triggers: ['engagiert sich ehrenamtlich für Senioren', 'ehrenamtlich Senioren'],
      },
      '4': {
        text: 'Das soziale Projekt wird finanziell von der Stadt unterstützt.',
        triggers: ['Projekt wird von der Stadt unterstützt', 'Stadt unterstützt'],
      },
      '5': {
        text: 'Für die Nachbarschaftshilfe werden weitere freiwillige Helfer gesucht.',
        triggers: ['Weitere freiwillige Helfer werden gesucht', 'freiwillige Helfer gesucht'],
      },
    },
    falschMap: {
      '1': 'Frau Jürgens arbeitet hauptberuflich als Ärztin im städtischen Klinikum.',
      '2': 'Die Teilnahme an den Seniorentreffen kostet fünfzig Euro pro Nachmittag.',
    },
    darijaStory:
      'السيدة يورغنس (345 — الثلاثة اللخرين): السيدة كتعاون الناس الكبار تطوعاً (ehrenamtlich Senioren)، المدينة كدعم المشروع (Stadt unterstützt)، وكيقلبو على متطوعين جداد (freiwillige Helfer gesucht).',
    audioSlug: 'frau_juergens.m4a',
  },
  {
    id: 't1-34',
    teil: 1,
    indexInTeil: 34,
    title: 'Konjunkturentwicklung negativ (Experten aus Bankenwelt)',
    firstWords: 'Experten aus der Bankenwelt bewerten die Konjunkturentwicklung...',
    code: '14',
    richtigMap: {
      '1': {
        text: 'Experten bewerten die aktuelle Konjunkturentwicklung negativ.',
        triggers: ['bewerten die Konjunkturentwicklung negativ', 'Konjunkturentwicklung negativ'],
      },
      '4': {
        text: 'Die deutschen Exporte gingen im letzten Quartal spürbar zurück.',
        triggers: ['Exporte gingen im letzten Quartal zurück', 'Exporte gingen zurück'],
      },
    },
    falschMap: {
      '2': 'Die Industrie meldet einen Rekordzuwachs bei neuen Auslandsaufträgen.',
      '3': 'Die Zinsen für Immobilienkredite wurden auf null Prozent gesenkt.',
      '5': 'Der private Konsum ist in diesem Halbjahr um zehn Prozent gestiegen.',
    },
    darijaStory:
      'خبراء الأبناك والاقتصاد (14): الخبراء كيشوفو الاقتصاد سلبي (Konjunkturentwicklung negativ)، والصادرات هبطات (Exporte gingen zurück).',
    audioSlug: 'konjunktur.m4a',
  },
  {
    id: 't1-35',
    teil: 1,
    indexInTeil: 35,
    title: 'Es ist unklar (TipTop الأساسي ⚠️)',
    firstWords: 'Es ist unklar, ob die Übernahme von TipTop...',
    code: '14',
    isTrap: true,
    trapGroupId: 'trap-tiptop',
    trapVersionLabel: 'الأساسي',
    trapDistinguishingWord: 'Es ist unklar',
    richtigMap: {
      '1': {
        text: 'Es ist noch unklar, ob die geplante Übernahme von TipTop gelingt.',
        triggers: ['Es ist unklar', 'Übernahme von TipTop'],
      },
      '4': {
        text: 'Bei der Fusion könnten zahlreiche Arbeitsplätze verloren gehen.',
        triggers: ['Arbeitsplätze verloren gehen', 'Arbeitsplätze verloren'],
      },
    },
    falschMap: {
      '2': 'Die Gewerkschaften haben dem Verkauf bereits ohne Bedingungen zugestimmt.',
      '3': 'Das Unternehmen TipTop möchte im nächsten Jahr zwanzig neue Fabriken eröffnen.',
      '5': 'Alle Mitarbeiter erhalten eine Gehaltserhöhung von fünfzehn Prozent.',
    },
    darijaStory:
      'تيب توب الأساسي (14): ما واضحش واش شراء شركة TipTop غينجح (Übernahme unklar)، والاندماج يقدر يضيع مناصب الشغل (Arbeitsplätze verloren).',
    audioSlug: 'tiptop.m4a',
  },
  {
    id: 't1-36',
    teil: 1,
    indexInTeil: 36,
    title: 'Es ist nicht sicher (TipTop المعدل ⚠️)',
    firstWords: 'Nicht sicher ist, ob die Übernahme von TipTop...',
    code: '14',
    altCodeNote: 'أو 13 فـ Alpha',
    isTrap: true,
    trapGroupId: 'trap-tiptop',
    trapVersionLabel: 'المعدل',
    trapDistinguishingWord: 'Nicht sicher ist',
    richtigMap: {
      '1': {
        text: 'Nicht sicher ist derzeit, ob die Übernahme von TipTop klappt.',
        triggers: ['Nicht sicher ist', 'Übernahme von TipTop klappt'],
      },
      '4': {
        text: 'Durch die geplante Fusion droht im Konzern ein Stellenverlust.',
        triggers: ['Fusion droht ein Stellenverlust', 'Stellenverlust'],
      },
    },
    falschMap: {
      '2': 'Die Kartellbehörde hat die Fusion bereits endgültig genehmigt.',
      '3': 'Neue Standorte in Süddeutschland werden sofort aufgebaut.',
      '5': 'Die Aktien von TipTop sind vom Börsenhandel ausgeschlossen.',
    },
    darijaStory:
      'تيب توب المعدل (14 / 13): عاقل غير على المعنى: الشراء ديال TipTop ماشي مضمون (nicht sicher)، وكاين خطر ضياع الخدامي (Stellenverlust)!',
    audioSlug: 'tiptop.m4a',
  },
  {
    id: 't1-37',
    teil: 1,
    indexInTeil: 37,
    title: 'Um Tickets zu gewinnen (Kärnten)',
    firstWords: 'Um Tickets für die Urlaubsreise nach Kärnten zu gewinnen...',
    code: '34',
    richtigMap: {
      '3': {
        text: 'Um Tickets zu gewinnen, muss man direkt im Radio anrufen.',
        triggers: ['Um Tickets zu gewinnen, muss man im Radio anrufen', 'im Radio anrufen'],
      },
      '4': {
        text: 'Die gewonnene Reise nach Kärnten schließt Halbpension im Hotel ein.',
        triggers: ['Reise nach Kärnten schließt Halbpension ein', 'Halbpension'],
      },
    },
    falschMap: {
      '1': 'Die Teilnahme am Gewinnspiel ist nur per Postkarte möglich.',
      '2': 'Die Reise findet erst im übernächsten Winter statt.',
      '5': 'Flugtickets nach Wien sind im Preis ebenfalls enthalten.',
    },
    darijaStory:
      'تذاكر سفر Kärnten (34): باش تربح التذاكر خاصك تعيط للراديو (im Radio anrufen)، والرحلة لـ Kärnten داخل فيها الفطور والعشاء (Halbpension).',
    audioSlug: 'kaernten.m4a',
  },
  {
    id: 't1-38',
    teil: 1,
    indexInTeil: 38,
    title: 'die Fluggesellschaft DL (الأساسي)',
    firstWords: 'Die Fluggesellschaft DL streicht mehrere Inlandsflüge...',
    code: '15',
    richtigMap: {
      '1': {
        text: 'Die Fluggesellschaft DL streicht zahlreiche Inlandsflüge.',
        triggers: ['Fluggesellschaft DL streicht Inlandsflüge', 'streicht Inlandsflüge'],
      },
      '5': {
        text: 'Betroffene Passagiere erhalten ihr Geld zurück oder buchen kostenlos um.',
        triggers: ['Passagiere erhalten ihr Geld zurück oder buchen um', 'Geld zurück'],
      },
    },
    falschMap: {
      '2': 'Das Unternehmen hat fünfzig neue Kurzstreckenflugzeuge bestellt.',
      '3': 'Inlandsflüge waren im vergangenen Jahr besonders profitabel.',
      '4': 'Kunden müssen für jede Umbuchung eine hohe Gebühr zahlen.',
    },
    darijaStory:
      'شركة الطيران DL الأساسي (15): شركة DL لغات الرحلات الداخلية (streicht Inlandsflüge)، والمسافرين غيرجعو فلوسهم أو يبدلو الحجز (Geld zurück / umbuchen).',
    audioSlug: 'dl_flug.m4a',
  },
  {
    id: 't1-39',
    teil: 1,
    indexInTeil: 39,
    title: 'die Fluggesellschaft DL (المعدل)',
    firstWords: 'Die Fluggesellschaft DL reduziert das Angebot im Inland...',
    code: '15',
    richtigMap: {
      '1': {
        text: 'DL reduziert das Flugangebot im Inland deutlich.',
        triggers: ['DL reduziert das Angebot im Inland', 'Angebot im Inland'],
      },
      '5': {
        text: 'Kunden können ihre bereits gebuchten Tickets kostenlos stornieren.',
        triggers: ['Kunden können kostenlos stornieren', 'kostenlos stornieren'],
      },
    },
    falschMap: {
      '2': 'Die Preise für Bahntickets wurden wegen der Airline verdoppelt.',
      '3': 'Alle internationalen Flüge nach Nordamerika fallen ebenfalls aus.',
      '4': 'Reisende erhalten lediglich einen Gutschein für das Flughafenrestaurant.',
    },
    darijaStory:
      'شركة الطيران DL المعدل (15): نفس الكود 15! نقصات الرحلات الداخلية (Inland reduziert) والكليان يلغيو فابور (kostenlos stornieren).',
    audioSlug: 'dl_flug.m4a',
  },
  {
    id: 't1-40',
    teil: 1,
    indexInTeil: 40,
    title: 'Bauern warnen',
    firstWords: 'Deutsche Bauern warnen vor den Folgen der Trockenheit...',
    code: '24',
    richtigMap: {
      '2': {
        text: 'Die lange Trockenheit führte in vielen Regionen zu geringeren Ernten.',
        triggers: ['Trockenheit führte zu geringeren Ernten', 'geringeren Ernten'],
      },
      '4': {
        text: 'Die Preise für Obst und Gemüse könnten im Herbst deutlich steigen.',
        triggers: ['Preise für Obst und Gemüse könnten steigen', 'Obst und Gemüse'],
      },
    },
    falschMap: {
      '1': 'In diesem Sommer hat es in Deutschland doppelt so viel geregnet wie üblich.',
      '3': 'Kartoffeln und Getreide konnten in Rekordmengen geerntet werden.',
      '5': 'Supermärkte wollen die Lebensmittelpreise dauerhaft einfrieren.',
    },
    darijaStory:
      'تحذير الفلاحة (24): الجفاف هبط المحصول (Trockenheit geringere Ernten)، وأثمنة الفواكه والخضرة غتطلع (Preise Obst Gemüse steigen).',
    audioSlug: 'bauern.m4a',
  },
  {
    id: 't1-41',
    teil: 1,
    indexInTeil: 41,
    title: 'Auf einer internationalen Konferenz (Katholikentag)',
    firstWords: 'Auf einer internationalen Konferenz / Beim Katholikentag...',
    code: '13',
    richtigMap: {
      '1': {
        text: 'Beim Katholikentag diskutieren Teilnehmer über Frieden und Umwelt.',
        triggers: ['diskutieren Teilnehmer über Frieden und Umwelt', 'Frieden und Umwelt'],
      },
      '3': {
        text: 'Tausende Besucher übernachten während des Treffens in Schulen und Hallen.',
        triggers: ['übernachten in Schulen und Hallen', 'in Schulen und Hallen'],
      },
    },
    falschMap: {
      '2': 'Zu den Veranstaltungen sind ausschließlich kirchliche Mitarbeiter zugelassen.',
      '4': 'Alle Konzerte unter freiem Himmel wurden kurzfristig verboten.',
      '5': 'Die Konferenz dauert insgesamt nur drei Stunden.',
    },
    darijaStory:
      'المؤتمر / Katholikentag (13): المشاركين كيناقشو السلام والبيئة (Frieden und Umwelt)، والآلاف ناعسين فـ المدارس والقاعات (übernachten in Schulen).',
    audioSlug: 'katholikentag.m4a',
  },
  {
    id: 't1-42',
    teil: 1,
    indexInTeil: 42,
    title: 'Die tschechische Stadt Pilsen',
    firstWords: 'Die tschechische Stadt Pilsen ist in diesem Jahr...',
    code: '12',
    richtigMap: {
      '1': {
        text: 'Die tschechische Stadt Pilsen ist Kulturhauptstadt Europas.',
        triggers: ['Stadt Pilsen ist Kulturhauptstadt Europas', 'Kulturhauptstadt'],
      },
      '2': {
        text: 'Über 600 kulturelle Veranstaltungen sind im Jahresverlauf geplant.',
        triggers: ['Über 600 Veranstaltungen sind im Jahresverlauf geplant', '600 Veranstaltungen'],
      },
    },
    falschMap: {
      '3': 'Alle Theaterhäuser in Pilsen bleiben wegen Umbauarbeiten geschlossen.',
      '4': 'Deutsche Künstler nehmen an dem Programm nicht teil.',
      '5': 'Touristen benötigen für den Besuch der Stadt ein spezielles Kulturvisum.',
    },
    darijaStory:
      'مدينة بيلسن التشيكية (12): مدينة Pilsen هي عاصمة الثقافة الأوروبية (Kulturhauptstadt)، وفيها كثر من 600 نشاط فالعام (600 Veranstaltungen).',
    audioSlug: 'pilsen.m4a',
  },
  {
    id: 't1-43',
    teil: 1,
    indexInTeil: 43,
    title: 'Nach Ansicht mancher',
    firstWords: 'Nach Ansicht mancher Experten verbringen Kinder...',
    code: '24',
    richtigMap: {
      '2': {
        text: 'Kinder und Jugendliche verbringen heute zu viel Zeit vor Bildschirmen.',
        triggers: ['Kinder verbringen zu viel Zeit vor Bildschirmen', 'vor Bildschirmen'],
      },
      '4': {
        text: 'Sportvereine fordern deutlich mehr Bewegung im täglichen Schulalltag.',
        triggers: ['Sportvereine fordern mehr Bewegung im Schulalltag', 'mehr Bewegung'],
      },
    },
    falschMap: {
      '1': 'Der Sportunterricht an Grundschulen wurde auf zehn Stunden täglich erhöht.',
      '3': 'Ärzte empfehlen mindestens sechs Stunden Computerspiele pro Tag.',
      '5': 'Alle Kinder in Großstädten sind Mitglied in einem Fußballverein.',
    },
    darijaStory:
      'رأي الخبراء والدراري (24): الدراري كيدوزو وقت طويل قدام الشاشات (vor Bildschirmen)، والنوادي الرياضية كتطالب بالحركة فـ المدرسة (mehr Bewegung).',
    audioSlug: 'ansicht.m4a',
  },
  {
    id: 't1-44',
    teil: 1,
    indexInTeil: 44,
    title: 'Laut Statistischem Bundesamt',
    firstWords: 'Laut Statistischem Bundesamt leben immer mehr Menschen...',
    code: '145',
    richtigMap: {
      '1': {
        text: 'Immer mehr Menschen leben allein in sogenannten Einpersonenhaushalten.',
        triggers: ['leben allein in Einpersonenhaushalten', 'Einpersonenhaushalten'],
      },
      '4': {
        text: 'In deutschen Großstädten ist der Anteil der Singles besonders hoch.',
        triggers: ['In Großstädten ist der Anteil besonders hoch', 'Großstädten'],
      },
      '5': {
        text: 'Die Wohnungsnot verschärft sich dadurch vor allem für Alleinstehende.',
        triggers: ['Wohnungsnot verschärft sich für Singles', 'Wohnungsnot'],
      },
    },
    falschMap: {
      '2': 'Großfamilien mit vier Generationen unter einem Dach nehmen stark zu.',
      '3': 'Auf dem Land gibt es überhaupt keine Einpersonenhaushalte.',
    },
    darijaStory:
      'مكتب الإحصاء (145): الناس كيسكنو بوحدهم كثر (Einpersonenhaushalten)، خصوصاً فـ المدن الكبار (Großstädten)، وأزمة الكراء قاصحة على العزاب (Wohnungsnot Singles).',
    audioSlug: 'bundesamt.m4a',
  },
  {
    id: 't1-45',
    teil: 1,
    indexInTeil: 45,
    title: 'Für die Polizei in Berlin',
    firstWords: 'Für die Polizei in Berlin werden dringend...',
    code: '1245',
    richtigMap: {
      '1': {
        text: 'Die Polizei in Berlin sucht dringend neue Bewerberinnen und Bewerber.',
        triggers: ['Polizei Berlin sucht neue Bewerber', 'neue Bewerber'],
      },
      '2': {
        text: 'Gute Fremdsprachenkenntnisse sind bei der Einstellung von Vorteil.',
        triggers: ['Fremdsprachenkenntnisse sind von Vorteil', 'Fremdsprachenkenntnisse'],
      },
      '4': {
        text: 'Der praktische Sporttest bei der Aufnahmeprüfung wurde angepasst.',
        triggers: ['Sporttest wurde angepasst', 'Sporttest'],
      },
      '5': {
        text: 'Immer mehr Frauen bewerben sich erfolgreich für den Polizeidienst.',
        triggers: ['Mehr Frauen bewerben sich', 'Mehr Frauen'],
      },
    },
    falschMap: {
      '3': 'Bewerber müssen mindestens fünfundvierzig Jahre alt sein.',
    },
    darijaStory:
      'بوليس برلين (1245 — كلشي صحيح إلا التالتة!): بوليس برلين كيقلب على موظفين، اللغات مطلوبة، امتحان الرياضة تبدل، والعيالات كيدفعو كثر!',
    audioSlug: 'polizei_berlin.m4a',
  },
  {
    id: 't1-46',
    teil: 1,
    indexInTeil: 46,
    title: 'Das Schladminger (Skirennen)',
    firstWords: 'Das Schladminger Nachtslalom-Skirennen...',
    code: '125',
    richtigMap: {
      '1': {
        text: 'Das Schladminger Nachtslalom zieht jedes Jahr Zehntausende Fans an.',
        triggers: ['zieht Zehntausende Fans an', 'Zehntausende Fans'],
      },
      '2': {
        text: 'Am Eingang des Stadions gibt es strenge Sicherheitskontrollen.',
        triggers: ['Strenge Sicherheitskontrollen am Eingang', 'Sicherheitskontrollen'],
      },
      '5': {
        text: 'Zusätzliche Sonderzüge bringen die Besucher nach dem Rennen nach Hause.',
        triggers: ['Sonderzüge bringen Besucher nach Hause', 'Sonderzüge'],
      },
    },
    falschMap: {
      '3': 'Glasflaschen und Feuerwerkskörper sind im Zuschauerbereich ausdrücklich erlaubt.',
      '4': 'Das Rennen findet wegen Schneemangels in einer geschlossenen Skihalle statt.',
    },
    darijaStory:
      'سباق التزلج Schladminger (125): السباق الليلي كيجيب عشرات الآلاف د الجمهور (Zehntausende Fans)، تفتيش مشدد فالدخلة (Sicherheitskontrollen)، وترانات خاصة للرجوع (Sonderzüge).',
    audioSlug: 'schladminger.m4a',
  },
  {
    id: 't1-47',
    teil: 1,
    indexInTeil: 47,
    title: 'Vier Tage pro Woche (Lesen Bonbon)',
    firstWords: 'In immer mehr Betrieben arbeiten Mitarbeiter vier Tage pro Woche...',
    code: '12',
    richtigMap: {
      '1': {
        text: 'Mitarbeiter arbeiten im Modellprojekt vier Tage pro Woche bei vollem Gehalt.',
        triggers: ['vier Tage pro Woche bei vollem Gehalt', 'vollem Gehalt'],
      },
      '2': {
        text: 'Die Produktivität in den Firmen blieb gleich oder stieg sogar an.',
        triggers: ['Produktivität blieb gleich oder stieg sogar', 'Produktivität'],
      },
    },
    falschMap: {
      '3': 'Die Angestellten mussten auf dreißig Prozent ihres Lohns verzichten.',
      '4': 'Krankmeldungen haben sich während der Testphase verdreifacht.',
      '5': 'Alle teilnehmenden Unternehmen haben das Projekt sofort wieder beendet.',
    },
    darijaStory:
      'الخدمة 4 أيام فالأسبوع (12): الموظفين خدامين 4 أيام فالأسبوع بخلصة كاملة (vier Tage volles Gehalt)، والإنتاجية بقات هي هذيك أو طلعات (Produktivität stieg).',
    audioSlug: 'viertage.m4a',
  },
  {
    id: 't1-48',
    teil: 1,
    indexInTeil: 48,
    title: 'Paris Leihscooter & KI (جديد 2026 🔥)',
    firstWords: 'Paris hat den Verleih von E-Scootern verboten...',
    code: '25',
    isNew2026: true,
    richtigMap: {
      '2': {
        text: 'Die Stadt Paris hat den gewerblichen Verleih von E-Scootern verboten.',
        triggers: ['Paris hat den Verleih von E-Scootern verboten', 'E-Scootern verboten'],
      },
      '5': {
        text: 'Die Bürger hatten sich in einer Abstimmung klar gegen die Roller entschieden.',
        triggers: ['in einer Abstimmung gegen die Roller entschieden', 'Abstimmung gegen'],
      },
    },
    falschMap: {
      '1': 'Private Fahrräder sind in ganz Frankreich ab sofort ebenfalls untersagt.',
      '3': 'Es gab in Paris noch nie einen Unfall mit einem Elektroroller.',
      '4': 'Die Leihfirmen erhalten kostenlose Parkflächen vor dem Eiffelturm.',
    },
    darijaStory:
      'تروتينيت باريس 2026 (25): باريس منعات كراء التروتينيت الكهربائية (E-Scooter verboten)، حيت السكان صوتو ضدها (Abstimmung gegen Roller).',
    audioSlug: 'paris_scooter.m4a',
  },
  {
    id: 't1-49',
    teil: 1,
    indexInTeil: 49,
    title: 'Dauerhaftes Homeoffice & Schlaf (جديد 2026 🔥)',
    firstWords: 'Einige Firmen schränken dauerhaftes Homeoffice wieder ein...',
    code: '34',
    isNew2026: true,
    richtigMap: {
      '3': {
        text: 'Einige große Firmen schränken dauerhaftes Homeoffice wieder ein.',
        triggers: ['schränken dauerhaftes Homeoffice wieder ein', 'Homeoffice'],
      },
      '4': {
        text: 'Viele Beschäftigte schätzen weiterhin flexible Arbeitsmodelle.',
        triggers: ['Beschäftigte schätzen flexible Arbeitsmodelle', 'flexible Arbeitsmodelle'],
      },
    },
    falschMap: {
      '1': 'Alle Bürogebäude in Deutschland wurden in Wohnungen umgebaut.',
      '2': 'Arbeitnehmer möchten am liebsten sieben Tage pro Woche im Büro sitzen.',
      '5': 'Das Arbeitsministerium hat Computerarbeit zu Hause gesetzlich verboten.',
    },
    darijaStory:
      'الهوم أوفيس 2026 (34): بعض الشركات نقصات من الخدمة الدائمة من الدار (Homeoffice einschränken)، والموظفين كيبغيو المرونة (flexible Arbeitsmodelle).',
    audioSlug: 'homeoffice_neu.m4a',
  },
  {
    id: 't1-50',
    teil: 1,
    indexInTeil: 50,
    title: 'Co-Living & Fast-Fashion (جديد 2026 🔥)',
    firstWords: 'Moderne Co-Living-Projekte in Großstädten...',
    code: '3',
    isNew2026: true,
    richtigMap: {
      '3': {
        text: 'In Co-Living-Projekten teilen Bewohner Gemeinschaftsräume wie Küche und Arbeitsplatz.',
        triggers: ['teilen Gemeinschaftsräume wie Küche und Arbeitsplatz', 'Gemeinschaftsräume'],
      },
    },
    falschMap: {
      '1': 'Co-Living-Häuser werden ausschließlich in kleinen Dörfern gebaut.',
      '2': 'Bewohner müssen Möbel und Haushaltsgeräte komplett selbst mitbringen.',
      '4': 'Mietverträge in Co-Living-Häusern gelten immer mindestens zwanzig Jahre.',
      '5': 'Berufstätige unter vierzig Jahren dürfen dort nicht einziehen.',
    },
    darijaStory:
      'السكن المشترك Co-Living 2026 (3 — غير التالتة بوحدها!): مشاريع Co-Living كيتشاركو فيها الكوزينة وبلاصة الخدمة (Gemeinschaftsräume teilen).',
    audioSlug: 'coliving_neu.m4a',
  },
  {
    id: 't1-51',
    teil: 1,
    indexInTeil: 51,
    title: 'Softdrinks & Lebenshaltungskosten (جديد 2026 🔥)',
    firstWords: 'Gesundheitsexperten fordern eine Sondersteuer auf Softdrinks...',
    code: '24',
    isNew2026: true,
    richtigMap: {
      '2': {
        text: 'Gesundheitsexperten fordern eine Sondersteuer auf zuckerhaltige Softdrinks.',
        triggers: ['Sondersteuer auf zuckerhaltige Softdrinks', 'Softdrinks'],
      },
      '4': {
        text: 'Steigende Lebenshaltungskosten verändern das Kaufverhalten im Supermarkt.',
        triggers: ['Steigende Lebenshaltungskosten verändern das Kaufverhalten', 'Kaufverhalten'],
      },
    },
    falschMap: {
      '1': 'Limonaden enthalten heute überhaupt keinen Zucker mehr.',
      '3': 'Mineralwasser ist in Deutschland dreimal so teuer wie Energydrinks.',
      '5': 'Verbraucher achten beim Einkaufen überhaupt nicht mehr auf Sonderangebote.',
    },
    darijaStory:
      'المشروبات الغازية والغلاء 2026 (24): الخبراء كيطالبو بضريبة على المشروبات الحلوة (Steuer auf Softdrinks)، وغلاء المعيشة بدل طريقة الشراء (Lebenshaltungskosten Kaufverhalten).',
    audioSlug: 'softdrinks_neu.m4a',
  },
  {
    id: 't1-52',
    teil: 1,
    indexInTeil: 52,
    title: 'AirBerlin-New / Fluggesellschaft (جديد 2026 🔥)',
    firstWords: 'Die Ticketpreise auf europäischen Strecken sind gestiegen...',
    code: '23',
    isNew2026: true,
    richtigMap: {
      '2': {
        text: 'Die Ticketpreise auf europäischen Flugstrecken sind deutlich gestiegen.',
        triggers: ['Ticketpreise auf europäischen Strecken sind gestiegen', 'Ticketpreise gestiegen'],
      },
      '3': {
        text: 'Eine größere Airline übernimmt weite Teile der bestehenden Flotte.',
        triggers: ['größere Airline übernimmt Teile der Flotte', 'übernimmt Teile der Flotte'],
      },
    },
    falschMap: {
      '1': 'Fliegen innerhalb Europas ist heute so billig wie noch nie zuvor.',
      '4': 'Alle Flughäfen in Norddeutschland werden dauerhaft geschlossen.',
      '5': 'Passagiere dürfen kein Handgepäck mehr mit in die Kabine nehmen.',
    },
    darijaStory:
      'آير برلين الجديدة 2026 (23): بحال كود Lufthansa 23! أثمنة التذاكر طلعات (Ticketpreise gestiegen) وشركة كبيرة خدات الطيارات (Airline übernimmt Flotte).',
    audioSlug: 'airberlin_neu.m4a',
  },
];
