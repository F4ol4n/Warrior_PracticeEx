import { ConnectButton } from '@mysten/dapp-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import './Navbar.css';

export function Navbar() {
  const account = useCurrentAccount();

  // Log connection status for debugging
  if (account) {
    console.log('Wallet Connected:', account.address);
  } else {
    console.log('Wallet Not Connected - Click ConnectButton to connect');
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <h1>⚔️ SUI WARRIOR</h1>
        </div>
        <div className="navbar-actions">
          <div className="wallet-container">
            <ConnectButton />
            {account && (
              <div className="wallet-status">
                <span className="connected-badge">✓ Connected</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
