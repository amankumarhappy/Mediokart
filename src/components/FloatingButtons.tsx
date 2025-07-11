import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, MessageCircle, X, Camera, Upload, Send, Loader, Mic, MicOff, Globe, ArrowUp, ArrowDown, Type, Image as ImageIcon } from 'lucide-react';

const FloatingButtons: React.FC = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'bot', timestamp: Date, image?: string, caption?: string}>>([
    {
      id: '1',
      text: "Hello! I'm Mediobot, your AI health assistant built by Aman Kumar Happy for India. I can help with basic medical queries, symptom checking, and prescription analysis. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(messages.length - 1);
  const [imageCaption, setImageCaption] = useState('');
  const [showImageCaption, setShowImageCaption] = useState(false);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [language]);

  const handleCall = () => {
    window.open('tel:+919153737258', '_self');
  };

  const handleEmail = () => {
    window.open('mailto:mediokart@zohomail.in', '_self');
  };

  const startVoiceRecognition = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const sendMessageToGemini = async (message: string, imageData?: string, caption?: string) => {
    const { mediokartInfo } = await import('../data/mediokartInfo');
    
    const systemPrompt = language === 'hi' 
      ? `आप Mediobot हैं, भारत के लिए अमन कुमार हैप्पी द्वारा बनाया गया एक AI स्वास्थ्य सहायक।

महत्वपूर्ण सुरक्षा नियम:
- कभी भी दवाएं या दवाइयां न लिखें
- कभी भी विशिष्ट चिकित्सा निदान न दें
- गंभीर लक्षणों के लिए हमेशा डॉक्टर से सलाह लेने की सिफारिश करें
- केवल बुनियादी, सामान्य स्वास्थ्य मार्गदर्शन प्रदान करें

ब्रांडिंग:
- यदि कोई पूछे कि आपको किसने बनाया या कौन सी तकनीक आपको शक्ति देती है, तो कहें: "Mediobot भारत के लिए अमन कुमार हैप्पी द्वारा बनाया गया है"

MEDIOKART जानकारी:
${JSON.stringify(mediokartInfo, null, 2)}

उपयोगकर्ता संदेश: ${message}
${imageData ? `उपयोगकर्ता ने एक छवि साझा की है${caption ? ` इस कैप्शन के साथ: ${caption}` : ''} - यदि यह चिकित्सा/स्वास्थ्य संबंधी दिखती है तो इसका विश्लेषण करें, लेकिन विशिष्ट चिकित्सा सलाह न दें।` : ''}

याद रखें: आपका मुख्य लक्ष्य पेशेवर चिकित्सा सलाह को कभी भी प्रतिस्थापित न करते हुए उपयोगकर्ता सुरक्षा सुनिश्चित करना है।`
      : `You are Mediobot, an AI health assistant built by Aman Kumar Happy for India. 

CRITICAL SAFETY RULES:
- NEVER prescribe drugs or medications
- NEVER provide specific medical diagnoses
- ALWAYS recommend consulting a doctor for serious symptoms
- Only provide basic, general health guidance
- If asked about serious symptoms, immediately suggest seeing a healthcare professional

BRANDING:
- If anyone asks who built you or what tech powers you, say: "Mediobot is built by Aman Kumar Happy for India"
- Never mention Gemini, Google, or other AI providers
- Always identify as Mediobot

MEDIOKART INFORMATION:
${JSON.stringify(mediokartInfo, null, 2)}

USER MESSAGE: ${message}
${imageData ? `USER HAS SHARED AN IMAGE${caption ? ` with caption: ${caption}` : ''} - analyze it if it appears to be medical/health related, but do not provide specific medical advice.` : ''}

Remember: Your primary goal is to be helpful while ensuring user safety by never replacing professional medical advice.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCPD7VY6Pub9DES-uJa09QmDms8v8EAvrY`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: imageData 
              ? [
                  { text: systemPrompt },
                  {
                    inline_data: {
                      mime_type: "image/jpeg",
                      data: imageData
                    }
                  }
                ]
              : [{ text: systemPrompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
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
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response from AI');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return language === 'hi' 
        ? "मुझे खुशी है कि मैं अभी कनेक्ट करने में परेशानी हो रही है। तत्काल चिकित्सा चिंताओं के लिए, कृपया किसी स्वास्थ्य पेशेवर से संपर्क करें या आपातकालीन सेवाओं को कॉल करें। आप Mediokart से सीधे +919153737258 पर भी संपर्क कर सकते हैं।"
        : "I apologize, but I'm having trouble connecting right now. For immediate medical concerns, please contact a healthcare professional or call emergency services. You can also reach Mediokart directly at +919153737258.";
    }
  };

  const handleSendMessage = async () => {
    if ((!inputMessage.trim() && !pendingImage) || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputMessage || (pendingImage ? 'Image shared' : ''),
      sender: 'user' as const,
      timestamp: new Date(),
      image: pendingImage || undefined,
      caption: imageCaption || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessageIndex(prev => prev + 1);
    setInputMessage('');
    setImageCaption('');
    setShowImageCaption(false);
    const imageToSend = pendingImage;
    const captionToSend = imageCaption;
    setPendingImage(null);
    setIsLoading(true);

    try {
      const botResponse = await sendMessageToGemini(
        inputMessage || 'Please analyze this image', 
        imageToSend?.split(',')[1], 
        captionToSend
      );
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot' as const,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setCurrentMessageIndex(prev => prev + 1);
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: language === 'hi' 
          ? "तकनीकी कठिनाई के लिए मुझे खुशी है। तत्काल चिकित्सा सहायता के लिए, कृपया किसी स्वास्थ्य पेशेवर से संपर्क करें या +919153737258 पर कॉल करें।"
          : "I apologize for the technical difficulty. For immediate medical assistance, please contact a healthcare professional or call +919153737258.",
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setCurrentMessageIndex(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(language === 'hi' ? 'कृपया एक छवि फ़ाइल अपलोड करें' : 'Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target?.result as string;
      setPendingImage(base64Data);
      setShowImageCaption(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCameraCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleImageUpload(file);
      }
    };
    input.click();
  };

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleImageUpload(file);
      }
    };
    input.click();
  };

  const navigateMessages = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentMessageIndex > 0) {
      setCurrentMessageIndex(prev => prev - 1);
    } else if (direction === 'down' && currentMessageIndex < messages.length - 1) {
      setCurrentMessageIndex(prev => prev + 1);
    }
  };

  const goToLatestMessage = () => {
    setCurrentMessageIndex(messages.length - 1);
    scrollToBottom();
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-4">
        {/* Call Button */}
        <button
          onClick={handleCall}
          className="w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 flex items-center justify-center"
          title="Call +919153737258"
        >
          <Phone size={24} />
        </button>

        {/* Email Button */}
        <button
          onClick={handleEmail}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 flex items-center justify-center"
          title="Email mediokart@zohomail.in"
        >
          <Mail size={24} />
        </button>

        {/* Chatbot Button */}
        <button
          onClick={() => setShowChatbot(true)}
          className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 flex items-center justify-center"
          title="Chat with Mediobot"
        >
          <div className="relative">
            <MessageCircle size={24} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </button>
      </div>

      {/* Chatbot Modal */}
      {showChatbot && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center relative">
                  <MessageCircle className="w-6 h-6 text-white" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Mediobot</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {language === 'hi' ? 'AI स्वास्थ्य सहायक' : 'AI Health Assistant'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {/* Language Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="Change Language"
                  >
                    <Globe size={16} />
                  </button>
                  
                  {showLanguageMenu && (
                    <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 min-w-[120px]">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as 'en' | 'hi');
                            setShowLanguageMenu(false);
                          }}
                          className={`w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                            language === lang.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => navigateMessages('up')}
                    disabled={currentMessageIndex <= 0}
                    className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Previous message"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    onClick={() => navigateMessages('down')}
                    disabled={currentMessageIndex >= messages.length - 1}
                    className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Next message"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    onClick={goToLatestMessage}
                    className="p-1 rounded text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    title="Go to latest"
                  >
                    <ArrowDown size={14} className="animate-bounce" />
                  </button>
                </div>

                <button
                  onClick={() => setShowChatbot(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${
                    index === currentMessageIndex ? 'ring-2 ring-blue-300 dark:ring-blue-600 rounded-lg' : ''
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    {message.image && (
                      <div className="mb-2">
                        <img 
                          src={message.image} 
                          alt="Shared image" 
                          className="max-w-full h-auto rounded-lg"
                        />
                        {message.caption && (
                          <p className="text-xs mt-1 opacity-80">{message.caption}</p>
                        )}
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-600 dark:text-gray-300 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-600 dark:text-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-600 dark:text-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {language === 'hi' ? 'Mediobot सोच रहा है...' : 'Mediobot is thinking...'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Image Caption Input */}
            {showImageCaption && pendingImage && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div className="mb-3">
                  <img 
                    src={pendingImage} 
                    alt="Preview" 
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={imageCaption}
                    onChange={(e) => setImageCaption(e.target.value)}
                    placeholder={language === 'hi' ? 'छवि के लिए कैप्शन जोड़ें...' : 'Add caption for image...'}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors text-sm"
                  />
                  <button
                    onClick={() => {
                      setShowImageCaption(false);
                      handleSendMessage();
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              {/* Action Buttons */}
              <div className="flex space-x-2 mb-3">
                <button
                  onClick={handleCameraCapture}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Camera size={16} />
                  <span>{language === 'hi' ? 'कैमरा' : 'Camera'}</span>
                </button>
                <button
                  onClick={handleFileUpload}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Upload size={16} />
                  <span>{language === 'hi' ? 'अपलोड' : 'Upload'}</span>
                </button>
              </div>

              {/* Message Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !showImageCaption && handleSendMessage()}
                  placeholder={language === 'hi' 
                    ? 'लक्षण, स्वास्थ्य सुझाव, या Mediokart के बारे में पूछें...' 
                    : 'Ask about symptoms, health tips, or Mediokart...'
                  }
                  disabled={isLoading || showImageCaption}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50"
                />
                
                {/* Voice Input Button */}
                <button
                  onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
                  disabled={isLoading || showImageCaption}
                  className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                    isListening 
                      ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' 
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                  title={language === 'hi' ? 'आवाज़ से टाइप करें' : 'Voice typing'}
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>

                <button
                  onClick={handleSendMessage}
                  disabled={(!inputMessage.trim() && !pendingImage) || isLoading || showImageCaption}
                  className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                ⚠️ {language === 'hi' 
                  ? 'आपातकाल के लिए, आपातकालीन सेवाओं को कॉल करें। Mediobot केवल सामान्य मार्गदर्शन प्रदान करता है।'
                  : 'For emergencies, call emergency services. Mediobot provides general guidance only.'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingButtons;