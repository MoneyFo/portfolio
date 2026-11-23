/* ==========================================================================
   wildtamatoa.com — scripts
   ========================================================================== */

// ascii.rest (MIT, https://ascii.rest) : définit la balise <ascii-art>,
// qui dessine et anime les logos et la machine à écrire de la page.
// Chargé à part : si le site d'ascii.rest ne répond pas, le reste marche quand même.
import("https://ascii.rest/ascii.js").catch(() => {});


/* --------------------------------------------------------------------------
   Écran de démarrage (seulement sur les pages qui ont un #boot)
   Le texte est dans le HTML ; ce script le fait apparaître ligne par ligne.
   -------------------------------------------------------------------------- */

const boot = document.getElementById("boot");
if (boot) runBoot(boot);

function runBoot(boot) {
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finish = () => {
    if (root.classList.contains("booted")) return;
    boot.classList.add("done");
    root.classList.remove("booting");
    root.classList.add("booted");
  };
  if (reduced) { finish(); return; }

  root.classList.add("booting");
  let skipped = false;
  const skip = () => { skipped = true; finish(); };
  boot.querySelector(".boot-skip")?.addEventListener("click", skip);
  addEventListener("keydown", skip, { once: true });
  boot.addEventListener("pointerdown", (e) => { if (!e.target.closest(".boot-skip")) skip(); });

  const sleep = (s) => new Promise((r) => setTimeout(r, s * 1000));
  const cursor = document.createElement("span");
  cursor.className = "cursor";

  (async () => {
    const screens = [...boot.querySelectorAll(".screen")];
    for (const [i, screen] of screens.entries()) {
      if (skipped) return;
      screens[i - 1]?.classList.remove("on");          // efface l'écran précédent
      screen.classList.add("on");
      let first = true;
      for (const line of screen.querySelectorAll(".l")) {
        // temps d'attente : data-wait, sinon un petit délai irrégulier
        const wait = line.dataset.wait !== undefined
          ? parseFloat(line.dataset.wait)
          : (first ? 0 : 0.08 + Math.random() * 0.22);
        first = false;
        cursor.classList.remove("blink");
        await sleep(wait);
        if (skipped) return;

        // texte tapé : on le vide, on affiche la ligne, puis on le retape
        const typed = [...line.querySelectorAll(".type")].map((el) => [el, el.textContent]);
        typed.forEach(([el]) => { el.textContent = ""; });
        line.classList.add("on");
        line.append(cursor);
        screen.scrollTop = screen.scrollHeight;       // garde les dernières lignes à l'écran
        for (const [el, text] of typed) {
          el.after(cursor);
          const speed = parseFloat(el.dataset.speed || "0.07");
          for (const ch of text) {
            await sleep(speed);
            if (skipped) return;
            el.textContent += ch;
          }
        }
      }
      cursor.classList.add("blink");
    }
    await sleep(0.7);
    finish();
  })();
}
