import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useCallback,
    ReactNode,
} from 'react';
import { useNuiEvent, SendEvent } from '../utils/eventHandlers';
import { Receive, Send } from '../types/events';
import { DialogData, DialogUpdateData, ButtonClickData } from '../types/dialog';

interface DialogContextType {
    currentDialog: DialogData;
    displayedText: string;
    isTextFinished: boolean;
    handleButtonClick: (index: number, id?: string | number) => void;
}

const defaultDialog: DialogData = {
    job: '',
    name: '',
    text: '',
    buttons: [],
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
};

interface DialogProviderProps {
    children: ReactNode;
}

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
    const [currentDialog, setCurrentDialog] =
        useState<DialogData>(defaultDialog);
    const [displayedText, setDisplayedText] = useState('');
    const [isTextFinished, setIsTextFinished] = useState(false);

    // Use refs for typewriter effect
    const timeoutRef = useRef<NodeJS.Timeout>();
    const textIndexRef = useRef(0);
    const fullTextRef = useRef('');

    // Cleanup function for typewriter effect
    const cleanupTypewriter = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        textIndexRef.current = 0;
    }, []);

    // Type writer effect
    const typeWriterEffect = useCallback(
        (text: string, textSpeed: number = 25) => {
            // Clean up any existing typewriter effect
            cleanupTypewriter();

            // Reset state
            setIsTextFinished(false);
            setDisplayedText('');
            fullTextRef.current = text;
            textIndexRef.current = 0;

            const typeNextCharacter = () => {
                if (textIndexRef.current < fullTextRef.current.length) {
                    setDisplayedText(
                        fullTextRef.current.slice(0, textIndexRef.current + 1),
                    );
                    textIndexRef.current += 1;
                    timeoutRef.current = setTimeout(
                        typeNextCharacter,
                        textSpeed,
                    );
                } else {
                    setIsTextFinished(true);
                }
            };

            // Start typing if there's text to type
            if (text) {
                timeoutRef.current = setTimeout(typeNextCharacter, textSpeed);
            } else {
                setIsTextFinished(true);
            }
        },
        [cleanupTypewriter],
    );

    // Cleanup on unmount
    React.useEffect(() => {
        return () => {
            cleanupTypewriter();
        };
    }, [cleanupTypewriter]);

    // Listen for dialog show events
    useNuiEvent<DialogData>(Receive.showDialogue, data => {
        setCurrentDialog(data);
        if (typeof data.text === 'string') {
            typeWriterEffect(data.text, data.textSpeed);
        }
    });

    // Listen for dialog update events
    useNuiEvent<DialogUpdateData>(Receive.updateDialogue, data => {
        setCurrentDialog(prev => {
            const updated = { ...prev, [data.type]: data.value };

            // If text was updated, restart the typewriter effect
            if (data.type === 'text' && typeof data.value === 'string') {
                typeWriterEffect(data.value, prev.textSpeed);
            }

            return updated;
        });
    });

    // Handle button click
    const handleButtonClick = useCallback(
        (index: number, id?: string | number) => {
            cleanupTypewriter();
            setIsTextFinished(false);

            const clickData: ButtonClickData = {
                index,
                id,
            };

            // Send dialog:click event for handling nextDialog and onSelect callbacks
            SendEvent(Send.dialogClick, clickData);
        },
        [cleanupTypewriter],
    );

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = React.useMemo(
        () => ({
            currentDialog,
            displayedText,
            isTextFinished,
            handleButtonClick,
        }),
        [currentDialog, displayedText, isTextFinished, handleButtonClick],
    );

    return (
        <DialogContext.Provider value={contextValue}>
            {children}
        </DialogContext.Provider>
    );
};
