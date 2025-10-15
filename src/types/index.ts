export interface Service {
  id: string;
  name: string;
  price: number;
}

export interface ClothingType {
  id: string;
  name: string;
  services: Service[];
}

export interface Contact {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  instagram: string;
}

export interface Location {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
}

export interface PricingData {
  clothingTypes: ClothingType[];
  contact: Contact;
  location: Location;
}

export interface BudgetItem {
  clothingType: string;
  service: string;
  price: number;
  quantity: number;
}

export interface Budget {
  items: BudgetItem[];
  total: number;
}
