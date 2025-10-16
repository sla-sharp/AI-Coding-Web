# AI Coding Web - Mini Games Collection

A React + TypeScript web application featuring a collection of classic mini games. Built with Vite for fast development and optimal performance.

## 🎮 Features

- **Landing Page**: Beautiful homepage with game showcase
- **Multiple Games**: 5 different mini games to choose from
- **Responsive Design**: Works on desktop and mobile devices
- **TypeScript**: Type-safe development
- **Modern UI**: Clean and intuitive user interface
- **React Router**: Smooth navigation between pages

## 🎯 Available Games

1. **Tic Tac Toe** - Classic 3x3 grid game
2. **Snake Game** - Control the snake to eat food and grow
3. **Memory Game** - Match pairs of cards
4. **Sliding Puzzle** - Rearrange tiles to complete the picture
5. **Quiz Game** - Test your knowledge with trivia questions

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd AI-Coding-Web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # Main layout component with navigation
│   └── Layout.css          # Layout styles
├── pages/
│   ├── Home.tsx            # Landing page
│   ├── Home.css            # Home page styles
│   └── games/
│       ├── TicTacToe.tsx   # Tic Tac Toe game
│       ├── Snake.tsx       # Snake game
│       ├── Memory.tsx      # Memory game
│       ├── Puzzle.tsx      # Sliding puzzle game
│       ├── Quiz.tsx        # Quiz game
│       └── GamePage.css    # Shared game page styles
├── App.tsx                 # Main app component with routing
├── main.tsx               # Entry point
└── index.css              # Global styles
```

## 🛠 Built With

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **CSS3** - Styling with modern features

## 📱 Responsive Design

The application is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 Features

- **Dark Theme**: Modern dark theme throughout the app
- **Gradient Backgrounds**: Beautiful gradient effects
- **Hover Effects**: Interactive hover states
- **Mobile Navigation**: Responsive navigation menu
- **Game Cards**: Interactive game selection cards

## 🔄 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Games

To add a new game:

1. Create a new component in `src/pages/games/`
2. Add the route in `App.tsx`
3. Add the game to the games array in `Home.tsx`
4. Style your game using the existing `GamePage.css` classes

## 🚧 Current Status

This is the initial project structure with dummy game pages. Each game page contains:
- Navigation back to home
- Game area placeholder
- Instructions panel
- Score/status display
- Responsive layout

The actual game logic needs to be implemented for each game.

## 🔮 Future Enhancements

- Implement actual game logic for each mini game
- Add sound effects and animations
- Save high scores locally
- Add multiplayer functionality
- Create more games
- Add difficulty levels
- Implement achievements system

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new games
- Improve existing games
- Enhance the UI/UX
- Fix bugs
- Add new features

---

Built with ❤️ using React and TypeScript