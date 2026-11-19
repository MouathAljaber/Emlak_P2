import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { LangProvider } from './i18n';
import Nav from './components/Nav';
import Hero from './components/Hero';
import { Partner, Services } from './components/Services';
import { Gallery, HotelDetails, Hotels } from './components/Hotels';
import { Antalya, Quote, Steps, Training } from './components/Training';
import Request from './components/Request';
import { Faq, Package } from './components/Package';
import { Footer, MobileCta } from './components/Footer';

export default function App() {
  const [prefill, setPrefill] = useState(null);

  const handleQuickSubmit = (values) => {
    setPrefill({ ...values, at: Date.now() });
    document.getElementById('anfrage')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <LangProvider>
      {/* reducedMotion="user" turns animations off for people who ask their OS for less motion */}
      <MotionConfig reducedMotion="user">
        <Nav />
        <main>
          <Hero onQuickSubmit={handleQuickSubmit} />
          <Services />
          <Partner />
          <Hotels />
          <Gallery />
          <HotelDetails />
          <Training />
          <Antalya />
          <Steps />
          <Quote />
          <Request prefill={prefill} />
          <Package />
          <Faq />
        </main>
        <Footer />
        <MobileCta />
      </MotionConfig>
    </LangProvider>
  );
}
