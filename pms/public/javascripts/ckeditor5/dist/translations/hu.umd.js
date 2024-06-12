/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

( e => {
const { [ 'hu' ]: { dictionary, getPluralForm } } = {"hu":{"dictionary":{"Words: %0":"Szavak: %0","Characters: %0":"Karakterek: %0","Widget toolbar":"Widget eszköztár","Insert paragraph before block":"Bekezdés beszúrása elé","Insert paragraph after block":"Bekezdés beszúrása utána","Press Enter to type after or press Shift + Enter to type before the widget":"Az Enter billentyű megnyomásával a widget után, a Shift + Enter kombinációval pedig a widget előtt írhatja be a szöveget","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"Billentyűleütések, amelyek egy widget kiválasztásakor (például: kép, táblázat, stb.) használhatók","Insert a new paragraph directly after a widget":"Egy új bekezdés beszúrása közvetlenül a widget mögé","Insert a new paragraph directly before a widget":"Egy új bekezdés beszúrása közvetlenül a widget elé","Move the caret to allow typing directly before a widget":"Mozgasd a kurzort, hogy hogy közvetlenül a widget elé tudj gépelni","Move the caret to allow typing directly after a widget":"Mozgasd a kurzort, hogy közvetlenül a widget után tudj gépelni","Upload in progress":"A feltöltés folyamatban","Undo":"Visszavonás","Redo":"Újra","Rich Text Editor":"Bővített szövegszerkesztő","Editor editing area: %0":"Szerkesztő szerkesztési területe: %0","Edit block":"Blokk szerkesztése","Click to edit block":"Kattintson a blokk szerkesztéséhez","Drag to move":"Húzza a mozgatáshoz","Next":"Következő","Previous":"Előző","Editor toolbar":"Szerkesztő eszköztár","Dropdown toolbar":"Lenyíló eszköztár","Black":"Fekete","Dim grey":"Halvány szürke","Grey":"Szürke","Light grey":"Világosszürke","White":"Fehér","Red":"Piros","Orange":"Narancs","Yellow":"Sárga","Light green":"Világoszöld","Green":"Zöld","Aquamarine":"Kékeszöld","Turquoise":"Türkiz","Light blue":"Világoskék","Blue":"Kék","Purple":"Lila","Editor block content toolbar":"Szerkesztő - tartalomblokk  eszköztár","Editor contextual toolbar":"Szerkesztő - szövegre vonatkozó eszköztár","HEX":"HEX színkód","No results found":"Nincs találat","No searchable items":"Nincsenek kereshető elemek","Editor dialog":"Szerkesztői párbeszédpanel","Close":"Bezárás","Help Contents. To close this dialog press ESC.":"Súgó tartalmak. A párbeszéd ablak bezárásához használd az ESC billentyűt.","Below, you can find a list of keyboard shortcuts that can be used in the editor.":"Alább megtalálod a szerkesztéshez használható gyorsbillentyűk listáját.","(may require <kbd>Fn</kbd>)":"(szükség lehet a <kbd>Fn</kbd> használatára)","Accessibility":"Elérhetőség","Accessibility help":"Kisegítő lehetőségek","Press %0 for help.":"Segítségért nyomd le a %0 billentyűt.","Move focus in and out of an active dialog window":"Mozdítsd ki és be az aktív párbeszéd ablakot","MENU_BAR_MENU_FILE":"Fájl","MENU_BAR_MENU_EDIT":"Szerkesztés","MENU_BAR_MENU_VIEW":"Megjelenítés","MENU_BAR_MENU_INSERT":"Beszúrás","MENU_BAR_MENU_FORMAT":"Formátum","MENU_BAR_MENU_TOOLS":"Eszközök","MENU_BAR_MENU_HELP":"Súgó","MENU_BAR_MENU_TEXT":"Szöveg","MENU_BAR_MENU_FONT":"Betűtípus","Editor menu bar":"Szerkesztő menüsora","Please enter a valid color (e.g. \"ff0000\").":"Adjon meg egy érvényes színt (pl. \"ff0000\").","Insert table":"Táblázat beszúrása","Header column":"Oszlop fejléc","Insert column left":"Oszlop beszúrása balra","Insert column right":"Oszlop beszúrása jobbra","Delete column":"Oszlop törlése","Select column":"Oszlop kijelölése","Column":"Oszlop","Header row":"Sor fejléc","Insert row below":"Sor beszúrása alá","Insert row above":"Sor beszúrása fölé","Delete row":"Sor törlése","Select row":"Sor kijelölése","Row":"Sor","Merge cell up":"Cellák egyesítése felfelé","Merge cell right":"Cellák egyesítése jobbra","Merge cell down":"Cellák egyesítése lefelé","Merge cell left":"Cellák egyesítése balra","Split cell vertically":"Cella felosztása függőlegesen","Split cell horizontally":"Cella felosztása vízszintesen","Merge cells":"Cellaegyesítés","Table toolbar":"Táblázat eszköztár","Table properties":"Táblázat tulajdonságai","Cell properties":"Cella tulajdonságok","Border":"Keret","Style":"Stílus","Width":"Szélesség","Height":"Magasság","Color":"Szín","Background":"Háttér","Padding":"Térköz","Dimensions":"Méretek","Table cell text alignment":"Szöveg igazítása a cellában","Alignment":"Igazítás","Horizontal text alignment toolbar":"Vízszintes szövegigazítási eszköztár","Vertical text alignment toolbar":"Függőleges szövegigazítási eszköztár","Table alignment toolbar":"Táblázatigazítási eszköztár","None":"Nincs","Solid":"Tömör","Dotted":"Pontozott","Dashed":"Szaggatott","Double":"Dupla","Groove":"Árok","Ridge":"Gerinc","Inset":"Mélyített","Outset":"Kiemelkedő","Align cell text to the left":"Szöveg igazítása a cellában balra","Align cell text to the center":"Szöveg igazítása a cellában középre","Align cell text to the right":"Szöveg igazítása a cellában jobbra","Justify cell text":"Szöveg igazítása a cellában sorkizártra","Align cell text to the top":"Szöveg igazítása a cellában felülre","Align cell text to the middle":"Szöveg igazítása a cellában középre","Align cell text to the bottom":"Szöveg igazítása a cellában alulra","Align table to the left":"Tábla igazítása balra","Center table":"Tábla igazítása középre","Align table to the right":"Tábla igazítása jobbra","The color is invalid. Try \"#FF0000\" or \"rgb(255,0,0)\" or \"red\".":"A szín érványtelen. Próbáld így \"#FF0000\" vagy \"rgb(255,0,0)\" vagy \"red\".","The value is invalid. Try \"10px\" or \"2em\" or simply \"2\".":"Az érték érvénytelen. Próbáld így \"10px\" vagy \"2em\" vagy csak egyszerűen \"2\".","Color picker":"Szín választása","Enter table caption":"Táblázat feliratának megadása","Keystrokes that can be used in a table cell":"Egy táblázatcellában használható billentyű leütések","Move the selection to the next cell":"A kiválasztás átmozgatása a következő cellába","Move the selection to the previous cell":"A kiválasztás átmozgatása az előző cellába","Insert a new table row (when in the last cell of a table)":"Új sor beillesztése a táblázatba (a táblázat utolsó cellájában)","Navigate through the table":"Navigáció a táblázatban","Table":"Táblázat","Styles":"Stílusok","Multiple styles":"Többféle stílus","Block styles":"Blokkstílusok","Text styles":"Szövegstílusok","Special characters":"Speciális karakterek","All":"Összes","Arrows":"Nyilak","Currency":"Valuta","Latin":"Latin","Mathematical":"Matematikai","Text":"Szöveg","leftwards simple arrow":"balra mutató egyszerű nyíl","rightwards simple arrow":"jobbra mutató egyszerű nyíl","upwards simple arrow":"felfelé mutató egyszerű nyíl","downwards simple arrow":"lefelé mutató egyszerű nyíl","leftwards double arrow":"dupla nyíl balra","rightwards double arrow":"dupla nyíl jobbra","upwards double arrow":"dupla nyíl felfelé","downwards double arrow":"dupla nyíl lefelé","leftwards dashed arrow":"szaggatott nyíl balra","rightwards dashed arrow":"szaggatott nyíl jobbra","upwards dashed arrow":"szaggatott nyíl felfelé","downwards dashed arrow":"szaggatott nyíl lefelé","leftwards arrow to bar":"vonalig érő balra nyíl","rightwards arrow to bar":"vonalig érő jobbra nyíl","upwards arrow to bar":"vonalig érő felfele nyíl","downwards arrow to bar":"vonalig érő lefele nyíl","up down arrow with base":"fel-le nyíl alapvonallal","back with leftwards arrow above":"back felirat felette balra nyíllal","end with leftwards arrow above":"end felirat felette balra nyíllal","on with exclamation mark with left right arrow above":"on felirat felkiáltójellel és felette jobbra-balra nyíllal","soon with rightwards arrow above":"soon felirat felette jobbra nyíllal","top with upwards arrow above":"top felirat felette felfele nyíllal","Dollar sign":"Dollár jel","Euro sign":"Euró jel","Yen sign":"Yen jel","Pound sign":"Font jel","Cent sign":"Cent jel","Euro-currency sign":"Euró pénznem jel","Colon sign":"Kettőspont","Cruzeiro sign":"Cruizero szimbólum","French franc sign":"Francia frank jel","Lira sign":"Líra jel","Currency sign":"Pénznem jel","Bitcoin sign":"Bitcoin jel","Mill sign":"Mill szimbólum","Naira sign":"Naira szimbólum","Peseta sign":"Peseta szimbólum","Rupee sign":"Rúpia szimbólum","Won sign":"Won szimbólum","New sheqel sign":"Új sékel szimbólum","Dong sign":"Dong szimbólum","Kip sign":"Kip szimbólum","Tugrik sign":"Tugrik szimbólum","Drachma sign":"Drachma szimbólum","German penny sign":"Német pfennig szimbólum","Peso sign":"Peso szimbólum","Guarani sign":"Guarani  szimbólum","Austral sign":"Ausztrál szimbólum","Hryvnia sign":"Hrivnya szimbólum","Cedi sign":"Cedi szimbólum","Livre tournois sign":"Livre tournois szimbólum","Spesmilo sign":"Spesmilo szimbólum","Tenge sign":"Tenge szimbólum","Indian rupee sign":"Indiai rúpia szimbólum","Turkish lira sign":"Török líra szimbólum","Nordic mark sign":"Északi márka szimbólum","Manat sign":"Manat szimbólum","Ruble sign":"Rubel szimbólum","Latin capital letter a with macron":"Latin nagy a betű macronnal","Latin small letter a with macron":"Latin kis a betű macronnal","Latin capital letter a with breve":"Latin nagy a betű brevével","Latin small letter a with breve":"Latin kis a betű brevével","Latin capital letter a with ogonek":"Latin nagy a betű ogonekkel","Latin small letter a with ogonek":"Latin kis a betű ogonekkel","Latin capital letter c with acute":"Latin nagy c betű éles ékezettel","Latin small letter c with acute":"Latin kis c betű betű éles ékezettel","Latin capital letter c with circumflex":"Latin nagy c betű háztető ékezettel","Latin small letter c with circumflex":"Latin kis c betű betű háztető ékezettel","Latin capital letter c with dot above":"Latin nagy c betű egy pontos ékezettel","Latin small letter c with dot above":"Latin kis c betű egy pontos ékezettel","Latin capital letter c with caron":"Latin nagy c betű hacsekkel","Latin small letter c with caron":"Latin kis c betű hacsekkel","Latin capital letter d with caron":"Latin nagy d betű hacsekkel","Latin small letter d with caron":"Latin kis d betű hacsekkel","Latin capital letter d with stroke":"Latin nagy d betű áthúzva","Latin small letter d with stroke":"Latin kis d betű áthúzva","Latin capital letter e with macron":"Latin nagy e betű macronnal","Latin small letter e with macron":"Latin kis e betű macronnal","Latin capital letter e with breve":"Latin nagy e betű brevével","Latin small letter e with breve":"Latin kis e betű brevével","Latin capital letter e with dot above":"Latin nagy e betű egy pontos ékezettel","Latin small letter e with dot above":"Latin kis e betű egy pontos ékezettel","Latin capital letter e with ogonek":"Latin nagy e betű ogonekkel","Latin small letter e with ogonek":"Latin kis e betű ogonekkel","Latin capital letter e with caron":"Latin nagy e betű hacsekkel","Latin small letter e with caron":"Latin kis e betű hacsekkel","Latin capital letter g with circumflex":"Latin nagy g betű háztető ékezettel","Latin small letter g with circumflex":"Latin kis g betű háztető ékezettel","Latin capital letter g with breve":"Latin nagy g betű brevével","Latin small letter g with breve":"Latin kis g betű brevével","Latin capital letter g with dot above":"Latin nagy g betű egy pontos ékezettel","Latin small letter g with dot above":"Latin kis g betű egy pontos ékezettel","Latin capital letter g with cedilla":"Latin nagy g betű cedillával","Latin small letter g with cedilla":"Latin kis g betű cedillával","Latin capital letter h with circumflex":"Latin nagy h betű háztető ékezettel","Latin small letter h with circumflex":"Latin kis h betű háztető ékezettel","Latin capital letter h with stroke":"Latin nagy h betű áthúzva","Latin small letter h with stroke":"Latin kis h betű áthúzva","Latin capital letter i with tilde":"Latin nagy i betű tildével","Latin small letter i with tilde":"Latin kis i betű tildével","Latin capital letter i with macron":"Latin nagy i betű macronnal","Latin small letter i with macron":"Latin kis i betű macronnal","Latin capital letter i with breve":"Latin nagy i betű brevével","Latin small letter i with breve":"Latin kis i betű brevével","Latin capital letter i with ogonek":"Latin nagy i betű ogonekkel","Latin small letter i with ogonek":"Latin kis i betű ogonekkel","Latin capital letter i with dot above":"Latin nagy i betű egy pontos ékezettel","Latin small letter dotless i":"Latin pont nélküli kis i betű","Latin capital ligature ij":"Latin nagy ij ligatúra","Latin small ligature ij":"Latin kis ij ligatúra","Latin capital letter j with circumflex":"Latin nagy j betű háztető ékezettel","Latin small letter j with circumflex":"Latin kis j betű háztető ékezettel","Latin capital letter k with cedilla":"Latin nagy k betű cedillával","Latin small letter k with cedilla":"Latin kis k betű cedillával","Latin small letter kra":"latin kisbetűs kra","Latin capital letter l with acute":"Latin nagy l betű éles ékezettel","Latin small letter l with acute":"Latin kis l betű éles ékezettel","Latin capital letter l with cedilla":"Latin nagy l betű cedillával","Latin small letter l with cedilla":"Latin kis l betű cedillával","Latin capital letter l with caron":"Latin nagy l betű hacsekkel","Latin small letter l with caron":"Latin kis l betű hacsekkel","Latin capital letter l with middle dot":"Latin nagy l betű középen ponttal","Latin small letter l with middle dot":"Latin kis l betű középen ponttal","Latin capital letter l with stroke":"Latin nagy l betű áthúzva","Latin small letter l with stroke":"Latin kis l betű áthúzva","Latin capital letter n with acute":"Latin nagy n betű éles ékezettel","Latin small letter n with acute":"Latin kis n betű éles ékezettel","Latin capital letter n with cedilla":"Latin nagy n betű cedillával","Latin small letter n with cedilla":"Latin kis n betű cedillával","Latin capital letter n with caron":"Latin nagy n betű hacsekkel","Latin small letter n with caron":"Latin kis n betű hacsekkel","Latin small letter n preceded by apostrophe":"Latin kis n betű előtte aposztróffal","Latin capital letter eng":"Latin nagybetűs eng","Latin small letter eng":"Latin kisbetűs eng","Latin capital letter o with macron":"Latin nagy o betű macronnal","Latin small letter o with macron":"Latin kis o betű macronnal","Latin capital letter o with breve":"Latin nagy o betű brevével","Latin small letter o with breve":"Latin kis o betű brevével","Latin capital letter o with double acute":"Latin nagy o betű kettős éles ékezettel","Latin small letter o with double acute":"Latin kis o betű kettős éles ékezettel","Latin capital ligature oe":"Latin nagy oe ligatúra","Latin small ligature oe":"Latin kis oe ligatúra","Latin capital letter r with acute":"Latin nagy r betű éles ékezettel","Latin small letter r with acute":"Latin kis r betű éles ékezettel","Latin capital letter r with cedilla":"Latin nagy r betű cedillával","Latin small letter r with cedilla":"Latin kis r betű cedillával","Latin capital letter r with caron":"Latin nagy r betű hacsekkel","Latin small letter r with caron":"Latin kis r betű hacsekkel","Latin capital letter s with acute":"Latin nagy s betű éles ékezettel","Latin small letter s with acute":"Latin kis s betű éles ékezettel","Latin capital letter s with circumflex":"Latin nagy s betű háztető ékezettel","Latin small letter s with circumflex":"Latin kis s betű háztető ékezettel","Latin capital letter s with cedilla":"Latin nagy s betű cedillával","Latin small letter s with cedilla":"Latin kis s betű cedillával","Latin capital letter s with caron":"Latin nagy s betű hacsekkel","Latin small letter s with caron":"Latin kis s betű hacsekkel","Latin capital letter t with cedilla":"Latin nagy t betű cedillával","Latin small letter t with cedilla":"Latin kis t betű cedillával","Latin capital letter t with caron":"Latin nagy t betű hacsekkel","Latin small letter t with caron":"Latin kis t betű hacsekkel","Latin capital letter t with stroke":"Latin nagy t betű áthúzva","Latin small letter t with stroke":"Latin kis t betű áthúzva","Latin capital letter u with tilde":"Latin nagy u betű tildével","Latin small letter u with tilde":"Latin kis u betű tildével","Latin capital letter u with macron":"Latin nagy u betű macronnal","Latin small letter u with macron":"Latin kis u betű macronnal","Latin capital letter u with breve":"Latin nagy u betű brevével","Latin small letter u with breve":"Latin kis u betű brevével","Latin capital letter u with ring above":"Latin nagy u betű karika ékezettel","Latin small letter u with ring above":"Latin kis u betű karika ékezettel","Latin capital letter u with double acute":"Latin nagy u betű kettős éles ékezettel","Latin small letter u with double acute":"Latin kis u betű kettős éles ékezettel","Latin capital letter u with ogonek":"Latin nagy u betű ogonekkel","Latin small letter u with ogonek":"Latin kis u betű ogonekkel","Latin capital letter w with circumflex":"Latin nagy w betű háztető ékezettel","Latin small letter w with circumflex":"Latin kis w betű háztető ékezettel","Latin capital letter y with circumflex":"Latin nagy y betű háztető ékezettel","Latin small letter y with circumflex":"Latin kis y betű háztető ékezettel","Latin capital letter y with diaeresis":"Latin nagy y betű diarézissel","Latin capital letter z with acute":"Latin nagy z betű éles ékezettel","Latin small letter z with acute":"Latin kis z betű éles ékezettel","Latin capital letter z with dot above":"Latin nagy z betű egy pontos ékezettel","Latin small letter z with dot above":"Latin kis z betű egy pontos ékezettel","Latin capital letter z with caron":"Latin nagy z betű hacsekkel","Latin small letter z with caron":"Latin kis z betű hacsekkel","Latin small letter long s":"Latin kisbetűs hosszú s","Less-than sign":"Kisebb jel","Greater-than sign":"Nagyobb jel","Less-than or equal to":"Kisebb vagy egyenlő jel","Greater-than or equal to":"Nagyobb vagy egyenlő jel","En dash":"Félkvirtmínusz","Em dash":"Kvirtmínusz","Macron":"Macron","Overline":"Föléhúzás","Degree sign":"Fokjel","Minus sign":"Mínuszjel","Plus-minus sign":"Pluszmínusz-jel","Division sign":"Osztásjel","Fraction slash":"Törtvonás","Multiplication sign":"Szorzójel","Latin small letter f with hook":"Latin kisbetűs f-horog","Integral":"Integrál","N-ary summation":"N-áris szumma","Infinity":"Végtelen","Square root":"Négyzetgyök","Tilde operator":"Hullámvonal","Approximately equal to":"Közelítőleg egyenlő","Almost equal to":"Majdnem egyenlő","Not equal to":"Nem egyenlő","Identical to":"Azonos","Element of":"Része","Not an element of":"Nem része","Contains as member":"Tagként tartalmaz","N-ary product":"N-áris produktum","Logical and":"Logikai és ","Logical or":"Logikai vagy","Not sign":"Nem szimbólum","Intersection":"Metszet","Union":"Egyesítés","Partial differential":"Parciális derivált","For all":"Mindenre","There exists":"Létezik","Empty set":"Üres halmaz","Nabla":"Nabla","Asterisk operator":"Csillag műveleti jel","Proportional to":"Aránylik","Angle":"Szög","Vulgar fraction one quarter":"Vulgáris tört egynegyed","Vulgar fraction one half":"Vulgáris tört egyketted","Vulgar fraction three quarters":"Vulgáris tört háromnegyed","Single left-pointing angle quotation mark":"Szimpla bal oldali szögletes idézőjel","Single right-pointing angle quotation mark":"Jobb oldali szimpla szögletes idézőjel","Left-pointing double angle quotation mark":"Bal oldali dupla szögletes idézőjel","Right-pointing double angle quotation mark":"Jobb oldali dupla szögletes idézőjel","Left single quotation mark":"Bal oldali szimpla idézőjel","Right single quotation mark":"Jobb oldali szimpla idézőjel","Left double quotation mark":"Bal oldali dupla idézőjel","Right double quotation mark":"Jobb oldali dupla idézőjel","Single low-9 quotation mark":"Szimpla 9-es alakú alsó idézőjel","Double low-9 quotation mark":"Dupla 9-es alakú alsó idézőjel","Inverted exclamation mark":"Fordított felkiáltójel","Inverted question mark":"Fordított kérdőjel","Two dot leader":"Két bevezető pont","Horizontal ellipsis":"Vízszintes három pont","Double dagger":"Kettős kereszt","Per mille sign":"Ezrelékjel","Per ten thousand sign":"Tízezrelékjel","Double exclamation mark":"Kettős felkiáltójel","Question exclamation mark":"Kérdő- és felkiáltójel","Exclamation question mark":"Felkiáltó- és kérdőjel","Double question mark":"Dupla kérdőjel","Copyright sign":"Copyright jele","Registered sign":"Bejegyzett védjegy szimbólum","Trade mark sign":"Kereskedelmi védjegy szimbólum","Section sign":"Szakaszjel","Paragraph sign":"Bekezdésjel","Reversed paragraph sign":"Fordított bekezdésjel","Character categories":"Karakterek kategóriái","Source":"Forrás","Show source":"Forrás megjelenítése","Show blocks":"Blokkok megjelenítése","Select all":"Mindet kijelöl","Disable editing":"Szerkesztés letiltása","Enable editing":"Szerkesztés engedélyezése","Previous editable region":"Előző szerkeszthető terület","Next editable region":"Következő szerkeszthető terület","Navigate editable regions":"Szerkeszthető területek navigálása","Remove Format":"Formázás eltávolítása","Page break":"Oldaltörés","media widget":"Média widget","Media URL":"Média URL","Paste the media URL in the input.":"Illessze be a média URL-jét.","Tip: Paste the URL into the content to embed faster.":"Tipp: Illessze be a média URL-jét a tartalomba.","The URL must not be empty.":"Az URL nem lehet üres.","This media URL is not supported.":"Ez a média URL típus nem támogatott.","Insert media":"Média beszúrása","Media toolbar":"Média eszköztár","Open media in new tab":"Nyissa meg a médiát új lapon","Numbered List":"Számozott lista","Bulleted List":"Pontozott lista","To-do List":"Tennivaló lista","Bulleted list styles toolbar":"Felsorolásos lista stílusú eszköztár","Numbered list styles toolbar":"Számozott lista stílusú eszköztár","Toggle the disc list style":"Korong stílusú lista bekapcsolása","Toggle the circle list style":"Kör stílusú lista bekapcsolása","Toggle the square list style":"Négyzet stílusú lista bekapcsolása","Toggle the decimal list style":"Tizedesjegy stílusú lista bekapcsolása","Toggle the decimal with leading zero list style":"Zéróval kezdődő tizedesjegy stílusú lista bekapcsolása","Toggle the lower–roman list style":"Kis római számok stílusú lista bekapcsolása","Toggle the upper–roman list style":"Nagy római számok stílusú lista bekapcsolása","Toggle the lower–latin list style":"Kis latin betűs stílusú lista bekapcsolása","Toggle the upper–latin list style":"Nagy latin betűs stílusú lista bekapcsolása","Disc":"Korong","Circle":"Kör","Square":"Négyzet","Decimal":"Szám","Decimal with leading zero":"Nullával kezdődő szám","Lower–roman":"Kisbetűs római szám","Upper-roman":"Nagybetűs római szám","Lower-latin":"Kisbetűs latin szám","Upper-latin":"Nagybetűs latin szám","List properties":"Lista tulajdonságai","Start at":"Kezdőpont","Invalid start index value.":"Hibás induló indexérték.","Start index must be greater than 0.":"A kezdő index nagyobb kell legyen mint 0.","Reversed order":"Fordított sorrend","Keystrokes that can be used in a list":"A listában használható billentyűk","Increase list item indent":"A listaelem behúzás növelése","Decrease list item indent":"A listaelem behúzás csökkentése","Entering a to-do list":"Belépés a tennivalók listájába","Leaving a to-do list":"Tennivalók listájának elhagyás","Unlink":"Link eltávolítása","Link":"Link","Link URL":"URL link","Link URL must not be empty.":"A link URL-címe nem lehet üres.","Link image":"Hivatkozás","Edit link":"Link szerkesztése","Open link in new tab":"Link megnyitása új ablakban","This link has no URL":"A link nem tartalmaz URL-t","Open in a new tab":"Megnyitás új lapon","Downloadable":"Letölthető","Create link":"Link létrehozása","Move out of a link":"Kilépés egy linkből","Language":"Nyelv","Choose language":"Nyelv választása","Remove language":"Nyelv eltávolítása","Increase indent":"Behúzás növelése","Decrease indent":"Behúzás csökkentése","image widget":"képmodul","Wrap text":"Körbefuttatás","Break text":"Sortörés","In line":"Soron belül","Side image":"Oldalsó kép","Full size image":"Teljes méretű kép","Left aligned image":"Balra igazított kép","Centered image":"Középre igazított kép","Right aligned image":"Jobbra igazított kép","Change image text alternative":"Helyettesítő szöveg módosítása","Text alternative":"Helyettesítő szöveg","Enter image caption":"Képaláírás megadása","Insert image":"Kép beszúrása","Replace image":"Kép kicserélése","Upload from computer":"Feltöltés a számítógépről","Replace from computer":"Kicserélés a számítógépről","Upload image from computer":"Töltsön fel képet a számítógépről","Image from computer":"Kép a számítógépről","Replace image from computer":"Cserélje ki a számítógépről","Upload failed":"A feltöltés nem sikerült","Image toolbar":"Kép eszköztár","Resize image":"Kép átméretezése","Resize image to %0":"Kép méretezése %0","Resize image to the original size":"Kép méretezése az eredeti méretre","Resize image (in %0)":"Kép átméretezése (%0)","Original":"Eredeti","Custom image size":"Egyéni képméret","Custom":"Egyéni","Image resize list":"Kép átméretezési lista","Insert":"Beszúrás","Update":"Módosítás","Insert image via URL":"Kép beszúrása URL alapján","Update image URL":"Kép URL módosítása","Caption for the image":"Felirat a képhez","Caption for image: %0":"Képfelirat: %0","The value must not be empty.":"Az érték nem lehet üres.","The value should be a plain number.":"Az érték egy egyszerű szám kell legyen.","Uploading image":"Kép feltöltése","Image upload complete":"A kép feltöltése befejeződött","Error during image upload":"Hiba a kép feltöltése során","HTML object":"HTML objektum","Insert HTML":"HTML beillesztése","HTML snippet":"HTML kódrészlet","Paste raw HTML here...":"Másolja ide a HTML forrás szövegét...","Edit source":"Forrás szerkesztése","Save changes":"Módosítások mentése","No preview available":"Nincs elérhető előnézet","Empty snippet content":"Üres kódrészleti tartalom","Horizontal line":"Vízszintes elválasztóvonal","Yellow marker":"Sárga kiemelő","Green marker":"Zöld kiemelő","Pink marker":"Rózsaszín kiemelő","Blue marker":"Kék kiemelő","Red pen":"Piros toll","Green pen":"Zöld toll","Remove highlight":"Kiemelés eltávolítása","Highlight":"Kiemelés","Text highlight toolbar":"Szöveg kiemelés eszköztár","Paragraph":"Bekezdés","Heading":"Stílusok","Choose heading":"Stílus megadása","Heading 1":"Címsor 1","Heading 2":"Címsor 2","Heading 3":"Címsor 3","Heading 4":"Címsor 4","Heading 5":"Címsor 5","Heading 6":"Címsor 6","Type your title":"Adja meg a címet","Type or paste your content here.":"Írja be, vagy illessze be a tartalmat.","Font Size":"Betűméret","Tiny":"Apró","Small":"Kicsi","Big":"Nagy","Huge":"Hatalmas","Font Family":"Betűtípus","Default":"Alapértelmezett","Font Color":"Betűszín","Font Background Color":"Betű háttérszín","Document colors":"Dokumentum színek","Find and replace":"Keresés és csere","Find in text…":"Keresés szövegben...","Find":"Keresés","Previous result":"Előző találat","Next result":"Következő találat","Replace":"Csere","Replace all":"Mind cserél","Match case":"Nagybetű érzékeny","Whole words only":"Csak teljes szavak","Replace with…":"Csere erre...","Text to find must not be empty.":"A keresendő szöveg nem lehet üres.","Tip: Find some text first in order to replace it.":"Tipp: Először keressen egy szöveget, hogy lecserélhesse.","Advanced options":"Speciális beállítások","Find in the document":"Keresés a dokumentumban","Insert a soft break (a <code>&lt;br&gt;</code> element)":"Puha sortörő beszúrása (egy <code>&lt;br&gt;</code> elem)","Insert a hard break (a new paragraph)":"Kemény sortörő beszúrása (új bekezdés)","Cancel":"Mégsem","Clear":"Törlés","Remove color":"Szín eltávolítása","Restore default":"Alapértelmezés visszaállítása","Save":"Mentés","Show more items":"További elemek","%0 of %1":"%0 / %1","Cannot upload file:":"Nem sikerült a fájl feltöltése:","Rich Text Editor. Editing area: %0":"Rich text szerkesztő. Szerkesztési terület: %0","Insert with file manager":"Beillesztés fájlkezelővel","Replace with file manager":"Kicserélés fájlkezelővel","Insert image with file manager":"Illessze be a képet a fájlkezelővel","Replace image with file manager":"Cserélje ki a képet a fájlkezelővel","Toggle caption off":"Felirat kikapcsolása","Toggle caption on":"Felirat bekapcsolása","Content editing keystrokes":"Tartalom szerkesztési billentyűk","These keyboard shortcuts allow for quick access to content editing features.":"Ezek a gyorsbillentyű parancsok lehetővé teszik a tartalomszerkesztési funkciók gyors elérését.","User interface and content navigation keystrokes":"Felhasználói felület és tartalom navigációs billentyűparancsok","Use the following keystrokes for more efficient navigation in the CKEditor 5 user interface.":"Használd a következő billentyűket a hatékonyabb navigációhoz a CKEditor 5 felhasználói felületen.","Close contextual balloons, dropdowns, and dialogs":"A környezetfüggő buborékok, legördülő listák és párbeszédpanelek bezárása","Open the accessibility help dialog":"Kisegítő lehetőségek súgó megnyitása","Move focus between form fields (inputs, buttons, etc.)":"Fókusz mozgatása a mezők között (inputok, gombok, stb.)","Move focus to the menu bar, navigate between menu bars":"Fókusz áthelyezése a menüsorra, navigálás a menüsorok között","Move focus to the toolbar, navigate between toolbars":"Fókusz mozgatása az eszköztárhoz, navigáció az eszköztárak között","Navigate through the toolbar or menu bar":"Navigálás az eszköztáron vagy a menüsoron keresztül","Execute the currently focused button. Executing buttons that interact with the editor content moves the focus back to the content.":"Az aktuálisan fókuszált gomb végrehajtása. A szerkesztő tartalmával interakcióba lépő gombok végrehajtása visszahelyezi a fókuszt a tartalomra.","Accept":"Elfogad","Insert code block":"Kód blokk beszúrása","Plain text":"Egyszerű szöveg","Leaving %0 code snippet":"%0 kódrészlet elhagyása","Entering %0 code snippet":"%0 kódrészlet bevitele","Entering code snippet":"Kódrészlet bevitele","Leaving code snippet":"Kódrészlet elhagyása","Code block":"Kódblokk","Copy selected content":"Kiválasztott tartalom másolása","Paste content":"Tartalom beillesztése","Paste content as plain text":"Tartalom másolása egyszerű szövegként","Insert image or file":"Kép, vagy fájl beszúrása","Image or file":"Kép vagy fájl","Could not obtain resized image URL.":"Az átméretezett kép URL-je nem érhető el.","Selecting resized image failed":"Az átméretezett kép kiválasztása sikertelen","Could not insert image at the current position.":"A jelenlegi helyen nem szúrható be a kép.","Inserting image failed":"A kép beszúrása sikertelen","Open file manager":"Fájlkezelő megnyitása","Cannot determine a category for the uploaded file.":"Nem sikerült meghatározni a feltöltött fájl kategóriáját.","Cannot access default workspace.":"Nem lehetséges hozzáférni az alapértelmezett munkaterülethez.","Edit image":"Kép szerkesztése","Processing the edited image.":"A szerkesztett kép feldolgozása.","Server failed to process the image.":"A szerver nem tudta feldolgozni a képet.","Failed to determine category of edited image.":"Nem sikerült meghatározni a szerkesztett kép kategóriáját.","Block quote":"Idézet","Bold":"Félkövér","Italic":"Dőlt","Underline":"Aláhúzott","Code":"Forráskód","Strikethrough":"Áthúzott","Subscript":"Alsó index","Superscript":"Felső index","Italic text":"Dőlt szöveg","Move out of an inline code style":"Kilépés egy soron belüli kódstílusból","Bold text":"Félkövér szöveg","Underline text":"Aláhúzott szöveg","Strikethrough text":"Áthúzott szöveg","Saving changes":"Módosítások mentése","Revert autoformatting action":"Automatikus formázási művelet visszaállítása","Align left":"Balra igazítás","Align right":"Jobbra igazítás","Align center":"Középre igazítás","Justify":"Sorkizárt","Text alignment":"Szöveg igazítása","Text alignment toolbar":"Szöveg igazítás eszköztár"},getPluralForm(n){return (n != 1);}}};
e[ 'hu' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hu' ].dictionary = Object.assign( e[ 'hu' ].dictionary, dictionary );
e[ 'hu' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
