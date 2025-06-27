# Alpine Trails 🏔️

A modern, responsive hiking and mountaineering blog built with Next.js, featuring trail guides, hiking stories, and outdoor inspiration.


## 🔗 Links

- [Live Demo](https://hiking-trails-blog-ia86.vercel.app/)

## ✨ Features

- **Responsive Design**: Beautiful, mobile-first design that works on all devices
- **Dark/Light Mode**: Automatic theme switching based on user preference with manual toggle
- **Interactive Blog**: Searchable and filterable blog posts about hiking and mountaineering
- **Trail Guides**: Curated collection of trail guides with difficulty ratings and detailed information
- **Contact Form**: Functional contact form with validation and success notifications
- **Modern UI**: Clean, minimalist design with smooth animations and transitions
- **Performance Optimized**: Built with Next.js 15 and React 19 for optimal performance

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Frontend**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Typography**: [Google Fonts (Lora)](https://fonts.google.com/specimen/Lora)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/alpine-trails.git
   cd alpine-trails
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 📁 Project Structure

```
alpine-trails/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── components/            # Reusable React components
│   ├── BlogList.tsx       # Blog posts listing
│   ├── ContactForm.tsx    # Contact form component
│   ├── MobileMenu.tsx     # Mobile navigation menu
│   ├── ThemeToggle.tsx    # Dark/light mode toggle
│   └── TrailCard.tsx      # Trail guide cards
├── data/                  # Static data files
│   ├── blogPosts.ts       # Blog posts content
│   └── trailGuides.ts     # Trail guides data
├── types/                 # TypeScript type definitions
│   └── index.ts           # Shared interfaces and types
├── public/                # Static assets
└── ...config files
```

## 🎯 Key Features

### Blog System

- **Search Functionality**: Search through blog posts by title, content, or excerpt
- **Topic Filtering**: Filter posts by categories (Long Distance, Gear, Mindfulness, Beginners)
- **Responsive Cards**: Beautiful blog post cards with hover effects
- **Reading Time**: Estimated reading time for each post

### Trail Guides

- **Curated Selection**: Hand-picked trail guides for different skill levels
- **Detailed Information**: Distance, elevation gain, difficulty ratings
- **Visual Appeal**: High-quality trail imagery
- **Difficulty Levels**: Beginner, Moderate, and Advanced classifications

### User Experience

- **Smooth Navigation**: Animated scroll-to-section navigation
- **Mobile-First**: Responsive design with dedicated mobile menu
- **Theme Persistence**: User theme preference saved to localStorage
- **Form Validation**: Client-side validation for contact form
- **Toast Notifications**: User feedback for form submissions

## 🎨 Design Philosophy

Alpine Trails embraces a clean, minimalist design that reflects the simplicity and beauty of nature. The application uses:

- **Natural Color Palette**: Earth tones and mountain-inspired colors
- **Typography**: Lora font for a warm, readable experience
- **Whitespace**: Generous spacing for improved readability
- **Photography**: High-quality nature photography for visual impact
- **Animations**: Subtle hover effects and smooth transitions

## 🔧 Customization

### Adding New Blog Posts

Add new blog posts to `data/blogPosts.ts`:

```typescript
{
  id: 5,
  title: "Your New Post Title",
  topic: "Your Topic",
  readTime: "X min read",
  excerpt: "Brief description...",
  content: "Full post content..."
}
```

### Adding New Trail Guides

Add new trails to `data/trailGuides.ts`:

```typescript
{
  id: 4,
  name: "Trail Name",
  difficulty: "Moderate",
  distance: "X miles",
  elevation: "+X ft",
  description: "Trail description...",
  image: "image-url"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

- [Report Bug](https://github.com/yourusername/alpine-trails/issues)
- [Request Feature](https://github.com/yourusername/alpine-trails/issues)

## 🙏 Acknowledgments

- Trail photography from [Unsplash](https://unsplash.com/)
- Icons by [Lucide](https://lucide.dev/)
- Inspiration from the hiking and outdoor community

---

**Built with ❤️ for the hiking community**
