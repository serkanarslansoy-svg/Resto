# Stitch tasarım incelemesi

Kaynak: Google Stitch projesi **RESTO Hospitality SaaS Platform** (ID `10106627068251065279`). İnceleme, projenin ZIP dışa aktarmasına göre yapıldı (`design/stitch-export/`); Stitch MCP erişimi yoktu.

## Durum

- Dışa aktarmada 12 ekran ve 1 tasarım sistemi (`tuscan_modernist/DESIGN.md`) var.
- 12 ekranın tamamı **müşteri tarafı**, mobil, İtalyanca ve tek bir restoran için (Locanda San Frediano, Masa 08).
- **Restoran yönetimi, mutfak ve SaaS yönetimi ekranı yoktu.** Tablet veya masaüstü ekranı da yoktu.

## Ekranlar

| Grup | Ekranlar |
|---|---|
| Masada sipariş | karşılama, dijital menü, yemek detayı, tükenen yemek, ortak sepet, boş sepet, sipariş onayı, sipariş durumu |
| Rezervasyon | masa ayırtma, onay, değiştirme/iptal |
| Sistem durumları | oturum süresi doldu, çevrimdışı, yer kalmadı (tek panoda) |

## Tasarım sistemi bulguları

1. **Renk çelişkisi.** Açıklama metni sıcak fildişi (`#F6F2E9`), Bosco (`#172C2A`) ve terracotta (`#BD704E`) tanımlıyordu. Token'lar ise soğuk yeşilimsi beyaz (`#f7faf4`), `#021716` ve `#904c2d` kullanıyordu. **Karar: fildişi.** Bkz. `DESIGN-ivory.md`.
2. **Token dışı sabit renkler:** `#E8E5DD`, `#5A6258`, `#E5EAE3`.
3. **Kurala aykırı şekiller:** sistem 2px köşeli etiket isterken ekranlarda yuvarlak (pill) etiketler ve gölgeler vardı.
4. **Başlık şablonu:** rezervasyon ekranlarında "Servizio Staff & Conto" başlığı ve masa oturumu etiketi gösteriliyordu.
5. **Alt menü:** rezervasyon ekranlarında yanlış sekme seçiliydi; boş sepette rozet görünüyordu.
6. **Fiyat formatı karışıktı** (`€18.00` ve `€18,50`). **Karar: `€ 18,50`.**
7. **Ekranlar arası veri tutarsızlıkları:** aynı yemeğe iki farklı fiyat, üç farklı salon adı, iki farklı sipariş numarası, rezervasyon tarihi ve sahibinin değişmesi vb.
8. **Dil seçici IT/EN/TR vardı ama içerik yalnızca İtalyancaydı.**

## Eksik akışlar (prototipte tamamlandı)

| Alan | Eklenenler |
|---|---|
| Müşteri | QR/NFC ile katılma ve masayı paylaşma, garson/hesap isteği onayı, ön hesap ve hesap bölme, değerlendirme, bekleme listesi, takvime ekleme, boş/hata durumları |
| Salon | PIN girişi ve vardiya, masa haritası (telefon ve tablet), masa detayı, garsonun sipariş girmesi ve servis sırası, çağrı kutusu, hazır yemekler, rezervasyon defteri, tahsilat |
| Mutfak | KDS fiş panosu, süre renkleri, alerjen uyarısı, tükendi işaretleme, sesli uyarı, aynı masa senkronu, toplamlar, ortalama hazırlama süresi |
| Restoran yönetimi | e-posta girişi ve şifre sıfırlama, genel bakış, menü/fiyat/alerjen/fotoğraf, kat planı düzenleyici ve QR, rezervasyonlar, personel ve yetkiler, raporlar ve CSV, marka ayarları |
| SaaS | 2FA'lı giriş, işletme listesi ve detayı, kayıt sihirbazı, planlar ve faturalar, sistem durumu ve destek |

## Açık konular

- Ürün bazında hesap bölme (örneğin bir şişeyi iki kişi bölüşmek) yok.
- Garsonun "Yeni fiş" ekranı tablette de telefon genişliğinde açılıyor.
- Gerçek yemek fotoğrafları ve logo restorandan alınmalı; prototipte yükleme alanı var.
- Erişilebilirlik (ekran okuyucu, klavye) ayrıca test edilmedi; renk kontrastı kontrol edildi.
