# EmprendeFest 2026

Invitación web interactiva, responsive y lista para GitHub Pages. Estética navideña con las **11 ilustraciones originales entregadas**, Bootstrap 5.3.8, SweetAlert2, cuenta regresiva, recorrido horizontal del tren y formulario de contacto por WhatsApp.

## Uso inmediato

Abrí `index.html` en un navegador para ver la página. Para que carguen las bibliotecas (Bootstrap, íconos y SweetAlert2) necesitás acceso a internet. Para desarrollar también podés abrir la carpeta en VS Code con Live Server, pero **el visitante final no necesita VS Code, Node.js, ni instalar nada**.

## Publicar en GitHub Pages

1. Creá un repositorio público de GitHub (por ejemplo `emprendefest-2026`).
2. Subí **el contenido de esta carpeta** a la raíz del repositorio (`index.html`, `styles.css`, `script.js`, `config.js`, `assets/`, etc.).
3. En el repositorio, abrí **Settings → Pages → Build and deployment** y seleccioná **Deploy from a branch**, **main** y carpeta **/(root)**. Guardá.
4. La página se publicará en `https://TU-USUARIO.github.io/emprendefest-2026/` (sustituí el usuario y el nombre de repositorio). No necesitás configurar servidor ni base de datos.

## Número de WhatsApp

Ya está configurado **+502 4112-6383** en `config.js`, propiedad `whatsapp: '50241126383'`. El formulario **no guarda datos** en un servidor; prepara un mensaje que la persona revisa y envía mediante WhatsApp.

**Importante:** La participación no queda formalizada por enviar el mensaje. Según la invitación original, se solicita colaboración mínima de **Q200 en víveres** y presentar la **factura de compra** en Generación Radio (5.ª calle, barrio La Batalla) o en la Administración del Centro Comercial Internacional Coatepeque. La factura es el comprobante de inscripción.

## Añadir colaboradores (sin perder las proporciones de los logos)

1. Colocá cada logotipo en `assets/logos/`. Ideal: PNG transparente o SVG.
2. Abrí `config.js` y agregá entradas al arreglo `COLABORADORES`:

```javascript
const COLABORADORES = [
  { nombre: 'Marca de ejemplo', logo: 'assets/logos/marca-ejemplo.png', enlace: 'https://ejemplo.com' },
  { nombre: 'Otra marca', logo: 'assets/logos/otra-marca.svg' },
];
```

3. Al guardar y subir los cambios a GitHub, los logotipos aparecerán automáticamente. La imagen usa `object-fit: contain`: se verá entera, no se recortará ni se deformará, aunque sea horizontal, cuadrada o vertical.

No incluyas logotipos ficticios como si fueran colaboradores reales. Si la lista está vacía, el sitio enseña espacios reservados para marcas futuras.

## Tu logotipo CREATIGUATE

Colocá tu logo como `assets/logos/creatiguate.png`. Se verá automáticamente en el pie de página. Mientras no esté, se muestra el crédito tipográfico **CREATIGUATE**. Podés cambiar el enlace a Instagram en el archivo `index.html`.

## PNG originales y versiones adaptadas

- `assets/originales/` contiene los **11 archivos originales sin modificar**.
- `assets/ilustraciones/` contiene copias recortadas **solo en su espacio transparente exterior** para evitar que queden diminutas o que el tren se vea estirado. Las ilustraciones mantienen la proporción, colores y composición originales.
- El tren se muestra con sus cuatro partes como un recorrido horizontal desplazable (con flechas y control táctil en celulares), sin `stretch` ni deformación.

| Archivo optimizado | Original |
|---|---|
| tren-01.png | TREN PARTE 1.png |
| tren-02.png | TREN PARTE 2.png |
| tren-03.png | TREN PARTE 3.png |
| tren-04.png | TREN PARTE 4.png |
| arbol.png | árbol navideño.png |
| santa.png | papa noel.png |
| reno.png | reno.png |
| trineo.png | trineo.png |
| frosty.png | Frosty.png |
| farol.png | Farol Navideño.png |
| arbusto.png | arbusto navideño.png |

## Secciones y contenido

Hero animado, datos de fecha/hora y ubicación, cuenta regresiva, tren navideño de cuatro partes, objetivo social, cómo participar, aporte en víveres, formulario de contacto, colaboradores, preguntas frecuentes, crédito CREATIGUATE. La salida del evento es el **sábado 21 de noviembre de 2026, 6:30 p. m.**, con reunión desde las 4:30 p. m. en Calle de los Doctores y finalización en el CCI Coatepeque.

## Personalización visual

Los colores principales están definidos como variables CSS al comienzo de `styles.css`. Las animaciones se reducen si el dispositivo tiene activada la preferencia de movimiento reducido. La página está diseñada para celulares, tabletas y computadora.

---

Diseño y desarrollo: **CREATIGUATE**.

## Edición con esferas de colaboradores y música (5 de noviembre de 2026)

Se integraron **11 esferas navideñas** (Di Sangalu Shop, Esmeralda’s Cosmetic, Manuel Camacho, Mundo de Palabras, Municipalidad de Coatepeque, Vividi’s Salon, Centro Comercial Internacional, CREATIGUATE, Generación Radio, MerkaTecnía y Regional TV) en la sección **Colaboradores**, todas completas y adaptables sin deformar.

- Las imágenes optimizadas se encuentran en `assets/logos/esferas/`.
- Los archivos PNG originales están en `assets/logos/originales/`.
- El logotipo **normal** de CREATIGUATE está integrado en el pie de página (`assets/logos/creatiguate.png`), aparte de su propia esfera.
- Podés añadir, quitar o reordenar las esferas desde `config.js`, arreglo `COLABORADORES`.
- Los copos de nieve existentes se conservan, así como las animaciones de entrada y las confirmaciones mediante SweetAlert2.
- Se añadió un tema instrumental de campanas, versión sintetizada especialmente para este sitio de la composición de dominio público **Jingle Bells**. Archivo propio `assets/audio/navidad-emprendefest.mp3`, sin streaming externo.

**Música automática:** al ingresar, la página intenta reproducir la música por sí sola. Algunos navegadores (especialmente iPhone y Chrome/Safari móviles) **bloquean la reproducción automática con sonido** hasta que se hace el primer toque o clic. En esos casos, la música comienza al primer contacto con la página. Un botón visible abajo a la izquierda permite pausarla o activarla manualmente. Esto respeta las políticas del navegador; no es un error del sitio.
