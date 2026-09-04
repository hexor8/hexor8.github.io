/* ============================================================================
   COMMISSION FORM — a custom-styled form that submits in the background to
   the real Google Form's response endpoint, so visitors never see Google's
   own form UI. Field ids/URL come from content.json "commission.customForm" —
   see the big comment above that object for how to re-extract them if the
   live Google Form's questions ever change.
   ============================================================================ */
(function () {
  const SITE = window.SITE_CONTENT;
  const cfg = SITE && SITE.commission && SITE.commission.customForm;
  const form = document.getElementById('hireMeForm');
  if (!cfg || !form) return;

  const select = document.getElementById('cf-worktype');
  if (select) {
    select.innerHTML = cfg.workTypeOptions
      .map(o => `<option value="${o}">${o}</option>`)
      .join('');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = document.getElementById('cfSubmitBtn');
    const status = document.getElementById('cfFormStatus');
    const fields = cfg.fields;

    const body = new FormData();
    body.append(fields.name, document.getElementById('cf-name').value);
    body.append(fields.contactMethod, document.getElementById('cf-contact').value);
    body.append(fields.workType, select.value);
    body.append(fields.description, document.getElementById('cf-description').value);
    body.append(fields.budget, document.getElementById('cf-budget').value);
    body.append(fields.references, document.getElementById('cf-references').value);

    // Google's date widget expects separate _month/_day/_year sub-fields
    // rather than one combined value.
    const deadline = document.getElementById('cf-deadline').value; // "yyyy-mm-dd"
    if (deadline) {
      const [year, month, day] = deadline.split('-');
      body.append(fields.deadline + '_month', String(Number(month)));
      body.append(fields.deadline + '_day', String(Number(day)));
      body.append(fields.deadline + '_year', year);
    }

    btn.disabled = true;
    btn.textContent = 'Sending…';

    // mode: 'no-cors' means the response is always opaque — we can't tell
    // success from failure client-side, so we treat "the request went out"
    // as success, matching the tradeoff documented in content.json.
    fetch(cfg.action, { method: 'POST', mode: 'no-cors', body })
      .catch(() => {})
      .finally(() => {
        form.reset();
        btn.disabled = false;
        btn.textContent = 'Send Request';
        status.textContent = cfg.successMessage;
      });
  });
})();
