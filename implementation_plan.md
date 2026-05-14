# Auditoría y Plan de Mejoras: "Next-Level Prototype" (Avance 2)

Este documento es una auditoría exhaustiva y un plan de mejoras ambicioso para elevar la calidad del prototipo funcional actual de "Gamer Vault" a un estándar de excelencia, asegurando la máxima calificación (3 puntos en cada rubro) para el Avance 2 del proyecto.

## Análisis del Estado Actual vs. Expectativas

El sitio ya cuenta con una base sólida en Next.js (App Router) y Bootstrap 5.3, cubriendo las páginas esenciales (Inicio, Catálogo, Detalle, Búsqueda, Carrito, Checkout) y patrones básicos. Sin embargo, para lograr un prototipo *mid-fidelity* verdaderamente destacado, necesitamos pulir el acabado visual, hacer la navegación más fluida, asegurar la perfección en el diseño responsive y enriquecer la experiencia de usuario (UX).

## Áreas de Enfoque y Plan de Ejecución

---

### 1. Estructura del Sitio
**Objetivo:** Crear una arquitectura de información que se sienta premium, lógica y escalable, eliminando cualquier sensación de "prototipo en desarrollo".

*   **Breadcrumbs Globales:** Implementar el componente `Breadcrumbs` ya existente en *todas* las páginas internas (Catálogo, Detalle, Checkout, Búsqueda) para que el usuario siempre sepa dónde está y cómo retroceder.
*   **Footer Funcional:** Expandir el footer básico a un "Mega Footer" corporativo que incluya enlaces rápidos a categorías de juegos, políticas, soporte y newsletter, aportando credibilidad al e-commerce.
*   **Páginas de Error (404/500):** Implementar páginas `not-found.tsx` y `error.tsx` de Next.js personalizadas con la temática de videojuegos, evitando que el usuario vea pantallas de error genéricas si navega a rutas inexistentes.

### 2. Navegación Web
**Objetivo:** Ofrecer una navegación frictionless (sin fricción), moderna y contextual, similar a plataformas AAA.

*   **Offcanvas Cart Fluido:** El carrito actual (`OffcanvasCart.tsx`) debe abrirse sin bloquear la interacción con la página (si es posible), y debe mostrar claramente las imágenes de los productos, su cantidad editable con controles (+/-) y el subtotal instantáneo.
*   **Hover States Sensoriales:** Añadir micro-animaciones (escala sutil, sombras que se iluminan) en todos los enlaces de navegación y botones usando utilidades CSS o Bootstrap expandido.

### 3. Patrones de Diseño UX
**Objetivo:** Integrar y pulir los patrones requeridos no solo para cumplir, sino para maravillar.

*   **Búsqueda Predictiva (Mejorada):** La barra de búsqueda no solo debe llevar a la página de `/search`, sino desplegar un *dropdown* en tiempo real con sugerencias de juegos, portadas pequeñas y precios mientras el usuario escribe.
*   **Media-First Detail:** En la página de producto (`/product/[id]`), la imagen/portada debe dominar el 60% del primer *viewport* en Desktop. Aplicar un efecto de degradado oscuro en la base de la imagen donde se superpone la información crítica (Título, Precio, Botón de Compra).
*   **Progressive Disclosure (Checkout):** En lugar de un formulario de checkout masivo, implementar un sistema de pasos (StepperWizard) para el Checkout: 1. Datos Personales -> 2. Envío -> 3. Pago. Esto reduce drástaciamente el abandono de carritos.

### 4. Maquetado con Rejillas (Grid System)
**Objetivo:** Exprimir al máximo el Grid de Bootstrap para crear layouts densos pero limpios, evitando espacios en blanco incómodos.

