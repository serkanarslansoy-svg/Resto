# RESTO · Hospitality SaaS — Palatino demosu

Restoranlar için QR ile masadan sipariş, salon, mutfak ekranı (KDS), restoran yönetimi ve SaaS yönetimini bir arada gösteren **tıklanabilir HTML prototipi**. İlk örnek işletme: **Palatino Ristorante Pizzeria**, Via IV Marzo 9, Torino.

> Bu bir tasarım demosudur, gerçek uygulama değildir. Sunucu yok; tüm veri tarayıcının `localStorage` alanında tutulur ve aynı tarayıcıdaki sekmeler arasında anlık paylaşılır.

## Çalıştırma

Her kullanıcı tipinin **ayrı bir sayfası** var. Her sayfa yalnızca kendi ekranlarını içerir ve tek başına çalışır (yazı tipleri, ikonlar ve gereken resimler dosyanın içinde):

| Sayfa | Kim açar |
|---|---|
| `guest.html` | Misafir. Masadaki QR bu sayfayı açar; menü, fiyatlar, sipariş, hesap, rezervasyon. Personel ekranlarının kodu bu dosyada yoktur. |
| `staff.html` | Garson / salon. Misafirlerin verdiği siparişleri, çağrıları ve hesapları görür. |
| `kitchen.html` | Mutfak ekranı. |
| `admin.html` | Restoran yönetimi. |
| `platform.html` | RESTO operatörleri. |
| `index.html` | Demo için bağlantı sayfası (uygulama kodu içermez). |

Sayfalar aynı siteden (örneğin GitHub Pages) ve aynı tarayıcıda açılınca demo verisini paylaşır: misafirin siparişi garson ve mutfak sayfalarına anında düşer. Gerçek sistemde bu bağlantıyı sunucu sağlayacaktır.

### Düzenleme ve derleme

Kaynak tek dosya: `src/app.html`. Değişiklikten sonra sayfaları yeniden üretin:

```bash
pip install pillow
python3 tools/build.py   # src/app.html + assets/ -> guest.html, staff.html, kitchen.html, admin.html, platform.html, index.html
```

Derleme, her sayfaya yalnızca o kullanıcının bölümlerini koyar; üretilen dosyalar elle düzenlenmez.

## Uygulamalar

| Uygulama | Sayfa | İçerik |
|---|---|---|
| Misafir (mobil) | `guest.html` | QR ile masaya katılma, menü, ortak sepet, sipariş durumu, garson/hesap isteği, hesap bölme, değerlendirme, rezervasyon |
| Salon (mobil + tablet) | `staff.html` | Masa haritası, tablette iki panelli kat planı, garsonun sipariş girmesi, servis sırası ("marcia"), çağrılar, ön hesap ve tahsilat |
| Mutfak ekranı (KDS) | `kitchen.html` | İstasyona göre fişler, süre renkleri, sesli uyarı, aynı masa senkronu, toplamlar, tükenen ürünler |
| Restoran yönetimi | `admin.html` | Genel bakış, menü ve fotoğraflar, kat planı düzenleyici ve QR, rezervasyonlar, personel ve yetkiler, raporlar ve CSV, marka ayarları |
| RESTO platformu | `platform.html` | İşletmeler, kayıt sihirbazı, planlar ve faturalar, sistem durumu ve destek |

Örnek akış: `guest.html` ile sipariş verin, `kitchen.html` ve `staff.html` sayfalarını başka sekmelerde açın; fiş anında düşer.

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

- `guest.html`, `staff.html`, `kitchen.html`, `admin.html`, `platform.html`: derlenmiş, tek başına çalışan kullanıcı sayfaları.
- `index.html`: demo bağlantı sayfası.
- `src/app.html`: tüm uygulamaların kaynağı.
- `tools/build.py`: kaynaktan kullanıcı sayfalarını üretir.
- `assets/`: restoranın afişleri (`posters/`, menüde ve yemek sayfalarında olduğu gibi kullanılır), içindekilerin patlatılmış görselleri (`exploded/`, yemek sayfasında "Tabak / İçindekiler" geçişiyle) logo (`brand/`), yazı tipleri (`fonts/`) ve Material Symbols ikonları (`icons/`). Derleme bunları sayfaların içine gömer.
- `docs/DESIGN-ivory.md`: fildişi tasarım sistemi (renk token'ları, kontrast notları, bileşen kuralları, Stitch istemi).
- `docs/design-review.md`: Stitch projesinin tasarım incelemesi.
- `design/stitch-export/`: Google Stitch'ten dışa aktarılan orijinal 12 ekran ve tasarım sistemi.
- `tests/`: Playwright uçtan uca testleri.

## Testler

```bash
npm i -D playwright   # Chromium yüklü değilse: npx playwright install chromium
node tests/e2e.js  "$PWD" /tmp/shots
node tests/e2e2.js "$PWD" /tmp/shots
node tests/e2e3.js "$PWD" /tmp/shots
node tests/e2e4.js "$PWD" /tmp/shots <png-klasörü>
node tests/e2e5.js "$PWD" /tmp/shots
node tests/e2e6.js "$PWD" /tmp/shots
```

`e2e4.js` için klasörde `dish.png` ve `logo.png` bulunmalıdır. Her test sorunsuz geçince `OK` yazar.
