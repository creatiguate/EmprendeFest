/**
 * EmprendeFest 2026 — configuración editable sin tocar el diseño.
 * Para añadir un colaborador:
 * 1) Guardá su logotipo en assets/logos/ (PNG, SVG, JPG o WEBP).
 * 2) Añadí una entrada al arreglo COLABORADORES.
 * 3) Subí los cambios a GitHub Pages.
 * Los logos se muestran completos, sin recortes y sin deformaciones.
 */
const CONFIG = Object.freeze({
  whatsapp: '50241126383', // Código 502 para Guatemala, sin espacios ni guiones.
  eventoUTC: '2026-11-22T00:30:00Z', // 21 nov 2026 6:30 p. m. en Guatemala.
});

const COLABORADORES = [
  { nombre: 'DI SANGALU SHOP', logo: 'assets/logos/esferas/di-sangalu.webp' },
  { nombre: 'Esmeralda’s Cosmetic', logo: 'assets/logos/esferas/esmeraldas-cosmetic.webp' },
  { nombre: 'Manuel Camacho — Quiropráctica', logo: 'assets/logos/esferas/manuel-camacho.webp' },
  { nombre: 'Mundo de Palabras', logo: 'assets/logos/esferas/mundo-de-palabras.webp' },
  { nombre: 'Municipalidad de Coatepeque', logo: 'assets/logos/esferas/municipalidad.webp' },
  { nombre: 'Vividi’s Salon', logo: 'assets/logos/esferas/vividi-salon.webp' },
  { nombre: 'Centro Comercial Internacional Coatepeque', logo: 'assets/logos/esferas/cci.webp' },
  { nombre: 'CREATIGUATE', logo: 'assets/logos/esferas/creatiguate-esfera.webp' },
  { nombre: 'Generación Radio', logo: 'assets/logos/esferas/generacion-radio.webp' },
  { nombre: 'Merkatecnia', logo: 'assets/logos/esferas/merkatecnia.webp' },
  { nombre: 'Regional TV', logo: 'assets/logos/esferas/regional-tv.webp' },
];
