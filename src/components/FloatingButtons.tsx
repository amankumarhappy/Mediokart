import React, { useState, useRef, useEffect } from 'react';
import { X, Camera, Upload, Send, Mic, MicOff, Globe, ArrowUp, ArrowDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, onSnapshot, collection, addDoc, query, orderBy, where, getDocs } from 'firebase/firestore';

interface FloatingButtonsProps {
  alwaysOpen?: boolean;
  forceFullPreview?: boolean;
  showInstallPrompt?: boolean;
  hideFloating?: boolean;
}

const GUEST_CHAT_LIMIT = 2;

const FloatingButtons: React.FC<FloatingButtonsProps> = ({ 
  alwaysOpen = false, 
  forceFullPreview = false,
  showInstallPrompt = false,
  hideFloating = false
}) => {
  // State
  const { currentUser, userData, loginAnonymously } = useAuth();
  const [showChatbot, setShowChatbot] = useState(alwaysOpen);

  // Set initial chatbot visibility
  useEffect(() => {
    if (alwaysOpen) {
      setShowChatbot(true);
    }
  }, [alwaysOpen]);

  const [fullPreview, setFullPreview] = useState(forceFullPreview);
  const [messages, setMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'bot', timestamp: Date, image?: string, caption?: string}>>([
    {
      id: '1',
      text: "Hello! I'm Mediobot, your AI health assistant built by Aman Kumar Happy for India. I can help with basic medical queries, symptom checking, and prescription analysis. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [guestChats, setGuestChats] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Load chat history for logged-in users
  useEffect(() => {
    if (!currentUser) return;
    setLoadingHistory(true);
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('uid', '==', currentUser.uid), orderBy('createdAt', 'desc'));
    getDocs(q).then((snapshot) => {
      if (!snapshot.empty) {
        // Use the latest chat
        const chatDoc = snapshot.docs[0];
        const chatData = chatDoc.data();
        if (chatData && chatData.messages) {
          setMessages(chatData.messages.map((m: any) => ({ ...m, timestamp: m.timestamp ? new Date(m.timestamp.seconds * 1000) : new Date() })));
          setCurrentMessageIndex(chatData.messages.length - 1);
        }
      }
      setLoadingHistory(false);
    });
  }, [currentUser]);
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

  // Removed handleCall and handleEmail as call/email buttons are removed

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
    
    // Add retry logic
    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const systemPrompt = language === 'hi' 
          ? `आप Mediobot हैं, भारत के लिए अमन कुमार हैप्पी द्वारा बनाया गया एक AI स्वास्थ्य सहायक।

महत्वपूर्ण सुरक्षा नियम:
${message}
${caption ? `कैप्शन: ${caption}` : ''}

MEDIOKART जानकारी:
${JSON.stringify(mediokartInfo, null, 2)}`
          : `You are Mediobot, an AI health assistant built by Aman Kumar Happy for India.

CRITICAL SAFETY RULES:
${message}
${caption ? `Caption: ${caption}` : ''}

MEDIOKART INFORMATION:
${JSON.stringify(mediokartInfo, null, 2)}`;

        // Add timeout to the fetch request
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000); // 30 second timeout

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
          }),
          signal: controller.signal
        });

        clearTimeout(timeout);

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
          return data.candidates[0].content.parts[0].text;
        } else {
          throw new Error('Invalid response from AI');
        }
      } catch (error) {
        attempt++;
        if (attempt === maxRetries) {
          console.error('Error calling Gemini API:', error);
          return language === 'hi' 
            ? "मुझे खेद है, कनेक्शन में समस्या है। कृपया अपना नेटवर्क कनेक्शन जांचें और पुनः प्रयास करें। आपातकालीन स्थिति में +919153737258 पर कॉल करें।"
            : "I apologize, there seems to be a connection issue. Please check your network connection and try again. For emergencies, call +919153737258.";
        }
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, attempt), 5000)));
      }
    }
  };

  const handleSendMessage = async () => {
    if ((!inputMessage.trim() && !pendingImage) || isLoading) return;

    // Guest chat limit logic
    if (!currentUser || currentUser.isAnonymous) {
      if (guestChats >= GUEST_CHAT_LIMIT) {
        // Add a system message about login requirement
        const systemMessage = {
          id: Date.now().toString(),
          text: language === 'hi' 
            ? "अधिक चैट करने के लिए कृपया लॉगिन करें। आपका डेटा सुरक्षित रहेगा और आप अपना चैट इतिहास देख सकेंगे।"
            : "Please login to continue chatting. Your data will be secure and you'll be able to see your chat history.",
          sender: 'bot' as const,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, systemMessage]);
        setCurrentMessageIndex(prev => prev + 1);
        setShowAuthModal(true);
        return;
      }
      setGuestChats((prev) => prev + 1);

      // Show remaining messages count
      if (guestChats === GUEST_CHAT_LIMIT - 1) {
        setTimeout(() => {
          const warningMessage = {
            id: Date.now().toString(),
            text: language === 'hi' 
              ? "यह आपका अंतिम संदेश है। कृपया जारी रखने के लिए लॉगिन करें।"
              : "This is your last message. Please login to continue.",
            sender: 'bot' as const,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, warningMessage]);
          setCurrentMessageIndex(prev => prev + 1);
        }, 1000);
      }
    }

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

      // Save chat to Firestore for logged-in users
      if (currentUser && !currentUser.isAnonymous) {
        const chatsRef = collection(db, 'chats');
        // Try to find latest chat for this user
        const q = query(chatsRef, where('uid', '==', currentUser.uid), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          // Update latest chat
          const chatDoc = snapshot.docs[0];
          await updateDoc(chatDoc.ref, {
            messages: [...messages, userMessage, botMessage],
            updatedAt: new Date()
          });
        } else {
          // Create new chat
          await addDoc(chatsRef, {
            uid: currentUser.uid,
            messages: [...messages, userMessage, botMessage],
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      }
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

  // Draggable floating button state
  const [buttonPosition, setButtonPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [buttonStart, setButtonStart] = useState<{ x: number; y: number } | null>(null);
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Set initial position to bottom right with proper mobile handling
  useEffect(() => {
    const setInitialPosition = () => {
      const padding = 24; // Consistent padding from edges
      const buttonSize = 64; // 16 * 4 (w-16 class)
      setButtonPosition({
        x: window.innerWidth - (buttonSize + padding),
        y: window.innerHeight - (buttonSize + padding)
      });
    };

    setInitialPosition();
    window.addEventListener('resize', setInitialPosition);
    window.addEventListener('orientationchange', setInitialPosition);

    return () => {
      window.removeEventListener('resize', setInitialPosition);
      window.removeEventListener('orientationchange', setInitialPosition);
    };
  }, []);

  // Update position on window resize
  useEffect(() => {
    const handleResize = () => {
      setButtonPosition(pos => {
        const padding = 24;
        const buttonSize = 64;
        return {
          x: Math.min(pos.x, window.innerWidth - (buttonSize + padding)),
          y: Math.min(pos.y, window.innerHeight - (buttonSize + padding))
        };
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    longPressTimeout.current = setTimeout(() => {
      setDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setButtonStart({ ...buttonPosition });
    }, 400); // 400ms long press
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointermove', handlePointerMove);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (dragging && dragStart && buttonStart) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      const padding = 24;
      const buttonSize = 64;
      setButtonPosition({
        x: Math.max(padding, Math.min(window.innerWidth - (buttonSize + padding), buttonStart.x + dx)),
        y: Math.max(padding, Math.min(window.innerHeight - (buttonSize + padding), buttonStart.y + dy))
      });
    }
  };

  const handlePointerUp = () => {
    if (longPressTimeout.current) clearTimeout(longPressTimeout.current);
    setDragging(false);
    setDragStart(null);
    setButtonStart(null);
    document.removeEventListener('pointerup', handlePointerUp);
    document.removeEventListener('pointermove', handlePointerMove);
  };

  const handleClick = () => {
    if (!dragging) setShowChatbot(true);
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    longPressTimeout.current = setTimeout(() => {
      setDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setButtonStart({ ...buttonPosition });
    }, 400);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchmove', handleTouchMove);
  };
  const handleTouchMove = (e: TouchEvent) => {
    if (dragging && dragStart && buttonStart) {
      const dx = e.touches[0].clientX - dragStart.x;
      const dy = e.touches[0].clientY - dragStart.y;
      const padding = 24;
      const buttonSize = 64;
      setButtonPosition({
        x: Math.max(padding, Math.min(window.innerWidth - (buttonSize + padding), buttonStart.x + dx)),
        y: Math.max(padding, Math.min(window.innerHeight - (buttonSize + padding), buttonStart.y + dy))
      });
    }
  };
  const handleTouchEnd = () => {
    if (longPressTimeout.current) clearTimeout(longPressTimeout.current);
    setDragging(false);
    setDragStart(null);
    setButtonStart(null);
    document.removeEventListener('touchend', handleTouchEnd);
    document.removeEventListener('touchmove', handleTouchMove);
  };

  // PWA install handler
  useEffect(() => {
    if (!showInstallPrompt) return;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, [showInstallPrompt]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  return (
    <>
      {/* Floating Action Buttons */}
      {!alwaysOpen && !hideFloating && (
        <div
          style={{ position: 'fixed', left: buttonPosition.x, top: buttonPosition.y, zIndex: 40 }}
          className="flex flex-col space-y-4 touch-none select-none"
        >
          {/* Chatbot Button Only */}
          <button
            ref={buttonRef}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className={`w-16 h-16 p-0 m-0 bg-transparent rounded-full flex items-center justify-center transition-all duration-200 transform ${dragging ? 'scale-110' : ''} cursor-pointer`}
            title="Chat with Mediobot"
            style={{ touchAction: 'none', userSelect: 'none', boxShadow: 'none', border: 'none' }}
          >
            <div className="relative w-16 h-16 flex items-center justify-center">
              <img src="/MEDIOBOTFLOAT.png" alt="Mediobot" className="w-16 h-16 object-contain" draggable="false" />
            </div>
          </button>
        </div>
      )}

      {/* Chatbot Modal */}
      {showChatbot && (
        <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex ${(forceFullPreview || fullPreview) ? 'items-stretch justify-stretch p-0' : 'items-center justify-center p-4'}`}>
          <div className={`bg-white dark:bg-gray-800 shadow-2xl flex flex-col ${(forceFullPreview || fullPreview) ? 'rounded-none w-full h-full max-w-full max-h-full' : 'rounded-2xl w-full max-w-md h-[600px]'}`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center relative overflow-hidden bg-transparent p-0 m-0" style={{boxShadow:'none',border:'none'}}>
                  <img src="/MEDIOBOTFLOAT.png" alt="Mediobot" className="w-10 h-10 object-contain" draggable="false" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Mediobot</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {language === 'hi' ? 'AI स्वास्थ्य सहायक' : 'AI Health Assistant'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {/* Full Preview Toggle */}
                {!forceFullPreview && (
                  <button
                    onClick={() => setFullPreview((prev) => !prev)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title={fullPreview ? (language === 'hi' ? 'पॉपअप मोड' : 'Popup Mode') : (language === 'hi' ? 'फुल प्रीव्यू' : 'Full Preview')}
                  >
                    {fullPreview ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6h13M9 6L3 12l6 6" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={2} stroke="currentColor" fill="none" /></svg>
                    )}
                  </button>
                )}
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
                  onClick={() => { setShowChatbot(false); setFullPreview(false); }}
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
              <div className="flex space-x-2 items-center">
                <div className="flex-1 relative">
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
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors disabled:opacity-50 text-base"
                  />
                </div>
                
                {/* Voice Input Button - Hidden on small screens */}
                <button
                  onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
                  disabled={isLoading || showImageCaption}
                  className={`hidden sm:block p-2 rounded-lg transition-colors disabled:opacity-50 ${
                    isListening 
                      ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' 
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                  title={language === 'hi' ? 'आवाज़ से टाइप करें' : 'Voice typing'}
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>

                {/* Send Button - Always visible */}
                <button
                  onClick={handleSendMessage}
                  disabled={(!inputMessage.trim() && !pendingImage) || isLoading || showImageCaption}
                  className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[40px] flex items-center justify-center"
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