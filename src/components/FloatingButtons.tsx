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
  const [language, setLanguage] = useState<'en' | 'hi' | 'hinglish'>('en');
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

  // Helper: Check if query is medical/healthcare/mediokart/aman kumar happy
  const isMedicalQuery = (msg: string) => {
    const keywords = [
      'health', 'medical', 'doctor', 'medicine', 'symptom', 'treatment', 'disease', 'illness', 'injury', 'first aid', 'prescription', 'diagnosis', 'hospital', 'clinic', 'wellness', 'fitness', 'aura', 'aurabox', 'mediokart', 'mediobot', 'aman kumar happy', 'medication', 'emergency', 'pharmacy', 'vitals', 'blood', 'pressure', 'sugar', 'diabetes', 'cardiac', 'asthma', 'covid', 'fever', 'pain', 'rash', 'infection', 'scan', 'report', 'test', 'xray', 'mri', 'ct', 'healthcare', 'ambulance', 'appointment', 'consult', 'doctor', 'nurse', 'paramedic', 'injury', 'fracture', 'burn', 'wound', 'allergy', 'vaccine', 'vaccination', 'immunization', 'therapy', 'cancer', 'oncology', 'pediatrics', 'gynecology', 'surgery', 'operation', 'mental', 'psychology', 'depression', 'anxiety', 'stress', 'nutrition', 'diet', 'exercise', 'yoga', 'ayurveda', 'homeopathy', 'physiotherapy', 'rehab', 'rehabilitation', 'cardiology', 'orthopedic', 'dermatology', 'skin', 'hair', 'eye', 'vision', 'ear', 'nose', 'throat', 'dental', 'tooth', 'oral', 'mouth', 'covid', 'corona', 'virus', 'infection', 'immunity', 'immunization', 'child', 'baby', 'pregnancy', 'pregnant', 'mother', 'father', 'parent', 'family', 'elderly', 'senior', 'old', 'woman', 'man', 'boy', 'girl', 'child', 'teen', 'adolescent', 'adult', 'senior', 'old', 'wellbeing', 'well-being', 'wellness', 'health tips', 'healthcare tips', 'health query', 'medical query', 'mediokart', 'mediobot', 'aman kumar happy'
    ];
    const lowerMsg = msg.toLowerCase();
    return keywords.some(k => lowerMsg.includes(k));
  };

  const needsDisclaimer = (query: string, response: string) => {
    const seriousConditions = [
      'cancer', 'tumor', 'heart', 'cardiac', 'stroke', 'diabetes', 'kidney', 'liver',
      'brain', 'surgery', 'emergency', 'bleeding', 'infection', 'covid', 'hiv', 'aids',
      'depression', 'suicide', 'mental health', 'pregnancy', 'chronic'
    ];
    const lowerQuery = query.toLowerCase();
    const lowerResponse = response.toLowerCase();
    return seriousConditions.some(condition => 
      lowerQuery.includes(condition) || lowerResponse.includes(condition)
    );
  };

  const sendMessageToGemini = async (message: string, imageData?: string, caption?: string) => {
    const { mediokartInfo } = await import('../data/mediokartInfo');
    const checkText = [message, caption].filter(Boolean).join(' ');
    if (!isMedicalQuery(checkText)) {
      if (language === 'hi') return 'Mediobot केवल मेडिकल या हेल्थकेयर क्वेरी के लिए है।';
      if (language === 'hinglish') return 'Mediobot sirf medical ya healthcare queries ke liye hai.';
      return 'Mediobot is only for medical or healthcare queries.';
    }

    const maxRetries = 3;
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        let systemPrompt = '';
        if (language === 'hi') {
          systemPrompt = `Instruction: आप एक विशेषज्ञ चिकित्सा सहायक हैं। कृपया विस्तृत जानकारी प्रदान करें, जिसमें शामिल हों:
1. परिभाषा और विवरण
2. सामान्य लक्षण या प्रभाव
3. कारण और जोखिम कारक
4. रोकथाम या स्वास्थ्य टिप्स (यदि लागू हो)

क्वेरी: ${message}\n${caption ? `कैप्शन: ${caption}` : ''}\n\nMEDIOKART जानकारी:\n${JSON.stringify(mediokartInfo, null, 2)}`;
        } else if (language === 'hinglish') {
          systemPrompt = `Instruction: Aap ek expert medical assistant hain. Detailed information provide karein, jisme ye points shamil hon:
1. Definition aur description
2. Common symptoms ya effects
3. Causes aur risk factors
4. Prevention ya health tips (if applicable)

Query: ${message}\n${caption ? `Caption: ${caption}` : ''}\n\nMEDIOKART info:\n${JSON.stringify(mediokartInfo, null, 2)}`;
        } else {
          systemPrompt = `Instruction: You are an expert medical assistant. Please provide detailed information including:
1. Definition and description
2. Common symptoms or effects
3. Causes and risk factors
4. Prevention or health tips (if applicable)

Make the response comprehensive yet easy to understand. Use simple language and break down complex terms.

Query: ${message}\n${caption ? `Caption: ${caption}` : ''}\n\nMEDIOKART INFORMATION:\n${JSON.stringify(mediokartInfo, null, 2)}`;
        }
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);
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
          if (language === 'hi') return "माफ़ कीजिए, कनेक्शन में समस्या है। कृपया कुछ देर बाद पुनः प्रयास करें।";
          if (language === 'hinglish') return "Sorry, connection mein problem hai. Thodi der baad try karein.";
          return "I apologize, there seems to be a connection issue. Please try again in a few moments.";
        }
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
        id: Date.now().toString(),
        text: botResponse,
        sender: 'bot' as const,
        timestamp: new Date()
      };

      // Add the bot's response
      setMessages(prev => [...prev, botMessage]);
      setCurrentMessageIndex(prev => prev + 1);

      // Add disclaimer as a separate message after a short delay
      setTimeout(() => {
        const disclaimerMessage = {
          id: (Date.now() + 1).toString(),
          text: language === 'hi'
            ? "⚠️ यह जानकारी केवल सामान्य जागरूकता के लिए है और चिकित्सीय सलाह नहीं है। कृपया किसी योग्य स्वास्थ्य पेशेवर से परामर्श करें।"
            : language === 'hinglish'
            ? "⚠️ Yeh jankari sirf samanya jagrukta ke liye hai aur medical advice nahi hai. Kripya kisi qualified doctor se salah len."
            : "⚠️ This information is for general awareness only and does not constitute medical advice. Please consult a qualified healthcare professional.",
          sender: 'bot' as const,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, disclaimerMessage]);
        setCurrentMessageIndex(prev => prev + 1);
      }, 500);

      // Save chat to Firestore for logged-in users
      if (currentUser && !currentUser.isAnonymous) {
        const chatsRef = collection(db, 'chats');
        try {
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
        } catch (error) {
          console.error('Error saving chat to Firestore:', error);
          // Don't show error to user, just log it
        }
      }
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: language === 'hi'
          ? 'कनेक्शन में समस्या है। कृपया कुछ देर बाद पुनः प्रयास करें।'
          : language === 'hinglish'
            ? 'Connection mein problem hai. Thodi der baad try karein.'
            : 'Connection issue. Please try again in a few moments.',
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
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'hinglish', name: 'Hinglish', flag: '🇮🇳' }
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
                <img src="/MEDIOBOTFLOAT.png" alt="Mediobot" className="w-10 h-10 object-contain" draggable="false" style={{background:'transparent'}} />
              </div>
              <div>
                <h3 className="font-bold text-purple-700 dark:text-purple-300 text-lg">Mediobot</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {language === 'hi' ? 'AI स्वास्थ्य सहायक' : language === 'hinglish' ? 'AI Health Assistant (Hinglish)' : 'AI Health Assistant'}
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${index === currentMessageIndex ? 'ring-2 ring-purple-300 dark:ring-purple-600 rounded-lg' : ''}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl shadow-md ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white border-2 border-blue-200 dark:border-blue-800'
                        : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-purple-100 dark:border-gray-700'
                    } animate-fade-in`}
                    style={{ wordBreak: 'break-word', position: 'relative' }}
                  >
                    {message.image && (
                      <div className="mb-2">
                        <img 
                          src={message.image} 
                          alt="Shared image" 
                          className="max-w-full h-auto rounded-lg border border-purple-200 dark:border-purple-700 shadow-sm"
                        />
                        {message.caption && (
                          <p className="text-xs mt-1 opacity-80">{message.caption}</p>
                        )}
                      </div>
                    )}
                    <p className="text-base whitespace-pre-wrap font-medium">{message.text}</p>
                    <span className={`absolute -bottom-5 right-2 text-xs ${message.sender === 'user' ? 'text-blue-100' : 'text-purple-400 dark:text-purple-300'}`}>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl shadow-md border border-purple-100 dark:border-purple-700 animate-pulse">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-600 dark:bg-purple-300 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-600 dark:bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-600 dark:bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-purple-600 dark:text-purple-300">
                        {language === 'hi' ? 'Mediobot सोच रहा है...' : language === 'hinglish' ? 'Mediobot soch raha hai...' : 'Mediobot is thinking...'}
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
              {/* Action Buttons & New Chat */}
              <div className="flex space-x-2 mb-3">
                <button
                  onClick={handleCameraCapture}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Camera size={16} />
                  <span>{language === 'hi' ? 'कैमरा' : language === 'hinglish' ? 'Camera' : 'Camera'}</span>
                </button>
                <button
                  onClick={handleFileUpload}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Upload size={16} />
                  <span>{language === 'hi' ? 'अपलोड' : language === 'hinglish' ? 'Upload' : 'Upload'}</span>
                </button>
                {/* New Chat Button */}
                <button
                  onClick={() => {
                    setMessages([
                      {
                        id: '1',
                        text: language === 'hi'
                          ? "Hello! मैं Mediobot हूँ, आपका AI स्वास्थ्य सहायक, जिसे Aman Kumar Happy ने भारत के लिए बनाया है. मैं आपकी मेडिकल क्वेरी, लक्षण, और प्रिस्क्रिप्शन में मदद कर सकता हूँ. कैसे मदद करूँ?"
                          : language === 'hinglish'
                            ? "Hello! Main Mediobot hoon, aapka AI health assistant, Aman Kumar Happy ne banaya hai. Medical queries, symptoms, ya prescription mein madad chahiye?"
                            : "Hello! I'm Mediobot, your AI health assistant built by Aman Kumar Happy for India. I can help with basic medical queries, symptom checking, and prescription analysis. How can I assist you today?",
                        sender: 'bot',
                        timestamp: new Date()
                      }
                    ]);
                    setCurrentMessageIndex(0);
                  }}
                  className="flex-1 bg-gradient-to-br from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-2 px-3 rounded-lg text-sm font-bold transition-colors flex items-center justify-center space-x-2 shadow-md border border-purple-200 dark:border-purple-700"
                  title={language === 'hi' ? 'नई चैट' : language === 'hinglish' ? 'Nayi Chat' : 'New Chat'}
                >
                  <span>🆕</span>
                  <span>{language === 'hi' ? 'नई चैट' : language === 'hinglish' ? 'Nayi Chat' : 'New Chat'}</span>
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
                      : language === 'hinglish'
                        ? 'Symptoms, health tips, ya Mediokart ke baare mein poochho...'
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
                  title={language === 'hi' ? 'आवाज़ से टाइप करें' : language === 'hinglish' ? 'Awaaz se type karo' : 'Voice typing'}
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
              <p className="text-xs text-purple-600 dark:text-purple-300 mt-2 text-center font-medium">
                ⚠️ {language === 'hi'
                  ? 'आपातकाल के लिए, आपातकालीन सेवाओं को कॉल करें। Mediobot केवल सामान्य मार्गदर्शन प्रदान करता है।'
                  : language === 'hinglish'
                    ? 'Emergency ke liye, emergency services ko call karo. Mediobot sirf general guidance deta hai.'
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