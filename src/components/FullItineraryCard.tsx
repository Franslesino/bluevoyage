import React from 'react';

interface FullItineraryCardProps {
    title: string;
    description: string;
    whatsappHref: string;
    emailHref: string;
    whatsappLabel: string;
    emailLabel: string;
    durationLabel: string;
}

const FullItineraryCard: React.FC<FullItineraryCardProps> = ({
    title,
    description,
    whatsappHref,
    emailHref,
    whatsappLabel,
    emailLabel,
    durationLabel,
}) => {
    return (
        <div className="relative pt-12 w-full">
            {/* Connection Line */}
            <div className="absolute left-[19px] md:left-1/2 top-0 h-12 w-[1px] bg-gradient-to-b from-[#088F8F]/20 to-transparent hidden md:block"></div>

            <div className="bg-white border border-foreground/5 shadow-lg p-8 md:p-12 text-center rounded-sm max-w-3xl mx-auto relative overflow-hidden group">
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-[url('/pattern-noise.png')] opacity-5"></div>
                <div className="absolute top-0 right-0 p-12 opacity-5 transform rotate-12 pointer-events-none">
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C9.243 2 7 4.243 7 7V10H6C4.897 10 4 10.897 4 12V20C4 21.103 4.897 22 6 22H18C19.103 22 20 21.103 20 20V12C20 10.897 19.103 10 18 10H17V7C17 4.243 14.757 2 12 2ZM12 17C10.896 17 10 16.104 10 15C10 13.896 10.896 13 12 13C13.104 13 14 13.896 14 15C14 16.104 13.104 17 12 17ZM9 10V7C9 5.346 10.346 4 12 4C13.654 4 15 5.346 15 7V10H9Z" />
                    </svg>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 bg-[#088F8F]/10 rounded-full flex items-center justify-center mb-6 text-[#088F8F]">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C9.243 2 7 4.243 7 7V10H6C4.897 10 4 10.897 4 12V20C4 21.103 4.897 22 6 22H18C19.103 22 20 21.103 20 20V12C20 10.897 19.103 10 18 10H17V7C17 4.243 14.757 2 12 2ZM12 17C10.896 17 10 16.104 10 15C10 13.896 10.896 13 12 13C13.104 13 14 13.896 14 15C14 16.104 13.104 17 12 17ZM9 10V7C9 5.346 10.346 4 12 4C13.654 4 15 5.346 15 7V10H9Z" />
                        </svg>
                    </div>

                    <h3 className="font-canto text-3xl md:text-4xl text-foreground mb-4">
                        {title}
                    </h3>

                    <p className="font-avenir text-foreground/60 text-lg leading-relaxed max-w-lg mb-8">
                        {description}
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                        <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 max-w-full md:max-w-xs px-6 py-4 bg-[#088F8F] hover:bg-[#066e6e] text-white font-avenir tracking-widest uppercase text-xs md:text-sm transition-all duration-300 shadow-md hover:shadow-lg rounded-sm text-center flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            {whatsappLabel}
                        </a>
                        <a
                            href={emailHref}
                            className="flex-1 max-w-full md:max-w-xs px-6 py-4 border border-foreground/20 hover:border-[#088F8F] text-foreground hover:text-[#088F8F] font-avenir tracking-widest uppercase text-xs md:text-sm transition-all duration-300 rounded-sm text-center flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {emailLabel}
                        </a>
                    </div>

                    <div className="mt-6 pt-6 border-t border-foreground/5 w-full max-w-sm">
                        <p className="font-avenir text-xs text-foreground/40 uppercase tracking-widest">
                            {durationLabel}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullItineraryCard;
