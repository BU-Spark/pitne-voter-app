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
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailInput }),
            });
            const data = await res.json();

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
            <div className="bg-[#F0F0FF] p-8 rounded-lg max-w-md w-full sm:w-96 relative text-center shadow-lg">
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
                    <svg width="99" height="134" viewBox="0 0 99 134" fill="none">
                        <path d="M48.913 82.495L46.8044 79.8403C45.61 78.3365 43.9167 77.31 42.0311 76.9464C37.7724 76.1253 33.63 78.8302 32.6692 83.0596L31.9655 86.1574C31.4003 88.6455 32.5815 91.2023 34.8424 92.3847C36.6968 93.3545 37.859 95.2739 37.859 97.3666V124.195C37.859 129.452 42.3456 133.59 47.5854 133.166L50.6654 132.916C56.1202 132.475 59.9215 127.308 58.7193 121.969L50.6457 86.1156C50.3481 84.7937 49.7558 83.5561 48.913 82.495Z" fill="#A15F49" />
                        <rect x="55.3589" y="3.85718" width="5.46416" height="126.961" transform="rotate(15.2175 55.3589 3.85718)" fill="#FF4D00" />
                        <rect x="14.5344" width="86.7838" height="55.2912" transform="rotate(14.6859 14.5344 0)" fill="#020AF5" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M35.4726 74.8194C35.8059 73.5943 37.0692 72.8714 38.2942 73.2048L42.9517 74.472C43.2561 74.5548 43.5294 74.6951 43.7633 74.8779C44.2512 74.9912 44.7056 75.2641 45.0414 75.6867L46.8417 77.9525C48.4212 79.1493 49.4937 81.4858 49.4937 84.1723C49.4937 88.0776 47.2272 91.2436 44.4313 91.2436C41.6354 91.2436 39.3689 88.0776 39.3689 84.1723C39.3689 81.9971 40.0721 80.0513 41.1782 78.7541L37.0872 77.641C35.8621 77.3077 35.1393 76.0444 35.4726 74.8194Z" fill="black" />
                        {/* Additional SVG paths here */}
                    </svg>
                </div>

                {/* Header Text */}
                <h2 className="text-blue-700 font-bold text-3xl">Stay on Track!</h2>
                <p className="text-gray-600 text-sm mt-2">
                    Never miss an election, the latest news, or candidate updates.
                </p>

                {/* Input Section */}
                <form onSubmit={handleFormSubmit} className="mt-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={buttonLoading}
                        className={`w-full mt-4 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 ${
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