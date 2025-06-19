# Interpolación de Newton (React + TypeScript + Vite)

Esta **aplicación web** interactiva implementa el **método de interpolación de Newton** para la asignatura de Métodos Numéricos de Ingeniería de Software.

## Características

- Añadir y eliminar puntos 
- Generación automática de la **ecuación polinómica** en forma estándar (coeficientes agrupados y redondeados) y renderizada en **LaTeX** con _react-katex_.
- Visualización de:
  - Puntos originales (azul).
  - Curva de interpolación (línea roja robusta).
  - Punto evaluado opcional (triángulo verde).
- Gráfica interactiva usando **Chart.js** y **react-chartjs-2**.
- Diseño responsivo y moderno con **Tailwind CSS**.

## Estructura del proyecto

```
src/
├─ components/       # Componentes React en español
├─ utils/            # Funciones matemáticas (diferencias divididas y evaluación)
├─ types.ts          # Tipos comunes (Punto, PuntoNuevo)
├─ InterpolationApp.tsx # Componente principal refactorizado
├─ assets/           # Imágenes y recursos estáticos
└─ ...
```

## Tecnologías utilizadas

- React 18 + TypeScript
- Vite (bundler moderno)
- Tailwind CSS (estilos)
- Chart.js + react-chartjs-2 (gráficas)
- react-katex + KaTeX (renderizado de LaTeX)

## Instalación y ejecución

```bash
# Clonar el repositorio
git clone <url-del-proyecto>
cd interpolacion-newton

# Instalar dependencias
npm install

# Levantar servidor de desarrollo
npm run dev

# Generar versión de producción
npm run build
``` 

Al ejecutar, abre tu navegador en http://localhost:5173 para interactuar con la aplicación.

## Uso

1. **Añadir puntos** ingresando coordenadas X e Y y pulsando "Añadir punto".
2. La **ecuación** de interpolación aparece automáticamente.
3. Introducir un valor de X en el campo de evaluación y pulsar "Calcular" para obtener el valor P(x) y visualizarlo en la gráfica.
4. Eliminar puntos con el botón "✕" en la lista de puntos actuales.

## Créditos

Desarrollado para la clase de Métodos Numéricos de Software en junio de 2025.

---

*Repositorio de ejemplo para prácticas de interpolación polinómica.*
