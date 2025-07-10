# QueueEase Frontend

A modern, responsive frontend for QueueEase - a smart queue and appointment management system built with React, Vite, and TailwindCSS.

## Features

- **Queue Management**: Add users to queue, view live queue, update status, remove users
- **Admin Dashboard**: Login system with JWT authentication, view analytics and feedback
- **Feedback System**: Public feedback form and admin view of all feedback
- **Analytics**: Real-time statistics showing served, skipped, and waiting counts
- **Responsive Design**: Mobile-friendly interface with modern UI components
- **Real-time Updates**: Refresh functionality to keep data current

## Tech Stack

- **React 18** - Modern React with functional components and hooks
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- QueueEase backend API running on `http://localhost:5000`

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd queueease-frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

\`\`\`bash
npm run build
\`\`\`

The built files will be in the `dist` directory.

## Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   ├── auth/           # Authentication components
│   ├── feedback/       # Feedback-related components
│   ├── layout/         # Layout components (Navbar, etc.)
│   ├── queue/          # Queue management components
│   └── ui/             # Generic UI components
├── contexts/           # React contexts (Auth)
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API service layer
├── App.jsx             # Main App component
├── main.jsx            # Entry point
└── index.css           # Global styles
\`\`\`

## API Integration

The frontend connects to the QueueEase backend API with the following endpoints:

- `POST /api/queue` - Add user to queue
- `GET /api/queue` - Get all queue entries
- `PATCH /api/queue/:id` - Update queue entry status
- `DELETE /api/queue/:id` - Remove queue entry
- `POST /api/admin/login` - Admin login
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback` - Get all feedback
- `GET /api/stats` - Get queue statistics

## Features Overview

### Queue Management
- Add new users with name, phone, and optional remarks
- View live queue with position numbers
- Update user status (waiting, served, skipped)
- Remove users from queue
- Real-time queue statistics

### Admin Dashboard
- Secure login with JWT authentication
- View queue statistics (waiting, served, skipped, total)
- Monitor customer feedback
- Refresh data in real-time

### Feedback System
- Public feedback form with star ratings
- Optional comments
- Admin view of all feedback entries
- Chronological display with timestamps

### UI/UX Features
- Responsive design for all screen sizes
- Loading states and error handling
- Toast notifications for user actions
- Confirmation dialogs for destructive actions
- Modern card-based layout
- Status badges with color coding
- Smooth animations and transitions

## Configuration

### API Base URL
Update the API base URL in `src/services/api.js`:

\`\`\`javascript
const API_BASE_URL = 'http://localhost:5000/api'
\`\`\`

### Styling
The app uses TailwindCSS with custom color schemes and components. Modify `tailwind.config.js` and `src/index.css` to customize the design.

## Admin Credentials

Default admin credentials for testing:
- Username: `admin`
- Password: `password123`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
