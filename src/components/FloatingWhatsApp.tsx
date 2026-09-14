import { useEffect, useState } from "react";

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="https://wa.me/85290881857"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp 查詢菜包"
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-2xl shadow-green-900/30 transition-all duration-300 hover:scale-105 hover:bg-[#1ebe5a] md:bottom-7 md:right-7 md:px-5 md:py-4 md:text-base ${
        show ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30" />
      <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366]" />
      <svg className="relative h-6 w-6 md:h-7 md:w-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.6 1.1 2.8.1.2 1.8 2.7 4.4 3.8.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3L2 22l4.8-1.5c1.5.9 3.3 1.4 5.2 1.4 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.7 0-3.4-.5-4.8-1.4l-.3-.2-2.9.9.9-2.8-.2-.4c-1-1.5-1.5-3.2-1.5-5 0-4.9 4-8.8 8.8-8.8s8.8 4 8.8 8.8-3.9 8.9-8.8 8.9z"/>
      </svg>
      <span className="relative hidden sm:inline">WhatsApp 查詢菜包</span>
    </a>
  );
}
