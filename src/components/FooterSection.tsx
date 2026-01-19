"use client";

import Image from "next/image";
import { CONTACT_INFO } from "@/config/contact";
import { useTranslation } from "./I18nProvider";

export default function FooterSection() {
    const { t } = useTranslation();

    return (
        <footer className="bg-[#CB9275] text-white pt-12 pb-8 md:pt-16 md:pb-12">
            <div className="mx-auto px-6 md:px-12 max-w-[1280px]">
                {/* Top Row: Logo */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-16">
                    {/* Logo */}
                    <div className="relative w-[140px] md:w-[200px] lg:w-[280px] h-auto aspect-square">
                        <Image
                            src="/icon.webp"
                            alt="Togean Voyages Logo"
                            width={280}
                            height={280}
                            className="object-contain brightness-0 invert w-full h-auto"
                            priority
                        />
                    </div>
                    {/* Empty spacer / Right side alignment if needed */}
                    <div className="hidden md:block w-full max-w-md"></div>
                </div>

                {/* Bottom Row: 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
                    {/* Column A: Brand Info */}
                    <div className="md:col-span-4 lg:col-span-4">
                        <h3 className="font-canto text-2xl lg:text-3xl mb-6 text-white">
                            {t("footer.brandName")}
                        </h3>
                        <p className="font-avenir text-base leading-relaxed text-white/80 max-w-sm">
                            {t("footer.brandDescription")}
                        </p>
                    </div>

                    {/* Column B: Infos */}
                    <div className="md:col-span-4 lg:col-span-4">
                        <h3 className="font-canto text-2xl lg:text-3xl mb-6 text-white">
                            {t("footer.infosTitle")}
                        </h3>
                        <ul className="font-avenir space-y-3 text-base text-white/80">
                            <li>{t("footer.address1")}</li>
                            <li>{t("footer.address2")}</li>
                            <li>{t("footer.company")}</li>
                        </ul>
                    </div>

                    {/* Column C: Contact Us */}
                    <div className="md:col-span-4 lg:col-span-4">
                        <h3 className="font-canto text-2xl lg:text-3xl mb-6 text-white">
                            {t("footer.contactTitle")}
                        </h3>
                        <ul className="font-avenir space-y-4 text-base text-white/80">
                            {/* WhatsApp */}
                            <li className="flex items-center gap-3">
                                <span className="shrink-0 w-5 flex justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </span>
                                <a href={CONTACT_INFO.whatsapp.url} className="hover:text-white transition-colors">
                                    {CONTACT_INFO.whatsapp.display}
                                </a>
                            </li>

                            {/* Telegram */}
                            <li className="flex items-center gap-3">
                                <span className="shrink-0 w-5 flex justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.638z" />
                                    </svg>
                                </span>
                                <a href="tel:+6285282296450" className="hover:text-white transition-colors">
                                    +62 852-8229-6450
                                </a>
                            </li>

                            {/* Messenger */}
                            <li className="flex items-center gap-3">
                                <span className="shrink-0 w-5 flex justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                                        <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.595 8.707.24.16.398.44.398.745v1.98c0 .67.755 1.047 1.285.642l2.355-1.815a.999.999 0 0 1 .616-.216c.883.245 1.822.38 2.787.38 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.727 13.906-2.555-2.723a.62.62 0 0 0-.909 0l-4.144 2.723c-.71.467-1.579-.26-1.21-.998l2.954-5.918c.203-.406.772-.406.975 0l2.555 2.723a.62.62 0 0 0 .909 0l4.143-2.723c.711-.467 1.58.26 1.21.998l-2.953 5.918a.545.545 0 0 1-.97 0z" />
                                    </svg>
                                </span>
                                <a href="tel:+6285282296450" className="hover:text-white transition-colors">
                                    +62 852-8229-6450
                                </a>
                            </li>

                            {/* Snapchat */}
                            <li className="flex items-center gap-3">
                                <span className="shrink-0 w-5 flex justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                                        <path d="M12.019 0c-4.49 0-6.176 2.455-6.307 4.14-.029.352.128.877.886 1.14 1.144.395 1.206.849 1.196 1.09-.04.992-1.928 1.956-1.928 3.824 0 2.227 1.637 3.322 2.652 3.821.281.139.387.369.213.684-.528.966-1.637 1.677-2.618 1.677-.384 0-.85-.112-1.147-.282-.37-.21-.775-.152-.98.156-.25.378-.073.71.166.974.004.004.795.836 3.12 1.442.228.06.402.193.364.577-.048.471-.257 1.341-1.396 1.769-.801.302-2.317.447-2.222 1.57.062.748.887 1.353 3.633 1.353 1.366 0 2.112-.047 2.484-.132.895-.205 1.138-.853 1.884-.853.754 0 .937.643 1.832.853.371.087 1.117.132 2.483.132 2.746 0 3.57-.605 3.633-1.353.094-1.123-1.421-1.268-2.222-1.57-1.14-.428-1.348-1.298-1.396-1.769-.038-.384.136-.517.363-.577 2.326-.606 3.117-1.438 3.12-1.442.24-.264.417-.596.167-.974-.205-.308-.61-.366-.98-.156-.297.17-.763.282-1.147.282-.98 0-2.09-.711-2.618-1.677-.174-.315-.068-.545.213-.684 1.015-.5 2.651-1.594 2.651-3.821 0-1.868-1.889-2.832-1.928-3.824-.01-.241.052-.695 1.196-1.09.758-.263.915-.788.886-1.14C18.195 2.455 16.51 0 12.019 0z" />
                                    </svg>
                                </span>
                                <a href="tel:+6285282296450" className="hover:text-white transition-colors">
                                    +62 852-8229-6450
                                </a>
                            </li>

                            {/* Email */}
                            <li className="flex items-center gap-3 pt-2">
                                <span className="shrink-0 w-5 flex justify-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
                                        <rect width="20" height="16" x="2" y="4" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </span>
                                <a href={CONTACT_INFO.email.url} className="hover:text-white transition-colors">
                                    {CONTACT_INFO.email.address}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
