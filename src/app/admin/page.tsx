"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Plus,
  Trash2,
  LogOut,
  Edit,
  X,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Instagram,
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  price: number;
}

interface ClothingType {
  id: string;
  name: string;
  services: Service[];
}

interface Contact {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  instagram: string;
}

interface Location {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
}

interface PricingData {
  clothingTypes: ClothingType[];
  contact: Contact;
  location: Location;
}

export default function AdminDashboard() {
  const [data, setData] = useState<PricingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "pricing" | "contact" | "location"
  >("pricing");
  const [editingService, setEditingService] = useState<{
    clothingIndex: number;
    serviceIndex: number;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/pricing");
      if (response.ok) {
        const pricingData = await response.json();
        setData(pricingData);
      } else {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Dados salvos com sucesso!");
      } else {
        alert("Erro ao salvar dados.");
      }
    } catch (error) {
      alert("Erro ao salvar dados.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  const updateClothingType = (index: number, field: string, value: string) => {
    if (!data) return;
    const newData = { ...data };
    newData.clothingTypes[index] = {
      ...newData.clothingTypes[index],
      [field]: value,
    };
    setData(newData);
  };

  const updateService = (
    clothingIndex: number,
    serviceIndex: number,
    field: string,
    value: string | number
  ) => {
    if (!data) return;
    const newData = { ...data };
    newData.clothingTypes[clothingIndex].services[serviceIndex] = {
      ...newData.clothingTypes[clothingIndex].services[serviceIndex],
      [field]: value,
    };
    setData(newData);
  };

  const addService = (clothingIndex: number) => {
    if (!data) return;
    const newData = { ...data };
    const newService: Service = {
      id: `new_service_${Date.now()}`,
      name: "Novo Serviço",
      price: 0,
    };
    newData.clothingTypes[clothingIndex].services.unshift(newService);
    setData(newData);
  };

  const removeService = (clothingIndex: number, serviceIndex: number) => {
    if (!data) return;
    if (confirm("Tem certeza que deseja remover este serviço?")) {
      const newData = { ...data };
      newData.clothingTypes[clothingIndex].services.splice(serviceIndex, 1);
      setData(newData);
    }
  };

  const addClothingType = () => {
    if (!data) return;
    const newData = { ...data };
    const newClothing: ClothingType = {
      id: `new_clothing_${Date.now()}`,
      name: "Novo Tipo de Roupa",
      services: [],
    };
    newData.clothingTypes.unshift(newClothing);
    setData(newData);
  };

  const removeClothingType = (index: number) => {
    if (!data) return;
    if (
      confirm(
        "Tem certeza que deseja remover este tipo de roupa e todos os seus serviços?"
      )
    ) {
      const newData = { ...data };
      newData.clothingTypes.splice(index, 1);
      setData(newData);
    }
  };

  const updateContact = (field: keyof Contact, value: string) => {
    if (!data) return;
    setData({
      ...data,
      contact: {
        ...data.contact,
        [field]: value,
      },
    });
  };

  const updateLocation = (field: string, value: string | number) => {
    if (!data) return;
    if (field === "lat" || field === "lng") {
      setData({
        ...data,
        location: {
          ...data.location,
          coordinates: {
            ...data.location.coordinates,
            [field]: Number(value),
          },
        },
      });
    } else {
      setData({
        ...data,
        location: {
          ...data.location,
          [field]: value,
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Painel Administrativo
            </h1>
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 sm:px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all duration-200 font-medium"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {saving ? "Salvando..." : "Salvar Alterações"}
                </span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab("pricing")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "pricing"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Preços e Serviços
              </div>
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "contact"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Contato
              </div>
            </button>
            <button
              onClick={() => setActiveTab("location")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "location"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Localização
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "pricing" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Tipos de Roupas e Serviços
              </h2>
              <button
                onClick={addClothingType}
                className="flex items-center gap-2 bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">
                  Adicionar Tipo de Roupa
                </span>
              </button>
            </div>

            {data.clothingTypes.map((clothing, clothingIndex) => (
              <div
                key={clothing.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do Tipo de Roupa
                    </label>
                    <input
                      type="text"
                      value={clothing.name}
                      onChange={(e) =>
                        updateClothingType(
                          clothingIndex,
                          "name",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => removeClothingType(clothingIndex)}
                    className="mt-6 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-700">
                      Serviços
                    </h3>
                    <button
                      onClick={() => addService(clothingIndex)}
                      className="flex items-center gap-1 text-sm bg-purple-50 text-purple-600 px-3 py-1 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      Adicionar Serviço
                    </button>
                  </div>

                  {clothing.services.map((service, serviceIndex) => (
                    <div
                      key={service.id}
                      className="flex items-center gap-2 p-2 sm:p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={service.name}
                          onChange={(e) =>
                            updateService(
                              clothingIndex,
                              serviceIndex,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="Nome do serviço"
                          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div className="w-20 sm:w-32">
                        <div className="relative">
                          <span className="absolute left-2 sm:left-3 top-1.5 sm:top-2 text-gray-500 text-xs sm:text-sm">
                            R$
                          </span>
                          <input
                            type="number"
                            value={service.price}
                            onChange={(e) =>
                              updateService(
                                clothingIndex,
                                serviceIndex,
                                "price",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            step="0.01"
                            placeholder="0.00"
                            className="w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          removeService(clothingIndex, serviceIndex)
                        }
                        className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {clothing.services.length === 0 && (
                    <p className="text-sm text-gray-500 italic text-center py-4">
                      Nenhum serviço adicionado ainda
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "contact" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Informações de Contato
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Nome
                </div>
              </label>
              <input
                type="text"
                value={data.contact.name}
                onChange={(e) => updateContact("name", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </div>
              </label>
              <input
                type="email"
                value={data.contact.email}
                onChange={(e) => updateContact("email", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Telefone
                </div>
              </label>
              <input
                type="text"
                value={data.contact.phone}
                onChange={(e) => updateContact("phone", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  WhatsApp
                </div>
              </label>
              <input
                type="text"
                value={data.contact.whatsapp}
                onChange={(e) => updateContact("whatsapp", e.target.value)}
                placeholder="+5584981075777"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  Instagram
                </div>
              </label>
              <input
                type="text"
                value={data.contact.instagram}
                onChange={(e) => updateContact("instagram", e.target.value)}
                placeholder="@divinoajusteatelie"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {activeTab === "location" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Informações de Localização
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Endereço
                </div>
              </label>
              <input
                type="text"
                value={data.location.address}
                onChange={(e) => updateLocation("address", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={data.location.coordinates.lat}
                  onChange={(e) => updateLocation("lat", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={data.location.coordinates.lng}
                  onChange={(e) => updateLocation("lng", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Maps URL
              </label>
              <input
                type="url"
                value={data.location.googleMapsUrl}
                onChange={(e) =>
                  updateLocation("googleMapsUrl", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
