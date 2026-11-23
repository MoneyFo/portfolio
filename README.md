# wildtamatoa.com

Portfolio de Wild Tamatoa, hébergé sur Cloudflare Pages.

- Site statique, sans étape de build :
  - `index.html` : la structure de la page, dont le texte de l'écran de démarrage (modifiable)
  - `style.css` : les styles (fond pointillé, mise en page, animations)
  - `script.js` : anime l'écran de démarrage et charge ascii.rest (balise `<ascii-art>`)
  - `pieces/typewriter.js` : copie locale de la machine à écrire d'ascii.rest (pause de 7 s)
  - `fonts/` : IBM Plex Mono ; `favicon.svg`, `*.png` : icône TW
- Chaque push sur `main` est mis en ligne automatiquement sur https://wildtamatoa.com.
- Les autres branches donnent une URL de prévisualisation en `*.pages.dev`.
