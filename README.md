# FactuPulse — Frontend

**FactuPulse** es una aplicación web para gestión de ventas, empleados, stock y
facturación. Este repositorio contiene el frontend desarrollado en **Next.js**,
diseñado con enfoque modular, alto rendimiento e integración con un backend en
NestJS.

---

## 🚀 Stack Tecnológico

- **Next.js** (App Router)
- **React** + **TypeScript**
- **Tailwind CSS** (diseño responsive)
- **Ant Design** (componentes UI)
- **Zustand** (manejo de estado global)
- **React Query** (data fetching y cacheo)
- **Zod** (validación de formularios)

---

## 📁 Estructura del Proyecto

```bash
factupulse-frontend/
├── app/                # Rutas de la app (Next.js App Router)
├── components/         # Componentes reutilizables
├── public/             # Imágenes y archivos estáticos
├── src/                # Hooks, stores, tipos y lógica compartida
│   ├── hooks/
│   ├── stores/
│   ├── types/
│   └── lib/            # Funciones auxiliares
├── styles/             # Archivos de estilos globales
├── utils/              # Helpers reutilizables
├── .env.example        # Variables de entorno
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── README.md
```

