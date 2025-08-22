# SmartsPicks - Amazon Affiliate Website

A modern website for Amazon affiliates, built with Next.js 13+ and Tailwind CSS. The platform offers product reviews, blog and an optimized shopping experience.

## 🚀 Features

- **Responsive Design** - Optimized for all devices
- **Next.js 13+ App Router** - Uses the latest features
- **Tailwind CSS** - Modern and efficient styling
- **TypeScript** - Type safety for robust development
- **SEO Optimized** - Meta tags and structure optimized for search engines
- **Integrated Blog** - Blog system for content marketing
- **Product Categories** - Intuitive product organization
- **Filtering System** - Advanced search and filtering
- **Interactive Cards** - Components for product display
- **Newsletter** - Newsletter subscription system
- **Contact Form** - Functional contact form

## 📁 Project Structure

```
amazon-affiliate-site/
│
├── public/                      # Static files
│   ├── images/                  # Site images
│   └── favicon.ico              # Favicon
│
├── src/
│   ├── app/                     # Next.js 13+ App Router
│   │   ├── layout.tsx           # Global layout
│   │   ├── page.tsx             # Main page
│   │   ├── globals.css          # Global styles
│   │   ├── blog/                # Blog pages
│   │   ├── categories/          # Category pages
│   │   ├── about/               # About page
│   │   └── contact/             # Contact page
│   │
│   ├── components/              # Reusable components
│   │   ├── ui/                  # Basic UI components
│   │   ├── Header.tsx           # Header with navigation
│   │   ├── Footer.tsx           # Footer with links
│   │   ├── BlogCard.tsx         # Card for articles
│   │   ├── CategoryMenu.tsx     # Categories menu
│   │   └── Pagination.tsx       # Pagination component
│   │
│   ├── data/                    # Mock data
│   │   ├── categories.ts        # Categories list
│   │   └── products.ts          # Products and blog articles
│   │
│   └── types/                   # TypeScript types
│       └── index.d.ts           # Type definitions
│
├── tailwind.config.js           # Tailwind configuration
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## 🛠️ Installation and Setup

### 1. Clone the repository
```bash
git clone https://github.com/username/amazon-affiliate-site.git
cd amazon-affiliate-site
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure environment variables
Create a `.env.local` file and add:
```env
# Amazon API Keys (optional for start)
AMAZON_ACCESS_KEY=your_access_key
AMAZON_SECRET_KEY=your_secret_key
AMAZON_ASSOCIATE_TAG=your_associate_tag

# Email configuration (for contact form)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
```

### 4. Run the development server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Available Pages

- **Homepage** (`/`) - Main page with featured products
- **Categories** (`/categories`) - List of all categories
- **Individual Category** (`/categories/[slug]`) - Products from a category
- **Blog** (`/blog`) - List of blog articles
- **Individual Article** (`/blog/[slug]`) - Complete article
- **About Us** (`/about`) - Information about the site
- **Contact** (`/contact`) - Contact form

## 🎨 Customization

### Colors and Theme
Modify colors in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Define primary colors
      }
    }
  }
}
```

### Logo and Branding
- Replace the logo in the `Header.tsx` component
- Update the favicon in the `public/` folder
- Modify the site name in `layout.tsx`

### Products and Content
- Add your products to `src/data/products.ts`
- Modify categories in `src/data/categories.ts`
- Update blog articles in the same file

## 🔧 Main Features

### UI Components
- **Button** - Customizable buttons with multiple variants
- **CardProduct** - Card for displaying products with rating and price
- **BlogCard** - Card for blog articles
- **Pagination** - Pagination system for long lists

### Filtering System
- Filter by price
- Filter by rating
- Sort by popularity, price, rating
- Real-time search

### SEO Optimized
- Meta tags for each page
- Open Graph tags for social sharing
- Structured data for products
- Auto-generated sitemap

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Local Build
```bash
npm run build
npm start
```

## 📈 Recommended Integrations

### Amazon API
For real products, integrate Amazon Product Advertising API:
- Create an Amazon Associates account
- Get access keys
- Implement product fetching in `src/lib/amazonApi.ts`

### Analytics
- Google Analytics 4
- Google Tag Manager
- Facebook Pixel

### Newsletter
- Mailchimp
- ConvertKit
- EmailJS

### CMS (Optional)
- Strapi
- Contentful
- Sanity

## 🛡️ Security

- All external links have `rel="noopener noreferrer"`
- Client and server validation for forms
- Input sanitization
- Rate limiting for API calls

## 📝 License

This project is licensed under MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributions

Contributions are welcome! Please:
1. Fork the repository
2. Create a branch for your feature
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Contact us at smartspicks@gmail.com
- Complete documentation: [docs.smartspicks.com](https://docs.smartspicks.com)

---

**SmartsPicks** - The best Amazon product recommendations 🛒