# Warrior Practice Exercise

A blockchain-based game built on the Sui network that demonstrates smart contract development and frontend integration. Players can create warrior NFTs, train them to gain experience and level up, utilizing Move smart contracts for on-chain game logic.

## Overview

Warrior Practice Exercise is a full-stack Web3 application showcasing:
- **Smart Contract Layer**: Move-based game mechanics with warrior creation, training, and progression systems
- **Frontend Layer**: Modern React/TypeScript interface for seamless user interaction
- **Blockchain Integration**: Leverages the Sui network for decentralized ownership and transparent game state

## Features

### Core Gameplay
- **Warrior Creation**: Mint new Level 1 warrior NFTs with experience tracking
- **Training System**: Gain experience points through training actions
- **Progression Mechanics**: Automatic level advancement upon reaching 100 experience points
- **NFT Ownership**: Warriors are true on-chain NFTs with persistent ownership

### Technical Highlights
- **Move Smart Contracts**: Implements game logic in Move, Sui's native language
- **Reactive Frontend**: Built with React 19 and TypeScript for responsive user experience
- **Web3 Integration**: Uses Sui dApp Kit for wallet connection and transaction management
- **Type Safety**: End-to-end TypeScript implementation ensuring reliability

## Project Structure

```
Warrior_PracticeEx/
├── PracticeExercise/          # Smart contract (Move) module
│   ├── sources/
│   │   └── practiceexercise.move    # Core game logic
│   ├── tests/
│   │   └── practiceexercise_tests.move
│   └── Move.toml
├── Warrir_frontend/            # React frontend application
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── GameArena.tsx
│   │   │   ├── LandingPage.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── WarriorCard.tsx
│   │   │   └── Providers.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── README.md
```

## Smart Contract Details

### Warrior Structure
```move
public struct Warrior has key, store {
    id: sui::object::UID,
    level: u8,
    exp: u64
}
```

### Key Functions
- **`new(ctx)`**: Creates a new Level 1 warrior with 0 experience
- **`train(w)`**: Adds 10 experience points; automatically advances level when experience reaches 100

## Getting Started

### Prerequisites
- [Sui CLI](https://docs.sui.io/guides/developer/getting-started/sui-install) installed
- Node.js 18+ and npm/yarn
- A Sui wallet (e.g., Sui Wallet extension)

### Installation

#### Backend Setup
```bash
cd PracticeExercise
sui move build
```

#### Frontend Setup
```bash
cd Warrir_frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`

### Building for Production
```bash
cd Warrir_frontend
npm run build
```

## Technology Stack

### Backend
- **Move**: Smart contract language for Sui
- **Sui Framework**: On-chain game state management

### Frontend
- **React 19**: User interface framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **@mysten/dapp-kit**: Sui dApp integration
- **@mysten/sui**: Sui SDK
- **TanStack React Query**: Data fetching and caching

## Game Mechanics

1. **Warrior Creation**: Users invoke the `new` function to mint a personal warrior NFT
2. **Training**: Warriors can be trained by calling the `train` function, which:
   - Increases experience by 10 points
   - Triggers level advancement when experience reaches 100
   - Resets experience to 0 upon leveling
3. **Progression**: Warriors can continue training to reach higher levels indefinitely

## Development

### Running Tests
```bash
cd PracticeExercise
sui move test
```

### Linting Frontend
```bash
cd Warrir_frontend
npm run lint
```

### Project Structure Notes
- All frontend types are defined in TypeScript for consistency
- Smart contracts follow Sui Move best practices
- Components are modularized for maintainability

## Contributing

When contributing to this project:
1. Ensure Move code follows Sui documentation standards
2. Maintain TypeScript strict mode compliance
3. Test all contract changes before submission
4. Update component styling in corresponding `.css` files

## Licensing

This project is provided as an educational example for Sui development.

## Resources

- [Sui Documentation](https://docs.sui.io)
- [Move Language Guide](https://move-language.github.io)
- [React Documentation](https://react.dev)
- [dApp Kit Reference](https://sdk.mystenlabs.com/dapp-kit)

## Acknowledgments

Built as part of Sui Hacker's practice exercises, demonstrating practical blockchain game development with Move and modern Web3 frontend technologies.