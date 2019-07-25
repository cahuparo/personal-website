---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Gedanken Zur Hausautomatisierung"
subtitle: ""
summary: "Über meine Anfänge bei der Hausautomation und welche Rolle Philips HUE und Homematic dabei spielten."
translationKey: "thoughts-on-home-automation"
aliases:
  - /post/181548978860/gedanken-zur-hausautomatisierung
tags:
  - FHEM
  - Home Assistant
  - Hass.io
  - Homekit
  - Alexa
  - Proxmox VE
  - UniFi
  - LetsEncrypt
  - OPNsense
  - APU2d2
  - IPv6
  - Philips HUE
  - Homematic
  - Homematic IP
categories:
  - Hausautomation
date: 2018-12-30T14:20:49+01:00
lastmod: 2018-12-30T14:20:49+01:00
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

Angefangen hat bei mir alles mit [Philips Hue](https://www.meethue.com/) im Jahr 2013. Zusammen mit einer ganzen Menge von [Homematic](https://www.homematic.com/) Komponenten begann ich meine Wohnung mit Technik auszustatten, diese fernzusteuern und zu automatisieren.

Heute kaum vorstellbar, dass es damals so gut wie keine richtige Interaktion zwischen unterschiedlichen Systemen gab.

Auch waren die Grundfunktionen teils sehr beschränkt, insbesondere bei Philips Hue. Aber allein das Konzept von Farbe und unterschiedlichen Weißtönen hat mich schon fasziniert.

Und ich wollte mehr.

## FHEM

In den ersten 3 Jahren bekam man also nicht viel aus einem Guss. Ich behalf mir in dieser Zeit mit Automationen und Verknüpfungen der verschiedenen Systeme über [FHEM](https://fhem.de/). Die Homematic interne Programmierung war und ist für mich ein Unding.

Die Systemarchitektur von FHEM ist jedoch damals wie heute nicht unbedingt die beste, auch wenn dort meiner Meinung nach noch immer die innovativsten Ideen entstehen und umgesetzt werden.
Die FHEM Entwickler-Gemeinde kränkelt an gemeinsamen Standards und dem Mut zur Veränderung. Grundlegende Erkenntnisse, die zwischenzeitlich auch alle anderen Hausautomatisierungs-Plattformen gewonnen oder gebracht haben, führen nicht zu sinnvollen Veränderungen in der Basis von FHEM. Die Freizügigkeit bei der Entwicklung ist gleichzeitig auch ihr größtes Hindernis - auch einer der Gründe, warum FHEM trotz seiner langen Historie und Vorreiterrolle ein Nischendasein pflegt. Dass die Entwicklung sich stark auf den deutschsprachigen Raum konzentriert, schreckt viele fremdsprachige Nutzer und Entwickler zusätzlich ab.
Bedingt durch den Perl Unterbau, welcher sich schwer mit der Ausführung von parallelen Abläufen tut, ist auch die Performance nicht unbedingt so, wie man sie sich wünschen würde.

Diese Unzulänglichkeiten bei FHEM haben meiner Meinung nach auch dazu geführt, dass neuere OpenSource Systeme wie [OpenHAB](https://www.openhab.org/), [Home Assistant](https://home-assistant.io/) oder [ioBroker](http://iobroker.net/) inzwischen deutlich moderner sind, nicht nur aufgrund ihrer moderneren Standard-Oberflächen, sondern auch der besseren Systemarchitektur. Die Funktionsvielfalt und Flexibilität reicht jedoch trotz der bereits jahrelangen Entwicklung aller Systeme nicht an FHEM heran. Oberflächlich werden auch alle wichtigen Gerätehersteller unterstützt, unter der Haube jedoch nicht selten nur mit spärlichen oder gar unvollständigen Grundfunktionen. Sinnvolle Mehrwerte bei der Steuerung oder Automatisierung sucht man meist vergeblich, ganz anders als man es in FHEM gewohnt ist. Dies ist wohl der Preis für Stabilität, Performance, Sicherheit und zentraler Standards.
In FHEM hingegen werden meist nicht nur sämtliche Parameter und Steuermöglichkeiten der Hersteller unterstützt, sondern auch durch Zusatzfunktionen ergänzt. Viele FHEM Modulautoren sind bemüht ihren Gehirnschmalz mit einzusetzen und nicht nur eine API streng nach Dokumentation des Herstellers anzubinden. Es fließt viel mehr Aufwand darin zu verstehen, was ein Hersteller sich bei den Funktionen wohl tatsächlich gedacht hat. Das lässt sich aus der oft nur spärlichen Hersteller-Dokumentation (wenn überhaupt vorhanden) nicht entnehmen. Meinem Eindruck nach ist man bei FHEM nicht davon getrieben möglichst viele Hersteller und möglichst schnell zu unterstützen, sondern die Unterstützung möglichst gewinnbringend einzubauen. Auf der anderen Seite sind die anderen Systeme augenscheinlich mehr an der Masse interessiert. Dies mag jedoch auch deren steilem Wachstum und dem Mangel an Entwicklerkapazität geschuldet sein und ist inzwischen weniger der Fall.

Bei allem Pro und Contra wäre es aber unfair zu leugnen, dass genannte neuere Systeme sich an sehr vielen Ecken von FHEM inspirieren ließen und bis heute noch von der Dynamik und den “Lessons learned” bei FHEM profitieren. Die Einstiegshürde bei der Entwicklung in FHEM ist im Vergleich verhältnismäßig niedrig, man kann dort auch mal einfach drauf los entwickeln. Gut für die Funktionalität und die Innovation, aber schlecht für sowas wie Stabilität, Performance und einheitlicher Standards.

Ich habe unter meinem Alias ‘Loredo’ seit 2013 selbst zahlreiche Module [beigesteuert](https://svn.fhem.de/#contributors) und somit mein gesamtes Entertainment System bedienbar gemacht. Eine ganze Menge an Zeit steckte ich in die Entwicklung der Anwesenheitserkennung und darauf basierende Automatisierungen. Die Module RESIDENTS, ROOMMATE und GUEST erfreuen sich dazu großer Beliebtheit.

## Alles wird anders

Das Entwicklungstempo und die Instabilität beim Betrieb von FHEM hat bei mir über die Jahre jedoch zu einem Quasi-Stau bei der Umsetzung meiner Pläne zur Automatisierung in meiner Wohnung und auch meinem kleinen Familien-Häuschen geführt.

In der ruhigeren Zeit um Weihnachten 2018 habe ich mich deshalb diesem Thema mal wieder angenommen und eine ganze Reihe von Änderungen vorgenommen bzw. begonnen:

1.  Ausgangslage: Proxmox VE auf einem Intel NUC mit VLAN Tagging, virtuelle [pfSense](https://www.pfsense.org/) Appliance als Firewall, UniFi als WLAN Access Point.
2.  Nachhaltigere technische Plattform --&gt; Umstellung auf Docker Container und Konfigurations-Management via Git
3.  Eigene interne PKI (voll automatisiert via Docker), ergänzt durch LetsEncrypt
4.  Bessere Separierung der technischen Komponenten --&gt; Auslagerung der Firewall aus einer VM auf ein dediziertes Gerät ([PC Engines APU2d2](https://pcengines.ch/apu2d2.htm))
5.  Wechsel von pfSense auf [OPNsense](https://www.opnsense.org/)
6.  Wechsel von o2 VDSL 50/10 IPv4-only zu Vodafone Kabel 1000/50 mit Dual-Stack IPv4+IPv6 und festen IP Adressen
7.  Auslagerung der IoT Geräte auf eine separate WLAN SSID (evtl. noch separates VLAN, wahrscheinlich für einige Geräte aber problematisch wenn die vom Hersteller vorgesehene Funktion vollständig erhalten bleiben soll; z.B. wegen UPnP und mDNS)
8.  Home Assistant als führender Home Automation Hub (manuelle Gerätesteuerung, Anbindung an Homekit und Alexa, einfache Automationen), ergänzt durch FHEM für komplexere Automationen.
9.  Unabhängigkeit der verschiedenen Herstellerlösungen: Automationen sollen zunächst mit Boardmitteln erfolgen und dann durch Home Assistant und/oder FHEM ergänzt werden.
10.  Das Namensschema für Geräte muss so gewählt werden, dass die unterschiedlichen Verhaltensweisen der Sprachassistenten Siri und Alexa berücksichtigt werden, um eine bestmögliche Steuerung zu ermöglichen. Die Verknüpfung mit Räumen spielt dabei eine zentrale Rolle.

Für die beiden letzten Punkte habe ich lange im Netz nach Inspiration gesucht: Wie macht man das am besten, wie findet man die richtige Balance und wie bringt man alle teils gegensätzliche Anforderungen unter einen Hut?
Finden konnte ich dazu wenig, offenbar machen sich nicht sehr viele die selben Gedanken oder verbloggen diese nicht.

Aus diesem Grund schreibe ich diesen Blogbeitrag und weitere werden folgen.
