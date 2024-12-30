'use client'

import { motion } from 'framer-motion'

const GeneralTips = () => {
  const mustHaveHealthTips = [
    { title: "Stay Hydrated", tip: "Drink plenty of water throughout the day to maintain hydration, which is crucial for bodily functions." },
    { title: "Balanced Diet", tip: "Consume a variety of foods, including fruits, vegetables, whole grains, and lean proteins to ensure you get all necessary nutrients." },
    { title: "Regular Exercise", tip: "Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity each week, along with muscle-strengthening exercises on two or more days." },
    { title: "Adequate Sleep", tip: "Adults should aim for 7-9 hours of quality sleep each night to support overall health and cognitive function." },
    { title: "Stress Management", tip: "Engage in stress-reducing activities such as meditation, yoga, or deep-breathing exercises to improve mental well-being." },
    { title: "Regular Check-ups", tip: "Schedule routine health screenings and check-ups with healthcare providers to catch potential health issues early." },
    { title: "Avoid Smoking and Limit Alcohol", tip: "Refrain from smoking and limit alcohol consumption to reduce the risk of chronic diseases." },
    { title: "Practice Good Hygiene", tip: "Wash hands regularly, especially before meals and after using the restroom, to prevent infections." },
  ]

  const initialStepsInFirstAid = [
    { title: "Assess the Scene", tip: "Ensure the area is safe before approaching the injured person. Look for potential dangers that could harm you or others." },
    { title: "Check Responsiveness", tip: "If the person is unresponsive, call emergency services immediately (e.g., 911) and begin first aid procedures." },
    { title: "Airway, Breathing, Circulation (ABC)", tip: "Airway: Ensure the airway is clear. If not breathing, perform rescue breaths. Breathing: Check for normal breathing. If absent, initiate CPR. Circulation: If there’s severe bleeding, apply direct pressure to control it." },
  ]

  const specificFirstAidTechniques = [
    { title: "Choking", tip: "For adults and children over one year old, perform back blows followed by abdominal thrusts (Heimlich maneuver) until the obstruction is cleared." },
    { title: "Fractures", tip: "Keep the affected area still and immobilized. Avoid moving the person unless necessary for safety. Call for medical help if needed." },
    { title: "Burns", tip: "Cool the burn under running water for at least 10 minutes. Cover it with a sterile dressing without applying ice directly to the burn." },
    { title: "Heart Attack", tip: "If someone shows signs of a heart attack (chest pain, shortness of breath), call emergency services and have them sit comfortably while waiting for help. If they become unresponsive, start CPR immediately." },
    { title: "Seizures", tip: "Protect the person from injury by clearing the area. Place them on their side if possible and cushion their head. Do not restrain their movements or put anything in their mouth." },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Must-Have Health Tips
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Health Tips</h2>
            <ul className="space-y-4">
              {mustHaveHealthTips.map((tip, index) => (
                <li key={index}>
                  <h3 className="font-semibold text-lg text-blue-600">{tip.title}</h3>
                  <p className="text-gray-700">{tip.tip}</p>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-600">First Aid Techniques</h2>
            <ul className="space-y-4">
              {initialStepsInFirstAid.map((tip, index) => (
                <li key={index}>
                  <h3 className="font-semibold text-lg text-blue-600">{tip.title}</h3>
                  <p className="text-gray-700">{tip.tip}</p>
                </li>
              ))}
            </ul>
            <ul className="space-y-4">
              {specificFirstAidTechniques.map((tip, index) => (
                <li key={index}>
                  <h3 className="font-semibold text-lg text-blue-600">{tip.title}</h3>
                  <p className="text-gray-700">{tip.tip}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default GeneralTips
