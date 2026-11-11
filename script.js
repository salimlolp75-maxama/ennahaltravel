const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
document.getElementById('year').textContent = today.getFullYear();
const start = document.getElementById('start');
const end = document.getElementById('end');
start.min = localDate;
end.min = localDate;
start.addEventListener('change', () => {
  end.min = start.value || localDate;
  if (end.value && end.value < start.value) end.value = start.value;
});
let summary = '';
document.getElementById('trip-form').addEventListener('submit', event => {
  event.preventDefault();
  if (end.value < start.value) { end.setCustomValidity('Choisissez une date de retour après le départ.'); end.reportValidity(); return; }
  end.setCustomValidity('');
  const format = value => new Intl.DateTimeFormat('fr-MA', { dateStyle: 'long' }).format(new Date(value + 'T12:00:00'));
  summary = `Projet de location — ENNAHAL TRAVEL\nDépart : ${format(start.value)}\nRetour : ${format(end.value)}\nLieu souhaité : ${document.getElementById('place').value.trim()}\nBesoin : ${document.getElementById('purpose').value}\nSous réserve de confirmation des disponibilités et des conditions avec la société.`;
  document.getElementById('summary').textContent = summary;
  document.getElementById('trip-result').hidden = false;
  document.getElementById('copy').textContent = 'Copier le récapitulatif';
});
end.addEventListener('input', () => end.setCustomValidity(''));
document.getElementById('copy').addEventListener('click', async event => {
  try { await navigator.clipboard.writeText(summary); event.target.textContent = 'Récapitulatif copié ✓'; }
  catch { event.target.textContent = 'Sélectionnez le texte ci-dessus pour le copier.'; }
});
