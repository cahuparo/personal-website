---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Dynamische Lichtsteuerung mit Philips Hue - #1"
slug: "dynamische-lichtsteuerung-mit-philips-hue/teil-1"
subtitle: ""
summary: "Theoretische Überlegungen zur Einrichtung von Lichtszenen und Automationen"
translationKey: "dynamic-lighting-with-philips-hue/part-1"
aliases:
  - /post/181706455830/dynamische-lichtsteuerung-mit-philips-hue-1
section: post
tags:
  - Philips HUE
  - Lichtsteuerung
  - Lichtautomation
  - Beleuchtung
  - ZigBee
  - ZigBee Lighting
  - iConnectHue
categories:
  - Hausautomation
date: 2019-01-04T13:01:46+01:00
lastmod: 2019-01-04T13:01:46+01:00
featured: false
draft: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---

{{% toc %}}

Als Ergänzung zu meinem [letzten Blog Beitrag]({{< ref "/post/gedanken-zur-hausautomatisierung/index.md" >}}) möchte ich in dieser Artikelreihe mein aktuelles Licht Setup dokumentieren und meine Gedanken dazu mit anderen teilen. Ich habe selbst nicht sonderlich viel im Netz dazu gefunden, welche Lichtszenen sich jemand so konfiguriert und wie diese aus welchen Gründen strukturiert sind. Deshalb hoffe ich, dass diese Momentaufnahme hier für andere hilfreich sein wird.

Im ersten Teil der Reihe soll es auch zunächst noch um einige allgemein gültige Themen gehen, ohne die ich jedoch nicht über die konkrete Einrichtung der dynamischen Lichtsteuerung sprechen kann.


## Die frühen Jahre

Philips Hue hat im Jahr 2013 tatsächlich den Startschuss bei mir gegeben mich mit Hausautomatisierung zu befassen.

Damals gab es aber natürlich nicht die breite Produktpalette von heute. Es fehlte sowohl an weiteren kompatiblen Lampen als auch an Zubehör. Es war schlicht eine Nerd-Spielerei :-)

So richtig interessant wurde das System erst ab 2016, als im Herbst zuvor mit der Hue Bridge 2.0 auch Unterstützung für Homekit eingebaut und im Sommer schließlich auch passendes Zubehör, wie Bewegungsmelder und Dimmschalter, angeboten wurde.

Recht bald kaufte ich zwar einen Dimmschalter und auch einen Bewegungssensor, sie passten jedoch nicht so richtig in mein damaliges Setup. Die Hue API war noch nicht soweit und die Funktionen innerhalb von Hue waren ebenfalls eher beschränkt auf sehr einfache Szenarien. Zudem führte die beschränkte Auswahl an Lampen und Leuchten dazu, dass ich bei der Beleuchtung zusätzlich auf Homematic Dimmer gesetzt hatte (mehr oder minder schlecht, denn dimmbare LEDs und Trafos waren damals noch Mangelware).
Beide Hue Accessories fristeten deshalb lange ein unbeachtetes Dasein bei mir - bis jetzt.

War es damals nur schwer möglich auf den normalen Lichtschalter zu verzichten - sei es technisch oder mental bedingt - so gibt es heute zumindest einige gangbare Methoden. Obgleich wir - insbesondere in Europa - noch immer auf die eierlegende Wollmilchsau in Schalterform hoffen: Feste Stromversorgung, aber ZigBee Funkanbindung und gleichzeitige direkte Steuerung von Leuchten und trotzdem am Gateway angemeldet, verdeckte Notschaltung zur Unterbrechung der Dauerstromversorgung der Leuchten, um diese komplett manuell zu schalten ... Kickstarter, anyone?!? Mein aktuelles Resumé ist jedenfalls, dass fremde ZigBee Schalter jedweder Couleur letztendlich nicht den Anforderungen entsprechen, die man so hat. Auch der Hue Dimmschalter ist insbesondere beim Formfaktor alles andere als perfekt. Da er sich aber so perfekt programmieren lässt (bzw. die Funktionen der Tasten in der Hue Bridge), ist der das Mittel der Wahl. Und Heureka - bezahlbar ist er auch.


## Beschränkungen der offiziellen Hue App

Das Konzept von Philips Hue ist in erster Linie ein möglichst einfach zu bedienendes Ökosystem für den Technik-Laien zu bieten. Ziel ist nicht ein komplexes System, was man erst aufwändig programmieren muss. Jeder soll damit umgehen können und auch schnell seine Erfolgserlebnisse haben, wenn es um das Thema Automatisierung geht.

Fortgeschrittene Benutzer und technikaffine Nerds hingegen stoßen schnell an ihre Grenzen. Sie wünschen sich eine möglichst flexible Integration in andere Systeme und nutzen nicht selten auch noch mehrere davon parallel (Alexa vs. Homekit+Siri, anyone?). Natürlich haben solche Benutzer nicht nur smartes Licht zuhause, sondern auch smarte Lautsprecher, eine smarte Heizungssteuerung, smarte Fenster, smarte Türen und was weiß ich, wo man noch überall dieses Modewort voranstellen kann...


## Die richtige Balance

Es spricht also augenscheinlich erstmal viel dafür, dass man Systeme wie Hue einfach nur als Mittel zum Zweck sieht und die Input/Output Schnittstellen anzapft, um sämtliche Steuerung und Automation anderswo zu erledigen.

Für viele klingt das zunächst wie ein Befreiungsschlag aus dem “Walled Garden”. Von diesem Ansatz weiche ich jedoch mehr und mehr ab. Das hat mehrere Gründe:

1.  Hersteller optimieren ihre Systeme in erster Linie für sich selbst:
	Das beste Nutzererlebnis hat man, wenn man im Rahmen dessen bleibt, was der Hersteller anbietet. Das betrifft die Bedienung, aber auch die Systemstabilität und Upgrade-Fähigkeit.

