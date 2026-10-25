# RESTO · Hospitality SaaS — Palatino demosu

Restoranlar için QR ile masadan sipariş, salon, mutfak ekranı (KDS), restoran yönetimi ve SaaS yönetimini bir arada gösteren **tıklanabilir HTML prototipi**. İlk örnek işletme: **Palatino Ristorante Pizzeria**, Via IV Marzo 9, Torino.

> Bu bir tasarım demosudur, gerçek uygulama değildir. Sunucu yok; tüm veri tarayıcının `localStorage` alanında tutulur ve aynı tarayıcıdaki sekmeler arasında anlık paylaşılır.

## Çalıştırma

`index.html` dosyasını tarayıcıda açın. Kurulum gerekmez. Yazı tipleri ve ikonlar Google Fonts üzerinden yüklenir.

GitHub Pages ile yayınlamak için: repo **Settings → Pages → Deploy from a branch → `main` / root**.

## Uygulamalar

| Uygulama | Adres | İçerik |
|---|---|---|
| Misafir (mobil) | `#/guest/join` | QR ile masaya katılma, menü, ortak sepet, sipariş durumu, garson/hesap isteği, hesap bölme, değerlendirme, rezervasyon |
| Salon (mobil + tablet) | `#/staff/tables` | Masa haritası, tablette iki panelli kat planı, garsonun sipariş girmesi, servis sırası ("marcia"), çağrılar, ön hesap ve tahsilat |
| Mutfak ekranı (KDS) | `#/kitchen/board` | İstasyona göre fişler, süre renkleri, sesli uyarı, aynı masa senkronu, toplamlar, tükenen ürünler |
| Restoran yönetimi | `#/admin/dash` | Genel bakış, menü ve fotoğraflar, kat planı düzenleyici ve QR, rezervasyonlar, personel ve yetkiler, raporlar ve CSV, marka ayarları |
| RESTO platformu | `#/saas/overview` | İşletmeler, kayıt sihirbazı, planlar ve faturalar, sistem durumu ve destek |

Örnek akış: misafir olarak sipariş verin, mutfak ekranını başka bir sekmede açın; fiş anında düşer.

## Demo girişleri

| Rol | Giriş |
|---|---|
| Salon / mutfak (PIN) | Sara 1111 · Luca 2222 · Giorgia 3333 · Davide 4444 · Elena 5555 · Titolare 9999 |
| Restoran yönetimi | `titolare@palatino.demo` / `Palatino2026` |
| RESTO platformu | `ops@resto.demo` / `Resto2026`, 2FA kodu `246810` |

Girişler yalnızca demo amaçlıdır; doğrulama tarayıcıda yapılır.

## Veriler ve varsayımlar

- **Gerçek:** isim, adres, telefon, çalışma saatleri, mutfak türü ve hizmetler Google Maps kaydı ile herkese açık listelerden (italia.it, Sluurpy) alındı. Yemek adları herkese açık yorumlardan derlendi.
- **Örnek:** fiyatlar, masa düzeni, personel isimleri, siparişler, raporlardaki 7/30 günlük veriler ve diğer "demo" işletmeler. Restoranla doğrulanmalıdır.
- Cumartesi çalışma saatleri kaynaklarda net değildi.

## Klasörler

- `index.html`: prototipin tamamı (tek dosya).
- `docs/DESIGN-ivory.md`: fildişi tasarım sistemi (renk token'ları, kontrast notları, bileşen kuralları, Stitch istemi).
- `docs/design-review.md`: Stitch projesinin tasarım incelemesi.
- `design/stitch-export/`: Google Stitch'ten dışa aktarılan orijinal 12 ekran ve tasarım sistemi.
- `tests/`: Playwright uçtan uca testleri.

## Testler

```bash
npm i -D playwright   # Chromium yüklü değilse: npx playwright install chromium
node tests/e2e.js  "$PWD/index.html" /tmp/shots
node tests/e2e2.js "$PWD/index.html" /tmp/shots
node tests/e2e3.js "$PWD/index.html" /tmp/shots
node tests/e2e4.js "$PWD/index.html" /tmp/shots <png-klasörü>
```

`e2e4.js` için klasörde `dish.png` ve `logo.png` bulunmalıdır. Her test sorunsuz geçince `OK` yazar.
