import { useEffect, useState } from 'react';
import { useCurrentAccount, useSuiClientQuery, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { WarriorCard } from './WarriorCard';
import { LandingPage } from './LandingPage';
import './GameArena.css';

// Constants
const PACKAGE_ID = '0x6e8530e32d8009e0ec30ec93e576e801e14fe46202ce0992133bd15803ae8871';
const MODULE_NAME = 'warrior_game';
const WARRIOR_TYPE = `${PACKAGE_ID}::${MODULE_NAME}::Warrior`;

interface WarriorData {
  objectId: string;
  level: number;
  exp: number;
}

export function GameArena() {
  const account = useCurrentAccount();
  const [warrior, setWarrior] = useState<WarriorData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  // Query owned objects to find warrior
  const { data: ownedObjects, refetch: refetchObjects } = useSuiClientQuery(
    'getOwnedObjects',
    {
      owner: account?.address || '',
      filter: {
        StructType: WARRIOR_TYPE,
      },
    },
    {
      enabled: !!account?.address,
    }
  );

  // Process owned objects to find warrior
  useEffect(() => {
    if (!ownedObjects?.data) return;

    const foundWarrior = ownedObjects.data[0];
    if (foundWarrior) {
      // For now, set default values. In a real app, you'd fetch the full object data
      setWarrior({
        objectId: foundWarrior.data?.objectId || '',
        level: 1,
        exp: 0,
      });
    } else {
      setWarrior(null);
    }
  }, [ownedObjects]);

  const handleSummonWarrior = async () => {
    if (!account?.address) return;

    setIsLoading(true);
    try {
      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::new`,
        arguments: [],
      });

      signAndExecuteTransaction(
        { transaction: tx },
        {
          onSuccess: (result: any) => {
            setHistory([`Warrior summoned! Digest: ${result.digest.slice(0, 8)}...`, ...history]);
            setTimeout(() => refetchObjects(), 1000);
          },
          onError: (error: any) => {
            console.error('Failed to summon warrior:', error);
            setHistory([`Failed to summon warrior: ${error.message}`, ...history]);
          },
          onSettled: () => {
            setIsLoading(false);
          },
        }
      );
    } catch (error) {
      console.error('Transaction error:', error);
      setIsLoading(false);
    }
  };

  const handleTrain = async () => {
    if (!warrior || !account?.address) return;

    setIsLoading(true);
    try {
      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::train`,
        arguments: [tx.object(warrior.objectId)],
      });

      signAndExecuteTransaction(
        { transaction: tx },
        {
          onSuccess: (result: any) => {
            const newXp = (warrior.exp + 10) % 100;
            const leveledUp = warrior.exp + 10 >= 100;

            if (leveledUp) {
              setWarrior({
                ...warrior,
                level: warrior.level + 1,
                exp: newXp,
              });
              setHistory([
                `🎉 Level Up! Now Level ${warrior.level + 1}. Digest: ${result.digest.slice(0, 8)}...`,
                `✨ You trained! XP increased to ${newXp}. Digest: ${result.digest.slice(0, 8)}...`,
                ...history,
              ]);
            } else {
              setWarrior({
                ...warrior,
                exp: newXp,
              });
              setHistory([
                `✨ You trained! XP increased to ${newXp}. Digest: ${result.digest.slice(0, 8)}...`,
                ...history,
              ]);
            }
          },
          onError: (error: any) => {
            console.error('Training failed:', error);
            setHistory([`❌ Training failed: ${error.message}`, ...history]);
          },
          onSettled: () => {
            setIsLoading(false);
          },
        }
      );
    } catch (error) {
      console.error('Transaction error:', error);
      setIsLoading(false);
    }
  };

  if (!account?.address) {
    return <LandingPage onSummon={handleSummonWarrior} isLoading={isLoading} />;
  }

  if (!warrior) {
    return <LandingPage onSummon={handleSummonWarrior} isLoading={isLoading} />;
  }

  return (
    <div className="game-arena">
      <WarriorCard
        level={warrior.level}
        xp={warrior.exp}
        objectId={warrior.objectId}
        onTrain={handleTrain}
        isLoading={isLoading}
      />

      {history.length > 0 && (
        <div className="history-section">
          <h3>BATTLE HISTORY</h3>
          <div className="history-list">
            {history.map((entry, index) => (
              <div key={index} className="history-item">
                {entry}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
