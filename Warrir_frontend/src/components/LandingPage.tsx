import './LandingPage.css';

interface LandingPageProps {
  onSummon: () => void;
  isLoading?: boolean;
}

export function LandingPage({ onSummon, isLoading }: LandingPageProps) {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="landing-card">
          <h1 className="landing-title">WELCOME TO SUI ARENA</h1>

          <p className="landing-subtitle">
            Build your on-chain legacy.
          </p>
          <p className="landing-subtitle">
            Train hard. Level up.
          </p>

          <button
            className="summon-button"
            onClick={onSummon}
            disabled={isLoading}
          >
            {isLoading ? 'SUMMONING...' : 'SUMMON WARRIOR (MINT)'}
          </button>

          <div className="landing-info">
            <span className="info-icon">ⓘ</span>
            <span>Requires Sui Testnet tokens to play</span>
          </div>
        </div>
      </div>
    </div>
  );
}
