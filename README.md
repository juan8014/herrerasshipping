# Herrera's Shipping - Sitio Web

![Herrera's Shipping Logo](/public/images/logo.png)

## 📋 Descripción

Sitio web oficial para Herrera's Shipping, una empresa dedicada a envíos de paquetes desde Estados Unidos hacia El Salvador. El sitio está diseñado para proporcionar información sobre los servicios ofrecidos, facilitar el contacto con la empresa y transmitir los valores de la marca.


## ✨ Características principales

- **Diseño responsivo**: Optimizado para dispositivos desde 200px en adelante
- **Multilingüe**: Soporte completo para español e inglés
- **Formulario de contacto**: Formulario multi-paso con validación
- **Animaciones**: Efectos visuales con Framer Motion
- **Accesibilidad**: Implementación de prácticas de accesibilidad web
- **Optimización SEO**: Metadatos y estructura optimizada para motores de búsqueda

## 🛠️ Tecnologías utilizadas

- **Next.js 14**: Framework de React con App Router
- **TypeScript**: Tipado estático para mayor robustez
- **Tailwind CSS**: Framework de utilidades CSS
- **Framer Motion**: Biblioteca para animaciones
- **Shadcn/UI**: Componentes de UI reutilizables
- **Lucide React**: Iconos vectoriales

## 🗂️ Estructura del proyecto

\`\`\`
herreras-shipping/
├── app/                    # Directorio principal de Next.js App Router
│   ├── layout.tsx          # Layout principal con proveedores
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globales
├── components/             # Componentes reutilizables
│   ├── forms/              # Componentes relacionados con formularios
│   ├── sections/           # Secciones principales del sitio
│   └── ui/                 # Componentes de interfaz de usuario
├── hooks/                  # Hooks personalizados
├── lib/                    # Utilidades y constantes
├── public/                 # Archivos estáticos
│   └── images/             # Imágenes del sitio
├── types/                  # Definiciones de tipos TypeScript
└── README.md               # Documentación del proyecto
\`\`\`

## 📋 Requisitos previos

- Node.js 18.0.0 o superior
- npm o yarn

## 🚀 Instalación

1. Clona el repositorio:
   \`\`\`bash
   git clone https://github.com/tu-usuario/herreras-shipping.git
   cd herreras-shipping
   \`\`\`

2. Instala las dependencias:
   \`\`\`bash
   npm install
   # o
   yarn install
   \`\`\`

3. Inicia el servidor de desarrollo:
   \`\`\`bash
   npm run dev
   # o
   yarn dev
   \`\`\`

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el sitio.

## 🔧 Configuración

### Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

\`\`\`
NEXT_PUBLIC_SITE_URL=https://www.herrerasshipping.com
\`\`\`

### Personalización

- Los colores principales se pueden modificar en `tailwind.config.ts`
- Las traducciones se encuentran en `lib/translations.ts`
- La información de contacto se puede actualizar en `lib/constants.ts`

## 📱 Secciones del sitio

### Header
Barra de navegación con logo, enlaces a secciones y selector de idioma. Se vuelve transparente al hacer scroll.

### Hero
Sección principal con título, subtítulo y llamadas a la acción. Incluye una ilustración animada.

### Misión y Visión
Presenta la misión y visión de la empresa en tarjetas con iconos y efectos hover.

### Valores
Muestra los valores corporativos en tarjetas organizadas en dos filas con iconos y emojis.

### Servicios
Describe los servicios ofrecidos por la empresa en tarjetas con iconos y gradientes.

### Contacto
Formulario multi-paso con validación e información de contacto de la empresa.

### Footer
Pie de página con iconos de redes sociales y copyright.

## 🧪 Testing

Para ejecutar las pruebas:

\`\`\`bash
npm run test
# o
yarn test
\`\`\`

## 📦 Construcción para producción

Para construir el proyecto para producción:

\`\`\`bash
npm run build
# o
yarn build
\`\`\`

Para iniciar la versión de producción:

\`\`\`bash
npm run start
# o
yarn start
\`\`\`

## 🔍 Optimización

El proyecto incluye:

- Optimización de imágenes con Next.js Image
- Carga diferida de componentes
- Minificación de CSS y JS
- Prefetching de rutas

## 🤝 Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📝 Convenciones de código

- Utiliza nombres de componentes en PascalCase
- Utiliza nombres de archivos en kebab-case
- Sigue las convenciones de ESLint y Prettier configuradas
- Escribe comentarios descriptivos para funciones y componentes
- Utiliza tipos TypeScript en lugar de interfaces cuando sea posible

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

Herrera's Shipping - [info@herrerasshipping.com](mailto:info@herrerasshipping.com)

Dirección: 6527 portlick dr, Katy TX 77449

Teléfono: +1 (832) 561-3488

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
