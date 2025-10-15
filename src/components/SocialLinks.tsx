"use client";

import { MessageCircle, Instagram } from "lucide-react";
import pricingData from "@/data/pricing.json";

export default function SocialLinks() {
  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Olá! Gostaria de saber mais sobre os serviços do ateliê."
    );
    const whatsappUrl = `https://wa.me/${pricingData.contact.whatsapp}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const openInstagram = () => {
    const instagramUrl = `https://instagram.com/${pricingData.contact.instagram.replace(
      "@",
      ""
    )}`;
    window.open(instagramUrl, "_blank");
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={openWhatsApp}
        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="hidden sm:inline">WhatsApp</span>
      </button>

      <button
        onClick={openInstagram}
        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
      >
        <Instagram className="h-4 w-4" />
        <span className="hidden sm:inline">Instagram</span>
      </button>
    </div>
  );
}
