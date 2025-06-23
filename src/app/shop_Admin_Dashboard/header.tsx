// components/FarmerHeader.tsx

import { Typewriter } from 'react-simple-typewriter';

const FarmerHeader = () => {
    return (
        <header className="bg-green-800 shadow px-6 py-6 relative">
            <div className="flex items-center justify-center space-x-4">
                <img
                    src="/farmer.png"
                    alt="Farmer Logo"
                    className="w-12 h-12 rounded-full object-cover"
                />
                <h1 className="text-xl sm:text-2xl text-blue-100 font-bold whitespace-nowrap">
                    <Typewriter
                        words={[
                            'আপনার ফসলের সেরা সার সন্ধান করুন',
                            'স্থানীয় দোকানগুলির সাথে সংযুক্ত হন',
                            'আপনার কৃষিকাজের প্রয়োজনের জন্য সেরা সার পান',
                        ]}
                        loop={0}
                        cursor
                        cursorStyle="|"
                        typeSpeed={60}
                        deleteSpeed={40}
                        delaySpeed={1500}
                    />
                </h1>
            </div>
        </header>
    );
};

export default FarmerHeader;
