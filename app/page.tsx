'use client'

import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import AuraBoxHighlight from './components/AuraBoxHighlight'
import CompanyOverview from './components/CompanyOverview'
import ContactForm from './components/ContactForm'
import HealthTips from './components/HealthTips'
import Newsletter from './components/Newsletter'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <AuraBoxHighlight />
      <CompanyOverview />
      <HealthTips />
      <ContactForm />
      <Newsletter />
    </main>
  )
}

