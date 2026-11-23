/* ==========================================================================
   wildtamatoa.com — proposition : petites interactions
   (ascii.rest est chargé par script.js)
   ========================================================================== */

// Les sections apparaissent doucement quand elles entrent à l'écran.
const reveal = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add("seen");
      reveal.unobserve(e.target);
    }
  }
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));

// Un trait sous l'en-tête dès qu'on a défilé.
const top = document.querySelector(".top");
const onScroll = () => top?.classList.toggle("scrolled", window.scrollY > 8);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Le lien du menu de la section visible passe en blanc.
const links = new Map(
  [...document.querySelectorAll(".top nav a")].map((a) => [a.getAttribute("href").slice(1), a])
);
const spy = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      links.forEach((a) => a.classList.remove("active"));
      links.get(e.target.id)?.classList.add("active");
    }
  }
}, { rootMargin: "-45% 0px -50% 0px" });
links.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

// [copy] copie l'adresse e-mail.
const status = document.getElementById("copyStatus");
document.querySelectorAll(".copy").forEach((btn) => {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = "[copied]";
      if (status) status.textContent = "Email address copied";
    } catch {
      btn.textContent = "[select it]";
    }
    setTimeout(() => { btn.textContent = "[copy]"; }, 1800);
  });
});
