document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('nav.mainnav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  var form = document.getElementById('project-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fileInput = document.getElementById('project-files');
      var lines = [];
      var services = [];
      Array.from(form.elements).forEach(function (el) {
        if (!el.name || el.type === 'submit' || el.type === 'file') return;
        if (el.type === 'checkbox') {
          if (el.checked) services.push(el.value);
          return;
        }
        if (el.value) lines.push(el.name + ': ' + el.value);
      });
      if (services.length) lines.push('Services souhaités: ' + services.join(', '));
      if (fileInput && fileInput.files.length) {
        var names = Array.from(fileInput.files).map(function (f) { return f.name; });
        lines.push('');
        lines.push('Fichiers à joindre manuellement avant envoi : ' + names.join(', '));
      }
      var subject = encodeURIComponent('Nouvelle demande de projet — Atelier Atlas');
      var body = encodeURIComponent(lines.join('\n'));
      window.location.href = 'mailto:abdelkarimmay10@gmail.com?subject=' + subject + '&body=' + body;
    });
  }

  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('c-name').value;
      var email = document.getElementById('c-email').value;
      var message = document.getElementById('c-message').value;
      var subject = encodeURIComponent('Contact site — ' + name);
      var body = encodeURIComponent('Nom: ' + name + '\nE-mail: ' + email + '\n\nMessage:\n' + message);
      window.location.href = 'mailto:abdelkarimmay10@gmail.com?subject=' + subject + '&body=' + body;
    });
  }
});
