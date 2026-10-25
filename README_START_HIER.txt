HEUTE FINANZIELL FREI – RACE MILES TRACKER V1.1 (ABSCHLUSS)
===========================================================

AKTUELLE BESTEHENDE WEBSITE
---------------------------
URL: https://rm-countdown.netlify.app
GitHub-Repository: maximilianortmann97-cyber/racemiles

Die Version baut direkt auf dem bereits funktionierenden Race Miles Tracker V1.0
auf. Der eigentliche Blockchain-Abruf und die Berechnung wurden NICHT verändert.
Der bisherige HFF-Mining-Kalkulator V2.7.47 ist komplett unabhängig und wird
NICHT verändert.

ÄNDERUNGEN V1.1
---------------
- Das vom Nutzer freigegebene Race-Miles-Rennstreckenmotiv (goldenes RM-Logo)
  ist jetzt als responsiver Hintergrund eingebaut, OHNE Schild mit Stern.
- Neue optimierte Desktop-Bilddatei in 3840 × 2160 Pixeln (hochskaliert
  aus der bereitgestellten 1536 × 864 Pixel Vorlage – keine zusätzliche
  fotografische Detailauflösung erfunden).
- Mobile Hochformatkomposition erhält das vollständige Race-Miles-Logo.
- Desktop: Überschrift, Werte, Balken und Aktualisierungsbutton mittig.
- Tracker-Karte in passendem Dunkelblau/Gold, dezent transparent.
- Entfernt: erklärender Satz unter der Hauptüberschrift und der gesamte
  Transparenz-Absatz, sowie die redundante kleine Race-Miles-Zeile darüber.
- Browser-Tab zeigt das Original-HFF-Logo als Favicon; zusätzlich Apple-Touch-Icon.
- BscScan-Link unten bleibt für manuelle Kontrolle erhalten.
- Formel, Contract, API, RPC-Fallbacks und Fehleranzeige bleiben unverändert.

SO ERSETZT DU DIE DATEIEN IN GITHUB
-----------------------------------
1. V1.1-ZIP auf dem Mac durch Doppelklick entpacken.
2. Öffne https://github.com/maximilianortmann97-cyber/racemiles
3. Klicke auf 'Add file' > 'Upload files'.
4. Öffne den entpackten V1.1-Ordner im Finder und ziehe die Ordner 'public',
   'netlify' sowie 'tests' und die Datei 'netlify.toml' auf GitHub.
   WICHTIG: Beim Hochladen über GitHub können bestehende Dateien mit denselben
   Pfaden ersetzt werden. Wenn GitHub die Ordner nicht vollständig übernimmt,
   im GitHub-Repo die betroffenen Dateien einzeln aktualisieren.
5. Vor 'Commit changes' prüfen: Pfade liegen wieder direkt unter 'public/',
   'netlify/' usw. Es darf NICHT zusätzlich ein äußerer V1.1-Ordner entstehen.
6. Mit 'Commit changes' bestätigen.
7. Netlify sollte automatisch aktualisieren, sobald GitHub fertig ist.
   'rm-countdown.netlify.app' danach neu laden (Safari ggf. Cmd+Shift+R).
8. Am Handy und Desktop überprüfen: RM-Logo vollständig sichtbar, aktuelle
   Zahlen abrufbar und Favicon im Tab erkennbar. Browser können Icons cachen.

BITTE BEACHTEN
--------------
Die alte Datei 'public/assets/rm-shield-bg.webp' wird nicht mehr verwendet.
Du kannst sie in GitHub später entfernen; sie stört den Betrieb nicht.
Die Datei 'public/favicon.svg' aus V1.0 kann in GitHub zurückbleiben; sie wird
vom HTML der V1.1 nicht referenziert. Zum Aufräumen optional löschen.
Auf keinen Fall das Repository des Mining-Kalkulators verändern.

BLOCKCHAIN
----------
Contract: 0x94aa263052419b526f93c4a2924929abfdf13bc4
Max Total Supply = totalSupply()/10^decimals.
Verbleibend = max(0, 250000 - Max Total Supply).
Der Wert wird vom öffentlich lesbaren Blockchain-Contract geholt, nicht
anhand der Anzahl an Transfers oder einer Zusicherung von Verkäufen.
Bei Ausfall: keine erfundenen Werte; transparenter Fehlerstatus bleibt.

TESTS / GRENZEN
---------------
Lokaler Node-Test: tests/test-supply.mjs (unveränderte Berechnungen).
Visuelle Kontrolle per lokalem Browser-Rendering / Responsive-Screenshots.
Eine echte Produktionsänderung auf GitHub oder Netlify wurde hier NICHT
vorgenommen; die Aktualisierung erfolgt erst durch deinen GitHub-Commit.
