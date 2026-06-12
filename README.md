# BlueBlooded
An app used to consolidate Ryan Hammer content, such as the BlueBlooded podcast, short form content, and relevant statistics.


## Project Overview

## Tech Stack
Frontend: React Native + Expo (TypeScript)  
Backend: FastAPI  
Database: Supabase (PostgreSQL + Auth + Storage)

## Getting Started 

## Architecture Decisions

## Current Features
- Auth (Register, Login)
- Discussion Board
  - Create Post
  - See other users posts
## Project Structure
```
blueblooded/
├── app/              # Expo Router screens and navigation
├── assets/           # Fonts, images, and static files
├── components/       # Reusable UI components
├── constants/        # App-wide constants (colors, categories, etc.)
├── context/          # React context providers
├── hooks/            # Custom hooks (useAuth, useCommunity, etc.)
├── services/         # Supabase client and API service functions
├── store/            # Global state stores
├── types/            # TypeScript type definitions
├── utils/            # Helper functions
└── __tests__/        # Unit tests
```

## Environment Variables
