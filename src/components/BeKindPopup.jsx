import { useState } from 'react'
import './BeKindPopup.css'

const BeKindPopup = () => {
  const [mode, setMode] = useState('message') // 'message' or 'mail'
  const [tone, setTone] = useState('normal') // 'normal', 'formal', 'kind'
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)

  // API anahtarını local storage'dan yükle
  useState(() => {
    chrome.storage.sync.get(['geminiApiKey'], (result) => {
      if (result.geminiApiKey) {
        setApiKey(result.geminiApiKey)
      } else {
        setShowApiKeyInput(true)
      }
    })
  }, [])

  const saveApiKey = () => {
    chrome.storage.sync.set({ geminiApiKey: apiKey }, () => {
      setShowApiKeyInput(false)
    })
  }

  const getPrompt = () => {
    const modeText = mode === 'message' ? 'mesaj' : 'e-posta'
    const toneTexts = {
      normal: 'normal ve dostane',
      formal: 'resmi ve profesyonel',
      kind: 'nazik ve anlayışlı'
    }
    
    return `Lütfen aşağıdaki metni ${toneTexts[tone]} bir ${modeText} formatında yeniden yazın. Orijinal anlamını koruyun ancak daha ${toneTexts[tone]} bir ton kullanın. Sadece yeniden yazılmış metni döndürün, başka açıklama eklemeyin:

"${inputText}"`
  }

  const handleTransform = async () => {
    if (!inputText.trim()) {
      alert('Lütfen dönüştürülecek bir metin girin')
      return
    }

    if (!apiKey) {
      setShowApiKeyInput(true)
      return
    }

    setIsLoading(true)
    setOutputText('')

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: getPrompt()
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      })

      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.text()
        console.error('API Error:', errorData)
        throw new Error(`API isteği başarısız oldu (${response.status}): ${errorData}`)
      }

      const data = await response.json()
      console.log('API Response:', data)
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
        const generatedText = data.candidates[0].content.parts[0].text
        setOutputText(generatedText)
      } else {
        console.error('Unexpected API response structure:', data)
        throw new Error('API yanıtı beklenmedik formatta')
      }
    } catch (error) {
      console.error('Hata:', error)
      alert(`Metin dönüştürülürken bir hata oluştu: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText)
    // Kısa bir success feedback gösterebiliriz
  }

  const clearAll = () => {
    setInputText('')
    setOutputText('')
  }

  if (showApiKeyInput) {
    return (
      <div className="bekind-popup api-key-setup">
        <div className="header">
          <h2>🔑 API Anahtarı Gerekli</h2>
        </div>
        <div className="api-key-section">
          <p>BeKind'ı kullanmak için Google Gemini API anahtarına ihtiyacınız var.</p>
          <input
            type="password"
            placeholder="Gemini API Anahtarınızı girin..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="api-key-input"
          />
          <button onClick={saveApiKey} className="save-api-key-btn">
            Kaydet ve Devam Et
          </button>
          <p className="api-help">
            API anahtarı almanız için: <br />
            <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
              Google AI Studio
            </a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bekind-popup">
      <div className="header">
        <h2>✨ BeKind</h2>
        <button 
          className="settings-btn"
          onClick={() => setShowApiKeyInput(true)}
          title="API Anahtarını Değiştir"
        >
          ⚙️
        </button>
      </div>

      <div className="mode-selection">
        <h3>📩 Mod Seçimi</h3>
        <div className="mode-buttons">
          <button 
            className={`mode-btn ${mode === 'message' ? 'active' : ''}`}
            onClick={() => setMode('message')}
          >
            💬 Mesaj
          </button>
          <button 
            className={`mode-btn ${mode === 'mail' ? 'active' : ''}`}
            onClick={() => setMode('mail')}
          >
            📧 Mail
          </button>
        </div>
      </div>

      <div className="tone-selection">
        <h3>🎭 Ton Seçimi</h3>
        <div className="tone-buttons">
          <button 
            className={`tone-btn ${tone === 'normal' ? 'active' : ''}`}
            onClick={() => setTone('normal')}
          >
            😊 Normal
          </button>
          <button 
            className={`tone-btn ${tone === 'formal' ? 'active' : ''}`}
            onClick={() => setTone('formal')}
          >
            👔 Resmi
          </button>
          <button 
            className={`tone-btn ${tone === 'kind' ? 'active' : ''}`}
            onClick={() => setTone('kind')}
          >
            🤗 Nazik
          </button>
        </div>
      </div>

      <div className="text-input-section">
        <h3>✍️ Metin Giriş</h3>
        <textarea
          placeholder="Dönüştürülecek metni buraya yazın..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={4}
          className="text-input"
        />
      </div>

      <div className="action-buttons">
        <button 
          onClick={handleTransform}
          disabled={isLoading || !inputText.trim()}
          className="transform-btn"
        >
          {isLoading ? '🔄 Dönüştürülüyor...' : '📤 Dönüştür'}
        </button>
        <button 
          onClick={clearAll}
          className="clear-btn"
        >
          🗑️ Temizle
        </button>
      </div>

      {outputText && (
        <div className="output-section">
          <h3>✅ Sonuç</h3>
          <div className="output-text">
            {outputText}
          </div>
          <button 
            onClick={copyToClipboard}
            className="copy-btn"
          >
            📋 Kopyala
          </button>
        </div>
      )}
    </div>
  )
}

export default BeKindPopup
