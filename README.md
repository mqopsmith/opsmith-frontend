# OpSmith Frontend

A clean, modern frontend for the OpSmith Platform - AI-powered operations intelligence.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## 🔗 Backend Connection

This frontend connects to the OpSmith backend API at:
- **Production:** https://api.opsmith.biz
- **Development:** http://localhost:3001

## 🛠 Technology Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **TypeScript:** Full type safety

## 📁 Project Structure

```
src/
  app/                 # Next.js App Router
    layout.tsx        # Root layout
    page.tsx          # Homepage
    globals.css       # Global styles
  components/          # React components
    ui/               # Reusable UI components
  lib/                # Utility functions
```

## 🔧 Configuration

Create a `.env.local` file:

```env
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key
OPSMITH_API_URL=https://api.opsmith.biz
```

## 🚀 Deployment

This frontend is optimized for deployment on Vercel, Netlify, or any platform supporting Next.js.

## 📞 Backend API

The frontend automatically connects to your live backend at `api.opsmith.biz` for:
- Authentication
- Data analytics
- File processing
- AI-powered insights

---

**Note:** This is a clean repository without the file conflicts that prevented deployment in the main repository.