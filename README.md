# BeKind - Chrome Extension

✨ **BeKind**, mesaj ve e-posta metinlerinizi AI ile daha nazik, resmi veya normal bir tonda yeniden yazan Chrome eklentisidir.

## 🚀 Özellikler

- **📩 Mod Seçimi**: Mesaj veya Mail formatı seçimi
- **🎭 Ton Seçimi**: Normal, Resmi, Nazik tonlar
- **✍️ Metin Dönüştürme**: Google Gemini AI ile akıllı metin düzenleme
- **📋 Kopyalama**: Tek tıkla sonucu kopyalama
- **🔐 Güvenli API**: Yerel depolama ile API anahtarı yönetimi
- **🎨 Modern Tasarım**: Gradient arkaplan ve smooth animasyonlar

## 🛠️ Kurulum

### Geliştirme Ortamı

1. **Repository'yi klonlayın:**
   ```bash
   git clone https://github.com/IBlitzI/BeKind-Chrome-Extension.git
   cd BeKind-chrome-extension
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Development sunucusunu başlatın:**
   ```bash
   npm run dev
   ```

4. **Chrome eklentisi için build alın:**
   ```bash
   npm run build:extension
   ```

### Chrome'a Yükleme

1. Chrome'da `chrome://extensions/` sayfasına gidin
2. **"Geliştirici modu"** nu etkinleştirin
3. **"Paketlenmemiş uzantı yükle"** butonuna tıklayın
4. **`dist`** klasörünü seçin

## 🔑 API Anahtarı Alma

BeKind kullanmak için Google Gemini API anahtarına ihtiyacınız var:

1. [Google AI Studio](https://makersuite.google.com/app/apikey) sayfasına gidin
2. Google hesabınızla giriş yapın
3. **"Create API Key"** butonuna tıklayın
4. Oluşturulan anahtarı kopyalayın
5. BeKind eklentisini açıp API anahtarınızı girin

## 🎨 Teknik Detaylar

- **Framework**: React 19.1.0
- **Build Tool**: Vite 5.4.10
- **Manifest**: Chrome Extension v3
- **AI API**: Google Gemini 1.5 Flash
- **Styling**: Modern CSS with gradients
- **Storage**: Chrome Extension Storage API

## 📦 Build Çıktısı

Build işlemi sonunda `dist` klasöründe şu dosyalar oluşur:
- `index.html` - Popup arayüzü
- `assets/` - JS ve CSS dosyaları
- `manifest.json` - Chrome eklenti manifestosu
- `vite.svg` - Eklenti ikonu

## 🌟 Kullanım

1. **Eklentiyi açın**: Chrome toolbar'ında BeKind ikonuna tıklayın
2. **API anahtarını girin**: İlk kullanımda Gemini API anahtarınızı girin
3. **Mod seçin**: Mesaj veya Mail formatını seçin
4. **Ton belirleyin**: Normal, Resmi veya Nazik tonunu seçin
5. **Metin girin**: Düzenlemek istediğiniz metni yazın
6. **Dönüştürün**: "Dönüştür" butonuna tıklayın
7. **Kopyalayın**: Sonucu tek tıkla kopyalayın

## ⭐ Destek

Eğer bu proje işinize yaradıysa, lütfen ⭐ vererek destekleyin!

## 📞 İletişim

Herhangi bir sorunuz veya öneriniz varsa, GitHub Issues bölümünden bize ulaşabilirsiniz.
