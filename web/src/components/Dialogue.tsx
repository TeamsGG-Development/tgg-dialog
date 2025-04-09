/**
 * Modified from original work by Byte Labs Project
 * Original Copyright © 2023 Byte Labs Project
 * This file has been modified under the terms of the MIT License
 */
import React from 'react';
import { useDialog } from '../contexts/DialogContext';
import hexIcon from '../assets/hex.svg';

const Dialogue: React.FC = () => {
    const { currentDialog, displayedText, isTextFinished, handleButtonClick } =
        useDialog();

    return (
        <>
            <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-[var(--gradient-dark)] via-[var(--gradient-mid)] to-[var(--gradient-transparent)] pointer-events-none"></div>

            <div className="absolute inset-x-0 bottom-32 flex flex-col items-center z-10">
                <div className="max-w-[40vw] w-full flex flex-col">
                    <div className="flex items-start mb-1">
                        <div className="h-full py-0.5">
                            <div className="w-1 h-[calc(100%-0.25rem)] bg-[var(--primary-color)] rounded-full shadow-[0_0_8px_var(--shadow-color)] mr-3 self-stretch"></div>
                        </div>
                        <div>
                            <h1 className="text-[var(--white)] text-[1.5vw] font-bold leading-tight">
                                {currentDialog.name}
                            </h1>
                            <p className="text-[var(--primary-color)] font-bold text-[0.65vw] uppercase tracking-wider">
                                {currentDialog.job}
                            </p>
                        </div>
                    </div>

                    <div className="dialog-background w-full">
                        <p className="whitespace-pre-wrap break-words text-[0.85vw] font-medium leading-relaxed text-[var(--white-opacity-95)]">
                            {displayedText}
                        </p>
                    </div>

                    <div className="flex justify-center w-full mt-3 min-h-[2.8vw]">
                        {isTextFinished ? (
                            <div className="flex flex-row w-full gap-3 justify-between">
                                {currentDialog.buttons.map((button, index) => (
                                    <button
                                        key={`button-${index}`}
                                        onClick={() =>
                                            handleButtonClick(
                                                index + 1,
                                                button.id,
                                            )
                                        }
                                        className="dialog-button flex items-center justify-start gap-2 text-left whitespace-pre-wrap break-words text-[0.75vw] transition-all duration-300 flex-1"
                                    >
                                        <div className="flex-shrink-0 w-[0.9vw] h-[0.9vw] rounded-md bg-[var(--button-bg-color)] flex items-center justify-center shadow-[0_0_5px_var(--shadow-light-color)]">
                                            <img
                                                src={hexIcon}
                                                alt="Icon"
                                                className="w-[0.65vw] h-[0.65vw]"
                                            />
                                        </div>
                                        <span className="truncate">
                                            {button.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-row w-full gap-3 justify-between"></div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dialogue;
