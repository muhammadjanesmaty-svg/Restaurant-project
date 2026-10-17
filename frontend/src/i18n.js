import { createContext, useContext, useEffect, useState } from "react";

const tr = {
    nav: {
        experience: "Deneyim",
        menu: "Menü",
        music: "Müzik",
        location: "Konum",
        reserve: "Masa Ayırt",
        status: "7/24 AÇIK",
        openMenu: "Menüyü Aç",
        closeMenu: "Menüyü Kapat",
    },
    hero: {
        eyebrow: "Kocaeli'nin En Seçkin Sahil Lounge'u — Gulf of İzmit",
        lines: ["Körfezin Kıyısında", "Büyüleyici Deniz Manzarası", "& Butik Lezzetler"],
        sub: "Sekapark sahilinde gün batımının kızıla boyadığı sularda; nitelikli kahve, serpme kahvaltı ve canlı müzik ritmiyle buluşun.",
        ctaPrimary: "Masa Ayırt",
        ctaSecondary: "Menüyü Keşfet",
        callNow: "Hemen Ara",
        badge: "7/24 Açık • Canlı Müzik Var",
        infoStrip: ["24/7 Kesintisiz Hizmet", "Deniz Kenarı Teras", "Ücretsiz Vale & Otopark", "Canlı Akustik Performanslar"],
        scrollHint: "Keşfetmek için kaydırın",
    },
    exp: {
        eyebrow: "SECAFE Deneyimi",
        title: "Körfezin Kıyısında Dört İmza Deneyim",
        sub: "Gün doğumundan gece yarısı sahne ışıklarına kadar; kahve, kahvaltı, tatlı ve müzik tek çatı altında.",
    },
    menu: {
        eyebrow: "Lüks Menü",
        title: "Damaklarda İz Bırakan Lezzetler",
        sub: "Usta ellerden, taze ve mevsimlik malzemelerle hazırlanan imza lezzetlerimiz.",
        searchPlaceholder: "Ara: menemen, latte, waffle…",
        noResults: "Sonuç bulunamadı",
        noResultsHint: "Farklı bir kelime deneyin ya da diğer kategorilere göz atın.",
        itemsCount: "ürün",
    },
    res: {
        eyebrow: "VIP Rezervasyon",
        title: "Masanızı Ayırtın",
        sub: "Deniz kenarı teras veya VIP lounge; istediğiniz köşede, istediğiniz saatte. 7/24 rezervasyon açık.",
        name: "Ad Soyad",
        namePh: "Adınız ve soyadınız",
        phone: "Telefon",
        phonePh: "05xx xxx xx xx",
        date: "Tarih",
        time: "Saat",
        guests: "Kişi Sayısı",
        zone: "Oturum Alanı",
        notes: "Özel Not (opsiyonel)",
        notesPh: "Doğum günü, balon süsleme, vegani tercih…",
        submit: "Rezervasyon Talebi Gönder",
        submitting: "Gönderiliyor…",
        errName: "Lütfen adınızı girin",
        errPhone: "Geçerli bir telefon numarası girin",
        errDate: "Lütfen tarih seçin",
        errTime: "Lütfen saat seçin",
        successTitle: "Rezervasyon Talebiniz Alındı",
        successSub: "Ekibimiz kısa süre içinde telefonla teyit edecek.",
        successCode: "Rezervasyon Kodu",
        summary: "Rezervasyon Özeti",
        newReservation: "Yeni Rezervasyon Yap",
        phoneHint: "Aynı gün rezervasyonları için bizi arayın",
        toastSuccess: "Rezervasyon talebiniz kaydedildi",
        toastError: "Rezervasyon kaydedilemedi, lütfen tekrar deneyin",
        zoneLabels: { terrace: "Deniz Kenarı Teras", lounge: "VIP Lounge (İç Mekân)", garden: "Gün Batımı Bahçesi" },
    },
    music: {
        eyebrow: "Canlı Müzik",
        title: "Hafta Sonu Sahnesi",
        sub: "Akustik sahneler, saksafon setleri ve Körfez'in ritmiyle dolu geceler.",
        book: "Bu gece için masa ayırt",
        liveNote: "Her hafta sonu canlı performans",
    },
    loc: {
        eyebrow: "Konum & Ambiyans",
        title: "Sekapark Sahilinde Sizi Bekliyoruz",
        sub: "Körfez'e açılan kapımız; Sekapark yürüyüş yolu üzerinde, denize sıfır konumda.",
        addressLabel: "Adres",
        phoneLabel: "Rezervasyon Hattı",
        plusCodeLabel: "Plus Code",
        hoursLabel: "Çalışma Saatleri",
        hoursVal: "7 gün 24 saat açık",
        directions: "Yol Tarifi Al",
        call: "Hemen Ara",
        amenities: ["7/24 Açık", "Deniz Manzaralı Teras", "Sekapark Yürüyüş Yolu", "Ücretsiz Vale & Otopark", "Wi-Fi & Çalışma Alanı", "Engelsiz Giriş"],
    },
    rev: {
        eyebrow: "Misafir Yorumları",
        title: "Körfezin En Beğenilen Mekânı",
        ratingLabel: "Google Değerlendirmesi",
        ratingCount: "1.240+ yorum",
        verified: "Doğrulanmış Misafir Yorumu",
    },
    footer: {
        tagline: "Elevated Seaside Moments & Artisanal Dining",
        contactTitle: "İletişim",
        hoursTitle: "Çalışma Saatleri",
        hoursVal: "Pazartesi – Pazar: 24 Saat Açık",
        linksTitle: "Keşfet",
        followTitle: "Bizi Takip Edin",
        rights: "Tüm hakları saklıdır.",
        credit: "İzmit Körfezi için özenle tasarlandı.",
    },
};

