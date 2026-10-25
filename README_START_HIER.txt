HFF RACE MILES TRACKER – FINAL V1.3
=================================

Dies ist die VOLLSTÄNDIGE WEBSITE für das bestehende, getrennte GitHub-Repository "racemiles".
Keine Dateien aus der bisherigen HFF-Mining-Kalkulator-Website verwenden oder verändern.

ENTHALTEN
- Neues finales Bild: goldene Rennstrecke ohne RM-Logo oder Schild
- Responsive Ein-Bildschirm-Layout auf mobilen und Desktop-Browsern; dynamische
  Anpassung auch bei kleinen Browserfenstern, damit keine Seite gescrollt werden muss.
  Sehr kleine oder quer gehaltene Displays können dazu verkleinerte Inhalte zeigen.
- Original HFF-Logo oben links (inklusive Text)
- Transparentes goldenes HFF-Symbol als Browser-Tab-Icon, ohne blauen Hintergrund
- Neuer WhatsApp-/Messenger-Vorschaulink zur goldenen Rennstrecke
- Unveränderte Blockchain-Supply-Funktion aus V1.2 (reiner lesender RPC-Abruf)
- Gleichbleibende Berechnungsbasis: 250.000 RM minus totalSupply()
- Keine Walletverbindung und keine geheimen Zugangsdaten

GITHUB-UPDATE (WICHTIG!)
1. Öffne dein bestehendes GitHub-Repository "racemiles".
2. Lade den INHALT dieses Ordners (public/, netlify/, tests/, netlify.toml,
   README_START_HIER.txt) in das Repository hoch, NICHT die ZIP-Datei selbst.
3. Falls GitHub beim Hochladen alter Dateinamen Konflikte meldet,
   ersetze die betroffenen gleichnamigen Dateien im entsprechenden Ordner.
   Alle neuen Dateien müssen ihre Ordnerstruktur behalten.
4. Bestätige "Commit changes". Kein neues Repository nötig.
5. Netlify sollte automatisch einen Deploy starten. Status "Published" prüfen.
6. Seite: https://rm-countdown.netlify.app/
7. In Safari bei Bedarf neu laden; auch in privatem Fenster prüfen.
8. Zum WhatsApp-Test eine NEUE Nachricht mit
   https://rm-countdown.netlify.app/?v=13 verschicken.
   WhatsApp kann bereits gespeicherte Link-Vorschauen zwischenspeichern.

NETLIFY-EINSTELLUNGEN (NICHT ÄNDERN)
Branch main / Base directory leer / Build command leer
Publish directory public / Functions directory netlify/functions

FUNKTIONSTEST NACH VERÖFFENTLICHUNG
- Zahl und Status "Blockchain-Stand geladen" prüfen.
- Bei Klick auf "Blockchain-Daten aktualisieren" soll ein neuer Zeitstempel erscheinen.
- Den Max Total Supply-Wert mit BscScan vergleichen.
- Auf Handy und Desktop prüfen, dass Header, Überschrift, Zahlen, Button,
  Zeitstempel und der BscScan-Link ohne vertikales Scrollen sichtbar sind.
- Favicon und WhatsApp-Vorschau können wegen Caches später aktualisiert werden.

TESTSTATUS
Lokale Layout-Tests und Berechnungstests sind ausgeführt. Eine echte
Netlify-Live-Abfrage nach Installation muss beim Nutzer verifiziert werden.