*   **Bento Grid Perfecto:** Revisar `BentoGrid.tsx` en el inicio. Asegurar que las tarjetas encajen perfectamente en todas las resoluciones sin dejar huecos en la cuadrícula. Utilizar la utilidad de CSS Grid combinada con las clases de Bootstrap.
*   **Densidad de Tarjetas en Catálogo:** Ajustar el grid en la página de Catálogo para mostrar 2 columnas en móvil (`col-6`), 3 en tablet (`col-md-4`) y 4 o 5 en desktop ultra ancho (`col-lg-3 col-xl-2`).
*   **Alineación Vertical Estricta:** Asegurar que elementos como precios, botones de compra y títulos siempre se alineen al fondo de las tarjetas de producto, sin importar la longitud del título del juego (`d-flex flex-column h-100` y `mt-auto`).

### 5. Formularios Web (Checkout)
**Objetivo:** Validaciones robustas, retroalimentación visual clara y una estructura a prueba de fallos.

*   **Floating Labels:** Reemplazar los labels estándar por *Floating Labels* de Bootstrap (`form-floating`). Dan un aspecto mucho más moderno e interactivo al formulario de checkout.
*   **Validación en Tiempo Real:** Usar las clases de validación de Bootstrap (`.is-valid`, `.is-invalid`) con JavaScript nativo o estados de React para validar campos mientras se escribe (ej. formato de email, tarjeta de crédito, número de teléfono).
*   **Input Masks:** Si es posible, formatear automáticamente el número de tarjeta (XXXX XXXX XXXX XXXX) y la fecha de expiración (MM/YY) para mejorar enormemente la UX.

### 6. Diseño Responsive
**Objetivo:** Pixel-perfect en móviles, tablets y escritorios gigantes.

*   **Touch Targets en Móvil:** Asegurar que en pantallas pequeñas, todos los botones de "Añadir al carrito", "Pagar" y los enlaces del menú tengan un tamaño mínimo de área interactiva (ej. `py-3` en móvil) para evitar toques accidentales.
*   **Imágenes Inteligentes:** Usar el componente `<Image>` de Next.js combinado con clases fluidas (`img-fluid`, `object-fit-cover`) para asegurar que las portadas no se deformen en aspect ratios atípicos de tablet.
*   **Tipografía Fluida:** Ajustar el tamaño de las fuentes usando funciones calc() o rems basados en media queries para que los títulos `H1` no ocupen 4 líneas en móvil.

### 7. Uso de Bootstrap (Maximización)
**Objetivo:** Usar componentes nativos de Bootstrap de forma creativa en lugar de reinventar la rueda.

*   **Toasts para Feedback:** Cuando se añade un producto al carrito, mostrar un `Toast` de Bootstrap en la esquina inferior o superior que confirme la acción ("Producto añadido al carrito") en lugar de usar alertas disruptivas (alerts).
*   **Modales para Quick View:** En el catálogo, añadir un botón de "Vista Rápida" que abra un Modal de Bootstrap con un resumen del juego sin necesidad de cargar toda la página de detalle.
*   **Badges Dinámicos:** Usar badges (`badge bg-danger`) para indicar descuentos, "Nuevo" o juegos "Sin Stock" sobre las imágenes de las tarjetas (`position-absolute`).

---

## User Review Required

> [!IMPORTANT]
> **Priorización de Tareas**
> Por favor, revisa estas áreas de mejora. Algunas (como la búsqueda predictiva con dropdown o los modales de quick view) requerirán lógica de estado (React/hooks) adicional.
> 
> **¿Estás de acuerdo con este plan de ataque? ¿Te gustaría que nos enfoquemos primero en alguna sección en particular (ej. El rediseño del Checkout o la optimización del Home y el Grid)?**

## Verification Plan

1. **Revisión de Código:** Verificación de uso estricto de clases de Bootstrap (evitando CSS custom arbitrario).
2. **Pruebas Multi-Dispositivo:** Usaremos herramientas de desarrollo del navegador para verificar el comportamiento en anchos de 320px, 768px, 1024px y 1440px.
3. **Auditoría de Formularios:** Prueba manual del flujo de carrito y checkout, forzando errores en los inputs para validar la respuesta visual de Bootstrap.
4. **Testing de Patrones UX:** Documentar y verificar que los 3 patrones requeridos por el proyecto (y los adicionales propuestos) sean funcionales y evidentes.