const en = {
    nav: {
        experience: "Experience",
        menu: "Menu",
        music: "Music",
        location: "Location",
        reserve: "Reserve a Table",
        status: "OPEN 24/7",
        openMenu: "Open Menu",
        closeMenu: "Close Menu",
    },
    hero: {
        eyebrow: "Kocaeli's Premier Waterfront Lounge — Gulf of İzmit",
        lines: ["Experience Sekapark's", "Finest Waterfront", "Lounge & Dining"],
        sub: "On Sekapark's sunset-painted shore — specialty coffee, gourmet kahvaltı and live music above the Gulf of İzmit.",
        ctaPrimary: "Reserve a Table",
        ctaSecondary: "Explore Menu",
        callNow: "Call Now",
        badge: "Open 24/7 • Live Music Available",
        infoStrip: ["Open 24/7, Every Day", "Waterfront Terrace", "Free Valet & Parking", "Live Acoustic Performances"],
        scrollHint: "Scroll to explore",
    },
    exp: {
        eyebrow: "The SECAFE Experience",
        title: "Four Signature Experiences by the Gulf",
        sub: "From sunrise espresso to midnight stage lights — coffee, brunch, dessert and music under one roof.",
    },
    menu: {
        eyebrow: "Luxury Menu",
        title: "Flavours That Linger",
        sub: "Signature plates crafted by master hands with fresh, seasonal ingredients.",
        searchPlaceholder: "Search: menemen, latte, waffle…",
        noResults: "No results found",
        noResultsHint: "Try a different keyword or browse other categories.",
        itemsCount: "items",
    },
    res: {
        eyebrow: "VIP Reservations",
        title: "Reserve Your Table",
        sub: "Waterfront terrace or VIP lounge — your corner, your hour. Booking open around the clock.",
        name: "Full Name",
        namePh: "Your name and surname",
        phone: "Phone",
        phonePh: "05xx xxx xx xx",
        date: "Date",
        time: "Time",
        guests: "Guests",
        zone: "Seating Zone",
        notes: "Special Note (optional)",
        notesPh: "Birthday décor, vegan preference, window table…",
        submit: "Send Reservation Request",
        submitting: "Sending…",
        errName: "Please enter your name",
        errPhone: "Please enter a valid phone number",
        errDate: "Please choose a date",
        errTime: "Please choose a time",
        successTitle: "Your Reservation Request Is In",
        successSub: "Our team will confirm by phone shortly.",
        successCode: "Booking Code",
        summary: "Booking Summary",
        newReservation: "Make a New Reservation",
        phoneHint: "For same-day bookings, give us a call",
        toastSuccess: "Reservation request saved",
        toastError: "Could not save reservation, please try again",
        zoneLabels: { terrace: "Waterfront Terrace", lounge: "VIP Lounge (Indoor)", garden: "Sunset Garden" },
    },
    music: {
        eyebrow: "Live Music",
        title: "The Weekend Stage",
        sub: "Acoustic sets, saxophone nights and the rhythm of the Gulf.",
        book: "Book a table for tonight",
        liveNote: "Live performances every weekend",
    },
    loc: {
        eyebrow: "Location & Ambience",
        title: "Waiting for You on the Sekapark Waterfront",
        sub: "Our door opens to the Gulf — right on the Sekapark promenade, by the sea.",
        addressLabel: "Address",
        phoneLabel: "Reservation Line",
        plusCodeLabel: "Plus Code",
        hoursLabel: "Opening Hours",
        hoursVal: "Open 24 hours, 7 days",
        directions: "Get Directions",
        call: "Call Now",
        amenities: ["Open 24/7", "Sea-View Terrace", "Sekapark Promenade", "Free Valet & Parking", "Wi-Fi & Work Space", "Step-Free Access"],
    },
    rev: {
        eyebrow: "Guest Reviews",
        title: "The Gulf's Best-Loved Lounge",
        ratingLabel: "Google Rating",
        ratingCount: "1,240+ reviews",
        verified: "Verified Guest Review",
    },
    footer: {
        tagline: "Elevated Seaside Moments & Artisanal Dining",
        contactTitle: "Contact",
        hoursTitle: "Opening Hours",
        hoursVal: "Monday – Sunday: Open 24 Hours",
        linksTitle: "Explore",
        followTitle: "Follow Us",
        rights: "All rights reserved.",
        credit: "Crafted for the Gulf of İzmit.",
    },
};

const dict = { tr, en };

const LangCtx = createContext(null);

export function LangProvider({ children }) {
    const [lang, setLang] = useState(() => localStorage.getItem("secafe-lang") || "tr");
    useEffect(() => {
        localStorage.setItem("secafe-lang", lang);
        document.documentElement.lang = lang;
    }, [lang]);
    const t = dict[lang] || dict.tr;
    return (
        <LangCtx.Provider value={{ lang, setLang, t, isTr: lang === "tr" }}>
            {children}
        </LangCtx.Provider>
    );
}

export function useLang() {
    const ctx = useContext(LangCtx);
    if (!ctx) throw new Error("useLang must be used within LangProvider");
    return ctx;
}
