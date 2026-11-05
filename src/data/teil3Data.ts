import { RawExamInput } from './teil1Data.ts';

export const TEIL3_RAW_EXAMS: RawExamInput[] = [
  {
    id: 't3-1',
    teil: 3,
    indexInTeil: 1,
    title: 'Für ein Konzert morgen (الأساسي ⚠️)',
    firstWords: 'Für ein Konzert morgen gibt es noch Restkarten...',
    code: '13',
    isTrap: true,
    trapGroupId: 'trap-konzert',
    trapVersionLabel: 'الأساسي',
    trapDistinguishingWord: 'Für ein Konzert morgen gibt es noch',
    richtigMap: {
      '1': {
        text: 'Für ein Konzert morgen gibt es noch Restkarten an der Abendkasse.',
        triggers: ['Für ein Konzert morgen gibt es noch Restkarten', 'Restkarten an der Abendkasse'],
      },
      '3': {
        text: 'Der Einlass in die Halle beginnt eine Stunde vor Konzertbeginn.',
        triggers: ['Einlass beginnt eine Stunde vor Konzertbeginn', 'eine Stunde vor'],
      },
    },
    falschMap: {
      '2': 'Das Konzert wurde wegen Krankheit der Musiker auf nächsten Monat verschoben.',
      '4': 'Besucher dürfen eigene Getränke in Glasflaschen mitbringen.',
      '5': 'Parkplätze direkt vor der Konzerthalle stehen unbegrenzt kostenlos bereit.',
    },
    darijaStory:
      'حفلة غدا الأساسي (13): إلى بدات الجملة 56 بـ Für ein Konzert morgen، الكود هو 13 (باقي تذاكر فالليل + الدخلة قبل بساعة).',
    audioSlug: 'konzert_morgen.m4a',
  },
  {
    id: 't3-2',
    teil: 3,
    indexInTeil: 2,
    title: 'Für ein Konzert morgen (التعديل الجديد ⚠️)',
    firstWords: 'Morgen findet das Konzert im großen Saal statt...',
    code: '24',
    isTrap: true,
    trapGroupId: 'trap-konzert',
    trapVersionLabel: 'المعدل',
    trapDistinguishingWord: 'Morgen findet das Konzert',
    richtigMap: {
      '2': {
        text: 'Die Eintrittskarten sind im Vorverkauf günstiger als an der Abendkasse.',
        triggers: ['Eintrittskarten sind im Vorverkauf günstiger', 'Vorverkauf günstiger'],
      },
      '4': {
        text: 'Mit der Eintrittskarte nutzt man Bus und Bahn zur Halle kostenlos.',
        triggers: ['Mit der Eintrittskarte nutzt man Bus und Bahn kostenlos', 'Bus und Bahn kostenlos'],
      },
    },
    falschMap: {
      '1': 'Morgen findet das Konzert im Stadtpark unter freiem Himmel statt.',
      '3': 'Kinder unter zwölf Jahren haben keinen Zutritt zur Veranstaltung.',
      '5': 'Nach 20 Uhr werden keine Besucher mehr in den Saal gelassen.',
    },
    darijaStory:
      'حفلة غدا التعديل الجديد (24): إلى تبدلات الصياغة (Morgen findet das Konzert...)، الكود كيتحول من الفردي 13 للزوجي 24!',
    audioSlug: 'konzert_morgen_neu.m4a',
  },
  {
    id: 't3-3',
    teil: 3,
    indexInTeil: 3,
    title: 'Konzert am 29. (جديد 2026 🔥)',
    firstWords: 'Das Konzert am 29. wurde in eine größere Halle verlegt...',
    code: '14',
    isNew2026: true,
    richtigMap: {
      '1': {
        text: 'Das Konzert am 29. wurde wegen hoher Nachfrage in eine größere Halle verlegt.',
        triggers: ['Das Konzert am 29. wurde in eine größere Halle verlegt', 'am 29.'],
      },
      '4': {
        text: 'Bereits gekaufte Karten behalten ohne Umtausch ihre Gültigkeit.',
        triggers: ['Bereits gekaufte Karten behalten ihre Gültigkeit', 'behalten ihre Gültigkeit'],
      },
    },
    falschMap: {
      '2': 'Der Beginn des Konzerts wurde auf 14 Uhr nachmittags vorverlegt.',
      '3': 'Alle Ticketinhaber müssen zehn Euro Aufpreis an der Kasse zahlen.',
      '5': 'Es fährt an diesem Abend kein öffentlicher Nahverkehr zur neuen Halle.',
    },
    darijaStory:
      'حفلة نهار 29 (14): غير تشوف رقم 29. فالحفلة، الكود هو 14 (تبدلات القاعة + التذاكر القدام خدامين)!',
    audioSlug: 'konzert_29.m4a',
  },
  {
    id: 't3-4',
    teil: 3,
    indexInTeil: 4,
    title: 'Ausgang (الأساسي ⚠️)',
    firstWords: 'Alle Besucher müssen durch Ausgang C das Stadion verlassen...',
    code: '145',
    isTrap: true,
    trapGroupId: 'trap-ausgang',
    trapVersionLabel: 'الأساسي',
    trapDistinguishingWord: 'Alle Besucher müssen durch Ausgang C',
    richtigMap: {
      '1': {
        text: 'Alle Besucher müssen nach Veranstaltungsende den Ausgang C benutzen.',
        triggers: ['Ausgang C benutzen', 'Ausgang C'],
      },
      '4': {
        text: 'Kostenlose Sonderbusse zum Hauptbahnhof warten direkt vor dem Stadion.',
        triggers: ['Sonderbusse warten vor dem Stadion', 'Sonderbusse'],
      },
      '5': {
        text: 'Gefundene Gegenstände und Fundsachen kann man am Informationsschalter abholen.',
        triggers: ['Fundsachen am Informationsschalter abholen', 'Fundsachen'],
      },
    },
    falschMap: {
      '2': 'Die U-Bahn-Station am Stadion bleibt heute die ganze Nacht geöffnet.',
      '3': 'Besucher dürfen nach dem Spiel noch eine Stunde auf dem Rasen bleiben.',
    },
    darijaStory:
      'المخرج Ausgang الأساسي (145): إلى بدات الجملة 56 بـ Ausgang C، الكود هو 145!',
    audioSlug: 'ausgang.m4a',
  },
  {
    id: 't3-5',
    teil: 3,
    indexInTeil: 5,
    title: 'Ausgang (المعدل المقلوب ⚠️)',
    firstWords: 'Für die Rückfahrt nach Aalen stehen Sonderbusse bereit...',
    code: '125',
    isTrap: true,
    trapGroupId: 'trap-ausgang',
    trapVersionLabel: 'المعدل المقلوب',
    trapDistinguishingWord: 'Für die Rückfahrt nach Aalen',
    richtigMap: {
      '1': {
        text: 'Für die Rückfahrt nach Aalen warten Sonderbusse direkt vor dem Stadion.',
        triggers: ['Für die Rückfahrt nach Aalen', 'Sonderbusse'],
      },
      '2': {
        text: 'Alle Besucher werden gebeten, das Gelände über Ausgang C zu verlassen.',
        triggers: ['Ausgang C zu verlassen', 'Ausgang C'],
      },
      '5': {
        text: 'Fundsachen können direkt am Informationsschalter abgeholt werden.',
        triggers: ['Fundsachen', 'Informationsschalter'],
      },
    },
    falschMap: {
      '3': 'Das Parkhaus Nord ist wegen Bauarbeiten heute komplett gesperrt.',
      '4': 'Tickets für das nächste Heimspiel gibt es heute zum halben Preis.',
    },
    darijaStory:
      'المخرج Ausgang المعدل (125): إلى تقلبو الجمل وبدات الجملة 56 بـ Für die Rückfahrt nach Aalen، الكود كيولي 125!',
    audioSlug: 'ausgang.m4a',
  },
  {
    id: 't3-6',
    teil: 3,
    indexInTeil: 6,
    title: 'Fest (ohne Frankfurt ⚠️)',
    firstWords: 'Beim Stadtfest findet das Kinderprogramm im Stadtpark statt...',
    code: '13',
    isTrap: true,
    trapGroupId: 'trap-fest',
    trapVersionLabel: 'بلا Frankfurt',
    trapDistinguishingWord: 'Beim Stadtfest (ohne Frankfurt)',
    richtigMap: {
      '1': {
        text: 'Das bunte Kinderprogramm findet während des Stadtfestes im Stadtpark statt.',
        triggers: ['Kinderprogramm findet im Stadtpark statt', 'Kinderprogramm'],
      },
      '3': {
        text: 'Bei starkem Regen werden die Abendkonzerte ins Rathaus verlegt.',
        triggers: ['Bei Regen werden Konzerte ins Rathaus verlegt', 'ins Rathaus verlegt'],
      },
    },
    falschMap: {
      '2': 'Für alle Konzerte auf dem Marktplatz muss man vorab Tickets kaufen.',
      '4': 'Die Innenstadt bleibt für den Busverkehr normal geöffnet.',
      '5': 'Das Stadtfest endet bereits am Samstagmittag um 14 Uhr.',
    },
    darijaStory:
      'الحفل بلا فرانكفورت (13): قلب الورقة، إلا ما لقيتيش كلمة Frankfurt، الكود قصير 13!',
    audioSlug: 'fest.m4a',
  },
  {
    id: 't3-7',
    teil: 3,
    indexInTeil: 7,
    title: 'Fest (Mit Frankfurt ⚠️)',
    firstWords: 'Beim Fest in Frankfurt findet das Kinderprogramm...',
    code: '135',
    isTrap: true,
    trapGroupId: 'trap-fest',
    trapVersionLabel: 'فيها Frankfurt',
    trapDistinguishingWord: 'Frankfurt',
    richtigMap: {
      '1': {
        text: 'Beim Fest in Frankfurt findet das Kinderprogramm im Stadtpark statt.',
        triggers: ['Kinderprogramm im Stadtpark', 'Fest in Frankfurt'],
      },
      '3': {
        text: 'Bei Regenwetter werden die Konzerte kurzfristig ins Rathaus verlegt.',
        triggers: ['Bei Regen', 'ins Rathaus verlegt'],
      },
      '5': {
        text: 'Am Sonntagabend gibt es in Frankfurt ein großes Feuerwerk am Main.',
        triggers: ['in Frankfurt ein großes Feuerwerk am Main', 'Feuerwerk am Main'],
      },
    },
    falschMap: {
      '2': 'Museen am Mainufer haben während des gesamten Festes geschlossen.',
      '4': 'Private Boote dürfen während des Feuerwerks auf dem Main fahren.',
    },
    darijaStory:
      'الحفل بـ فرانكفورت (135): غير تبان ليك كلمة Frankfurt زيد الرقم 5 وكيولي الكود 135!',
    audioSlug: 'fest_frankfurt.m4a',
  },
  {
    id: 't3-8',
    teil: 3,
    indexInTeil: 8,
    title: 'Am Samstag (Flohmarkt)',
    firstWords: 'Am Samstag findet auf dem Messegelände der Flohmarkt statt...',
    code: '245',
    richtigMap: {
      '2': {
        text: 'Die Standgebühren für Verkäufer müssen vorab überwiesen werden.',
        triggers: ['Standgebühren müssen vorab überwiesen werden', 'Standgebühren'],
      },
      '4': {
        text: 'Gewerbliche Händler mit Neuware sind auf dem Flohmarkt nicht zugelassen.',
        triggers: ['Gewerbliche Händler sind nicht zugelassen', 'nicht zugelassen'],
      },
      '5': {
        text: 'Die Parkplätze direkt am Messegelände sind für Besucher kostenlos.',
        triggers: ['Parkplätze am Messegelände kostenlos', 'Parkplätze kostenlos'],
      },
    },
    falschMap: {
      '1': 'Verkäufer können ihren Standplatz erst am Samstagmorgen bar bezahlen.',
      '3': 'Der Flohmarkt findet nur bei sonnigem Wetter im Freien statt.',
    },
    darijaStory:
      'نهار السبت Flohmarkt (245): الخلاص قبل، التجار المحترفين ممنوعين، والباركينغ فابور (245).',
    audioSlug: 'flohmarkt.m4a',
  },
  {
    id: 't3-9',
    teil: 3,
    indexInTeil: 9,
    title: 'Autobahn / Verkehrsmeldung',
    firstWords: 'Auf der Autobahn A8 gibt es nach einem Lkw-Unfall...',
    code: '124',
    richtigMap: {
      '1': {
        text: 'Auf der Autobahn A8 gibt es langen Stau nach einem Lkw-Unfall.',
        triggers: ['Auf der A8 Stau nach einem Lkw-Unfall', 'Lkw-Unfall'],
      },
      '2': {
        text: 'Den Autofahrern wird eine Umleitung über die Bundesstraße empfohlen.',
        triggers: ['Umleitung über die Bundesstraße empfohlen', 'Umleitung'],
      },
      '4': {
        text: 'Im höheren Bergland besteht heute Abend Gefahr durch Glatteis.',
        triggers: ['Im Bergland Gefahr durch Glatteis', 'Glatteis'],
      },
    },
    falschMap: {
      '3': 'Die Autobahn A8 bleibt für mindestens drei Wochen komplett gesperrt.',
      '5': 'Alle Züge zwischen Stuttgart und München fallen wegen des Unfalls aus.',
    },
    darijaStory:
      'الأوطوروت والزحام (124): كسيدة د كاميو فـ A8، دوزو من الطريق الوطنية، والجليد فالجبال (124).',
    audioSlug: 'autobahn.m4a',
  },
  {
    id: 't3-10',
    teil: 3,
    indexInTeil: 10,
    title: 'Bahnhof / Zugdurchsage ICE',
    firstWords: 'Achtung am Gleis: Der ICE nach München fährt heute...',
    code: '235',
    richtigMap: {
      '2': {
        text: 'Der ICE nach München fährt heute außerplanmäßig von Gleis 7 ab.',
        triggers: ['ICE nach München fährt heute von Gleis 7', 'Gleis 7'],
      },
      '3': {
        text: 'Die reservierten Wagen 21 bis 24 befinden sich im vorderen Zugteil.',
        triggers: ['Wagen 21 bis 24 befinden sich im vorderen Zugteil', 'vorderen Zugteil'],
      },
      '5': {
        text: 'Fahrgäste mit dem Ziel Augsburg nutzen bitte den Ersatzbus.',
        triggers: ['Fahrgäste nach Augsburg nutzen den Ersatzbus', 'Ersatzbus'],
      },
    },
    falschMap: {
      '1': 'Der ICE nach München fällt heute wegen eines Lokschadens komplett aus.',
      '4': 'Das Bordrestaurant ist heute auf der gesamten Strecke geschlossen.',
    },
    darijaStory:
      'إعلان التران ICE (235): التران غيمشي من السكة 7، المقصورات القدام، والطوبيس البديل لـ Augsburg (235).',
    audioSlug: 'bahnhof_ice.m4a',
  },
  {
    id: 't3-11',
    teil: 3,
    indexInTeil: 11,
    title: 'Flughafen / Boarding-Durchsage',
    firstWords: 'Fluggäste, gebucht auf den Flug nach Wien...',
    code: '134',
    richtigMap: {
      '1': {
        text: 'Der Nachmittagsflug nach Wien hat derzeit 40 Minuten Verspätung.',
        triggers: ['Flug nach Wien hat 40 Minuten Verspätung', '40 Minuten Verspätung'],
      },
      '3': {
        text: 'Das neue Abfluggate für diesen Flug ist nun Schalter B14.',
        triggers: ['Neues Gate ist B14', 'Gate B14'],
      },
      '4': {
        text: 'Größeres Handgepäck wird am Schalter kostenlos aufgegeben.',
        triggers: ['Handgepäck wird am Schalter kostenlos aufgegeben', 'Handgepäck kostenlos'],
      },
    },
    falschMap: {
      '2': 'Alle Passagiere müssen ihre Bordkarten am Haupteingang neu ausdrucken.',
      '5': 'Der Flug nach Wien wurde auf den morgigen Vormittag verschoben.',
    },
    darijaStory:
      'المطار والطيارة (134): الطيارة لفيينا معطلة بـ 40 دقيقة، البوابة الجديدة B14، والشانطة د اليد فابور (134).',
    audioSlug: 'flughafen.m4a',
  },
  {
    id: 't3-12',
    teil: 3,
    indexInTeil: 12,
    title: 'Kaufhaus / Supermarkt-Durchsage',
    firstWords: 'Herzlich willkommen in unserem Kaufhaus...',
    code: '24',
    richtigMap: {
      '2': {
        text: 'In der Sportabteilung gibt es heute 20 Prozent Rabatt auf Wanderschuhe.',
        triggers: ['20 Prozent Rabatt auf Wanderschuhe', 'Wanderschuhe'],
      },
      '4': {
        text: 'Der Besitzer des blauen Pkw soll bitte dringend zur Information kommen.',
        triggers: ['Besitzer des blauen Pkw soll zur Information kommen', 'blauen Pkw'],
      },
    },
    falschMap: {
      '1': 'Das Kaufhaus schließt heute wegen einer Betriebsversammlung schon um 16 Uhr.',
      '3': 'Kinderspielzeug ist heute im gesamten Haus vom Umtausch ausgeschlossen.',
      '5': 'An den Kassen im Erdgeschoss ist heute nur Barzahlung möglich.',
    },
    darijaStory:
      'المول / السوبرمارشي (24): تخفيض 20% فصباط المشي، ومول الطوموبيل الزرقة يجي للاستعلامات (24).',
    audioSlug: 'kaufhaus.m4a',
  },
  {
    id: 't3-13',
    teil: 3,
    indexInTeil: 13,
    title: 'Museum / Führungen',
    firstWords: 'Liebe Besucherinnen und Besucher unseres Museums...',
    code: '125',
    richtigMap: {
      '1': {
        text: 'In den Ausstellungsräumen ist das Fotografieren ohne Blitz erlaubt.',
        triggers: ['Fotografieren ohne Blitz erlaubt', 'ohne Blitz'],
      },
      '2': {
        text: 'An der Kasse sind digitale Audioguides in fünf Sprachen erhältlich.',
        triggers: ['Audioguides in fünf Sprachen erhältlich', 'Audioguides'],
      },
      '5': {
        text: 'Das Museumscafé im Innenhof hat heute bis 18 Uhr für Sie geöffnet.',
        triggers: ['Museumscafé im Innenhof bis 18 Uhr geöffnet', 'Museumscafé'],
      },
    },
    falschMap: {
      '3': 'Die Sonderausstellung im zweiten Stock ist heute wegen Umbaus gesperrt.',
      '4': 'Kinderwagen dürfen nicht mit in das Erdgeschoss genommen werden.',
    },
    darijaStory:
      'المتحف (125): التصوير بلا فلاش مسموح، الأوديو بـ 5 لغات، والقهوة د المتحف حالة حتى لـ 6 (125).',
    audioSlug: 'museum.m4a',
  },
  {
    id: 't3-14',
    teil: 3,
    indexInTeil: 14,
    title: 'Universitätsbibliothek',
    firstWords: 'Hinweis für alle Nutzerinnen und Nutzer der Universitätsbibliothek...',
    code: '234',
    richtigMap: {
      '2': {
        text: 'Rucksäcke und dicke Jacken müssen in den Schließfächern bleiben.',
        triggers: ['Rucksäcke und Jacken müssen in den Schließfächern bleiben', 'Schließfächern'],
      },
      '3': {
        text: 'Studierende können die Gruppenarbeitsräume vorab online reservieren.',
        triggers: ['Gruppenarbeitsräume online reservieren', 'online reservieren'],
      },
      '4': {
        text: 'Der Rückgabeautomat im Erdgeschoss ist rund um die Uhr offen.',
        triggers: ['Rückgabeautomat im Erdgeschoss rund um die Uhr offen', 'Rückgabeautomat'],
      },
    },
    falschMap: {
      '1': 'Im Lesesaal dürfen warme Speisen und Kaffee verzehrt werden.',
      '5': 'Am Wochenende bleibt die gesamte Bibliothek geschlossen.',
    },
    darijaStory:
      'مكتبة الجامعة (234 — الثلاثة د الوسط): الشكاير فـ الصنادق، الحجز أونلاين، وماكينة إرجاع الكتوبة خدامة 24 ساعة (234).',
    audioSlug: 'bibliothek.m4a',
  },
  {
    id: 't3-15',
    teil: 3,
    indexInTeil: 15,
    title: 'Krankenhaus / Besucherinformation',
    firstWords: 'Willkommen im Städtischen Klinikum...',
    code: '14',
    richtigMap: {
      '1': {
        text: 'Die regulären Besuchszeiten sind täglich von 14 bis 19 Uhr.',
        triggers: ['Besuchszeiten täglich von 14 bis 19 Uhr', '14 bis 19 Uhr'],
      },
      '4': {
        text: 'Blumen in Topferde sind aus Hygienegründen auf den Stationen verboten.',
        triggers: ['Blumen in Topferde sind auf den Stationen verboten', 'Topferde verboten'],
      },
    },
    falschMap: {
      '2': 'Pro Patient darf nur ein einziger Besucher pro Woche kommen.',
      '3': 'Mobiltelefone müssen im gesamten Gebäude an der Rezeption abgegeben werden.',
      '5': 'Die Cafeteria im Erdgeschoss ist nur für Ärzte zugänglich.',
    },
    darijaStory:
      'السبيطار (14): الزيارة من 2 لـ 7، والغرس بالتراب ممنوع فالأقسام (14).',
    audioSlug: 'krankenhaus.m4a',
  },
  {
    id: 't3-16',
    teil: 3,
    indexInTeil: 16,
    title: 'Schwimmbad / Hallenbad',
    firstWords: 'Liebe Badegäste im städtischen Hallenbad...',
    code: '345',
    richtigMap: {
      '3': {
        text: 'Das große Sportbecken ist wegen Wettkämpfen heute bis 15 Uhr gesperrt.',
        triggers: ['Sportbecken ist wegen Wettkämpfen bis 15 Uhr gesperrt', 'Sportbecken gesperrt'],
      },
      '4': {
        text: 'Alle Saunagäste erhalten am Empfang kostenlose Handtücher.',
        triggers: ['Saunagäste erhalten kostenlose Handtücher', 'kostenlose Handtücher'],
      },
      '5': {
        text: 'Der letzte Einlass ins Schwimmbad ist eine Stunde vor Schließung.',
        triggers: ['Letzter Einlass eine Stunde vor Schließung', 'Letzter Einlass'],
      },
    },
    falschMap: {
      '1': 'Das Kinderbecken ist heute wegen Reinigungsarbeiten komplett geschlossen.',
      '2': 'Schwimmkurse für Anfänger finden nur am Sonntagmorgen statt.',
    },
    darijaStory:
      'لاپيسين Schwimmbad (345 — الثلاثة اللخرين): المسبح الرياضي مسدود حتى لـ 3، الفوطات فابور فـ الساونا، وآخر دخلة قبل بساعة (345).',
    audioSlug: 'schwimmbad.m4a',
  },
  {
    id: 't3-17',
    teil: 3,
    indexInTeil: 17,
    title: 'Wetterbericht / Unwetterwarnung',
    firstWords: 'Hier ist der aktuelle Wetterbericht mit einer Unwetterwarnung...',
    code: '135',
    richtigMap: {
      '1': {
        text: 'Am späten Nachmittag ziehen von Westen her starke Gewitter auf.',
        triggers: ['Am Nachmittag ziehen von Westen starke Gewitter auf', 'starke Gewitter'],
      },
      '3': {
        text: 'In unmittelbarer Flussnähe besteht örtlich akute Hochwassergefahr.',
        triggers: ['In Flussnähe besteht Hochwassergefahr', 'Hochwassergefahr'],
      },
      '5': {
        text: 'Am kommenden Wochenende wird es im ganzen Land wieder sonnig und warm.',
        triggers: ['Am Wochenende wird es wieder sonnig und warm', 'sonnig und warm'],
      },
    },
    falschMap: {
      '2': 'An der Küste sinken die Temperaturen heute Nacht auf minus zehn Grad.',
      '4': 'Der Fährverkehr zu den Inseln wurde bereits für die ganze Woche eingestellt.',
    },
    darijaStory:
      'النشرة الجوية (135 — الفرديين): رعود فالعشية من الغرب، خطر الفيضان حدا الواد، وفالويكاند غترجع الشميشة (135).',
    audioSlug: 'wetterbericht.m4a',
  },
  {
    id: 't3-18',
    teil: 3,
    indexInTeil: 18,
    title: 'Stadtwerke / Stromabschaltung',
    firstWords: 'Eine wichtige Mitteilung Ihrer Stadtwerke zur Stromversorgung...',
    code: '12',
    richtigMap: {
      '1': {
        text: 'Wegen Wartungsarbeiten wird am Dienstag der Strom für zwei Stunden abgestellt.',
        triggers: ['am Dienstag der Strom für zwei Stunden abgestellt', 'Strom abgestellt'],
      },
      '2': {
        text: 'Empfindliche Elektrogeräte sollten vorher vorsorglich vom Netz getrennt werden.',
        triggers: ['Empfindliche Elektrogeräte sollten vom Netz getrennt werden', 'vom Netz getrennt'],
      },
    },
    falschMap: {
      '3': 'Auch die Trinkwasserversorgung fällt in der gesamten Straße aus.',
      '4': 'Techniker müssen während der Arbeiten in jede einzelne Wohnung kommen.',
      '5': 'Die Strompreise werden ab nächstem Monat um zehn Prozent erhöht.',
    },
    darijaStory:
      'قطيع الضوء Stadtwerke (12): الضوء غيتقطع ساعتين نهار الثلاث، وحيدو البريزات ديال الأجهزة الحساسة (12).',
    audioSlug: 'stadtwerke.m4a',
  },
  {
    id: 't3-19',
    teil: 3,
    indexInTeil: 19,
    title: 'Sprachschule / Anmeldung',
    firstWords: 'Willkommen bei Ihrer Sprachschule für Deutsch und Fremdsprachen...',
    code: '25',
    richtigMap: {
      '2': {
        text: 'Ein kostenloser Einstufungstest findet jeden Mittwoch ohne Voranmeldung statt.',
        triggers: ['kostenloser Einstufungstest findet jeden Mittwoch statt', 'Einstufungstest'],
      },
      '5': {
        text: 'Die Prüfungsgebühren müssen spätestens zwei Wochen vorher bezahlt werden.',
        triggers: ['Prüfungsgebühren müssen zwei Wochen vorher bezahlt werden', 'zwei Wochen vorher'],
      },
    },
    falschMap: {
      '1': 'Anmeldungen für Abendkurse sind ausschließlich telefonisch möglich.',
      '3': 'Lehrbücher sind im Kurspreis bereits vollständig inbegriffen.',
      '4': 'In den Sommerferien finden überhaupt keine Intensivkurse statt.',
    },
    darijaStory:
      'مدرسة اللغات (25): امتحان تحديد المستوى فابور كل أربعاء، وخلاص الامتحان قبل بجوج سيمانات (25).',
    audioSlug: 'sprachschule.m4a',
  },
  {
    id: 't3-20',
    teil: 3,
    indexInTeil: 20,
    title: 'Fitnessstudio',
    firstWords: 'Liebe Mitglieder in unserem Fitnessstudio...',
    code: '134',
    richtigMap: {
      '1': {
        text: 'Neue Yoga-Kurse für Anfänger starten ab dem nächsten Monat.',
        triggers: ['Neue Yoga-Kurse starten ab nächstem Monat', 'Yoga-Kurse'],
      },
      '3': {
        text: 'Saubere Hallenschuhe sind im gesamten Trainingsbereich Pflicht.',
        triggers: ['Saubere Hallenschuhe sind im Trainingsbereich Pflicht', 'Hallenschuhe Pflicht'],
      },
      '4': {
        text: 'Mitglieder können einmal pro Monat einen Gast kostenlos zum Training mitbringen.',
        triggers: ['einmal pro Monat einen Gast kostenlos mitbringen', 'Gast kostenlos'],
      },
    },
    falschMap: {
      '2': 'Die Sauna bleibt im gesamten Winter wegen Energiesparmaßnahmen geschlossen.',
      '5': 'Getränke an der Sportbar sind für alle Mitglieder unbegrenzt gratis.',
    },
    darijaStory:
      'لافامي / لاصال Fitnessstudio (134): دروس اليوغا الشهر الجاي، صباط نقي ضروري، وتقدر تجيب صاحبك فابور مرة فالشهر (134).',
    audioSlug: 'fitnessstudio.m4a',
  },
  {
    id: 't3-21',
    teil: 3,
    indexInTeil: 21,
    title: 'Zahnarztpraxis',
    firstWords: 'Sie sind verbunden mit der Zahnarztpraxis Dr. Lehmann...',
    code: '23',
    richtigMap: {
      '2': {
        text: 'Bei akuten Zahnschmerzen können Patienten vormittags ohne Termin kommen.',
        triggers: ['ohne Termin kommen', 'Zahnschmerzen'],
      },
      '3': {
        text: 'Rezepte und Überweisungen können direkt über die Webseite bestellt werden.',
        triggers: ['über die Webseite bestellt werden', 'Rezepte'],
      },
    },
    falschMap: {
      '1': 'Die Praxis ist wegen Urlaubs den gesamten Monat August geschlossen.',
      '4': 'Freitagnachmittags hat die Praxis bis 20 Uhr geöffnet.',
      '5': 'Neue Patienten werden derzeit überhaupt nicht mehr aufgenommen.',
    },
    darijaStory:
      'طبيب الأسنان Zahnarztpraxis (23): إلى عندك الحريق د السنان أجي فالصباح بلا موعد (2)، والورقة/الوصفة طلبها من الموقع (3)!',
    audioSlug: 'zahnarzt.m4a',
  },
  {
    id: 't3-22',
    teil: 3,
    indexInTeil: 22,
    title: 'Kundenservice Telefonansage',
    firstWords: 'Willkommen beim telefonischen Kundenservice Ihres Energieversorgers...',
    code: '15',
    richtigMap: {
      '1': {
        text: 'Für die schnelle Bearbeitung soll man seine Kundennummer bereithalten.',
        triggers: ['Kundennummer bereithalten', 'Kundennummer'],
      },
      '5': {
        text: 'Zählerstände können rund um die Uhr im Online-Portal eingegeben werden.',
        triggers: ['Zählerstände', 'Online-Portal'],
      },
    },
    falschMap: {
      '2': 'Das Gespräch mit dem Kundenservice kostet zwei Euro pro Minute.',
      '3': 'Störungen werden nur montags bis mittwochs entgegengenommen.',
      '4': 'Rechnungen werden künftig nur noch per Briefpost verschickt.',
    },
    darijaStory:
      'خدمة الزبناء بالتليفون (15): وجد رقم الزبون ديالك فاللول (1)، ودخل العداد فـ الأنترنيت 24/24 (5)!',
    audioSlug: 'kundenservice.m4a',
  },
  {
    id: 't3-23',
    teil: 3,
    indexInTeil: 23,
    title: 'Tierpark / Zoo',
    firstWords: 'Herzlich willkommen im städtischen Tierpark...',
    code: '123',
    richtigMap: {
      '1': {
        text: 'Die öffentliche Fütterung der Seehunde beginnt um 11 Uhr.',
        triggers: ['Fütterung der Seehunde beginnt um 11 Uhr', 'Seehunde'],
      },
      '2': {
        text: 'Das Mitbringen und Füttern von eigenem Futter ist im Zoo verboten.',
        triggers: ['eigenem Futter ist im Zoo verboten', 'Füttern verboten'],
      },
      '3': {
        text: 'Bollerwagen für Kinder können direkt am Haupteingang ausgeliehen werden.',
        triggers: ['Bollerwagen', 'am Haupteingang ausgeliehen'],
      },
    },
    falschMap: {
      '4': 'Hunde dürfen im gesamten Tierpark frei ohne Leine laufen.',
      '5': 'Das Tropenhaus ist heute wegen Reparaturarbeiten geschlossen.',
    },
    darijaStory:
      'حديقة الحيوانات Tierpark (123 — الثلاثة اللولين): الماكلة د الفقمة مع 11، ممنوع تعطي ماكلتك للحيوانات، والكرارس د الدراري فالدخلة!',
    audioSlug: 'tierpark.m4a',
  },
  {
    id: 't3-24',
    teil: 3,
    indexInTeil: 24,
    title: 'Rathaus Bürgeramt',
    firstWords: 'Willkommen beim Bürgeramt Ihrer Stadtverwaltung...',
    code: '245',
    richtigMap: {
      '2': {
        text: 'Für die Beantragung eines Reisepasses ist ein Online-Termin erforderlich.',
        triggers: ['Online-Termin erforderlich', 'Reisepasses'],
      },
      '4': {
        text: 'Fertige Ausweisdokumente können ohne Termin am Schnellschalter abgeholt werden.',
        triggers: ['ohne Termin am Schnellschalter abgeholt', 'Schnellschalter'],
      },
      '5': {
        text: 'Die Gebühren können vor Ort bequem mit EC-Karte bezahlt werden.',
        triggers: ['Gebühren können mit EC-Karte bezahlt werden', 'EC-Karte'],
      },
    },
    falschMap: {
      '1': 'Das Bürgeramt hat jeden Samstag bis 18 Uhr geöffnet.',
      '3': 'Biometrische Passfotos werden kostenlos von den Mitarbeitern gemacht.',
    },
    darijaStory:
      'المقاطعة Bürgeramt (245): موعد أونلاين للباسبور (2)، تاخذ لاكارط واجدة بلا موعد (4)، والخلاص بلاكارط بنكية (5)!',
    audioSlug: 'buergeramt.m4a',
  },
  {
    id: 't3-25',
    teil: 3,
    indexInTeil: 25,
    title: 'Volkshochschule (VHS)',
    firstWords: 'Das neue Programmheft der Volkshochschule ist erschienen...',
    code: '134',
    richtigMap: {
      '1': {
        text: 'Das neue Programmheft der Volkshochschule liegt ab sofort im Rathaus aus.',
        triggers: ['Programmheft', 'im Rathaus aus'],
      },
      '3': {
        text: 'Studierende und Rentner erhalten eine Ermäßigung auf die Kursgebühren.',
        triggers: ['Ermäßigung auf die Kursgebühren', 'Ermäßigung'],
      },
      '4': {
        text: 'Kochkurse finden in der neuen Lehrküche der Berufsschule statt.',
        triggers: ['Kochkurse', 'Lehrküche'],
      },
    },
    falschMap: {
      '2': 'Anmeldungen sind nur persönlich im Sekretariat möglich.',
      '5': 'Alle Computerkurse wurden aus dem Programm gestrichen.',
    },
    darijaStory:
      'مدرسة الشعب VHS (134): الكتيب كاين فـ البلدية (1)، تخفيض للطلبة والمتقاعدين (3)، ودروس الطبخ فـ الكوزينة الجديدة (4)!',
    audioSlug: 'vhs.m4a',
  },
  {
    id: 't3-26',
    teil: 3,
    indexInTeil: 26,
    title: 'Theaterkasse',
    firstWords: 'Guten Tag bei der Theaterkasse des Staatstheaters...',
    code: '35',
    richtigMap: {
      '3': {
        text: 'Restkarten für die Abendvorstellung gibt es ab 18:30 Uhr zum halben Preis.',
        triggers: ['Restkarten', 'zum halben Preis'],
      },
      '5': {
        text: 'Garderobengebühren sind im Ticketpreis bereits enthalten.',
        triggers: ['Garderobengebühren sind im Ticketpreis bereits enthalten', 'Garderobengebühren'],
      },
    },
    falschMap: {
      '1': 'Die Premiere am Freitag ist bereits vollständig ausverkauft.',
      '2': 'Reservierte Karten müssen drei Tage vor der Aufführung abgeholt werden.',
      '4': 'Während der Vorstellung dürfen Getränke mit in den Saal genommen werden.',
    },
    darijaStory:
      'شباك المسرح Theaterkasse (35): التذاكر اللي شاطو بنص الثمن فالليل (3)، وخزانة الحوايج داخلة فالتذكرة (5)!',
    audioSlug: 'theaterkasse.m4a',
  },
  {
    id: 't3-27',
    teil: 3,
    indexInTeil: 27,
    title: 'Apotheken-Notdienst',
    firstWords: 'Sie hören den Ansagedienst für den Apotheken-Notdienst...',
    code: '14',
    richtigMap: {
      '1': {
        text: 'Die Löwen-Apotheke am Marktplatz hat heute Nacht durchgehend Notdienst.',
        triggers: ['Löwen-Apotheke', 'heute Nacht durchgehend Notdienst'],
      },
      '4': {
        text: 'Für den Einkauf in der Nacht fällt eine geringe gesetzliche Notdienstgebühr an.',
        triggers: ['Notdienstgebühr', 'in der Nacht'],
      },
    },
    falschMap: {
      '2': 'Im Notdienst werden ausschließlich verschreibungspflichtige Medikamente ausgegeben.',
      '3': 'Die Apotheke ist nur mit dem Auto über die Autobahn erreichbar.',
      '5': 'Am Sonntagvormittag sind alle Apotheken der Stadt regulär geöffnet.',
    },
    darijaStory:
      'فرماسيان د الليل Apotheke (14): صيدلية الأسد خدامة الليل كامل (1)، وكاينة زيادة صغيرة ديال الحراسة الليلية (4)!',
    audioSlug: 'apotheke.m4a',
  },
  {
    id: 't3-28',
    teil: 3,
    indexInTeil: 28,
    title: 'Sperrmüllabholung',
    firstWords: 'Wichtiger Hinweis der Stadtreinigung zur Sperrmüllabholung...',
    code: '235',
    richtigMap: {
      '2': {
        text: 'Alte Möbel dürfen frühestens am Vorabend der Abholung herausgestellt werden.',
        triggers: ['frühestens am Vorabend', 'Alte Möbel'],
      },
      '3': {
        text: 'Elektrogeräte und Kühlschränke müssen separat angemeldet werden.',
        triggers: ['Elektrogeräte', 'separat angemeldet'],
      },
      '5': {
        text: 'Zwei Sperrmülltermine pro Kalenderjahr sind für jeden Haushalt kostenlos.',
        triggers: ['Zwei Sperrmülltermine', 'kostenlos'],
      },
    },
    falschMap: {
      '1': 'Autoreifen und Bauschutt werden beim Sperrmüll ebenfalls mitgenommen.',
      '4': 'Die Abholung erfolgt immer nur am ersten Sonntag im Monat.',
    },
    darijaStory:
      'جمع الأثاث القديم Sperrmüll (235): حط الأثاث ليلة الجمع (2)، الثلاجات والأجهزة بوحدهم (3)، وجوج مرات فالعام فابور (5)!',
    audioSlug: 'sperrmuell.m4a',
  },
  {
    id: 't3-29',
    teil: 3,
    indexInTeil: 29,
    title: 'Sommercamp für Jugendliche',
    firstWords: 'Informationen für alle Eltern zum internationalen Sommercamp...',
    code: '125',
    richtigMap: {
      '1': {
        text: 'Die Abfahrt der Reisebusse erfolgt am Montag um 8 Uhr am Busbahnhof.',
        triggers: ['Abfahrt der Reisebusse', '8 Uhr am Busbahnhof'],
      },
      '2': {
        text: 'Jeder Teilnehmer muss eine Kopie des Impfpasses und der Krankenkassenkarte mitbringen.',
        triggers: ['Impfpasses und der Krankenkassenkarte', 'mitbringen'],
      },
      '5': {
        text: 'Wassersportkurse und Ausflüge sind im Teilnahmepreis enthalten.',
        triggers: ['Wassersportkurse', 'im Teilnahmepreis enthalten'],
      },
    },
    falschMap: {
      '3': 'Die Jugendlichen übernachten in einem großen Stadthotel.',
      '4': 'Eltern müssen für das Abendessen extra Geld überweisen.',
    },
    darijaStory:
      'مخيم الصيف Sommercamp (125): الانطلاقة مع 8 د الصباح (1)، جيب كارط الصحة والتلقيح (2)، والرياضة المائية داخلة فالثمن (5)!',
    audioSlug: 'sommercamp.m4a',
  },
  {
    id: 't3-30',
    teil: 3,
    indexInTeil: 30,
    title: 'Weihnachtsmarkt',
    firstWords: 'Herzlich willkommen auf unserem historischen Weihnachtsmarkt...',
    code: '145',
    richtigMap: {
      '1': {
        text: 'Der historische Weihnachtsmarkt rund um den Dom ist täglich bis 21 Uhr geöffnet.',
        triggers: ['Weihnachtsmarkt', 'bis 21 Uhr geöffnet'],
      },
      '4': {
        text: 'Für die Glühweintassen wird ein Pfand von drei Euro berechnet.',
        triggers: ['Glühweintassen', 'Pfand von drei Euro'],
      },
      '5': {
        text: 'Am Wochenende fahren zusätzliche Park-and-Ride-Busse in die Innenstadt.',
        triggers: ['Park-and-Ride-Busse', 'Am Wochenende'],
      },
    },
    falschMap: {
      '2': 'Der Besuch des Weihnachtsmarktes kostet fünf Euro Eintritt.',
      '3': 'Die Eislaufbahn auf dem Schlossplatz wurde in diesem Jahr abgebaut.',
    },
    darijaStory:
      'سوق الكريسماس Weihnachtsmarkt (145): حال حتى لـ 9 د الليل (1)، الكيسان فيهم 3 أورو ضمانة Pfand (4)، وطوبيسات إضافية فالويكاند (5)!',
    audioSlug: 'weihnachtsmarkt.m4a',
  },
  {
    id: 't3-31',
    teil: 3,
    indexInTeil: 31,
    title: 'Fahrschule',
    firstWords: 'Willkommen bei der Fahrschule Sicher ans Ziel...',
    code: '24',
    richtigMap: {
      '2': {
        text: 'Der theoretische Unterricht findet jeden Dienstag- und Donnerstagabend statt.',
        triggers: ['theoretische Unterricht', 'Dienstag- und Donnerstagabend'],
      },
      '4': {
        text: 'Der Erste-Hilfe-Kurs kann direkt am Samstag in der Fahrschule absolviert werden.',
        triggers: ['Erste-Hilfe-Kurs', 'in der Fahrschule'],
      },
    },
    falschMap: {
      '1': 'Praktische Fahrstunden sind nur vormittags zwischen 8 und 12 Uhr möglich.',
      '3': 'Für Motorräder bietet die Fahrschule keine Ausbildung an.',
      '5': 'Die Lern-App für die Theorieprüfung kostet hundert Euro extra.',
    },
    darijaStory:
      'مدرسة السياقة Fahrschule (24): دروس الكود نهار الثلاث والخميس عشية (2)، ودرس الإسعافات الأولية نهار السبت فـ نفس المدرسة (4)!',
    audioSlug: 'fahrschule.m4a',
  },
  {
    id: 't3-32',
    teil: 3,
    indexInTeil: 32,
    title: 'Mieterverein',
    firstWords: 'Sie sind verbunden mit dem örtlichen Mieterverein...',
    code: '13',
    richtigMap: {
      '1': {
        text: 'Mitglieder erhalten eine kostenlose Prüfung ihrer jährlichen Nebenkostenabrechnung.',
        triggers: ['Prüfung ihrer jährlichen Nebenkostenabrechnung', 'Nebenkostenabrechnung'],
      },
      '3': {
        text: 'Für eine persönliche Rechtsberatung muss man vorab telefonisch einen Termin vereinbaren.',
        triggers: ['persönliche Rechtsberatung', 'Termin vereinbaren'],
      },
    },
    falschMap: {
      '2': 'Der Mieterverein vermittelt selbst günstige Mietwohnungen in der Stadt.',
      '4': 'Nichtmitglieder werden am Telefon ausführlich von Anwälten beraten.',
      '5': 'Die Geschäftsstelle ist mittwochs den ganzen Tag geöffnet.',
    },
    darijaStory:
      'جمعية الكراية Mieterverein (13): كيراجعو ليك فاتورة Nebenkosten فابور (1)، ولاستشارة المحامي خاصك تاخذ موعد (3)!',
    audioSlug: 'mieterverein.m4a',
  },
  {
    id: 't3-33',
    teil: 3,
    indexInTeil: 33,
    title: 'Buchmesse',
    firstWords: 'Willkommen auf der internationalen Buchmesse...',
    code: '234',
    richtigMap: {
      '2': {
        text: 'Für Privatbesucher ist die Buchmesse am Samstag und Sonntag geöffnet.',
        triggers: ['Privatbesucher', 'Samstag und Sonntag geöffnet'],
      },
      '3': {
        text: 'Autorenlesungen finden auf der großen Bühne in Halle 4 statt.',
        triggers: ['Autorenlesungen', 'Halle 4'],
      },
      '4': {
        text: 'Am Sonntag dürfen Bücher direkt an den Verlagsständen verkauft werden.',
        triggers: ['Am Sonntag dürfen Bücher', 'verkauft werden'],
      },
    },
    falschMap: {
      '1': 'Der Eintritt für Kinder und Jugendliche kostet zwanzig Euro.',
      '5': 'Auf dem gesamten Messegelände gibt es kein kostenloses WLAN.',
    },
    darijaStory:
      'معرض الكتاب Buchmesse (234 — الثلاثة د الوسط): مفتوح للعموم السبت والأحد (2)، القراءات فـ القاعة 4 (3)، وبيع الكتوبة مسموح نهار الأحد (4)!',
    audioSlug: 'buchmesse.m4a',
  },
  {
    id: 't3-34',
    teil: 3,
    indexInTeil: 34,
    title: 'Kino-Sondervorstellung',
    firstWords: 'Herzlich willkommen im Programm-Kino Metropolis...',
    code: '15',
    richtigMap: {
      '1': {
        text: 'Nach der heutigen Filmvorführung findet ein Gespräch mit dem Regisseur statt.',
        triggers: ['Gespräch mit dem Regisseur', 'Nach der heutigen Filmvorführung'],
      },
      '5': {
        text: 'Kinobesucher erhalten im Parkhaus gegenüber drei Stunden Rabatt.',
        triggers: ['im Parkhaus gegenüber drei Stunden Rabatt', 'Parkhaus'],
      },
    },
    falschMap: {
      '2': 'Der Film wird heute ausschließlich in französischer Sprache ohne Untertitel gezeigt.',
      '3': 'Vor dem Hauptfilm läuft eine halbstündige Werbepause.',
      '4': 'Popcorn und Getränke sind heute Abend im Kino ausverkauft.',
    },
    darijaStory:
      'السينما Kino-Sondervorstellung (15): نقاش مع المخرج مورا الفيلم (1)، وتخفيض 3 سوايع فـ الباركينغ اللي مقابل مع السينما (5)!',
    audioSlug: 'kino.m4a',
  },
  {
    id: 't3-35',
    teil: 3,
    indexInTeil: 35,
    title: 'Campingplatz',
    firstWords: 'Willkommen auf unserem Familiencampingplatz am See...',
    code: '124',
    richtigMap: {
      '1': {
        text: 'Zwischen 22 Uhr abends und 7 Uhr morgens gilt auf dem Platz Nachtruhe.',
        triggers: ['Nachtruhe', '22 Uhr'],
      },
      '2': {
        text: 'Frische Brötchen für das Frühstück müssen am Vortag im Kiosk bestellt werden.',
        triggers: ['Frische Brötchen', 'am Vortag im Kiosk bestellt'],
      },
      '4': {
        text: 'Offenes Feuer am Strand ist verboten, Gasgrills sind jedoch erlaubt.',
        triggers: ['Offenes Feuer am Strand ist verboten', 'Gasgrills sind jedoch erlaubt'],
      },
    },
    falschMap: {
      '3': 'Warmes Wasser in den Duschen kostet zwei Euro extra pro Marke.',
      '5': 'Abreisende Gäste müssen den Platz bereits um 8 Uhr morgens verlassen.',
    },
    darijaStory:
      'الكامبينغ Campingplatz (124): السكات فـ 10 د الليل (1)، الكومير كومونديه نهار قبل (2)، والعافية ممنوعة ولكن الشواية د الغاز مسموحة (4)!',
    audioSlug: 'campingplatz.m4a',
  },
  {
    id: 't3-36',
    teil: 3,
    indexInTeil: 36,
    title: 'Skigebiet Liftinfo',
    firstWords: 'Aktuelle Information der Bergbahnen im Skigebiet...',
    code: '345',
    richtigMap: {
      '3': {
        text: 'Wegen starken Windes bleibt die Gipfelbahn heute vorübergehend geschlossen.',
        triggers: ['Wegen starken Windes bleibt die Gipfelbahn', 'geschlossen'],
      },
      '4': {
        text: 'Die Talabfahrt ist frisch präpariert und vollständig geöffnet.',
        triggers: ['Talabfahrt', 'vollständig geöffnet'],
      },
      '5': {
        text: 'Abseits der markierten Pisten besteht erhöhte Lawinengefahr.',
        triggers: ['Abseits der markierten Pisten', 'Lawinengefahr'],
      },
    },
    falschMap: {
      '1': 'Alle Skilifte im gesamten Gebiet stehen heute den ganzen Tag still.',
      '2': 'Die Skischule für Kinder fällt heute wegen Schneefalls aus.',
    },
    darijaStory:
      'محطة التزلج Skigebiet (345 — الثلاثة اللخرين): التليفريك مسدود بالبرد (3)، الهبطة مفتوحة (4)، وخارح السكة كاين خطر الانهيار الثلجي (5)!',
    audioSlug: 'skigebiet.m4a',
  },
  {
    id: 't3-37',
    teil: 3,
    indexInTeil: 37,
    title: 'Bürgerbus',
    firstWords: 'Informationen zum neuen ehrenamtlichen Bürgerbus...',
    code: '135',
    richtigMap: {
      '1': {
        text: 'Der neue Bürgerbus verbindet die äußeren Ortsteile mit dem Stadtzentrum.',
        triggers: ['verbindet die äußeren Ortsteile mit dem Stadtzentrum', 'Bürgerbus'],
      },
      '3': {
        text: 'Alle Fahrerinnen und Fahrer arbeiten ehrenamtlich in ihrer Freizeit.',
        triggers: ['arbeiten ehrenamtlich', 'Fahrerinnen und Fahrer'],
      },
      '5': {
        text: 'Gehbehinderte Fahrgäste können auf Wunsch direkt an der Haustür abgeholt werden.',
        triggers: ['direkt an der Haustür abgeholt', 'Gehbehinderte'],
      },
    },
    falschMap: {
      '2': 'Der Bürgerbus fährt nur einmal pro Woche am Sonntagabend.',
      '4': 'Eine Einzelfahrt kostet zehn Euro pro Person.',
    },
    darijaStory:
      'طوبيس المواطنين Bürgerbus (135 — الفرديين): كيربط الدواور بالسنطر (1)، الشوافرية متطوعين (3)، والناس اللي ما كيقدروش يتمشاو كيهزهم من باب الدار (5)!',
    audioSlug: 'buergerbus.m4a',
  },
  {
    id: 't3-38',
    teil: 3,
    indexInTeil: 38,
    title: 'Musikfestival Camping',
    firstWords: 'Wichtige Hinweise für alle Besucher des Open-Air-Musikfestivals...',
    code: '245',
    richtigMap: {
      '2': {
        text: 'Jeder Gast muss sein Eintrittsticket am Eingang gegen ein Armband tauschen.',
        triggers: ['gegen ein Armband tauschen', 'Armband'],
      },
      '4': {
        text: 'Kostenlose Trinkwasserstationen befinden sich neben allen Bühnen.',
        triggers: ['Kostenlose Trinkwasserstationen', 'neben allen Bühnen'],
      },
      '5': {
        text: 'Bei Rückgabe des vollen Müllsacks erhält man zehn Euro Müllpfand zurück.',
        triggers: ['zehn Euro Müllpfand zurück', 'Müllpfand'],
      },
    },
    falschMap: {
      '1': 'Autos dürfen direkt neben den Zelten auf der Wiese geparkt werden.',
      '3': 'Auf dem Festivalgelände kann man nur mit Bargeld bezahlen.',
    },
    darijaStory:
      'مهرجان الموسيقى Musikfestival (245): بدل التذكرة ببراسلي (2)، الما فابور حدا الخشبات (4)، ورجع ميكة الزبل تاخذ 10 أورو ديالك (5)!',
    audioSlug: 'musikfestival.m4a',
  },
  {
    id: 't3-39',
    teil: 3,
    indexInTeil: 39,
    title: 'Schiffstour auf dem Rhein',
    firstWords: 'Herzlich willkommen an Bord zu unserer Panoramafahrt auf dem Rhein...',
    code: '123',
    richtigMap: {
      '1': {
        text: 'Die zweistündige Rundfahrt führt vorbei an historischen Burgen im Rheintal.',
        triggers: ['historischen Burgen im Rheintal', 'Rundfahrt'],
      },
      '2': {
        text: 'Bei Sonnenschein sollten Fahrgäste auf dem Oberdeck an Sonnenschutz denken.',
        triggers: ['Oberdeck an Sonnenschutz denken', 'Sonnenschutz'],
      },
      '3': {
        text: 'Mit dem Kombiticket kann man unterwegs an einer Anlegestelle aussteigen.',
        triggers: ['Kombiticket', 'unterwegs an einer Anlegestelle aussteigen'],
      },
    },
    falschMap: {
      '4': 'Fahrräder dürfen auf den Ausflugsschiffen grundsätzlich nicht mitgenommen werden.',
      '5': 'Das Bordrestaurant serviert heute ausschließlich kalte Getränke.',
    },
    darijaStory:
      'جولة السفينة فالراين (123 — الثلاثة اللولين): كدوز حدا القلاع التاريخية (1)، دير لكريم د الشمش الفوق (2)، وبالتذكرة المزدوجة تقدر تنزل فـ الطريق (3)!',
    audioSlug: 'schiffstour.m4a',
  },
  {
    id: 't3-40',
    teil: 3,
    indexInTeil: 40,
    title: 'Sternwarte',
    firstWords: 'Willkommen zum Beobachtungsabend in der Volkssternwarte...',
    code: '25',
    richtigMap: {
      '2': {
        text: 'Da die Kuppel nicht beheizt ist, wird warme Kleidung dringend empfohlen.',
        triggers: ['Kuppel nicht beheizt', 'warme Kleidung'],
      },
      '5': {
        text: 'Bei starker Bewölkung findet stattdessen eine Vorführung im Planetarium statt.',
        triggers: ['Bei starker Bewölkung', 'Vorführung im Planetarium'],
      },
    },
    falschMap: {
      '1': 'Die Beobachtung der Sterne durch das Teleskop findet bereits um 13 Uhr statt.',
      '3': 'Kinder unter vierzehn Jahren dürfen die Sternwarte nicht besuchen.',
      '4': 'Besucher müssen ihr eigenes Fernglas mitbringen.',
    },
    darijaStory:
      'مرصد النجوم Sternwarte (25): القبة باردة لبس مزيان (2)، وإلا كان الغيام كيديرو عرض فـ القبة الفلكية Planetarium (5)!',
    audioSlug: 'sternwarte.m4a',
  },
  {
    id: 't3-41',
    teil: 3,
    indexInTeil: 41,
    title: 'Botanischer Garten',
    firstWords: 'Herzlich willkommen im Botanischen Garten der Universität...',
    code: '14',
    richtigMap: {
      '1': {
        text: 'Der Eintritt in den Außenbereich des Botanischen Gartens ist kostenlos.',
        triggers: ['Eintritt in den Außenbereich', 'kostenlos'],
      },
      '4': {
        text: 'Jeden ersten Sonntag im Monat findet eine öffentliche Führung statt.',
        triggers: ['Jeden ersten Sonntag im Monat', 'öffentliche Führung'],
      },
    },
    falschMap: {
      '2': 'Besucher dürfen seltene Blumen und Ableger für ihren eigenen Garten pflücken.',
      '3': 'Fahrradfahren und Fußballspielen sind auf den Rasenflächen erlaubt.',
      '5': 'Die tropischen Gewächshäuser sind im Winter geschlossen.',
    },
    darijaStory:
      'الجردة النباتية Botanischer Garten (14): الدخلة للجردة على برا فابور (1)، وكل أول أحد فالشهر كاينة جولة مع مرشد (4)!',
    audioSlug: 'botanischer_garten.m4a',
  },
  {
    id: 't3-42',
    teil: 3,
    indexInTeil: 42,
    title: 'Kletterwald',
    firstWords: 'Willkommen im Abenteuer-Kletterwald...',
    code: '235',
    richtigMap: {
      '2': {
        text: 'Vor dem Start müssen alle Teilnehmer an einer Sicherheitseinweisung teilnehmen.',
        triggers: ['Sicherheitseinweisung teilnehmen', 'Vor dem Start'],
      },
      '3': {
        text: 'Feste, geschlossene Schuhe sind auf allen Kletterparcours vorgeschrieben.',
        triggers: ['Feste, geschlossene Schuhe', 'vorgeschrieben'],
      },
      '5': {
        text: 'Schulklassen und größere Gruppen erhalten nach Voranmeldung einen Gruppenrabatt.',
        triggers: ['Schulklassen', 'Gruppenrabatt'],
      },
    },
    falschMap: {
      '1': 'Bei Gewitter und Sturm bleibt der Kletterwald normal geöffnet.',
      '4': 'Sicherheitsgurte und Helme müssen die Besucher selbst kaufen.',
    },
    darijaStory:
      'غابة التسلق Kletterwald (235): حصة السلامة ضرورية قبل ما تبدا (2)، صباط مسدود ومزير (3)، وتخفيض للمجموعات والمدارس (5)!',
    audioSlug: 'kletterwald.m4a',
  },
  {
    id: 't3-43',
    teil: 3,
    indexInTeil: 43,
    title: 'Opernhaus',
    firstWords: 'Sehr geehrte Damen und Herren im Opernhaus...',
    code: '13',
    richtigMap: {
      '1': {
        text: 'Während der gesamten Aufführung werden deutsche Übertitel über der Bühne eingeblendet.',
        triggers: ['deutsche Übertitel über der Bühne', 'Übertitel'],
      },
      '3': {
        text: 'Getränke für die Pause können schon vorab im Foyer vorbestellt werden.',
        triggers: ['Getränke für die Pause', 'vorbestellt werden'],
      },
    },
    falschMap: {
      '2': 'Zu spät kommende Gäste dürfen jederzeit während des ersten Aktes in den Saal.',
      '4': 'Das Einschalten von Handys für Videoaufnahmen ist ausdrücklich erwünscht.',
      '5': 'Die heutige Opernaufführung hat keine Pause.',
    },
    darijaStory:
      'دار الأوبرا Opernhaus (13): الترجمة مكتوبة الفوق بالألمانية (1)، وتقدر تكوموندي المشروبات ديال الاستراحة قبل ما يبدا العرض (3)!',
    audioSlug: 'opernhaus.m4a',
  },
  {
    id: 't3-44',
    teil: 3,
    indexInTeil: 44,
    title: 'Handwerkermesse',
    firstWords: 'Willkommen auf der regionalen Handwerkermesse...',
    code: '125',
    richtigMap: {
      '1': {
        text: 'Schülerinnen und Schüler können in den Werkstätten verschiedene Berufe praktisch ausprobieren.',
        triggers: ['Berufe praktisch ausprobieren', 'Werkstätten'],
      },
      '2': {
        text: 'Experten informieren an Sonderständen über Fördergelder für energetische Sanierung.',
        triggers: ['Fördergelder für energetische Sanierung', 'energetische Sanierung'],
      },
      '5': {
        text: 'Ein kostenloser Shuttlebus pendelt alle zehn Minuten zwischen Bahnhof und Messe.',
        triggers: ['kostenloser Shuttlebus', 'zwischen Bahnhof und Messe'],
      },
    },
    falschMap: {
      '3': 'Der Eintritt zur Messe ist nur für Handwerksmeister mit Ausweis gestattet.',
      '4': 'Die Messehallen schließen bereits um 13 Uhr mittags.',
    },
    darijaStory:
      'معرض الحرفيين Handwerkermesse (125): التلاميذ يجربو الحرف بيديهم (1)، نصائح الدعم ديال الإصلاح الطاقي (2)، وطوبيس فابور من المحطة للمعرض (5)!',
    audioSlug: 'handwerkermesse.m4a',
  },
  {
    id: 't3-45',
    teil: 3,
    indexInTeil: 45,
    title: 'Bürgerzentrum',
    firstWords: 'Informationen zum Sommerprogramm im städtischen Bürgerzentrum...',
    code: '34',
    richtigMap: {
      '3': {
        text: 'Im Repair-Café helfen Ehrenamtliche jeden Samstag bei der Reparatur defekter Geräte.',
        triggers: ['Repair-Café', 'Reparatur defekter Geräte'],
      },
      '4': {
        text: 'Für private Familienfeiern kann der große Veranstaltungssaal günstig gemietet werden.',
        triggers: ['für private Familienfeiern', 'gemietet werden'],
      },
    },
    falschMap: {
      '1': 'Das Bürgerzentrum ist nur für Einwohner über fünfundsechzig Jahre zugänglich.',
      '2': 'Das Sprachcafé am Mittwochabend kostet zwanzig Euro Teilnahmegebühr.',
      '5': 'Im gesamten Gebäude gibt es keinen barrierefreien Zugang.',
    },
    darijaStory:
      'دار الشباب/المواطن Bürgerzentrum (34): قهوة الإصلاح Repair-Café كل سبت (3)، وتقدر تكري القاعة الكبيرة للمناسبات العائلية (4)!',
    audioSlug: 'buergerzentrum.m4a',
  },
  {
    id: 't3-46',
    teil: 3,
    indexInTeil: 46,
    title: 'Autobahn A4 (جديد 2026 🔥)',
    firstWords: 'Verkehrshinweis für die Autobahn A4 wegen Brückenarbeiten...',
    code: '14',
    isNew2026: true,
    richtigMap: {
      '1': {
        text: 'Die Autobahn A4 ist von Freitagabend bis Montagmorgen wegen Brückenarbeiten gesperrt.',
        triggers: ['Autobahn A4', 'wegen Brückenarbeiten gesperrt'],
      },
      '4': {
        text: 'Der Fernverkehr wird großräumig über die ausgeschilderte Umleitung geführt.',
        triggers: ['ausgeschilderte Umleitung geführt', 'Fernverkehr'],
      },
    },
    falschMap: {
      '2': 'Lastwagen dürfen die Baustelle trotz Sperrung weiterhin normal passieren.',
      '3': 'Die Arbeiten an der Brücke dauern voraussichtlich zwei volle Jahre.',
      '5': 'Alle Tankstellen im Umkreis von fünfzig Kilometern sind geschlossen.',
    },
    darijaStory:
      'أوطوروت A4 الجديد 2026 (14): مقطوعة فالويكاند بسبب إصلاح القنطرة (1)، والحديد الكبير كيدوز من الطريق البديلة Umleitung (4)!',
    audioSlug: 'autobahn_a4_neu.m4a',
  },
];
