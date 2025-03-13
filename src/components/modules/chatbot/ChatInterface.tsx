
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal, User, Bot, Loader2 } from 'lucide-react';
import GlassContainer from '../../ui-custom/GlassContainer';
import TypingEffect from '../../ui-custom/TypingEffect';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I\'m your CyberShield assistant. Ask me anything about cybersecurity, digital privacy, or online safety.',
  },
];

// Simulated response function - would be replaced with actual API call
const getAIResponse = async (message: string): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const responses = [
    "It's important to be careful about sharing private photos on any platform, including Snapchat. While Snapchat has disappearing messages, recipients can still screenshot or record your screen. Always assume that anything you share digitally could potentially become permanent.",
    "Using strong, unique passwords for each account is one of the most effective ways to protect yourself online. Consider using a password manager to generate and store complex passwords.",
    "Public Wi-Fi networks can be convenient but risky. Avoid accessing sensitive information (like banking) when connected to public networks. Consider using a VPN for additional protection.",
    "Two-factor authentication adds an important extra layer of security to your accounts. I recommend enabling it on all services that offer it, especially for email and financial accounts.",
    "Phishing attempts often create a false sense of urgency to trick you into acting quickly without thinking. Take your time to verify emails, especially those asking for personal information or containing unexpected links."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Add a placeholder for the assistant response
      const placeholderId = (Date.now() + 1).toString();
      setMessages(prev => [
        ...prev,
        {
          id: placeholderId,
          role: 'assistant',
          content: '',
          isTyping: true,
        },
      ]);
      
      // Get AI response
      const response = await getAIResponse(input);
      
      // Update the placeholder with the actual response
      setMessages(prev => 
        prev.map(msg => 
          msg.id === placeholderId
            ? { id: placeholderId, role: 'assistant', content: response }
            : msg
        )
      );
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <GlassContainer className="w-full h-[600px] max-h-[80vh] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-cybershield-accent" />
          <h3 className="font-medium">Cyber Chatbot</h3>
        </div>
        <div className="flex items-center space-x-2 text-sm text-cybershield-400">
          <span className={cn(
            'flex items-center',
            isLoading ? 'text-cybershield-accent' : 'text-cybershield-success'
          )}>
            {isLoading ? (
              <>
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-cybershield-success mr-1"></div>
                <span>Online</span>
              </>
            )}
          </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex items-start max-w-[85%] mb-4',
              message.role === 'user' ? 'ml-auto' : 'mr-auto'
            )}
          >
            <div 
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full shrink-0 mr-2',
                message.role === 'user' 
                  ? 'bg-cybershield-accent text-white' 
                  : 'bg-cybershield-100 text-cybershield-800'
              )}
            >
              {message.role === 'user' ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>
            <div
              className={cn(
                'rounded-lg p-3',
                message.role === 'user'
                  ? 'bg-cybershield-accent text-white rounded-tr-none'
                  : 'bg-white/20 backdrop-blur-sm border border-white/10 rounded-tl-none'
              )}
            >
              {message.isTyping ? (
                <TypingEffect text={message.content} />
              ) : (
                <p className="text-sm">{message.content}</p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about cybersecurity..."
            className="cybershield-input pr-10"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full transition-colors',
              input.trim() && !isLoading
                ? 'bg-cybershield-accent text-white'
                : 'bg-cybershield-200 text-cybershield-400'
            )}
          >
            <SendHorizonal className="w-4 h-4" />
          </button>
        </div>
      </form>
    </GlassContainer>
  );
};

export default ChatInterface;
