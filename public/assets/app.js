(() => {
  'use strict';
  const TARGET = 250_000;
  const el = (id) => document.getElementById(id);
  const formatRM = new Intl.NumberFormat('de-DE', {maximumFractionDigits:4});
  const formatPercent = new Intl.NumberFormat('de-DE', {minimumFractionDigits:2, maximumFractionDigits:2});
  const btn = el('refresh');
  const pill = el('status-pill');
  const pillText = pill.querySelector('span');
  let hasData = false;
  let loading = false;

  function setState(kind, message) {
    pill.classList.toggle('is-live', kind === 'live');
    pill.classList.toggle('is-error', kind === 'error');
    pillText.textContent = message;
  }
  function show(data) {
    const supply = Number(data.supply);
    if (!Number.isFinite(supply) || supply < 0 || data.contract?.toLowerCase() !== '0x94aa263052419b526f93c4a2924929abfdf13bc4') {
      throw new Error('Ungültige Blockchain-Antwort');
    }
    const remaining = Math.max(0, TARGET - supply);
    const percent = Math.max(0, Math.min(100, supply / TARGET * 100));
    el('remaining').textContent = formatRM.format(remaining);
    el('total-supply').textContent = formatRM.format(supply);
    el('outstanding').textContent = formatRM.format(remaining);
    el('progress-label').textContent = formatPercent.format(percent) + ' %';
    el('progress-fill').style.width = `${percent}%`;
    el('progress-track').setAttribute('aria-valuenow', String(Math.round(percent)));
    el('goal-banner').hidden = supply < TARGET;
    const timestamp = new Date(data.fetchedAt);
    el('updated').textContent = Number.isFinite(timestamp.getTime())
      ? `Letzte erfolgreiche Aktualisierung: ${timestamp.toLocaleString('de-DE', {dateStyle:'medium', timeStyle:'medium'})}`
      : 'Blockchain-Daten erfolgreich geladen';
    hasData = true;
  }
  async function refresh() {
    if (loading) return;
    loading = true;
    btn.disabled = true;
    setState('loading', 'Wird aktualisiert');
    btn.querySelector('span').textContent = 'Blockchain wird abgefragt …';
    try {
      const timeout = new AbortController();
      const timer = setTimeout(() => timeout.abort(), 34000);
      let response;
      try {
        response = await fetch(`/.netlify/functions/supply?_=${Date.now()}`, {cache:'no-store',signal:timeout.signal});
      } finally { clearTimeout(timer); }
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || `Fehler ${response.status}`);
      show(data);
      setState('live', 'Blockchain-Stand geladen');
    } catch (error) {
      setState('error', 'Abruf fehlgeschlagen');
      el('updated').textContent = hasData
        ? 'Aktualisierung fehlgeschlagen. Anzeige zeigt den letzten erfolgreichen Abruf.'
        : 'Keine Live-Daten verfügbar. Bitte später erneut versuchen.';
      console.error('Race Miles: Supply konnte nicht geladen werden:', error);
    } finally {
      loading = false;
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Blockchain-Daten aktualisieren';
    }
  }
  btn.addEventListener('click', refresh);
  refresh();
})();
