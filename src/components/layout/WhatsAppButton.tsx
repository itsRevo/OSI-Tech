import {MessageCircle} from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/491575644106"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Chat öffnen"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all hover:scale-105 hover:bg-[#1ebe5d] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 md:bottom-8 md:right-8"
    >
      <MessageCircle size={28} strokeWidth={2.5} />
    </a>
  );
}
