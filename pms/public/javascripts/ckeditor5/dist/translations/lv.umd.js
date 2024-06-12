/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

( e => {
const { [ 'lv' ]: { dictionary, getPluralForm } } = {"lv":{"dictionary":{"Words: %0":"Vārdi: %0","Characters: %0":"Rakstzīmes: %0","Widget toolbar":"Sīkrīku rīkjosla","Insert paragraph before block":"Ievietot paragrāfu pirms bloka","Insert paragraph after block":"Ievietot paragrāfu aiz bloka","Press Enter to type after or press Shift + Enter to type before the widget":"Nospiediet taustiņu Enter, lai rakstītu aiz logrīka, vai nospiediet taustiņu Shift + Enter, lai rakstītu pirms logrīka","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"Taustiņsitieni, kurus var izmantot, kad ir atlasīts logrīks (piemēram, attēls, tabula utt.)","Insert a new paragraph directly after a widget":"Ievietot jaunu rindkopu tieši aiz logrīka","Insert a new paragraph directly before a widget":"Ievietot jaunu rindkopu tieši pirms logrīka","Move the caret to allow typing directly before a widget":"Pārvietot kursoru, lai rakstītu tieši pirms logrīka","Move the caret to allow typing directly after a widget":"Pārvietot kursoru, lai rakstītu tieši aiz logrīka","Upload in progress":"Notiek augšupielāde","Undo":"Atsaukt","Redo":"Uz priekšu","Rich Text Editor":"Bagātinātais Teksta Redaktors","Editor editing area: %0":"Redaktora rediģēšanas zona: %0","Edit block":"Labot bloku","Click to edit block":"Noklikšķiniet, lai rediģētu sadaļu","Drag to move":"Velciet, lai pārvietotu","Next":"Nākamā","Previous":"Iepriekšējā","Editor toolbar":"Redaktora rīkjosla","Dropdown toolbar":"Papildus izvēlnes rīkjosla","Black":"Melns","Dim grey":"Blāvi pelēks","Grey":"Pelēks","Light grey":"Gaiši pelēks","White":"Balts","Red":"Sarkans","Orange":"Oranžs","Yellow":"Dzeltens","Light green":"Gaiši zaļš","Green":"Zaļš","Aquamarine":"Akvamarīns","Turquoise":"Tirkīza","Light blue":"Gaiši zils","Blue":"Zils","Purple":"Violets","Editor block content toolbar":"Rediģēšanas bloka satura rīkjosla","Editor contextual toolbar":"Redaktora konteksta rīkjosla","HEX":"HEX Krāsu kods","No results found":"Nekas nav atrasts","No searchable items":"Nav meklējamu vienumu","Editor dialog":"Redaktora dialoglodziņš","Close":"Aizvērt","Help Contents. To close this dialog press ESC.":"Palīdzības saturs. Lai aizvērtu šo dialoglodziņu, nospiest ESC.","Below, you can find a list of keyboard shortcuts that can be used in the editor.":"Zemāk skatīt īsinājumtaustiņu sarakstu, ko var izmantot redaktorā.","(may require <kbd>Fn</kbd>)":"(var būt nepieciešams <kbd>Fn</kbd>)","Accessibility":"Pieejamība","Accessibility help":"Piekļūstamības palīdzība","Press %0 for help.":"Lai saņemtu palīdzību, nospiest %0.","Move focus in and out of an active dialog window":"Pārvietot fokusu aktīvajā dialoglodziņā un no tā","MENU_BAR_MENU_FILE":"Fails","MENU_BAR_MENU_EDIT":"Labot","MENU_BAR_MENU_VIEW":"Skatīt","MENU_BAR_MENU_INSERT":"Ievietot","MENU_BAR_MENU_FORMAT":"Formāts","MENU_BAR_MENU_TOOLS":"Rīki","MENU_BAR_MENU_HELP":"Palīdzība","MENU_BAR_MENU_TEXT":"Teksts","MENU_BAR_MENU_FONT":"Fonts","Editor menu bar":"Redaktora izvēlņu josla","Please enter a valid color (e.g. \"ff0000\").":"Lūdzu, ievadiet derīgu krāsu (piemēram, \"ff0000\").","Insert table":"Ievietot tabulu","Header column":"Šī kolonna ir galvene","Insert column left":"Ievietot kolonnu pa kreisi","Insert column right":"Ievietot kolonnu pa labi","Delete column":"Dzēst kolonnu","Select column":"Izvēlēties kolonnu","Column":"Kolonna","Header row":"Šī rinda ir galvene","Insert row below":"Ievietot rindu zem","Insert row above":"Ievietot rindu virs","Delete row":"Dzēst rindu","Select row":"Izvēlēties rindu","Row":"Rinda","Merge cell up":"Apvienot šūnas uz augšu","Merge cell right":"Apvienot šūnas pa labi","Merge cell down":"Apvienot šūnas uz leju","Merge cell left":"Apvienot šūnas pa kreisi","Split cell vertically":"Atdalīt šūnu vertikāli","Split cell horizontally":"Atdalīt šūnu horizontāli","Merge cells":"Apvienot šūnas","Table toolbar":"Tabulas rīkjosla","Table properties":"Tabulas īpašības","Cell properties":"Šūnas īpašības","Border":"Apmale","Style":"Stils","Width":"Platums","Height":"Augstums","Color":"Teksta krāsa","Background":"Fona krāsa","Padding":"Atstatums","Dimensions":"Izmēri","Table cell text alignment":"Teksta novietojums šūnā","Alignment":"Novietojums","Horizontal text alignment toolbar":"Horizontāla teksta līdzināšana","Vertical text alignment toolbar":"Vertikāla teksta līdzināšana","Table alignment toolbar":"Tabulas līdzināšana","None":"Bez apmales","Solid":"Nepārtraukta līnija","Dotted":"Punktēta līnija","Dashed":"Pārtraukta līnija","Double":"Dubulta līnija","Groove":"Iespiesta līnija","Ridge":"Izcelta līnija","Inset":"Ievietot / ieliktnis","Outset":"sākums","Align cell text to the left":"Līdzināt šūnas tekstu pa kreisi","Align cell text to the center":"Līdzināt šūnas tekstu centrā","Align cell text to the right":"Līdzināt šūnas tekstu pa labi","Justify cell text":"Taisnot šūnas tekstu","Align cell text to the top":"Līdzināt šūnas tekstu pie augšas","Align cell text to the middle":"Līdzināt šūnas tekstu vidū","Align cell text to the bottom":"Līdzināt šūnas tekstu pie apakšas","Align table to the left":"Līdzināt tabulu pa kreisi","Center table":"Centrēt tabulu","Align table to the right":"Līdzināt tabulu pa labi","The color is invalid. Try \"#FF0000\" or \"rgb(255,0,0)\" or \"red\".":"Krāsa nav korekta. Mēģiniet \"#FF0000\" vai \"rgb(255,0,0)\" vai \"red\"","The value is invalid. Try \"10px\" or \"2em\" or simply \"2\".":"Vērtība nav korekta. Mēģiniet \"10px\" vai \"2em\" vai vienkārši \"2\"","Color picker":"Krāsu palete","Enter table caption":"Ievadiet tabulas parakstu","Keystrokes that can be used in a table cell":"Taustiņsitieni, kurus var izmantot tabulas šūnā","Move the selection to the next cell":"Pārvietot atlasi uz nākamo šūnu","Move the selection to the previous cell":"Pārvietot atlasi uz iepriekšējo šūnu","Insert a new table row (when in the last cell of a table)":"Ievietot jaunu tabulas rindu (esot tabulas pēdējā šūnā)","Navigate through the table":"Pārvietoties tabulā","Table":"Tabula","Styles":"Stili","Multiple styles":"Vairāki stili","Block styles":"Bloka stili","Text styles":"Teksta stili","Special characters":"Speciālie simboli","All":"Visi","Arrows":"Bultas","Currency":"Valūta","Latin":"Latīņu","Mathematical":"Matemātisks","Text":"Teksts","leftwards simple arrow":"vienkāršā bulta pa kreisi","rightwards simple arrow":"vienkāršā bulta pa labi","upwards simple arrow":"vienkāršā bulta uz augšu","downwards simple arrow":"vienkāršā bulta lejup","leftwards double arrow":"pa kreisi vērstā dubultbultiņa","rightwards double arrow":"pa labi vērstā dubultbultiņa","upwards double arrow":"augšupvērsta dubultā bultiņa","downwards double arrow":"lejupvērsta dubultā bultiņa","leftwards dashed arrow":"pa kreisi vērstā partrauktā bultiņa","rightwards dashed arrow":"pa labi vērstā partrauktā bultiņa","upwards dashed arrow":"augšupvērsta pārtrauktā bultiņa","downwards dashed arrow":"lejupvērsta pārtrauktā bultiņa","leftwards arrow to bar":"pa kreisi vērstā bultiņa uz joslu","rightwards arrow to bar":"pa labi vērstā bultiņa uz joslu","upwards arrow to bar":"augšupvērsta bultiņa uz joslu","downwards arrow to bar":"lejupvērsta bultiņa uz joslu","up down arrow with base":"augšup-lejupvērsta bultiņa ar pamatni","back with leftwards arrow above":"atpakaļ ar kreisi vērstu bultiņu augšpusē","end with leftwards arrow above":"beigt ar kreisi vērstu bultiņu augšpusē","on with exclamation mark with left right arrow above":"ieslēgts ar izsaukuma zīmi ar kreiso-labo bultiņu augšpusē","soon with rightwards arrow above":"drīz ar uz labo pusi vērstu bultiņu augšpusē","top with upwards arrow above":"augšpusē ar augšupvērstu bultiņu augšpusē","Dollar sign":"Dolārzīme","Euro sign":"Eirozīme","Yen sign":"Jenas zīme","Pound sign":"Mārciņas zīme","Cent sign":"Centa zīme","Euro-currency sign":"Eiro valūtas zīme","Colon sign":"Kols","Cruzeiro sign":"Kruzeiro zīme","French franc sign":"Franču franka zīme","Lira sign":"Liras zīme","Currency sign":"Valūtas zīme","Bitcoin sign":"Bitkoina zīme","Mill sign":"Millas zīmes","Naira sign":"Nairas zīme","Peseta sign":"Pesetas zīme","Rupee sign":"Rūpijas zīme","Won sign":"Vonas zīme","New sheqel sign":"Šekeļa zīme","Dong sign":"Donga zīme","Kip sign":"Kipa zīme","Tugrik sign":"Tugrika zīme","Drachma sign":"Drahmas zīme","German penny sign":"Vācu santīma zīme","Peso sign":"Peso zīme","Guarani sign":"Guarani zīme","Austral sign":"Austrāla zīme","Hryvnia sign":"Grivnas zīme","Cedi sign":"Sedi zīme","Livre tournois sign":"Tours mārciņu zīme","Spesmilo sign":"Spesmilo zīme","Tenge sign":"Tenges zīme","Indian rupee sign":"Indijas rūpijas zīme","Turkish lira sign":"Turcijas liras zīme","Nordic mark sign":"Ziemeļu markas zīme","Manat sign":"Manata zīme","Ruble sign":"Rubļa zīme","Latin capital letter a with macron":"Latīņu lielais burts a ar garumzīmi","Latin small letter a with macron":"Latīņu mazais burts a ar garumzīmi","Latin capital letter a with breve":"Latīņu lielais burts a ar īsuma zīmi","Latin small letter a with breve":"Latīņu mazais burts a ar īsuma zīmi","Latin capital letter a with ogonek":"Latīņu lielais burts a ar ogoneku","Latin small letter a with ogonek":"Latīņu mazais burts a ar ogoneku","Latin capital letter c with acute":"Latīņu lielais burts c ar akūtu","Latin small letter c with acute":"Latīņu mazais burts c ar akūtu","Latin capital letter c with circumflex":"Latīņu lielais burts c ar cirkumfleksu","Latin small letter c with circumflex":"Latīņu mazais burts c ar cirkumfleksu","Latin capital letter c with dot above":"Latīņu lielais burts c ar punktu augšpusē","Latin small letter c with dot above":"Latīņu mazais burts c ar punktu augšpusē","Latin capital letter c with caron":"Latīņu lielais burts c ar karonu","Latin small letter c with caron":"Latīņu mazais burts c ar karonu","Latin capital letter d with caron":"Latīņu lielais burts d ar karonu","Latin small letter d with caron":"Latīņu mazais burts d ar karonu","Latin capital letter d with stroke":"Latīņu lielais burts d ar līniju","Latin small letter d with stroke":"Latīņu mazais burts d ar līniju","Latin capital letter e with macron":"Latīņu lielais burts e ar garumzīmi","Latin small letter e with macron":"Latīņu mazais burts e ar garumzīmi","Latin capital letter e with breve":"Latīņu lielais burts e ar īsuma zīmi","Latin small letter e with breve":"Latīņu mazais burts e ar īsuma zīmi","Latin capital letter e with dot above":"Latīņu lielais burts e ar punktu augšpusē","Latin small letter e with dot above":"Latīņu mazais burts e ar punktu augšpusē","Latin capital letter e with ogonek":"Latīņu lielais burts e ar ogoneku","Latin small letter e with ogonek":"Latīņu mazais burts e ar ogoneku","Latin capital letter e with caron":"Latīņu lielais burts e ar karonu","Latin small letter e with caron":"Latīņu mazais burts e ar karonu","Latin capital letter g with circumflex":"Latīņu lielais burts g ar cirkumfleksu","Latin small letter g with circumflex":"Latīņu mazais burts g ar cirkumfleksu","Latin capital letter g with breve":"Latīņu lielais burts g ar īsuma zīmi","Latin small letter g with breve":"Latīņu mazais burts g ar īsuma zīmi","Latin capital letter g with dot above":"Latīņu lielais burts g ar punktu augšpusē","Latin small letter g with dot above":"Latīņu mazais burts e ar punktu augšpusē","Latin capital letter g with cedilla":"Latīņu lielais burts g ar sediļu","Latin small letter g with cedilla":"Latīņu mazais burts g ar sediļu","Latin capital letter h with circumflex":"Latīņu lielais burts h ar cirkumfleksu","Latin small letter h with circumflex":"Latīņu mazais burts c ar cirkumfleksu","Latin capital letter h with stroke":"Latīņu lielais burts h ar līniju","Latin small letter h with stroke":"Latīņu mazais burts h ar līniju","Latin capital letter i with tilde":"Latīņu lielais burts i ar tildi","Latin small letter i with tilde":"Latīņu mazais burts i ar tildi","Latin capital letter i with macron":"Latīņu lielais burts i ar garumzīmi","Latin small letter i with macron":"Latīņu mazais burts i ar garumzīmi","Latin capital letter i with breve":"Latīņu lielais burts i ar īsuma zīmi","Latin small letter i with breve":"Latīņu mazais burts i ar īsuma zīmi","Latin capital letter i with ogonek":"Latīņu lielais burts i ar ogoneku","Latin small letter i with ogonek":"Latīņu mazais burts i ar ogoneku","Latin capital letter i with dot above":"Latīņu lielais burts i ar punktu augšpusē","Latin small letter dotless i":"Latīņu mazais bezpunkta burts i","Latin capital ligature ij":"Latīņu lielā ligatūra ij","Latin small ligature ij":"Latīņu mazā ligatūra ij","Latin capital letter j with circumflex":"Latīņu lielais burts j ar cirkumfleksu","Latin small letter j with circumflex":"Latīņu mazais burts j ar cirkumfleksu","Latin capital letter k with cedilla":"Latīņu lielais burts k ar sediļu","Latin small letter k with cedilla":"Latīņu mazais burts k ar sediļu","Latin small letter kra":"Latīņu mazais burts kra","Latin capital letter l with acute":"Latīņu lielais burts l ar akūtu","Latin small letter l with acute":"Latīņu mazais burts l ar akūtu","Latin capital letter l with cedilla":"Latīņu lielais burts l ar sediļu","Latin small letter l with cedilla":"Latīņu mazais burts l ar sediļu","Latin capital letter l with caron":"Latīņu lielais burts l ar karonu","Latin small letter l with caron":"Latīņu mazais burts l ar karonu","Latin capital letter l with middle dot":"Latīņu lielais burts l ar vidējo punktu","Latin small letter l with middle dot":"Latīņu mazais burts l ar vidējo punktu","Latin capital letter l with stroke":"Latīņu lielais burts l ar līniju","Latin small letter l with stroke":"Latīņu mazais burts l ar līniju","Latin capital letter n with acute":"Latīņu lielais burts n ar akūtu","Latin small letter n with acute":"Latīņu mazais burts n ar akūtu","Latin capital letter n with cedilla":"Latīņu lielais burts n ar sediļu","Latin small letter n with cedilla":"Latīņu mazais burts n ar sediļu","Latin capital letter n with caron":"Latīņu lielais burts n ar karonu","Latin small letter n with caron":"Latīņu mazais burts n ar karonu","Latin small letter n preceded by apostrophe":"Latīņu mazais burts n, pirms kura ir apostrofs","Latin capital letter eng":"Latīņu lielais burts eng","Latin small letter eng":"Latīņu mazais burts eng","Latin capital letter o with macron":"Latīņu lielais burts o ar garumzīmi","Latin small letter o with macron":"Latīņu mazais burts o ar garumzīmi","Latin capital letter o with breve":"Latīņu lielais burts o ar īsuma zīmi","Latin small letter o with breve":"Latīņu mazais burts o ar īsuma zīmi","Latin capital letter o with double acute":"Latīņu lielais burts o ar dubultu akūtu","Latin small letter o with double acute":"Latīņu mazais burts o ar dubultu akūtu","Latin capital ligature oe":"Latīņu lielā ligatūra oe","Latin small ligature oe":"Latīņu mazā ligatūra oe","Latin capital letter r with acute":"Latīņu lielais burts r ar akūtu","Latin small letter r with acute":"Latīņu mazais burts r ar akūtu","Latin capital letter r with cedilla":"Latīņu lielais burts r ar sediļu","Latin small letter r with cedilla":"Latīņu mazais burts r ar sediļu","Latin capital letter r with caron":"Latīņu lielais burts r ar karonu","Latin small letter r with caron":"Latīņu mazais burts r ar karonu","Latin capital letter s with acute":"Latīņu lielais burts s ar akūtu","Latin small letter s with acute":"Latīņu mazais burts s ar akūtu","Latin capital letter s with circumflex":"Latīņu lielais burts s ar cirkumfleksu","Latin small letter s with circumflex":"Latīņu mazais burts s ar cirkumfleksu","Latin capital letter s with cedilla":"Latīņu lielais burts s ar sediļu","Latin small letter s with cedilla":"Latīņu mazais burts s ar sediļu","Latin capital letter s with caron":"Latīņu lielais burts s ar karonu","Latin small letter s with caron":"Latīņu mazais burts s ar karonu","Latin capital letter t with cedilla":"Latīņu lielais burts t ar sediļu","Latin small letter t with cedilla":"Latīņu mazais burts t ar sediļu","Latin capital letter t with caron":"Latīņu lielais burts t ar karonu","Latin small letter t with caron":"Latīņu mazais burts t ar karonu","Latin capital letter t with stroke":"Latīņu lielais burts t ar līniju","Latin small letter t with stroke":"Latīņu mazais burts t ar līniju","Latin capital letter u with tilde":"Latīņu lielais burts u ar tildi","Latin small letter u with tilde":"Latīņu mazais burts u ar tildi","Latin capital letter u with macron":"Latīņu lielais burts u ar garumzīmi","Latin small letter u with macron":"Latīņu mazais burts u ar garumzīmi","Latin capital letter u with breve":"Latīņu lielais burts u ar īsuma zīmi","Latin small letter u with breve":"Latīņu mazais burts u ar īsuma zīmi","Latin capital letter u with ring above":"Latīņu lielais burts u ar gredzenu augšpusē","Latin small letter u with ring above":"Latīņu mazais burts u ar gredzenu augšpusē","Latin capital letter u with double acute":"Latīņu lielais burts u ar dubultu akūtu","Latin small letter u with double acute":"Latīņu mazais burts u ar dubultu akūtu","Latin capital letter u with ogonek":"Latīņu lielais burts u ar ogoneku","Latin small letter u with ogonek":"Latīņu mazais burts u ar ogoneku","Latin capital letter w with circumflex":"Latīņu lielais burts w ar cirkumfleksu","Latin small letter w with circumflex":"Latīņu mazais burts w ar cirkumfleksu","Latin capital letter y with circumflex":"Latīņu lielais burts y ar cirkumfleksu","Latin small letter y with circumflex":"Latīņu mazais burts y ar cirkumfleksu","Latin capital letter y with diaeresis":"Latīņu lielais burts y ar diaerēzi","Latin capital letter z with acute":"Latīņu lielais burts z ar akūtu","Latin small letter z with acute":"Latīņu mazais burts z ar akūtu","Latin capital letter z with dot above":"Latīņu lielais burts z ar punktu augšpusē","Latin small letter z with dot above":"Latīņu mazais burts z ar punktu augšpusē","Latin capital letter z with caron":"Latīņu lielais burts z ar karonu","Latin small letter z with caron":"Latīņu mazais burts z ar karonu","Latin small letter long s":"Latīņu mazais burts garais s","Less-than sign":"Mazāk nekā zīme","Greater-than sign":"Vairāk nekā zīme","Less-than or equal to":"Mazāks par vai vienāds ar","Greater-than or equal to":"Lielāks par vai vienāds ar","En dash":"Īsa domuzīme","Em dash":"Domuzīme","Macron":"Garumzīme","Overline":"Virssvītra","Degree sign":"Grādu zīme","Minus sign":"Mīnus zīme","Plus-minus sign":"Plus-mīnus zīme","Division sign":"Dalīšanas zīme","Fraction slash":"Dalīšanas slīpsvītra","Multiplication sign":"Reizināšanas zīme","Latin small letter f with hook":"Latīņu mazais burts f ar āķi","Integral":"Integrālis","N-ary summation":"N-āra summa","Infinity":"Bezgalība","Square root":"Kvadrātsakne","Tilde operator":"Tildes operators","Approximately equal to":"Aptuveni vienāds ar","Almost equal to":"Gandrīz vienāds ar","Not equal to":"Nav vienāds ar","Identical to":"Vienāds ar","Element of":"Elements no","Not an element of":"Nav elements","Contains as member":"Satur kā ","N-ary product":"N-ārs produkts","Logical and":"Loģisks un ","Logical or":"Loģisks vai","Not sign":"Aizlieguma zīme","Intersection":"Intersekcija","Union":"Savienība","Partial differential":"Daļējs diferenciālis","For all":"Visiem","There exists":"Eksistē","Empty set":"Tukša kopa","Nabla":"Nabla","Asterisk operator":"Asterisks","Proportional to":"Proporcionāls","Angle":"Stūris","Vulgar fraction one quarter":"Viena ceturtdaļa","Vulgar fraction one half":"Viena puse","Vulgar fraction three quarters":"Trīs ceturtdaļas","Single left-pointing angle quotation mark":"Pa kreisi vērsta stūrainā pēdiņa","Single right-pointing angle quotation mark":"Pa labi vērsta stūrainā pēdiņa","Left-pointing double angle quotation mark":"Pa kreisi vērstas dubultās stūrainās pēdiņas","Right-pointing double angle quotation mark":"Pa labi vērstas dubultās stūrainās pēdiņas","Left single quotation mark":"Viena kreisā pēdiņa","Right single quotation mark":"Viena labā pēdiņa","Left double quotation mark":"Kreisās dubultās pēdiņas","Right double quotation mark":"Labās dubultās pēdiņas","Single low-9 quotation mark":"Viena zemā-9 pēdiņās","Double low-9 quotation mark":"Dubultās zemās-9 pēdiņās","Inverted exclamation mark":"Apgriezta izsaukuma zīme","Inverted question mark":"Apgriezta jautājuma zīme","Two dot leader":"Divu punktu līderis","Horizontal ellipsis":"Horizontālā elipse","Double dagger":"Dubults duncis","Per mille sign":"Promiles zīme","Per ten thousand sign":"Desmit tūkstošās daļas zīme","Double exclamation mark":"Dubulta izsaukuma zīme","Question exclamation mark":"Jautājuma izsaukuma zīme","Exclamation question mark":"Izsaukuma jautājuma zīme","Double question mark":"Dubulta jautājumzīme","Copyright sign":"Autortiesību zīme","Registered sign":"Reģistrēta prečuzīmes zīme","Trade mark sign":"Prečuzīmes zīme","Section sign":"Sekcijas zīme","Paragraph sign":"Rindkopas zīme","Reversed paragraph sign":"Apgrieztā rindkopas zīme","Character categories":"Rakstzīmju kategorijas","Source":"Pirmavots","Show source":"Rādīt avotu","Show blocks":"Rādīt blokus","Select all":"Izvēlēties visu","Disable editing":"Atspējot labošanu","Enable editing":"Iespējot labošanu","Previous editable region":"Iepriekšējais labošanas reģions","Next editable region":"Nākamais labošanas reģions","Navigate editable regions":"Navigēt caur labojamajiem reģioniem","Remove Format":"Noņemt formatējumu","Page break":"Lappuses pārtraukums","media widget":"medija sīkrīks","Media URL":"Medija URL","Paste the media URL in the input.":"Ielīmējiet medija URL teksta laukā.","Tip: Paste the URL into the content to embed faster.":"Padoms: Ielīmējiet adresi saturā, lai iegultu","The URL must not be empty.":"URL ir jābūt ievadītam.","This media URL is not supported.":"Šis medija URL netiek atbalstīts.","Insert media":"Ievietot mediju","Media toolbar":"Mediju rīkjosla","Open media in new tab":"Atvērt mediju jaunā cilnē","Numbered List":"Numurēts Saraksts","Bulleted List":"Nenumurēts Saraksts","To-do List":"To-do Saraksts","Bulleted list styles toolbar":"Nenumurēta saraksta stili","Numbered list styles toolbar":"Numurēta saraksta stili","Toggle the disc list style":"Pārslēgt diskveida saraksta stilu","Toggle the circle list style":"Pārslēgt apļveida saraksta stilu","Toggle the square list style":"Pārslēgt kvadrātveida saraksta stilu","Toggle the decimal list style":"Pārslēgt decimālskaitļu saraksta stilu","Toggle the decimal with leading zero list style":"Pārslēgt decimālskaitļu sākot ar nulli saraksta stilu","Toggle the lower–roman list style":"Pārslēgt mazo romiešu burtu saraksta stilu","Toggle the upper–roman list style":"Pārslēgt lielo romiešu burtu saraksta stilu","Toggle the lower–latin list style":"Pārslēgt mazo latīņu burtu saraksta stilu","Toggle the upper–latin list style":"Pārslēgt lielo latīņu burtu saraksta stilu","Disc":"Disks","Circle":"Aplis","Square":"Kvadrāts","Decimal":"Cipari","Decimal with leading zero":"Decimālskaitļi sākot ar nulli","Lower–roman":"mazie romiešu burti","Upper-roman":"lielie romiešu burti","Lower-latin":"mazie latīņu burti","Upper-latin":"lielie latīņu burti","List properties":"saraksta detaļas","Start at":"Sākt no","Invalid start index value.":"Nederīga sākotnējā indeksa vērtība.","Start index must be greater than 0.":"Indeksam jābūt lielākam par 0","Reversed order":"Pretēja secība","Keystrokes that can be used in a list":"Taustiņsitieni, kurus var izmantot sarakstā","Increase list item indent":"Palielināt saraksta vienuma atkāpi","Decrease list item indent":"Samazināt saraksta vienuma atkāpi","Entering a to-do list":"Pievieno uzdevumu sarakstu","Leaving a to-do list":"Atstāj veicamo darbu sarakstu","Unlink":"Noņemt Saiti","Link":"Saite","Link URL":"Saites URL","Link URL must not be empty.":"Saites URL lauks nedrīkst būt tukšs.","Link image":"Ievietot saiti uz attēla","Edit link":"Labot Saiti","Open link in new tab":"Atvērt saiti jaunā cilnē","This link has no URL":"Saitei nav norādīts URL","Open in a new tab":"Atvērt jaunā cilnē","Downloadable":"Lejupielādējams","Create link":"Izveidot saiti","Move out of a link":"Iziet no saites","Language":"Valoda","Choose language":"Izvēlēties valodu","Remove language":"Dzēst valodu","Increase indent":"Palielināt atkāpi","Decrease indent":"Samazināt atkāpi","image widget":"attēla sīkrīks","Wrap text":"Aplauzt tekstu","Break text":"Pārtraukt tekstu","In line":"Rindā","Side image":"Sānā novietots attēls","Full size image":"Pilna izmēra attēls","Left aligned image":"Pa kreisi līdzināts attēls","Centered image":"Centrēts attēls","Right aligned image":"Pa labi līdzināts attēls","Change image text alternative":"Mainīt attēla alternatīvo tekstu","Text alternative":"Alternatīvais teksts","Enter image caption":"Ievadiet attēla parakstu","Insert image":"Ievietot attēlu","Replace image":"Aizstāt attēlu","Upload from computer":"Augšupielādēt no datora","Replace from computer":"Aizvietot no datora","Upload image from computer":"Augšupielādēt attēlu no datora","Image from computer":"Attēls no datora","Replace image from computer":"Aizstāt attēlu no datora","Upload failed":"Augšupielāde neizdevusies","Image toolbar":"Attēlu rīkjosla","Resize image":"Mainīt attēla izmērus","Resize image to %0":"Mainīt attēla izmēru uz %0","Resize image to the original size":"Mainīt attēla izmēru uz oriģinālo izmēru","Resize image (in %0)":"Mainīt attēla izmērus (%0)","Original":"Oriģināls","Custom image size":"Pielāgot attēla izmēru","Custom":"Pielāgot","Image resize list":"Attēla izmēru saraksts","Insert":"Ievietot","Update":"Atjaunināt","Insert image via URL":"Ievietot attēlu, izmantojot saiti","Update image URL":"Labot attēla avota saiti","Caption for the image":"Attēla virsraksts","Caption for image: %0":"Attēla virsraksts: %0","The value must not be empty.":"Vērtība nedrīkst palikt tukša.","The value should be a plain number.":"Vērtībai ir jābūt vienkāršam skaitlim.","Uploading image":"Attēla augšupielāde","Image upload complete":"Attēla augšupielāde ir pabeigta","Error during image upload":"Attēla augšupielādes laikā radās kļūda","HTML object":"HTML objekts","Insert HTML":"Ievietot HTML","HTML snippet":"HTML fragments","Paste raw HTML here...":"Ievietojiet HTML šeit...","Edit source":"Labot pirmavotu","Save changes":"Saglabāt izmaiņas","No preview available":"Priekšskatījums nav pieejams","Empty snippet content":"Tukšs fragments","Horizontal line":"Horizontāli atdalošā līnija","Yellow marker":"Dzeltens marķieris","Green marker":"Zaļš marķieris","Pink marker":"Rozā marķieris","Blue marker":"Zils marķieris","Red pen":"Sarkana pildspalva","Green pen":"Zaļa pildspalva","Remove highlight":"Noņemt izcēlumu","Highlight":"Izcelt","Text highlight toolbar":"Teksta izcēluma rīkjosla","Paragraph":"Paragrāfs","Heading":"Virsraksts","Choose heading":"Izvēlēties virsrakstu","Heading 1":"Virsraksts 1","Heading 2":"Virsraksts 2","Heading 3":"Virsraksts 3","Heading 4":"Virsraksts 4","Heading 5":"Virsraksts 5","Heading 6":"Virsraksts 6","Type your title":"Ievadiet virsrakstu","Type or paste your content here.":"Rakstiet vai ielīmējiet saturu šeit.","Font Size":"Fonta Lielums","Tiny":"Ļoti mazs","Small":"Mazs","Big":"Liels","Huge":"Milzīgs","Font Family":"Fonts","Default":"Noklusējuma","Font Color":"Fonta krāsa","Font Background Color":"Fonta fona krāsa","Document colors":"Krāsas dokumentā","Find and replace":"Meklēt un aizstāt","Find in text…":"Meklēt tekstā...","Find":"Meklēt","Previous result":"Iepriekšējais rezultāts","Next result":"Nākamais rezultāts","Replace":"Aizstāt","Replace all":"Aizstāt visu","Match case":"Precīza atbilstība","Whole words only":"Tikai pilni vārdi","Replace with…":"Aizstāt ar...","Text to find must not be empty.":"Meklēšanas tekstam jābūt aizpildītam.","Tip: Find some text first in order to replace it.":"Padoms: Sākumā uzmeklējiet tekstu un tikai tad aizstājiet to.","Advanced options":"Uzlabotas iespējas","Find in the document":"Meklēt dokumentā","Insert a soft break (a <code>&lt;br&gt;</code> element)":"Ievietot rindiņas pārtraukumu (<code>&lt;br&gt;</code> elements)","Insert a hard break (a new paragraph)":"Ievietot stingro rindiņas pārtraukumu (jaunu rindkopu)","Cancel":"Atcelt","Clear":"Notīrīt","Remove color":"Noņemt krāsu","Restore default":"Atgriezt noklusējumu","Save":"Saglabāt","Show more items":"Parādīt vairāk vienumus","%0 of %1":"%0 no %1","Cannot upload file:":"Nevar augšupielādēt failu:","Rich Text Editor. Editing area: %0":"Bagātīga Teksta Redaktors. Rediģēšanas zona: %0","Insert with file manager":"Ievietot, izmantojot failu pārvaldnieku","Replace with file manager":"Aizstāt, izmantojot failu pārvaldnieku","Insert image with file manager":"Ievietojiet attēlu, izmantojot failu pārvaldnieku","Replace image with file manager":"Aizstāt attēlu, izmantojot failu pārvaldnieku","Toggle caption off":"Izslēgt tabulas parakstu","Toggle caption on":"Ieslēgt tabulas parakstu","Content editing keystrokes":"Satura rediģēšanas taustiņsitieni","These keyboard shortcuts allow for quick access to content editing features.":"Šie īsinājumtaustiņi ļauj ātri piekļūt satura rediģēšanas funkcijām.","User interface and content navigation keystrokes":"Lietotāja interfeisa un satura navigācijas taustiņsitieni","Use the following keystrokes for more efficient navigation in the CKEditor 5 user interface.":"Izmantot tālāk norādītos taustiņsitienus, lai nodrošinātu efektīvāku navigāciju CKEditor 5 lietotāja saskarnē.","Close contextual balloons, dropdowns, and dialogs":"Aizvērt kontekstuālās joslas, nolaižamās izvēlnes un dialoglodziņus","Open the accessibility help dialog":"Atvērt piekļūstamības palīdzības dialoglodziņu","Move focus between form fields (inputs, buttons, etc.)":"Pārvietot fokusu starp laukiem (ievades, pogas u.tml.)","Move focus to the menu bar, navigate between menu bars":"Pārvietot fokusu uz izvēļņu joslu, pārvietoties starp izvēļņu joslām","Move focus to the toolbar, navigate between toolbars":"Pārvietot fokusu uz rīkjoslu, pārvietoties starp rīkjoslām","Navigate through the toolbar or menu bar":"Pārvietojieties rīkjoslā vai izvēlņu joslā","Execute the currently focused button. Executing buttons that interact with the editor content moves the focus back to the content.":"Izpildiet pašlaik fokusēto pogu. Izpildot pogas, kas mijiedarbojas ar redaktora saturu, fokuss tiek pārvietots atpakaļ uz saturu.","Accept":"Apstiprināt","Insert code block":"Ievietot koda bloku","Plain text":"Vienkāršs teksts","Leaving %0 code snippet":"Tiek atstāts %0 koda fragments","Entering %0 code snippet":"%0 koda fragmenta ievade","Entering code snippet":"Koda fragmenta ievade","Leaving code snippet":"Atstāj koda fragmentu","Code block":"Koda bloks","Copy selected content":"Kopēt atlasīto saturu","Paste content":"Ielīmēt saturu","Paste content as plain text":"Ielīmēt saturu kā tekstu","Insert image or file":"Ievietot attēlu vai failu","Image or file":"Attēls vai fails","Could not obtain resized image URL.":"Nevarēja iegūt mērogotā attēla adresi.","Selecting resized image failed":"Nevarēja izvēlēties mērogoto attēlu.","Could not insert image at the current position.":"Pašreizējā pozīcijā attēlu nevarēja ievietot.","Inserting image failed":"Nevarēja ievietot attēlu","Open file manager":"Atvērt failu pārvaldnieku","Cannot determine a category for the uploaded file.":"Nav iespējams noteikt augšupielādētā faila kategoriju","Cannot access default workspace.":"Nevar piekļūt noklusējuma darbvietai.","Edit image":"Rediģēt attēlu","Processing the edited image.":"Rediģētā attēla apstrāde.","Server failed to process the image.":"Serverim neizdevās apstrādāt attēlu.","Failed to determine category of edited image.":"Neizdevās noteikt rediģētā attēla kategoriju.","Block quote":"Citāts","Bold":"Trekns","Italic":"Kursīvs","Underline":"Pasvītrots","Code":"Kods","Strikethrough":"Nosvītrots","Subscript":"Apakšraksts","Superscript":"Augšraksts","Italic text":"Teksts slīprakstā","Move out of an inline code style":"Iziet no iekļautā koda stila","Bold text":"Teksts treknrakstā","Underline text":"Pasvītrot tekstu","Strikethrough text":"Pārsvītrot teksts","Saving changes":"Saglabāju izmaiņas","Revert autoformatting action":"Atjaunot automātiskās formatēšanas darbību","Align left":"Pa kreisi","Align right":"Pa labi","Align center":"Centrēt","Justify":"Izlīdzināt abas malas","Text alignment":"Teksta izlīdzināšana","Text alignment toolbar":"Teksta līdzināšanas rīkjosla"},getPluralForm(n){return (n%10==1 && n%100!=11 ? 0 : n != 0 ? 1 : 2);}}};
e[ 'lv' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'lv' ].dictionary = Object.assign( e[ 'lv' ].dictionary, dictionary );
e[ 'lv' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
