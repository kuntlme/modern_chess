# ♟️ Modern Chess

A full-stack, real-time multiplayer chess application built with **Next.js**, **React 19**, **Tailwind CSS v4**, and **Node.js WebSockets**.

![Dashboard / Landing Page](./screenshots/dashboard.png)

---

## 🌟 Features

- **Real-time Multiplayer:** Play chess seamlessly in real-time powered by custom WebSocket Server.
- **Modern UI/UX:** Responsive, aesthetic design using Tailwind CSS, Radix UI, and Framer Motion.
- **Authentication:** Secure user login via Google and GitHub with NextAuth (v5).
- **Matchmaking & Invites:** Form lobbies or invite friends with dynamically generated links.
- **Dashboard & Analytics:** View your recent game history, ratings, and stats on the interactive dashboard.
- **Presence Tracking:** See who's online right now directly from the client based on global WebSocket actions.
- **Monorepo Architecture:** Robust and scalable build setup powered by Turborepo.

---

## 📸 Screenshots

|                 Game Board                  |                Profile & Analytics                |
| :-----------------------------------------: | :-----------------------------------------------: |
| ![Game Board](./screenshots/game_board.png) | ![Profile & Analytics](./screenshots/profile.png) |

|                Friends & Presence                |                Settings                 |
| :----------------------------------------------: | :-------------------------------------: |
| ![Friends & Presence](./screenshots/friends.png) | ![Settings](./screenshots/settings.png) |

---

## 🛠️ Tech Stack

### Frontend (`apps/client`)

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **UI & Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/)
- **Chess Logic:** `chess.js` & `react-chessboard`
- **Animations:** Framer Motion (`motion`)
- **State & Data Fetching:** React Hook Form, Zod

### Backend (`apps/ws_server` & API Routes)

- **WebSockets:** [ws](https://github.com/websockets/ws) for low-latency game communication
- **Auth:** [NextAuth.js](https://next-auth.js.org/) @ 5.0.0-beta
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/) (`packages/prisma`)

### Tooling

- **Monorepo:** [Turborepo](https://turbo.build/)
- **Package Manager:** `pnpm`
- **Linting & Formatting:** ESLint, Prettier, Husky, Lint-staged

---

## 📁 Project Structure

This project uses Turborepo and contains the following packages and applications:

- `apps/client`: The main Next.js web application.
- `apps/ws_server`: The dedicated Node.js WebSocket server for chess matchmaking and gameplay.
- `packages/prisma`: Shared Prisma ORM client and database schema.
- `packages/ui`: Shared React components and design system (if applicable).
- `packages/eslint-config`: Shared ESLint configurations.
- `packages/typescript-config`: Shared `tsconfig.json`s.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**: >= 20.19.0
- **pnpm**: >= 9.15.0
- **PostgreSQL**: A running instance or cloud database URL.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/modern_chess.git
   cd modern_chess
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up Environment Variables:**
   Rename or create `.env` files in both `apps/client` and `packages/prisma` (if applicable) and paste the required keys.

   **Example `.env` in `apps/client`:**

   ```env
   NEXT_PUBLIC_WS_URL=ws://localhost:8080
   DATABASE_URL=postgresql://user:password@localhost:5432/modern_chess

   # NextAuth Setup
   AUTH_SECRET=your_auth_secret_here
   NEXT_PUBLIC_WEBSITE_URL=localhost:3000

   # OAuth Providers
   GOOGLE_CLIENT_ID=your_google_id
   GOOGLE_CLIENT_SECRET=your_google_secret
   AUTH_GITHUB_ID=your_github_id
   AUTH_GITHUB_SECRET=your_github_secret

   WS_SECRET=your_ws_secret_here
   ```

4. **Initialize Database:**
   Push the schema to your PostgreSQL database.

   ```bash
   cd packages/prisma
   npx prisma db push
   # and generate the client
   npx prisma generate
   ```

5. **Start the Development Servers:**
   From the root of the project, run the turbo dev script. This will start both the Next.js client and the WebSocket server concurrently.

   ```bash
   pnpm run dev
   ```

6. **Open the Application:**
   Visit `http://localhost:3000` in your browser.

---

## 🤝 Contributing

Contributions are always welcome! Please follow these steps:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is open-source.