2.  Alte wie neue Hersteller haben immer kürzere Innovations-Zyklen (Stichworte [Agile Development](https://en.wikipedia.org/wiki/Agile_software_development), [Minimum Viable Product](https://en.wikipedia.org/wiki/Minimum_viable_product)):
	Neue Funktionen kommen, teilweise gehen alte, bestehende Dinge werden ver(schlimm)bessert. Kurzum: Es tut sich sehr viel im Bereich Hausautomatisierung - und die Taktzahl erhöht sich gerade exponentiell.

3.  Hersteller integrieren ihre Systeme selbst mit anderen Drittsystemen, entweder durch Kooperationen oder durch Nutzung der öffentlichen APIs.

4.  Es ist sehr zeitaufwändig die ganzen Änderungen mitzuverfolgen und dabei einen stabilen Status Quo aufrecht zu erhalten, wenn man viel selbst programmiert hat bzw. in Drittsystemen ausgelagert hat und darauf angewiesen ist, dass diese rechtzeitig (von einem selbst oder jemand anderem in dessen eigener Freizeit) nachgepflegt werden. Möchte man dazu noch an der Innovation aktiv teilnehmen, wird es wirklich schwierig. Als Schüler hatte ich die Zeit, als inzwischen Senior Berufstätiger nicht mehr.

5.  Die Hersteller (sollten) die Pflege ihres Ökosystems besser im Griff haben, als ich die inoffizielle Integration bei mir. Schließlich arbeiten dort Menschen in Vollzeit daran, ich hingegen “arbeite” zuhause nur nach Lust, Laune und Verfügbarkeit daran. Es ist deshalb zeitlich und mental ein Segen sich an den Zug eines Herstellers anzuhängen. Die Verantwortung für Kompatibilität, Update und Migration gibt man (größtenteils) an den Hersteller ab. Es werden Kapazitäten frei sich um das eigentliche Ziel zu kümmern: Die Schaffung von Mehrwert und Komfort durch die neue Technik in den eigenen vier Wänden, nicht die Erhaltung des Status Quo. An welchen Haltestellen man von diesem Herstellerzug ab und wieder aufspringt, kann man ja selbst entscheiden. Zumindest wenn man bei der Auswahl seiner Systeme nicht auf den billigsten China Laden setzt, sondern auf Hersteller mit einer offenen API. Philips Hue war dabei ein ziemlicher Vorreiter und ist den Konkurrenzsystemen auch hier nach wie vor überlegen.

6.  Andere Nutzer im Haushalt oder auch Besucher kennen sich mit den Spezialitäten des eigenen Setups nicht aus. Sie wollen auf das zurückgreifen können, was sie entweder schon gelernt haben (beispielsweise von ihrem eigenen Zuhause) oder was der Hersteller ihnen über die leichte Einführung in den offiziellen Apps ermöglicht. Gerne spricht man da vom WAF, dem Wife Acceptance Factor. Aber der ist meiner Erfahrung nach eher zu kurz gegriffen. Aber vielleicht setzen sich Ehefrauen oft auch gerne im Namen ihrer Gäste für eine möglichst kompatible Steuerung ein :wink:

7.  Hersteller bieten für die von ihnen angebotenen Funktionen Support an; die einen besser, die anderen weniger gut. Grundsätzlich kann man aber davon ausgehen, dass man bei Problemen auch einen Ansprechpartner finden kann. Dass man als Nerd oftmals auch echte Bugs findet, die dann nicht unbedingt leicht über den 1st-Level Support zu transportieren sind, das ist eine ganz andere Geschichte... einfacher ist das jedoch, wenn man nah an den “normalen” Use Cases dran bleibt. Sollte einleuchten (schlechtes Wortspiel, man man man...).

Das sind nur einige der Punkte, die mir gerade einfallen. Sie alle führen aber dazu, dass ich mir gewünscht habe mehr aus dem bestehenden Philips Hue System direkt herauszuholen und nur dort, wo es notwendig/sinnvoll ist, durch externe Systeme wie [FHEM](https://fhem.de/), [Home Assistant](https://home-assistant.io/), [OpenHAB](https://openhab.org/), Homekit oder Alexa zu ergänzen. Aufgrund der oben angeführten vornehmlichen Strategie von Hue wird das aber nicht zufriedenstellend funktionieren können - oder doch?


## Drittanbieter Apps zur Philips Hue Programmierung

Philips Hue ist sich seiner Beschränkungen sehr wohl bewusst. Schon seit geraumer Zeit bieten sie über ihr Labor Programm “[Hue Labs](https://labs.meethue.com/)” ein viel breiteres Spektrum an Funktionen. Ein wirklich fester Bestandteil der offiziellen Hue App sind diese allerdings bisher nicht geworden. Auch sind die Funktionen dort sehr beschränkt auf einzelne Szenarien und können nicht miteinander kombiniert werden. Meine Vermutung ist, dass man über die Zeit seinen Platz gefunden hat und den Anspruch für ein vollumfassendes System relativiert hat. Stattdessen setzt man auf Offenheit und die Integration in Drittplattformen. Ein Konzept, das aufzugehen scheint, wie auch Amazon Alexa beweist.

Um die zusätzlichen Funktionen in den Hue Labs zu ermöglichen hat Philips Hue die internen Funktionen des Hue Systems bzw. der Hue Bridge erweitern müssen. Inzwischen ist auch der Knoten geplatzt diese Änderungen zeitnah über die offizielle API verfügbar zu machen: Ein Traum für Drittanbieter Apps, die sich bereits seit geraumer Zeit dieser Marktlücke angenommen haben. Einige Apps, wie beispielsweise [iConnectHue](https://iconnecthue.com/), erwecken gar den Eindruck in enger Abstimmung mit Philips Hue zu stehen. Wie dem auch sei: Diese App ist mir bereits vor 1 oder 2 Jahren ins Auge gestochen, mangels Zeit und Hardware habe ich sie jedoch bis dato nicht sonderlich gut genutzt.

Das änderte sich zu Weihnachten 2018.

_An dieser Stelle noch der Hinweis: Ja, die App [kostet Geld](https://iconnecthue.com/app-costs/). Ja, es gibt In-App Käufe. Ja, die sind teilweise hoch für das, was man kriegt. Nein, die muss man nicht für iPhone und iPad erneut erwerben ([iCloud Sync!](https://iconnecthue.com/f-a-q/#purchases)). Aber ja, jeder kann selbst entscheiden, was er davon kauft. Zu bedenken ist, dass die App schon lange auf dem Markt ist und man sich nicht nur von Neukäufen finanzieren kann. Ich habe deshalb die In-App Käufe genutzt dem Entwickler ein paar wenige Euros zukommen zu lassen und damit die Weiterentwicklung honoriert und gefördert.
... und nein, ich mache hier keine Werbung für diese App oder kriege etwas dafür diese hier zu beschreiben._


## Zeit für ein Hardware Upgrade

In den Weihnachtsangeboten war letztes Jahr Philips Hue gefühlt ein noch größerer Renner als die letzten 2 Jahre zuvor schon, die Beliebtheit scheint noch immer enorm zuzunehmen.
So schlug ich zu und vervollständigte mein Setup, so dass ich nun ausschließlich Hue bzw. ZigBee Lampen und Leuchten für die Beleuchtung einsetze. Und ja, ich habe tatsächlich alle Lichtschalter ausgebaut und überbrückt. Dank des jüngsten Hue Firmware Upgrades, bei dem man das [Einschaltverhalten jeder Lampe](https://twitter.com/tweethue/status/1035828322410930176) einstellen kann, noch weniger problematisch als bisher. Mit der Abhängigkeit zur Hue Bridge kann ich gut leben. Vielleicht baue ich später auch mal wieder Schalter ein, aber nachdem die Hue Dimmschalter für mich so wertvoll geworden sind, müssten diese Schalter den Dimmschalter schon genau so ersetzen und nicht nur direkt mit einzeln angelernten Lampen in Grundfunktionen sprechen, sondern auch die programmierten Szenen in der Bridge ansteuern können. Ob die für Q1 2019 von Philips Hue Partnern angekündigten Friends of Hue Schalter da ran kommen, muss man abwarten. So wie es aussieht wird uns da aber eher ein Hue Tab mit anderem Formfaktor begegnen. Mehr als dass dieser dann den europäischen Normmaßen entspricht, ist nicht zu erwarten.

Außerdem habe ich noch fehlende Hue Bewegungsmelder und Hue Dimmschalter ergänzt. Diese spielen beide eine sehr zentrale Rolle und erst damit kann man das große Potential von Philips Hue im Zusammenspiel mit iConnectHue wirklich ausnutzen. Die Bedienung über ein Mobiltelefon steht für mich dabei nicht im Vordergrund, sondern die möglichst autarke Funktion über den Tag.

Zur Übersicht und dem besseren Verständnis für die nachfolgende Konfiguration, hier zunächst die Raumaufteilung und -ausstattung als Referenz:

1.  Wohnzimmer
	- 1x [Hue Bewegungsmelder](https://amzn.to/2QVlnpw)
	- 1x [Hue Dimmschalter](https://amzn.to/2GOEBIN)
	- 2x [Hue White &amp; Color Ambiance E27](https://amzn.to/2BN6rzj) (TV, Sofa)
	- 1x [Hue White &amp; Color LightStrip+](https://amzn.to/2GIfnvA) (Schreibtisch)
2.  Küche
	- 1x [Hue Bewegungsmelder](https://amzn.to/2QVlnpw)
	- 1x [Hue Dimmschalter](https://amzn.to/2GOEBIN)
	- 4x [Hue White Ambiance LED Einbauspot Milliskin](https://amzn.to/2RmRBcN) (Deckenspots)
	- 1x [Hue White &amp; Color LightStrip+](https://amzn.to/2GIfnvA) (indirekte Deckenbeleuchtung)
	- 2x [Philips Hue White Ambiance E14](https://amzn.to/2QVlwcC) (Dunstabzugshaube)
	- 3x [IKEA OMLOPP Arbeitsbeleuchtung](https://www.ikea.com/de/de/catalog/products/10245219/) (nebst 1x [TRÅDFRI Treiber](https://www.ikea.com/de/de/catalog/products/50356187/))
3.  Schlafzimmer
	- 1x [Hue Dimmschalter](https://amzn.to/2GOEBIN)
	- 2x [Hue White &amp; Color Ambiance E27](https://amzn.to/2BN6rzj) (Nachttisch, Decke)
4.  Bad
	- 1x [Hue Bewegungsmelder](https://amzn.to/2QVlnpw)
	- 1x [IKEA TRÅDFRI FLOALT Lichtpanel](https://www.ikea.com/de/de/catalog/products/30303072/)
	- 1x [Smart ZigBee Lichtschalter](https://amzn.to/2BM5qHT) (Spiegel Beleuchtung+Heizung)
5.  Flur
	- 1x [Homematic Phasenabschnittdimmer HM-LC-Dim1T-FM](https://amzn.to/2BKv1Rs)
	- 1x [Homematic Bewegungsmelder HM-Sec-MDIR](https://amzn.to/2RnuHSl)
	- 4x Taster
	- 3x [Philips SmartSpot 57988/48/16](https://amzn.to/2SzM8MQ)

Wie man sieht habe ich oben etwas geflunkert: Das Setup im Flur stammt aus einer alten Vorzeit :-). Hierfür suche ich noch nach einem neuen ZigBee Treiber oder einem ZigBee Dimmer (ein möglicher Kandidat wäre [dieser hier](https://amzn.to/2RpAuHb), ähnlich zum Schalter im Bad). Im Flur die ganzen Taster stillzulegen widerstrebt mir aber derzeit noch... dieser Bereich ist über den Homematic Bewegungsmelder aber ohnehin schon automatisiert, aber es wäre natürlich nett das im ZigBee Verbund zu haben. Wer also eine Idee hat darf sich gerne melden.

Andere ZigBee Lighting Gateways und Systeme sind mir wohl bekannt (z.B. [deCONZ](https://www.dresden-elektronik.de/funktechnik/products/software/pc-software/deconz/) oder [Phoscon](https://www.dresden-elektronik.de/funktechnik/solutions/wireless-light-control/gateways/phoscon-gateway/) von Dresden Elektronik, natürlich auch die Gateways der Mainstream Hersteller Samsung und Osram). Ich habe mich bisher trotzdem entschieden beim Hue Gateway zu bleiben. Die Hue Lampen sind für mich hochwertiger (Dimmverhalten, Farben, Einstellungen, gleichzeitige Änderung von Farbtemperatur+Helligkeit...), das hat sich bei jedem meiner Vergleiche mit günstigeren ZigBee Lampen gezeigt (beispielsweise mit den 2 TRÅDFRI Leuchten, die ich habe, aber auch mit Osram). Ich habe aktuell also nicht unbedingt vor so viele Hersteller zu vermischen oder hier und dort 10€ zu sparen. Da mein Setup so groß auch nicht ist, wäre die finanzielle Ersparnis nicht so riesig. Mit meinen TRÅDFRI Leuchten bin ich nicht 100% glücklich, aber sie sind nunmal jetzt da... In der Küche bietet Hue keine richtige Alternative, ein Stripe+ ist tatsächlich deutlich dunkler und nicht annähernd so einfach zu installieren. Im Bad war die Panelleuchte von Hue, die gerade erst neu rausgekommen ist, nicht schnell genug (für mich) lieferbar und die 70€ Preisdifferenz ließ mich dann kurzerhand zu Ikea fahren. Im Nachhinein bereue ich die Ungeduld doch etwas, auch wenn fragwürdig ist, ob der Unterschied bei Dimmverhalten, gleichzeitiger Änderung von Helligkeit und Farbtemperatur sowie des breiteren Farbtemperatur-Spektrums die 70€ Aufpreis tatsächlich rechtfertigen - zumindest im Bad.

Vielleicht bewegt mich der Spieltrieb irgendwann dazu ein Phoscon Gateway zu probieren, aber da ich (mindestens) zwei Haushalte administriere und ich keine Lust habe es am zweiten Standort, wo ich nicht vor Ort bin, zu kompliziert zu haben, muss ich ohnehin sehen möglichst weit mit dem Standard Repertoire zu kommen :wink:

## Vorbereitung und initiales Setup in der Hue App

Bevor ich auf die Konfiguration in iConnectHue eingehe, sollten einige Grundvoraussetzungen in der Hue App selbst sichergestellt sein:

**1. Alle Räume sind mit ihrem finalen Namen angelegt**

Es sollten nur physikalische Räume verwendet werden, Gruppenbildung über Räume ist in der Hue App nicht sinnvoll (dazu später mehr). Die Räume werden mit Homekit synchronisiert, man hat also in der Liste womöglich schon Räume und diese können auch leer sein, wenn man in dem Raum keine Hue Geräte hat, jedoch andere Homekit Geräte. Perfektionisten wählen ein passendes Icon, einige Drittanbieter Apps werten diese auch als Raumtyp aus**.**

**2. Alle Lampen sind angemeldet und alle Leuchten einem Raum zugeordnet**

Alle Leuchten haben ihren finalen Namen. Gedanken zur Namenwahl folgen weiter unten in einem separaten Abschnitt.

**3. Alle Dimmschalter und Bewegungsmelder sind angemeldet**

... und natürlich auch physikalisch platziert :wink:
Tatsächlich wird man mit den Bewegungsmelder aber hier und dort noch etwas jonglieren, damit sie beispielsweise im Vorbeigehen und bei offener Tür nicht versehentlich auslösen. Die Hue Bewegungsmelder sind da sehr praktisch, da sie über eine Magnetvorrichtung auch ohne Bohren an sehr vielen Stellen platziert und auch justiert werden können. Tatsächlich habe ich den Bewegungsmelder im Bad als einzigen fest unter die Decke gedübelt. Im Wohnzimmer hat sich eine Metallabdeckung einer Hängeleuchte angeboten, in der Küche der Abluftkanal der Dunstabzugshaube.

**4. Die erweiterten Einstellungen zum Standort sind konfiguriert**

Die Koordinaten für die Home Location wurden hinterlegt.
Es ist hier nicht notwendig die Sunset &amp; Sunrise Zeiten anzupassen, das machen wir später in iConnectHue.

Optional:

*   Für alle Lampen wurde das Power-on Verhalten konfiguriert.
*   Die Default Szenen in jedem Raum sind gelöscht. iConnectHue kann diese ohnehin nur lesend verwenden und irgendwie sind die zwar nett als Showcase, aber wenig praktisch in der Realität.
*   Routinen und Timer existieren in iConnectHue separat. Man kann diese über beide Apps anlegen, aber nicht gegenseitig editieren. Besser man entscheidet sich für eine Seite. Bei mir ist das iConnectHue, da Zusatzfunktionen nur dort verfügbar sind.

## Die Qual der Namenwahl

**Einleitung**

Nun habe ich oben ganz lapidar geschrieben, dass Räume und Geräte ihren finalen Namen haben sollten. Nun, was bedeutet das? Vielleicht haben einige sich schon einmal in den Weiten der unterschiedlichen Home Automation Systeme umgeschaut. Auf den ersten Blick arbeiten alle ähnlich: Es gibt Gerätenamen, diese kann man gruppieren und oft auch noch Räume zuordnen. Die Unterschiede werden dann erst über die Zeit sichtbar. Ist die Darstellung in der Benutzeroberfläche manchmal eher ein Luxusproblem, so sind Schwierigkeiten bei der Steuerung, insbesondere per Sprache, schon lästiger.

Die Lösung? Die Hersteller meinen alle, man solle dann doch einfach alles in ihrem Ökosystem erledigen. Dort gibt es etwas nicht? Warte bis nächstes Jahr. Es funktioniert etwas nicht wie gedacht? Pech. Die Konkurrenz hat etwas tolles Neues? Wir beobachten den Markt. Die Konkurrenz bietet mehr fürs gleiche oder gar weniger Geld? Pech. Eine tolle Hardware unterstützt nur die Steuerung mit einem bestimmten System? So what.

Wer sich in diesen Gedanken ebenfalls wiederfindet, der wird verstehen, warum man mehrere Systeme parallel verwenden möchte (oder muss). Beim Parallelbetrieb oder gar der Integration zwischen zwei Systemen sieht man sich zwangsläufig mit den unterschiedlichen Ansätzen der Hersteller konfrontiert. Oft sind diese einfach der unterschiedlichen technischen Architektur und unterschiedlichen Vorgaben geschuldet, wie zum Beispiel beim Thema Sicherheit oder Privatsphäre. Manchmal erscheint es aber auch als pure Absicht oder es ist schier die Unfähigkeit einige Dinge so zu implementieren, dass sie in der Praxis auch Sinn ergeben.

Irgendwie scheint es da logisch, dass man zur Überwindung dieser Schwierigkeiten ein möglichst offenes System möchte. Wer dabei nach Open Source schreit hat vielleicht auch recht, aber im wirklichen Leben kostet Entwicklung Geld - sehr viel Geld. Keine Firma auf diesem Planeten macht das aus purer Nächstenliebe und kann es sich leisten ohne entsprechendes Geschäftsmodell eine offene Plattform anzubieten. Wieviel Geld man dafür braucht, kann man sich am Beispiel von “FAMGA” (aka Facebook, Apple, Microsoft, Google, Amazon) ansehen. Die Open Source Community leistet seit über 2 Dekaden einen enormen Beitrag. Aber jeder, der dort etwas beiträgt, braucht auch etwas zum leben und hat genauso das Recht auf einen gewissen Lebensstandard wie jeder andere auch. Die Zeit und die Prioritäten sind deshalb ganz anders gewichtet und so gibt es im Open Source Bereich zwar unglaublich viele Innovationen, jedoch nicht unbedingt in einem überschaubaren (oder gar vorhersagbaren) Zeitraum.

Positiv ist dabei die Entwicklung, dass sehr viele Firmen erkannt haben, dass es ihrem Umsatz nicht unbedingt nur schlecht bekommt, wenn sie ihre Mitarbeiter auch dafür bezahlen etwas an die Open Source Community zurückzugeben. In 2018 wurde es mehr als offensichtlich, dass dies nun auch bei den großen FAMGA Konzernen angekommen ist. Beispielsweise übernahm Microsoft den Source Code Hoster Github, auf dem auch enorm viele Open Source Projekte ihren Quellcode pflegen. Die Reaktionen dazu waren sehr gespalten, meine persönliche Ansicht nach passt das aber absolut zum “neuen” Microsoft (was eigentlich schon seit etlichen Jahren so existiert - die Ära Balmer ist ja schon 5 Jahre her, eine halbe Ewigkeit in der Tech Branche). Liest man häufig, dass Microsoft inzwischen der größte Lieferant für Code bei vielen Open Source Projekten ist, so kann ich auch aus meiner persönlichen Zusammenarbeit mit Microsofts Entwicklerteams bestätigen, dass die Firmenkultur einen enormen Wandel hingelegt hat. Ich mache mir absolut keine Sorgen um Github und begrüße das Engagement von Microsoft sehr. Wer daran zweifelt, der sei auch auf Dinge hingewiesen wie der enorm gewachsenen Linux Unterstützung sowohl in der Azure Cloud als auch auf jedem Windows 10 PC. Microsoft hat klar erkannt, dass sich Offenheit auszahlen kann. Ich wäre nicht verwundert, wenn Windows 10 bald für Privatleute komplett kostenlos wäre und wir gar einen Großteil des Quellcodes als Open oder zumindest Public Source auf Github zu sehen bekämen.

* * *

Beim Thema eines offenen Systems scheidet **Apple** direkt aus. Auch wenn sie Homekit inzwischen für Software Implementierungen erweitert haben, so ist die Systemarchitektur an sich trotzdem so geschlossen, dass man nicht wirklich etwas daran erweitern kann. Mit einigen Kniffen geht das ein oder andere, aber dabei werden dann bestehende Funktionen missbraucht und so umgebogen, dass es mit Ach und Krach einigermaßen läuft. Schön ist das nicht. Meine Euphorie jedenfalls ist nach etlichen Jahren der Qual (bis vor 2 Jahren konnte ich Homekit nichtmal nutzen, weil mein iCloud Konto scheinbar kaputt war) komplett verflogen. Was nutzt einem die ganze Crypto Geschichte und die gute Privacy, wenn man derart eingeschränkt ist bei den technischen Möglichkeiten? Ich kann nicht erkennen, dass dies aus technischen Gründen so ist. Dritthersteller klagen hier zurecht über die komplizierten Zulassungsprozesse und engstirnigen Beschränkungen. Offene Schnittstellen und eine klare Weiterentwicklung lässt Apple nicht erkennen. Ob Apple jemals erkennen wird, dass übertriebene Geheimniskrämerei und Abschottung nicht mehr in das Jahr 2019 passen? Angesichts der Berichte, dass man bei Amazon bis zu 10.000 Mitarbeiter rein an Alexa arbeiten lässt und Apple hier gerade einmal 1 Fünftel beschäftigen soll, erwarte ich mir da absolut nichts. Die Zeit großer Erwartungen an Apple bzw. die Erfüllung dieser sind längst vorbei, damit müssen wir uns alle wohl mal langsam anfreunden.

**Facebook** hat den Home Automation Trend - Gott sei Dank - verpennt. Leave it like that, Mark.

**Microsoft** konzentriert sich auf Business Kunden bzw. als Zulieferer für IoT Infrastruktur (und macht da insgesamt IMHO einen sehr guten Job). Trotzdem nix/wenig für den Otto.

**Google**s Geschäftsmodell lautet Daten, Daten, Daten (oder Werbung, Werbung, Werbung). Alle Dienste und Produkte sind darauf ausgerichtet und dadurch auch nicht selten mittelmäßig. Deshalb fällt Google für mich sowohl aus technischer, als auch aus Sicht der Privatsphäre aus.

Bleibt **Amazon** und sein Alexa. Sicherlich wäre Apple im Vergleich beim Thema Privacy und Geschäftsmodell wahrscheinlich die bessere Wahl. Amazon hat Alexa jedoch inzwischen zu einem Quasi-Offenen-Standard entwickelt. Die Verbreitung mit eigenen Echo Geräten gekoppelt mit der Möglichkeit für andere Hersteller, ebenfalls Hard- und Software für Alexa anzubieten, hat zu einer enormen Verbreitung geführt. Obgleich man technisch sagen muss, dass Alexa alles andere als perfekt ist, so ist die große Unterstützung in allen Bereichen - vom Hersteller bis hin zum Selbstbauprojekt - nicht wegzudiskutieren. Letztlich kann jeder selbst entscheiden, wie wichtig Sprachsteuerung ist. Wem eine Steuerung per App reicht oder wem es nichts ausmacht zur Steuerung ständig ein Gerät mit Mikrofon bei sich am Körper mittragen zu müssen, der kann das ja so tun.

Für mich stellt Alexa jedenfalls eine gute Plattform mit enormen Chancen dar. Ich sehe, dass Amazon diese kontinuierlich und auch in kurzen Abständen weiterentwickelt. In der Alexa Mobile App wird das seit einiger Zeit überaus deutlich. Klar, sie kränkelt schon an der ruckeligen Navigation und so, aber Fortschritte sind sowohl im Frontend als auch Backend wahrnehmbar. Die Kooperationen mit anderen Herstellern wie Sonos tragen auch mehr und mehr große Früchte. Aus meinen beruflichen Erfahrungen beim Thema Softwareentwicklung kann ich die Strategie, wie Amazon Alexa weiterentwickelt, jedoch inzwischen sehr gut nachvollziehen. Manche sagen dazu “es reift beim Kunden”. Andererseits darf man nicht vergessen, dass das iterative Vorgehen nach dem Mini-Max-Prinzip auch aus Kundensicht sehr viele Vorteile bringt. Die Innovation ist hoch, die Berücksichtigung von Wünschen der Nutzer und Partnerfirmen kann ebenfalls in einem überschaubaren Zeitraum stattfinden. Jeder der mal in einem Großkonzern gearbeitet hat, bei dem lediglich 1 bis 2 Updates pro Jahr für eine Software vorgesehen (und auch durchführbar) sind, weiß genau, wovon ich rede. An diesem Punkt machen alle FAMGA einen extrem guten Job und dies ist meiner Meinung nach der Teil des Rezepts, welches den größten Anteil an deren aller Erfolg hat. Andere Großkonzerne außerhalb der Tech Szene realisieren das gerade erst sehr schmerzhaft, am bekanntesten dürfte dabei wohl die deutsche Automobilindustrie sein. :-)

* * *

**TL;DR - Einige Regeln zur Benennung von Geräten und Räumen**

Über die Zeit habe ich einige Beobachtungen im Verhalten von Homekit und Alexa gemacht. Diese haben bei mir dazu geführt, dass ich mich bei der Benennung meiner Geräte daran orientiere.

**Homekit** benötigt absolut eindeutige Gerätenamen. Das Problem: In jedem Raum hat man wahrscheinlich sowas wie ein Fenster oder eine Deckenleuchte. Homekit genügt es nicht, dass diese in unterschiedliche Räume zugeordnet werden. Wenn man also keinen tatsächlich im ganzen Haus eindeutigen Namen zuordnen kann oder will, so kann man den Raumnamen voranstellen. Aus “Deckenlampe” wird dann “Wohnzimmer Deckenlampe”. Die Synchronisierung der Namen zwischen Hue und Homekit ist dabei Fluch und Segen zugleich: In Homekit erkennt die Home.app von Apple seit iOS 12 (endlich), dass man den Raumnamen als Präfix verwendet und blendet diesen bei der Anzeige entsprechend aus. Auch **Siri** kann damit entsprechend umgehen. Man muss aber damit leben, dass man in allen Hue Apps dann den Raumnamen im Gerätenamen nochmal hat. Da ich die Hue App und auch iConnectHue jedoch nicht wirklich zum steuern hernehme, sondern lieber die Home.app oder die [Home Assistant Companion App](https://itunes.apple.com/us/app/home-assistant-open-source-home-automation/id1099568401?mt=8), störe ich mich nicht weiter daran, denn bei letzterem kann ich die sichtbare Benennung entsprechend beeinflussen.

Auch in der **Alexa** App kann ich die Namen nachträglich editieren. Dort hilft es gar zunächst eine Unterscheidung im Namen zu haben, um die Zuordnung zu einer Raumgruppe einfacher abzuhandeln, und den Raumnamen anschließend aus dem Gerätenamen zu entfernen. Diese Änderung behält Alexa bei und wird auch von einem erneuten Discovery Befehl nicht überschrieben. Nur wenn ich das Gerät lösche und es über den Discovery Befehl neu angelegt wird, dann ist auch der Name wieder so, wie er aus dem Hue Gateway übermittelt wird - logisch.
Alexa macht zunächst den Anschein, als wenn man dort die angezeigten Gerätenamen mehrfach verwenden kann. Hat man die Geräte erst einmal auch unterschiedlichen Raumgruppen zugeordnet, kommt man selbst auch nicht mehr so leicht durcheinander und kann das Wort “Deckenlampe” mehrfach verwenden. Inzwischen führt das auch immer seltener zu Verwirrung und die Rückfrage “Welches Gerät meintest du?” kommt nicht mehr so oft. Im Bereich der Raumzuordnung tut sich gerade sehr viel bei Alexa, beispielsweise daran zu sehen, dass man jüngst seinen Echo oder inzwischen auch Sonos One einer Raumgruppe zuordnet und damit dann Lichter in der selben Raumgruppe auch direkt steuern kann, ohne dass man extra nochmal den Raumnamen dazusagen muss. Ein “Alexa, schalte das Licht ein” bezieht sich dann also immer auf den Raum, in dem ich mich befinde (genauer, welches Alexa Gerät mich hört, aber da hat doch eh jeder eines in jedem Raum, oder? Sorry an alle HomePod Verfechter...). Es wird über kurz oder lang auch für alle anderen Geräte zuverlässig funktionieren, so dass doppelte Namen, so sie denn innerhalb einer Raumgruppe vermieden werden, keine Probleme mehr darstellen werden. Für Licht funktioniert es wirklich grandios perfekt.
Sofern hier jedoch Probleme auftauchen, macht es Sinn den Raumnamen auch in Alexa als Teil des Gerätenamens zu haben. Bedauerlicherweise kann Alexa aber mit dem Raumnamen als Präfix nicht so viel anfangen, sondern hat es meiner Erfahrung nach lieber, wenn dieser als Suffix am Ende steht. Immerhin können wir die Namen, die aus der Hue App kommen, in Alexa umdrehen und aus “Wohnzimmer Deckenlampe” wird ein “Deckenlampe Wohnzimmer”. Manchmal hilft es auch den Gerätenamen etwas auf die natürliche Sprache auszuweiten, etwa auf “Deckenlampe im Wohnzimmer”. Diese Benennung habe ich aber wie gesagt bei Licht nicht mehr gebraucht, wohl aber bei anderen Gerätetypen. Hier kommt es dann darauf an, wie man diese an Alexa und Homekit anbindet. Alle Möglichkeiten der Beeinflussung hat man hier natürlich, wenn man für Homekit das Open Source Tool Homebridge (oder wie ich die direkt in Home Assistant integrierte Homekit Unterstützung) verwendet. Fehlt eine offizielle Alexa Integration für ein Gerät, kann man sich ebenfalls mit FHEM oder Home Assistant behelfen und dort auch gleich den richtigen Namen hinterlegen, so dass man diesen in der Alexa App nicht noch extra manuell anpassen muss.

* * *

Klar wird aus meinen Ausführungen aber auch: Eine “Single Source of Truth” für den Namen eines Geräts gibt es nicht. Selbst auf absehbare Zeit wird das wohl nichts werden. Man ist darauf angewiesen den kleinsten gemeinsamen Nenner für die Systeme, die man gerne einsetzen möchte, herauszufinden.

Zusammengefasst habe ich daher momentan folgende Regeln für mich festgelegt:

1.  Finde einen eindeutigen Namen, der keine Ähnlichkeit mit einem anderen Gerät aufweist.

2.  Ist kein sinnvoller, eindeutiger Name möglich, nimm einen einheitlichen Namen und stelle diesem den Namen des Raums voran, in dem sich das jeweilige Gerät befindet. Ist das Gerät in Alexa sichtbar geworden, entferne den Raum wieder aus dem Gerätenamen in der Alexa App oder ändere den Namen so ab, dass der Raum am Ende und nicht am Anfang des Gerätenamens steht.

3.  Homekit ist das führende System für Raumnamen und Gerätenamen, da es den meisten Restriktionen unterliegt. Notwendige Abweichungen werden in der Alexa App vorgenommen, da diese mehr Flexibilität bringt. Wenn ein Gerät direkte Homekit Unterstützung hat und dadurch den Namen an Homekit übermittelt, können Hersteller Restriktionen oder das Ökosystem des Herstellers dazu führen, dass es unschönen Ansichten und/oder Namen führt. Klage dein Leid dem Hersteller, binde das Gerät alternativ über Homebridge selbst an oder lebe einfach damit.

4.  Verwende konsistente Raumnamen. Entscheide dich beispielsweise, ob du lieber “Bad” oder “Badezimmer” sagen willst und zieh dies bei allen Geräte- und Raumnamen konsequent durch.  “&lt;Raumname&gt;” schreiben und “&lt;Raumname&gt;-Zimmer” sagen, ist für die Sprachassistenten ein böhmisches Dorf. Alexa ist da sehr strikt, Siri ist manchmal etwas flexibler, aber trotzdem unverlässlich.

5.  Entscheide dich für eine der Bezeichnungen für deine Lichter: Grammatikalisch korrekt stecken in einer Leuchte ein oder mehrere (Glüh)Lampen (=Glühbirnen). Trotzdem ist der persönliche Sprachgebrauch vielleicht eher bei Lampe als Leuchte, auch wenn damit streng genommen nur das Leuchtmittel gemeint ist, nicht aber die Leuchte als Gesamtheit. Wieder andere sagen auch ganz allgemein “Licht” und verwenden damit eigentlich den Begriff für das Gewerk an sich. Kannst du mir noch folgen? :wink:

Ich empfehle den generischen Begriff “Licht” in Gerätenamen ganz zu vermeiden. Die Sprachassistenten kennen diesen Begriff als Oberbegriff für eine bestimmte Geräteklasse, nämlich den Lichtern. Wenn man problemlos sowas wie “Alexa, schalte das Licht an” oder “Alexa, schalte alle Lichter aus” sagen will, dann vermeidet man dieses Wort besser in Gerätenamen. Ansonsten kann es passieren, dass Alexa einen nicht richtig versteht und dumme Nachfragen stellt. Läuft alles korrekt, wird bei dem ersten Beispiel das Licht im Raum, in dem die Anfrage gestellt wurde, eingeschaltet und beim zweiten Befehl das komplette Licht in allen Räumen gleichzeitig ausgeschaltet.
Im Grunde sollte man sich nur einmal darüber klar sein, ob man diese Unterschiede machen will und wo man sie machen will und das dann auch so durchziehen. Auf die formal korrekte Bezeichnung zu pfeifen ist total okay, wenn man weiß, dass man es tut und dass man es konsequent tut :wink:
Nicht okay ist hingegen den Unterschied zwischen “das Selbe” und “das Gleiche” nicht zu machen - aber ich schweife ab ^_^

Zur Übersicht hier einmal, wie ich meine Räume, Leuchten und Hue Geräte aktuell benannt habe:

_Wohnzimmer_

- Sofalampe
- TV Lampe
- Schreibtischlampe
- Wohnzimmer Sensor
- Wohnzimmer Schalter


_Schlafzimmer_

- Bettlampe
- Schlafzimmer Deckenlampe (_Alexa:_ Deckenlampe)
- Schlafzimmer Schalter


_Küche_

- Herdlampe links
- Herdlampe rechts
- Hängeschränke
- Küche Strip
- Spot 1
- Spot 2
- Spot 3
- Spot 4
- Küche Sensor
- Küche Schalter

_Bad_

- Bad Deckenlampe (Alexa: Deckenlampe)
- Spiegel
- Bad Sensor

_Balkon_

- keine Leuchten installiert

_Flur_

- Leuchten nicht über ZigBee gesteuert, daher hier einmal außen vor gelassen.


## Unterschiedliche Sprachen

Dann wäre da noch die Wahl der Sprache. Warum ist das überhaupt eine Frage? Nun, ich bin ein Freund der englischen Sprache, da sie im Technik Bereich ohnehin allgegenwärtig ist. Sie ist zudem viel kürzer und daher auch angenehmer in der Darstellung. Auch findet Softwareentwicklung zumeist auf Basis der englischen Sprache als Referenz statt. Nicht selten umgeht man bei deren Nutzung einige Bugs, die nur in anderen Sprachen auftreten. Sei es nur bei der Darstellung (lange, deutsche [Kompositionen](https://de.wikipedia.org/wiki/Komposition_%28Grammatik%29), anyone?) oder gar auch, dass Funktionen gar nicht gehen. Hinzu kommt, dass ich ohnehin beruflich größtenteils in Englisch unterwegs bin und mir die umständlich eingedeutschten Begriffe daher äußerst fremd geworden sind.

Aus diesem Grund nutze ich alle meine Geräte bereits seit Jahren ausschließlich in Englisch. Was liegt da also näher als Sprachassistenten ebenfalls in Englisch zu verwenden. Seitdem jedoch auch noch die Smart Home Steuerung über die Sprachassistenten hinzugekommen ist, lässt sich das nicht mehr so gut durchhalten. Auch habe ich festgestellt, dass Gäste und andere Bewohner des Hauses doch lieber Deutsch verwenden, sei es bei einem zentral platzierten Bedienpanel oder auch nur der Sprachsteuerung. Ich kenne kein Hausautomationssystem (egal ob Open Source oder die der großen Konzerne), welches multilingual funktioniert. Ich habe auch wenig Hoffnung, dass sich dies jemals ändern lässt, denn keines der Systeme hat dies in seiner grundlegenden Architektur entsprechend berücksichtigt.

Das gleiche gilt übrigens auch für solche Dinge wie die richtige Unterstützung des [SI-Einheitensystems](https://de.wikipedia.org/wiki/Internationales_Einheitensystem) sowohl was die Werte angeht, als auch die Darstellung dieser zusammen mit ihren Symbolen und auch der [richtigen Handhabung von Zeilenumbrüchen](https://de.wikipedia.org/wiki/Gesch%C3%BCtztes_Leerzeichen). Von den Möglichkeiten der automatischen Umrechnung zur Darstellung über Basiseinheiten und dem eigentlich dafür ideal geeigneten metrischen System ganz zu schweigen. Auch die Umwandlung der Darstellung in gesprochene oder geschriebene Sprache (Chat Bots fürs Eigenheim, anyone?) ist dabei ein Thema.
Für FHEM habe ich eine solche [Unterstützung](https://svn.fhem.de/trac/browser/trunk/fhem/FHEM/Unit.pm) versucht einzuführen, diese beschränkt sich aber leider wegen der mangelnden Unterstützung seitens des Haupt-Maintainers und der anderen Entwickler lediglich auf meine eigenen Module und ist deshalb bei weitem nicht so hilfreich bzw. unvollständig.

Hinzu kommt, dass die Hersteller in der Entwicklung ihrer Assistenten je nach Sprache unterschiedlich weit sind. Spontan spräche das dann zwar dafür auf die englische Sprache zu setzen (sofern man gerne an den neusten Innovationen teilnimmt). Die Crux dabei ist aber, dass Hersteller wie Amazon zusätzlich noch ihre “Märkte” unterscheiden. Mit einem deutschen Amazon Konto sind deshalb viele Funktionen trotzdem nicht auf Englisch verfügbar. Drittanbieter handhaben das mit ihren Alexa Integrationen ähnlich. So sehr es uns auch missfällt, aber Ländergrenzen und Kontinente spielen leider noch immer eine große Rolle in der digitalen Welt von heute - und es ist eher abzusehen, dass diese Grenzen global gesehen eher zunehmen statt abgebaut werden. ;-(

Letztendlich habe ich deshalb entschieden, dass ich alle Sprachassistenten auf Deutsch verwende. Die Gerätesprache habe ich nach wie vor auf Englisch und mit dem Mischmasch aus deutschen Gerätenamen und Räumen mit der englischen Bedienoberfläche auf meinen Geräten lebe ich nun irgendwie. Glücklicherweise hat mich bisher noch nichts dazu bewogen, dass ich auch meine Geräte auf Deutsch umstellen müsste. Hoffentlich bleibt das so.

## Der nächste Teil dieser Reihe

Ich hatte gar nicht vor so extrem viel im Vorlauf zum eigentlichen Thema zu schreiben. Um aber tatsächlich all meine Gedanken und Beweggründe einigermaßen nachvollziehbar zu erläutern, war es wohl doch nötig so weit auszuholen.

Im zweiten Teil werde ich deshalb dann endlich darauf eingehen, wie ich die Lichtsteuerung mit iConnectHue umgesetzt habe. Stay tuned :wink: