import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  HomePage,
  ServicesPage,
  BookingPage,
  PricingPage,
  ContactPage,
  RechnerPage,
  ImpressumPage,
  Header,
  Footer
} from './pages';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/prices" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/rechner" element={<RechnerPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
