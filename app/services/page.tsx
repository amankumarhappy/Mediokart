'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ChevronDown, 
  ChevronUp, 
  Stethoscope, 
  PillIcon, 
  Siren, 
  Heart, 
  UserCog, 
  BookOpen, 
  Crown, 
  Building2, 
  ShieldCheck, 
  Bot,
  Calendar,
  User,
  Clock,
  Star,
  CheckCircle,
  Newspaper,
  GiftIcon,
  MapPin,
  HeartPulse
} from 'lucide-react'

import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from 'next/link'

const services = [
  {
    title: 'Find a Doctor',
    description: 'Search and connect with top healthcare professionals.',
    features: [
      'Search doctors by name, specialty, or location.',
      'View detailed profiles, including reviews, experience, and availability.',
      'Book appointments (online or in-person).'
    ],
    buttonText: 'Find a Doctor',
    icon: Stethoscope,
    additionalIcons: [User, Calendar, Star],
    action: '/find-doctor'
  },
  {
    title: 'Online Pharmacy',
    description: 'Order medicines and healthcare products online.',
    features: [
      'Browse an extensive catalog of medicines.',
      'Add items to a cart with "Add to Cart" and "View Details" options.',
      'Filter by categories: pain relief, supplements, and prescriptions.'
    ],
    buttonText: 'Order Now',
    icon: PillIcon,
    additionalIcons: [CheckCircle, Clock, Star],
    action: './medical-products'
  },
  {
    title: 'Emergency Services',
    description: 'Access emergency healthcare support anytime.',
    features: [
      'Real-time hospital locator based on GPS.',
      'Dedicated buttons for ambulance services or emergency care.',
      'Emergency contact numbers prominently displayed.'
    ],
    buttonText: 'Call Now',
    icon: Siren,
    additionalIcons: [MapPin, Clock, HeartPulse],
    action: 'tel:+919153737258'
  },
  {
    title: 'Preventive Healthcare',
    description: 'Manage your health proactively with preventive care options.',
    features: [
      'Health risk calculators.',
      'Tips for maintaining a healthy lifestyle.',
      'Regular health screening packages.'
    ],
    buttonText: 'Learn More',
    icon: Heart,
    additionalIcons: [HeartPulse, CheckCircle, Star],
    action: '/aurabox'
  },
  {
    title: 'Specialist Appointments',
    description: 'Book appointments with expert specialists.',
    features: [
      'Categories for specialists (cardiologists, orthopedists, etc.).',
      'Virtual and in-person appointment options.'
    ],
    buttonText: 'Book Now',
    icon: UserCog,
    additionalIcons: [Calendar, Clock, Star],
    action: 'coming-soon'
  },
  {
    title: 'Health Tips & Blogs',
    description: 'Stay updated with actionable health advice and informative blogs.',
    features: [
      'Weekly blogs on topics like nutrition, fitness, and mental health.',
      'A "Featured Tips" section.'
    ],
    buttonText: 'Read More',
    icon: BookOpen,
    additionalIcons: [Newspaper, Heart, Star],
    action: 'dual',
    links: {
      tips: '/health-tips',
      blogs: '/blogs'
    }
  },
  {
    title: 'Subscription Services',
    description: 'Exclusive healthcare benefits for subscribed users.',
    features: [
      'Weekly newsletters and health tips.',
      'Discounts on products and services.'
    ],
    buttonText: 'Subscribe',
    icon: Crown,
    additionalIcons: [GiftIcon, Star, CheckCircle],
    action: 'coming-soon'
  },
  {
    title: 'Hospital Affiliations',
    description: 'View our partner hospitals and clinics.',
    features: [
      'List of affiliated hospitals with contact details.',
      'A map view for nearby hospitals.'
    ],
    buttonText: 'View Hospitals',
    icon: Building2,
    additionalIcons: [MapPin, Star, CheckCircle],
    action: 'coming-soon'
  },
  {
    title: 'Insurance Support',
    description: 'Simplify your insurance needs with Mediokart support',
    features: [
      'Compare healthcare insurance plans.',
      'Assistance with claims and reimbursement processes.'
    ],
    buttonText: 'Get Support',
    icon: ShieldCheck,
    additionalIcons: [CheckCircle, Star, HeartPulse],
    action: 'coming-soon'
  },
  {
    title: 'Mediobot - AI Chatbot',
    description: 'A 24/7 virtual assistant for healthcare queries.',
    features: [
      'Instant responses to FAQs.',
      'Assistance with order tracking and appointments.'
    ],
    buttonText: 'Chat Now',
    icon: Bot,
    additionalIcons: [Clock, CheckCircle, Star],
    action: 'coming-soon'
  }
]

const ServiceCard = ({ service }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const router = useRouter()
  const MainIcon = service.icon

  const handleAction = () => {
    if (service.action === 'coming-soon') {
      alert('Coming Soon!')
      return
    }

    if (service.action === 'dual') {
      setShowOptions(true)
      return
    }

    if (service.action.startsWith('tel:')) {
      window.location.href = service.action
      return
    }

    router.push(service.action)
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mr-4">
            <MainIcon size={24} className="text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-primary">{service.title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="flex space-x-4 mb-4">
          {service.additionalIcons.map((Icon, index) => (
            <div key={index} className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
              <Icon size={16} className="text-gray-600" />
            </div>
          ))}
        </div>
        <motion.button
          className="text-primary font-semibold flex items-center hover:text-primary-dark"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isExpanded ? 'Hide Details' : 'Show Details'}
          {isExpanded ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
        </motion.button>
      </div>
      {isExpanded && (
        <motion.div
          className="px-6 pb-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="list-disc list-inside mb-4 space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="text-gray-600 flex items-start">
                <CheckCircle className="inline-block w-4 h-4 mr-2 mt-1 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          {showOptions && service.action === 'dual' ? (
            <div className="space-y-2">
              <motion.button
                className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition duration-300 w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(service.links.tips)}
              >
                Health Tips
              </motion.button>
              <motion.button
                className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition duration-300 w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push(service.links.blogs)}
              >
                Blogs
              </motion.button>
            </div>
          ) : (
            <motion.button
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition duration-300 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAction}
            >
              {service.buttonText}
            </motion.button>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-green-500 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </div>
  )
}