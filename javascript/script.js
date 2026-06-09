/* ═══════════════════════════════════════════════════════════
   PawLux – script.js
   ═══════════════════════════════════════════════════════════ */

/* ─── 1. DATA MÍNIMA = HOJE ──────────────────────────────── */
(function definirDataMinima() {
  const hoje = new Date().toISOString().split('T')[0];
  document.getElementById('data').min = hoje;
})();


/* ─── 2. MÁSCARA DE TELEFONE ─────────────────────────────── */
document.getElementById('telefone').addEventListener('input', function () {
  let numeros = this.value.replace(/\D/g, '').substring(0, 11);

  if (numeros.length > 10) {
    numeros = numeros.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  } else if (numeros.length > 6) {
    numeros = numeros.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
  } else if (numeros.length > 2) {
    numeros = numeros.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
  } else if (numeros.length > 0) {
    numeros = numeros.replace(/^(\d{0,2})$/, '($1');
  }

  this.value = numeros;
});


/* ─── 3. VALIDAÇÃO DO FORMULÁRIO ─────────────────────────── */
document.getElementById('btn-agendar').addEventListener('click', function () {
  const campos = [
    {
      id:    'nome',
      errId: 'err-nome',
      check: function (v) { return v.trim().length >= 2; }
    },
    {
      id:    'telefone',
      errId: 'err-telefone',
      check: function (v) { return v.replace(/\D/g, '').length >= 10; }
    },
    {
      id:    'servico',
      errId: 'err-servico',
      check: function (v) { return v !== ''; }
    },
    {
      id:    'data',
      errId: 'err-data',
      check: function (v) {
        if (!v) return false;
        const dataSelecionada = new Date(v + 'T00:00:00');
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        return dataSelecionada >= hoje;
      }
    },
    {
      id:    'pet',
      errId: 'err-pet',
      check: function (v) { return v.trim().length >= 1; }
    },
    {
      id:    'porte',
      errId: 'err-porte',
      check: function (v) { return v !== ''; }
    }
  ];

  let valido = true;

  campos.forEach(function (campo) {
    const el  = document.getElementById(campo.id);
    const err = document.getElementById(campo.errId);

    if (!campo.check(el.value)) {
      el.classList.add('error');
      err.classList.add('show');
      valido = false;
    } else {
      el.classList.remove('error');
      err.classList.remove('show');
    }
  });

  if (!valido) return;

  document.getElementById('booking-form').style.display = 'none';
  document.getElementById('form-success').style.display = 'block';
});


/* ─── 4. ANIMAÇÃO DE SCROLL (FADE-UP) ────────────────────── */
const observadorScroll = new IntersectionObserver(
  function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.style.animation = 'fade-up .6s ease both';
        observadorScroll.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.service-card, .review-card, .stat-card').forEach(function (card) {
  card.style.opacity = '0';
  observadorScroll.observe(card);
});