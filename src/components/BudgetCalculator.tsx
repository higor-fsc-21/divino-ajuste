"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingCart, MessageCircle } from "lucide-react";
import { ClothingType, BudgetItem } from "@/types";
import pricingData from "@/data/pricing.json";

export default function BudgetCalculator() {
  const [selectedClothingType, setSelectedClothingType] =
    useState<ClothingType | null>(null);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [showServices, setShowServices] = useState(false);

  const handleClothingTypeSelect = (clothingType: ClothingType) => {
    setSelectedClothingType(clothingType);
    setShowServices(true);
  };

  const handleServiceSelect = (
    serviceId: string,
    serviceName: string,
    price: number
  ) => {
    if (!selectedClothingType) return;

    const newItem: BudgetItem = {
      clothingType: selectedClothingType.name,
      service: serviceName,
      price: price,
      quantity: 1,
    };

    setBudgetItems([...budgetItems, newItem]);
    setShowServices(false);
    setSelectedClothingType(null);
  };

  const updateQuantity = (index: number, change: number) => {
    const newItems = budgetItems.map((item, i) => {
      if (i === index) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setBudgetItems(newItems);
  };

  const removeItem = (index: number) => {
    setBudgetItems(budgetItems.filter((_, i) => i !== index));
  };

  const getTotalPrice = () => {
    return budgetItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      "Olá! Gostaria de fazer um orçamento para um serviço de costura. Você poderia me ajudar a descrever o tipo de serviço que preciso?"
    );
    const whatsappUrl = `https://wa.me/${pricingData.contact.whatsapp}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const sendBudgetWhatsApp = () => {
    let message =
      "Olá! Gostaria de solicitar um orçamento com os seguintes itens:\n\n";

    budgetItems.forEach((item, index) => {
      message += `${index + 1}. ${item.clothingType} - ${item.service}\n`;
      message += `   Quantidade: ${item.quantity}x - R$ ${(
        item.price * item.quantity
      ).toFixed(2)}\n\n`;
    });

    message += `Total: R$ ${getTotalPrice().toFixed(2)}\n\n`;
    message += "Quando posso levar as peças?";

    const whatsappUrl = `https://wa.me/${
      pricingData.contact.whatsapp
    }?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="space-y-8">
      {/* Header elegante com gradiente */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
          <ShoppingCart className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Simulador de Orçamento
        </h2>
        <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
          Descubra quanto custará seu ajuste de forma rápida e transparente.
          Selecione sua peça e o tipo de serviço desejado.
        </p>
      </div>

      {!showServices && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Que tipo de peça você quer ajustar?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pricingData.clothingTypes.map((clothingType, index) => (
              <button
                key={clothingType.id}
                onClick={() => handleClothingTypeSelect(clothingType)}
                className="group relative p-6 bg-gradient-to-br from-white to-pink-50 border-2 border-pink-100 rounded-2xl hover:border-pink-300 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-out"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.5s ease-out forwards",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 text-lg group-hover:text-pink-600 transition-colors">
                      {clothingType.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {clothingType.services.length} serviços disponíveis
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
            <div className="text-center">
              <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-green-900 mb-2">
                Não encontrou seu tipo de peça?
              </h4>
              <p className="text-sm text-green-700 mb-4">
                Entre em contato conosco pelo WhatsApp e descreva o serviço que
                você precisa.
              </p>
              <button
                onClick={handleWhatsAppContact}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-200"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Falar no WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showServices && selectedClothingType && (
        <div className="space-y-6">
          {/* Header da seção de serviços */}
          <div className="flex flex-items-center justify-between">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full mb-4">
              <span className="font-medium">
                Serviços para {selectedClothingType.name}
              </span>
            </div>
            <button
              onClick={() => {
                setShowServices(false);
                setSelectedClothingType(null);
              }}
              className="text-gray-500 hover:text-pink-600 font-medium transition-colors"
            >
              ← Voltar para tipos de peça
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {selectedClothingType.services.map((service, index) => (
              <button
                key={service.id}
                onClick={() =>
                  handleServiceSelect(service.id, service.name, service.price)
                }
                className="group relative bg-gradient-to-r from-white to-purple-50 border-2 border-purple-100 rounded-2xl p-5 hover:border-purple-300 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-out"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.5s ease-out forwards",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex justify-between items-center">
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors text-lg">
                      {service.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Clique para adicionar ao orçamento
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                      R$ {service.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {budgetItems.length > 0 && (
        <div className="space-y-6">
          {/* Header do orçamento */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Seu Orçamento
            </h3>
            <p className="text-gray-600">
              Revise seus itens e ajuste as quantidades se necessário
            </p>
          </div>

          {/* Lista de itens do orçamento */}
          <div className="space-y-4">
            {budgetItems.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-white to-green-50 border-2 border-green-100 rounded-2xl p-5 hover:border-green-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {item.clothingType.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-lg">
                          {item.clothingType}
                        </div>
                        <div className="text-green-600 font-medium">
                          {item.service}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Controles de quantidade */}
                    <div className="flex items-center space-x-2 bg-white rounded-xl border-2 border-gray-200 p-1">
                      <button
                        onClick={() => updateQuantity(index, -1)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(index, 1)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Preço e remover */}
                    <div className="text-right">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-bold text-lg">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        onClick={() => removeItem(index)}
                        className="text-xs text-red-500 hover:text-red-700 mt-1 font-medium transition-colors"
                      >
                        Remover item
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total e finalização */}
          <div className="bg-gradient-to-r from-gray-50 to-green-50 border-2 border-green-200 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-gray-600 text-lg">
                  Total do Orçamento:
                </span>
                <div className="text-sm text-gray-500">
                  {budgetItems.length}{" "}
                  {budgetItems.length === 1 ? "item" : "itens"} selecionado
                  {budgetItems.length === 1 ? "" : "s"}
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  R$ {getTotalPrice().toFixed(2)}
                </div>
              </div>
            </div>

            <button
              onClick={sendBudgetWhatsApp}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-200 flex items-center justify-center space-x-3"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-lg">Finalizar Orçamento no WhatsApp</span>
            </button>

            <p className="text-center text-sm text-gray-600 mt-3">
              Você será redirecionado para o WhatsApp com seu orçamento completo
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
