"use client";

import { MapPin, ExternalLink } from "lucide-react";
import pricingData from "@/data/pricing.json";

export default function LocationMap() {
  const openGoogleMaps = () => {
    window.open(pricingData.location.googleMapsUrl, "_blank");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Nossa Localização
        </h2>
        <button
          onClick={openGoogleMaps}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Abrir no Google Maps</span>
        </button>
      </div>

      <div className="bg-gray-100 p-3 rounded-lg">
        <div className="flex items-start space-x-2">
          <MapPin className="h-5 w-5 text-pink-600 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900">Endereço</p>
            <p className="text-gray-600">{pricingData.location.address}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border border-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.046549282556!2d-35.2570632240808!3d-5.8490647941342955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b255b3c6d75c63%3A0x57bc3bd5ceab785e!2sR.%20Mira%20Mangue%2C%201109c%20-%20Planalto%2C%20Natal%20-%20RN%2C%2059074-856!5e0!3m2!1sen!2sbr!4v1760494608617!5m2!1sen!2sbr"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização do Divino Ajuste Ateliê"
        />
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">
          Clique no botão acima para obter direções no Google Maps
        </p>
      </div>
    </div>
  );
}
