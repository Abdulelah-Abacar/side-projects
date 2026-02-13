# AI Resume Builder

A modern web application that helps users create professional resumes with AI assistance.

## Features

- **AI-Powered Resume Generation**: Utilizes Gemini 2.0 for intelligent content generation
- **Dynamic Resume Editor**: Real-time resume editing and preview
- **Authentication**: Secure user authentication via Clerk
- **Subscription Management**: Premium features with Stripe integration
- **Responsive Design**: Works seamlessly across all devices

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM
- **Authentication**: Clerk
- **Payments**: Stripe
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Forms**: React Hook Form & Zod

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Clerk account
- A Stripe account

### Installation

1. Clone the repository:

```sh
git https://github.com/Abdulelah-Abacar/ai-resume-builder.git
cd ai-resume-builder

npm install
# or
yarn install

cp .env.example .env

npm run dev
# or
yarn dev

src/
├── app/          # Next.js app router pages
├── assets/       # Static assets
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
└── lib/          # Utility functions
```
