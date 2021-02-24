import {createContext, ReactNode, useState} from 'react';
import challenges from '../../challenges.json'

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallangesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challangesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallange: () => void;
    resetChallenge: () => void;
}

interface ChallangesProviderProps {
    children: ReactNode;
}

export const ChallangesContext = createContext({} as ChallangesContextData);

export function ChallangesProvider({children}: ChallangesProviderProps) {
    const [level, setLevel] = useState(1); 
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challangesCompleted, setChallangesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4,2)

    function levelUp() {
      setLevel(level +1);
    }

    function startNewChallange() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]; 

        setActiveChallenge(challenge)
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    return (
        <ChallangesContext.Provider 
        
        value={{ 
            level, 
            levelUp, 
            challangesCompleted, 
            currentExperience,
            startNewChallange,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            }}
            >
          {children}
        </ChallangesContext.Provider>
    )
}