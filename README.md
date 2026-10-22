# Transportes San Roque - Control de viajes

Proyecto de portafolio (cliente ficticio). Son 2 pantallas de una app web para una empresa de transporte.

## El problema

Transportes San Roque llevaba el control de los viajes en planillas de papel que completaban los choferes. Las planillas se perdían o llegaban días tarde a la oficina, y el encargado no sabía a tiempo cuántos km hacía cada camión ni si alguno había tenido un problema mecánico.

Necesitaban algo simple que los choferes puedan usar desde el celular, aunque no tengan señal en la ruta, y que el encargado pueda ver todo junto en un solo lugar.

## La solución

- **Cargar viaje (`index.html`)**: el chofer elige su nombre y el camión, carga origen, destino, km y combustible, y si hubo algún problema lo describe. Los datos se guardan en el celular, así funciona sin internet.
- **Panel (`panel.html`)**: el encargado ve el total de viajes, los km recorridos y qué camiones tuvieron problemas (marcados en rojo). Puede filtrar por camión.

## Tecnologías

HTML, CSS y JavaScript. Los datos se guardan con localStorage. En una versión completa se sincronizarían con una base de datos (Supabase) cuando vuelve la conexión.

## Cómo verlo

Abrir `index.html` en el navegador, o entrar a la versión publicada con GitHub Pages.
