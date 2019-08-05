---
title: Continuous Integration für Gemeinschaft
subtitle: Ein ISO Image für Gemeinschaft 5.
summary: Build Umgebung für Gemeinschaft PBX GS5
tags:
- FreeSWITCH
- PBX
- VoIP
- Continuous Integration
- DevOps
- Jenkins CI
- Debian
- Linux
- Asterisk
- ISDN
- CAPI4Linux
- Telefonanlage
- Open Source
- Frühere Projekte
categories:
- Telekommunikation
date: "2012-06-19T00:00:00Z"
date_end: "2013-12-31T00:00:00Z"

image:
  caption: Foto von Paweł Czerwiński auf Unsplash
  focal_point: Smart

links:
- icon: globe
  icon_pack: fa
  name: Gemeinschaft PBX Projekt
  url: https://www.amooma.de/gemeinschaft/
- icon: compact-disc
  icon_pack: fa
  name: Fertige ISO Images
  url: https://www.alternative-solution.de/gs5
- icon: phone-volume
  icon_pack: fas
  name: Deutsche FreeSWITCH TTS Sprachdateien
  url: https://github.com/jpawlowski/freeswitch-sounds-tts
- icon: github
  icon_pack: fab
  name: Source Code
  url: https://github.com/jpawlowski/GBE
- icon: book-reader
  icon_pack: fas
  name: Artikel im Linux Magazin
  url: /de/transparente-architektur-emulation-mit-qemu/
---

Meine [Begeisterung für Festnetz Telefonie]({{< ref "/project/capi4linux-thepenguinde-edition/index.md" >}}) erlebte bei mir mehr als 10 Jahre später nochmals ein Revival, als ich auf die freie Telefonanlage [Gemeinschaft PBX](https://web.archive.org/web/20121101201537/http://www.amooma.de/gemeinschaft/) von [Stefan Wintermeyer](https://www.wintermeyer.de/) aufmerksam wurde. Die Version 5 war damals gerade kurz vor der Fertigstellung und war eine komplette Neuentwicklung. Diese brachte auch einen Wechsel vom inzwischen etwas schwerfällig gewordenen Asterisk hin zur modernen [FreeSWITCH](https://freeswitch.com/) Basis.

Die Installation von Gemeinschaft 5 - oder auch kurz GS5 - war schwierig, denn der neue Unterbau verwendete nun [Ruby on Rails](https://rubyonrails.org/) und war deshalb nicht leicht zu installieren. Es waren die Anfänge davon, wie auch heute Webseiten nicht mehr als solche bezeichnet und entwickelt werden, sondern Web Applikationen.
Deshalb entschloss ich mich spontan das Projekt zu unterstützen und habe mich in die Erstellung eines [ISO Images](https://web.archive.org/web/20130521194720/http://amooma.de/gemeinschaft/gs5) auf Basis von [Debian Live](https://wiki.debian.org/DebianLive) eingearbeitet. Dies wurde damals bereits automatisch über einen bei mir zu Hause laufenden [Jenkins CI](https://jenkins.io/) Server regelmäßig automatisch gebaut und für den Download bereitgestellt. DevOps war noch kein bekannter Begriff zu dieser Zeit und Continuous Integration war gerade in der Entstehungsphase.

Es war eine sehr aufregende Zeit und ich habe ebenfalls sehr viel darüber gelernt, wie Open Source Projekte organisiert werden.

{{% alert note %}}
Durch meine beruflichen Veränderungen habe ich mein Engagement für dieses Projekt Ende 2013 eingestellt. Die Artefakte gibt es natürlich alle noch und sind oben verlinkt.
{{% /alert %}}
