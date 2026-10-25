# RESTO · Hospitality SaaS — Palatino demosu

Restoranlar için QR ile masadan sipariş, salon, mutfak ekranı (KDS), restoran yönetimi ve SaaS yönetimini bir arada gösteren **tıklanabilir HTML prototipi**. İlk örnek işletme: **Palatino Ristorante Pizzeria**, Via IV Marzo 9, Torino.

> Bu bir tasarım demosudur, gerçek uygulama değildir. Sunucu yok; tüm veri tarayıcının `localStorage` alanında tutulur ve aynı tarayıcıdaki sekmeler arasında anlık paylaşılır.

## Çalıştırma

`index.html` dosyasını açın. Tek başına çalışır: yazı tipleri, ikonlar ve resimler dosyanın içine gömülüdür. İnternet ya da yanında `assets` klasörü gerekmez; telefonda dosya olarak da açılabilir.

Açılışta yalnızca **müşteri** akışı görünür: masadaki QR okutulmuş gibi başlar, "Menüyü aç" ile menüye geçilir. Personel, mutfak ve yönetim uygulamalarına `index.html#/apps` adresinden ulaşılır.

### Düzenleme ve derleme

Kaynak dosya `src/app.html`. Değişiklikten sonra tek dosyalık sayfayı yeniden üretin:

```bash
pip install pillow
python3 tools/build.py   # src/app.html + assets/ -> index.html
```

`index.html` elle düzenlenmez; derleme onu baştan yazar.

GitHub Pages ile yayınlamak için: repo **Settings → Pages → Deploy from a branch → `main` / root**.

## Uygulamalar

| Uygulama | Adres | İçerik |
|---|---|---|
| Misafir (mobil, açılış) | `#/guest/join` | QR ile masaya katılma, menü, ortak sepet, sipariş durumu, garson/hesap isteği, hesap bölme, değerlendirme, rezervasyon |
| Salon (mobil + tablet) | `#/staff/tables` | Masa haritası, tablette iki panelli kat planı, garsonun sipariş girmesi, servis sırası ("marcia"), çağrılar, ön hesap ve tahsilat |
| Mutfak ekranı (KDS) | `#/kitchen/board` | İstasyona göre fişler, süre renkleri, sesli uyarı, aynı masa senkronu, toplamlar, tükenen ürünler |
| Restoran yönetimi | `#/admin/dash` | Genel bakış, menü ve fotoğraflar, kat planı düzenleyici ve QR, rezervasyonlar, personel ve yetkiler, raporlar ve CSV, marka ayarları |
| RESTO platformu | `#/saas/overview` | İşletmeler, kayıt sihirbazı, planlar ve faturalar, sistem durumu ve destek |

Diğer uygulamaların listesi: `#/apps`. Örnek akış: misafir olarak sipariş verin, mutfak ekranını başka bir sekmede açın; fiş anında düşer.

## Demo girişleri

| Rol | Giriş |
|---|---|
| Salon / mutfak (PIN) | Sara 1111 · Luca 2222 · Giorgia 3333 · Davide 4444 · Elena 5555 · Titolare 9999 |
| Restoran yönetimi | `titolare@palatino.demo` / `Palatino2026` |
| RESTO platformu | `ops@resto.demo` / `Resto2026`, 2FA kodu `246810` |

Girişler yalnızca demo amaçlıdır; doğrulama tarayıcıda yapılır.

## Veriler ve varsayımlar

- **Gerçek:** isim, adres, telefon, çalışma saatleri, mutfak türü ve hizmetler Google Maps kaydı ile herkese açık listelerden (italia.it, Sluurpy) alındı. Yemek adları herkese açık yorumlardan derlendi.
- **Restorandan:** afişler, patlatılmış içindekiler görselleri, logo ve afişlerdeki yemekler (Tagliere di salumi e formaggi, Spaghetti cozze e vongole, Brasato al Barbera, Tagliata di vitello alle erbe, Filetto in riduzione al Vermouth, Stinco di vitello alle noci, Milanese di vitello, Grigliata di mare). İçindekiler listeleri görsellerden alındı; fiyatlar ve alerjenler örnektir.
- **Örnek:** fiyatlar, masa düzeni, personel isimleri, siparişler, raporlardaki 7/30 günlük veriler ve diğer "demo" işletmeler. Restoranla doğrulanmalıdır.
- Cumartesi çalışma saatleri kaynaklarda net değildi.

## Klasörler

- `index.html`: derlenmiş, tek başına çalışan prototip.
- `src/app.html`: prototipin kaynağı.
- `tools/build.py`: yazı tiplerini, ikonları ve resimleri gömerek `index.html` üretir.
- `assets/`: restoranın afişleri (`posters/`, menüde ve yemek sayfalarında olduğu gibi kullanılır), içindekilerin patlatılmış görselleri (`exploded/`, yemek sayfasında "Tabak / İçindekiler" geçişiyle) logo (`brand/`), yazı tipleri (`fonts/`) ve Material Symbols ikonları (`icons/`). Derleme bunları `index.html` içine gömer.
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
node tests/e2e5.js "$PWD/index.html" /tmp/shots
node tests/e2e6.js "$PWD/index.html" /tmp/shots
```

`e2e4.js` için klasörde `dish.png` ve `logo.png` bulunmalıdır. Her test sorunsuz geçince `OK` yazar.
