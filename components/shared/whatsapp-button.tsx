'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  message: string;
}

export default function WhatsAppButton({ message }: WhatsAppButtonProps) {
  const phoneNumber = "2348146068464"; // 
  
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button variant="outline" onClick={handleWhatsAppClick} className="w-full">
      <MessageCircle className="w-4 h-4" />
      WhatsApp Inquiry
    </Button>
  );
}
