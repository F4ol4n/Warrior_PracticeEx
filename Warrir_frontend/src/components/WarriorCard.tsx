import './WarriorCard.css';

interface WarriorCardProps {
  level: number;
  xp: number;
  objectId: string;
  onTrain: () => void;
  isLoading?: boolean;
}

export function WarriorCard({ level, xp, objectId, onTrain, isLoading }: WarriorCardProps) {
  const xpPercentage = Math.min((xp / 100) * 100, 100);
  const shortId = `${objectId.slice(0, 6)}...${objectId.slice(-4)}`;

  return (
    <div className="warrior-card-container">
      <div className="warrior-card">
        <div className="warrior-card-header">
          <h2>YOUR WARRIOR</h2>
        </div>

        <div className="warrior-card-content">
          <div className="warrior-avatar">
            <span className="avatar-icon">⚔️</span>
          </div>

          <div className="warrior-stats">
            <div className="stat-row">
              <span className="stat-label">ID:</span>
              <code className="stat-value">{shortId}</code>
            </div>

            <div className="stat-row level-row">
              <span className="stat-label">LEVEL</span>
              <span className="level-value">{level}</span>
            </div>

            <div className="xp-section">
              <div className="xp-header">
                <span className="xp-label">CURRENT XP</span>
                <span className="xp-text">{xp} / 100</span>
              </div>
              <div className="xp-bar-container">
                <div className="xp-bar-fill" style={{ width: `${xpPercentage}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="warrior-card-footer">
          <button
            className="train-button"
            onClick={onTrain}
            disabled={isLoading}
          >
            {isLoading ? 'TRAINING...' : 'TRAIN HARD (+10 XP)'}
          </button>
          <span className="gas-info">Gas: ~0.002 SUI</span>
        </div>
      </div>
    </div>
  );
}
