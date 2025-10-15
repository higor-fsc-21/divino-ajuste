"use client";

import { useState } from "react";
import BudgetCalculator from "@/components/BudgetCalculator";
import LocationMap from "@/components/LocationMap";
import ContactInfo from "@/components/ContactInfo";
import SocialLinks from "@/components/SocialLinks";
import { Scissors, Calculator, MapPin, Phone } from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("budget");

  const sections = [
    { id: "budget", name: "Orçamento", icon: Calculator },
    { id: "contact", name: "Contato", icon: Phone },
    { id: "location", name: "Localização", icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex flex-col">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Scissors className="h-8 w-8 text-pink-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Divino Ajuste
                </h1>
                <p className="text-sm text-gray-600">Ateliê de Costuras</p>
              </div>
            </div>
            <SocialLinks />
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                    activeSection === section.id
                      ? "border-pink-500 text-pink-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{section.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeSection === "budget" && <BudgetCalculator />}
          {activeSection === "location" && <LocationMap />}
          {activeSection === "contact" && <ContactInfo />}
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-sm">
              © 2025 Divino Ajuste - Ateliê de Costuras. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
