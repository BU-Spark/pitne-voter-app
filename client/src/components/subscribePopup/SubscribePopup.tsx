// components/subscribePopup/SubscribePopup.tsx
import React, { useState, FormEvent } from 'react';

interface SubscribePopupProps {
    onClose: () => void;
}

const SubscribePopup: React.FC<SubscribePopupProps> = ({ onClose }) => {
    const [emailInput, setEmailInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [buttonLoading, setButtonLoading] = useState(false);

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!emailInput) {
            setError("Please enter an email address.");
            return;
        }

        setButtonLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // send email to next.js api route which contains mailchimp API
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailInput }),
            });
            const data = await res.json();
            
            // check status of returned data
            if (data.success) {
                setSuccess("Successfully subscribed!");
                setEmailInput('');
            } else {
                throw new Error(data?.error || 'Something went wrong, please try again later');
            }

        } catch (e) {
            setError((e as Error).message);
        } finally {
            setButtonLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-black p-8 rounded-lg max-w-md w-full sm:w-96 relative text-center shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 text-xl hover:text-gray-600 focus:outline-none"
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <path
                            d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>

                {/* Icon Section */}
                <div className="flex justify-center mb-4">
                    <img src="/THE-FLIPSIDE-LOGO-Final-DarkMode.png" alt="Flipside" className="p-2 box-border" />
                    <img src="/X.svg" alt="X" className="p-2 box-border" />
                    <img src="/Logo.svg" alt="BVA New" className="p-2 box-border" />

                </div>

                {/* Header Text */}
                <h2 className="text-red-600 font-bold text-3xl">Stay on Track!</h2>
                <p className="text-white text-sm mt-2">
                    Never miss an election, the latest news, or candidate updates.
                </p>

                {/* Input Section */}
                <form onSubmit={handleFormSubmit} className="mt-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-600"
                    />
                    <button
                        type="submit"
                        disabled={buttonLoading}
                        className={`w-full mt-4 py-2 bg-red-600 text-white font-semibold rounded-md${
                            buttonLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {buttonLoading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>

                {/* Success/Error Messages */}
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

                {/* Footer Text */}
                <p className="text-gray-400 text-xs mt-4">
                    Cancel through email | your privacy matters.
                </p>
            </div>
        </div>
    );
};

export default SubscribePopup;