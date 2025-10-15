"use client";

import { Mail, Phone, User, Clock } from "lucide-react";
import pricingData from "@/data/pricing.json";

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Informações de Contato
        </h2>
        <p className="text-gray-600">
          Entre em contato conosco para tirar dúvidas ou agendar seu
          atendimento.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <User className="h-5 w-5 text-pink-600" />
            <span className="font-medium text-gray-900">Costureira</span>
          </div>
          <p className="text-gray-700 ml-8">{pricingData.contact.name}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Phone className="h-5 w-5 text-pink-600" />
            <span className="font-medium text-gray-900">Telefone</span>
          </div>
          <a
            href={`tel:${pricingData.contact.phone}`}
            className="text-blue-600 hover:text-blue-800 ml-8 transition-colors"
          >
            {pricingData.contact.phone}
          </a>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Mail className="h-5 w-5 text-pink-600" />
            <span className="font-medium text-gray-900">E-mail</span>
          </div>
          <a
            href={`mailto:${pricingData.contact.email}`}
            className="text-blue-600 hover:text-blue-800 ml-8 transition-colors"
          >
            {pricingData.contact.email}
          </a>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Clock className="h-5 w-5 text-pink-600" />
            <span className="font-medium text-gray-900">Horário</span>
          </div>
          <div className="ml-8 text-gray-700">
            <p>Terça a Sexta: 7:30h às 12h e 13:30h às 17h</p>
            <p>Sábado: 8h às 12h</p>
            <p className="text-sm text-gray-500">Domingo: Fechado</p>
          </div>
        </div>
      </div>

      <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
        <h3 className="font-medium text-pink-900 mb-2">Sobre Nosso Serviço</h3>
        <p className="text-pink-800 text-sm">
          Oferecemos serviços de costura e ajustes com mais de 15 anos de
          experiência. Trabalhamos com roupas sociais, casuais e festa.
          Atendimento personalizado e preços justos para todas as necessidades.
        </p>
      </div>
    </div>
  );
}
