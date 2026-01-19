const fs = require('fs');

// Wildlife detail page translations
const wildlifeDetailKeys = {
    en: {
        comingSoonText: "More details regarding the {{name}} and where to find them in Togean will be coming soon.",
        backToWildlife: "Back to Wildlife"
    },
    de: {
        comingSoonText: "Weitere Details über {{name}} und wo man sie in Togean finden kann, folgen in Kürze.",
        backToWildlife: "Zurück zur Tierwelt"
    },
    fr: {
        comingSoonText: "Plus de détails concernant {{name}} et où les trouver à Togean seront bientôt disponibles.",
        backToWildlife: "Retour à la Faune"
    },
    id: {
        comingSoonText: "Detail lebih lanjut mengenai {{name}} dan di mana menemukannya di Togean akan segera hadir.",
        backToWildlife: "Kembali ke Satwa Liar"
    },
    es: {
        comingSoonText: "Más detalles sobre {{name}} y dónde encontrarlos en Togean estarán disponibles pronto.",
        backToWildlife: "Volver a Vida Silvestre"
    },
    pt: {
        comingSoonText: "Mais detalhes sobre {{name}} e onde encontrá-los em Togean estarão disponíveis em breve.",
        backToWildlife: "Voltar à Vida Selvagem"
    },
    ru: {
        comingSoonText: "Дополнительная информация о {{name}} и где их найти на Тогеан скоро появится.",
        backToWildlife: "Назад к дикой природе"
    },
    ja: {
        comingSoonText: "{{name}}の詳細とトゲアンでの発見場所については、近日公開予定です。",
        backToWildlife: "野生動物に戻る"
    },
    ko: {
        comingSoonText: "{{name}}에 대한 자세한 정보와 토게안에서 찾을 수 있는 장소는 곧 제공될 예정입니다.",
        backToWildlife: "야생동물로 돌아가기"
    },
    zh: {
        comingSoonText: "有关{{name}}及其在托根的栖息地的更多详情即将推出。",
        backToWildlife: "返回野生动物"
    },
    ar: {
        comingSoonText: "ستتوفر قريباً المزيد من التفاصيل حول {{name}} وأماكن العثور عليها في توجيان.",
        backToWildlife: "العودة إلى الحياة البرية"
    },
    it: {
        comingSoonText: "Ulteriori dettagli riguardo {{name}} e dove trovarli a Togean saranno presto disponibili.",
        backToWildlife: "Torna alla Fauna Selvatica"
    }
};

const locales = ['en', 'de', 'fr', 'id', 'es', 'pt', 'ru', 'ja', 'ko', 'zh', 'ar', 'it'];

locales.forEach(lang => {
    const f = 'src/locales/' + lang + '.json';
    const d = JSON.parse(fs.readFileSync(f, 'utf8'));

    if (!d.wildlifeDetail) {
        d.wildlifeDetail = {};
    }

    Object.assign(d.wildlifeDetail, wildlifeDetailKeys[lang]);

    fs.writeFileSync(f, JSON.stringify(d, null, 2));
    console.log('Updated ' + lang + '.json with wildlife detail translations');
});
