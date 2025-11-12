# blackjackThing - A Blackjack Game

A full-stack traditional casino-style Blackjack game with Rails API backend and React frontend.

https://github.com/user-attachments/assets/d9610986-9ceb-46c9-aeec-853d5f9770a8

## Features

- Authentic Blackjack gameplay with proper rules (dealer hits to 17, hidden dealer card, etc.)
- Betting system with balance tracking
- Session profit/loss tracking
- Real-time validation and error handling
- 50+ FE tests

## Tech Stack

**Backend:** Rails 8.1.1 (API mode), SQLite
**Frontend:** React 19.2.0, Bootstrap 5, Jest/React Testing Library

## Setup

### Prerequisites
- Ruby 3.x+, Rails 8.1.1+
- Node.js 14+, npm 6+

### Installation

```bash
# Clone repo
git clone <your-repo-url>
cd BlackjackThing

# Backend setup
cd backend
bundle install
rails db:migrate

# Frontend setup
cd ../frontend
npm install
```

### Running the App

**Terminal 1 (Backend):**
```bash
cd backend
rails server
# Runs on http://localhost:3000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
# Opens browser at http://localhost:3001
```

## Testing

```bash
cd frontend
npm test
```

## How It Works

### Backend (Rails)
- **Models:** `Game`, `Hand`, `Deck`, `Card` - all game logic lives here
- **Controller:** `GamesController` - thin layer, just handles HTTP
- **Pattern:** Fat Models / Skinny Controller (business logic in models)

### Frontend (React)
- **App.js** - Main component, owns all state
- **Components:** `Card`, `Hand`, `BettingForm`, `GameControls`, `SessionStats`, `BalanceDisplay`
- **State:** React Hooks (`useState`), props passed down, callbacks passed up

### Data Flow Example
```
User clicks "Hit"
  --> GameControls calls onHit callback
  --> App.handleHit() makes API call
  --> Rails: GamesController#hit --> Game#hit --> draws card, checks bust
  --> JSON response back to frontend
  --> App updates state
  --> React re-renders with new card
```

## API Endpoints

**Base URL:** `http://localhost:3000`

- `POST /games` - Create new game
- `POST /games/:id/hit` - Draw card
- `POST /games/:id/stand` - End turn, dealer plays
- `GET /games/:id` - Get game state

## Project Structure

```
BlackjackThing/
|-- backend/
|   |-- app/
|   |   |-- controllers/games_controller.rb
|   |   |-- models/
|   |       |-- game.rb
|   |       |-- hand.rb
|   |       |-- deck.rb
|   |       |-- card.rb
|   |-- config/routes.rb
|   |-- db/migrate/
|
|-- frontend/
    |-- src/
        |-- components/
        |   |-- BettingForm.js
        |   |-- Card.js
        |   |-- Hand.js
        |   |-- GameControls.js
        |   |-- SessionStats.js
        |   |-- BalanceDisplay.js
        |-- App.js
        |-- api.js
        |-- App.test.js
```

## App Design Decisions

**Rails API + React:**
Separates game logic (backend) from UI (frontend). Backend prevents cheating, frontend focuses on UX.

**Why this component structure?**
`Hand` component is reusable for dealer, player, or future multiplayer. Each component has one job, making testing easier.

**BE - Fat Model / Skinny Controller convention:**
Rails best practice - game logic belongs in models, not controllers. Makes testing easier and code more maintainable.

## What I'd Add Next

- Double Down feature
- Handle edge case: insufficient balance (< $5)
- Backend tests (RSpec)
- Split pairs
- Game history

## Common Issues

**CORS errors?** Restart Rails server after changing `config/initializers/cors.rb`
**Port in use?** Kill process: `lsof -ti:3000 | xargs kill -9`
**Tests failing?** Backend returns decimals as strings - wrap in `Number()` before `.toFixed()`

---

Built as a portfolio project to demonstrate full-stack development with Rails and React.
