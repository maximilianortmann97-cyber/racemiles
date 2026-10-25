HEUTE FINANZIELL FREI - RACE MILES TRACKER 1.0
===========================================

ZWECK
-----
Eigenständige öffentliche Website, die den Token-Wert "Max Total Supply"
als öffentliches Blockchain-Ziel gegenüber 250.000 RM abbildet.
Contract: 0x94aa263052419b526f93c4a2924929abfdf13bc4 (BNB Smart Chain)

Die Website zeigt NICHT nachgewiesene Verkäufe und verwendet NICHT die
Zahl der Transfers. Sie liest read-only totalSupply() und decimals() aus.
Eine Wallet-Verbindung, ein Token, ein Passwort oder Mining-Race-Login sind
NICHT erforderlich. Bei einem Ausfall werden KEINE Zahlen erfunden.

WICHTIG: Unter www.bscscan.com/token/0x94aa... bitte nach Veröffentlichung
den Live-Wert mit dem Feld "Max Total Supply" vergleichen, da ein Test
gegen die Live-Blockchain aus dieser Umgebung nicht möglich war.

NEUE WEBSITE MIT GITHUB + NETLIFY VERÖFFENTLICHEN
------------------------------------------------
1. Dieses ZIP auf dem Computer entpacken.
2. Auf GitHub ein NEUES Repository erstellen, z.B. "hff-race-miles".
   Das bisherige Kalkulator-Repository NICHT verwenden.
3. Alle Dateien und Ordner aus diesem ZIP in das NEUE Repository hochladen.
   Wichtig: netlify.toml muss auf der obersten Ebene liegen, daneben public
   und netlify.
4. Auf netlify.com ein NEUES Projekt erstellen und das neue GitHub-
   Repository verbinden ("Add new project" / "Import an existing project").
5. Build command: LEER lassen. Publish directory: public.
   Functions directory: netlify/functions.
6. Veröffentlichen lassen. Neue Netlify-URL öffnen.
7. Die angezeigte Max Total Supply mit BscScan vergleichen.
8. Testen: Seite neu öffnen und "Blockchain-Daten aktualisieren" drücken.

KEINE EINGABEN ERFORDERLICH
-------------------------
Für Standardbetrieb benötigt die Funktion nur öffentlich zugängliche
Blockchain-RPC-Server. Es ist kein BscScan-API-Key nötig.
Optional: In Netlify unter Environment variables BSC_RPC_URL setzen,
wenn ein eigener zuverlässiger Anbieter eingesetzt werden soll. Diese URL
wird ausschließlich serverseitig verwendet.

FUNKTION
--------
- Fragt automatisch beim Öffnen ab.
- Aktualisierungsbutton erlaubt jederzeit einen erneuten Abruf.
- Max Total Supply = totalSupply() / 10^decimals (Token-Contract).
- Rest = max(0, 250000 - Max Total Supply).
- Fortschritt = min(100, Max Total Supply / 250000 * 100).
- Ziel und Contract-Adresse sind im Code fest hinterlegt.
- Mobile Ansicht und Desktopansicht enthalten.
- Kein Countdown nach Zeit, sondern verbleibende Token bis zur Zielmenge.

DATEIEN
-------
public/index.html              : sichtbare Website
public/assets/site.css        : Gestaltung
public/assets/app.js          : Aktualisierung und Berechnung
public/assets/rm-shield-bg.webp : generiertes Hintergrundbild
public/assets/hff-logo.png    : Logo aus dem bestehenden HFF-Backup
netlify/functions/supply.mjs  : öffentliche Blockchain-Leseabfrage
netlify.toml                  : Netlify-Konfiguration

Bestehende HFF-Webapp V2.7.47 NICHT verändert.

PRÜFSTATUS
----------
Quellcode und lokale Mathematik können automatisiert geprüft werden.
Die Verbindung zum realen Netlify-Deploy und zur Live-BNB Smart Chain
konnte in dieser Umgebung nicht getestet werden. Bitte Testschritt 7
und 8 nicht überspringen.
