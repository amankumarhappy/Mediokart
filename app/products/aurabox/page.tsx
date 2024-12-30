'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, ShoppingCart } from 'lucide-react'

export default function AuraBoxProduct() {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const images = [
    '/aurabox-1.jpg',
    '/aurabox-2.jpg',
    '/aurabox-3.jpg',
    '/aurabox-4.jpg',
  ]

  const reviews = [
    { id: 1, author: 'John Doe', rating: 5, comment: 'Great product! Highly recommended.' },
    { id: 2, author: 'Jane Smith', rating: 4, comment: 'Very useful, but a bit pricey.' },
    { id: 3, author: 'Mike Johnson', rating: 5, comment: 'Excellent quality and design.' },
  ]

  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log(`Added ${quantity} AuraBox(es) to cart`)
  }

  const handleBuyNow = () => {
    // Implement buy now functionality
    console.log(`Buying ${quantity} AuraBox(es) now`)
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <motion.div
            className="flex flex-col-reverse"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <div className="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    onClick={() => setSelectedImage(index)}
                  >
                    <span className="sr-only">AuraBox image {index + 1}</span>
                    <span className="absolute inset-0 rounded-md overflow-hidden">
                      <Image src={image} alt="" className="w-full h-full object-center object-cover" width={96} height={96} />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full aspect-w-1 aspect-h-1">
              <Image
                src={images[selectedImage]}
                alt="AuraBox"
                className="w-full h-full object-center object-cover sm:rounded-lg"
                width={600}
                height={600}
              />
            </div>
          </motion.div>

          {/* Product info */}
          <motion.div
            className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900">AuraBox</h2>
            <p className="mt-3 text-xl text-gray-500">Smart First Aid Kit</p>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">₹1,999</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>
                  AuraBox is a revolutionary smart first-aid kit designed to keep you prepared for any emergency. With its QR code scanning feature, customizable compartments, and integration with the Mediokart app, AuraBox brings healthcare into the digital age.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <Star
                      key={rating}
                      className={`${
                        reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length > rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      } h-5 w-5 flex-shrink-0`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="ml-3 text-sm text-gray-500">
                  {reviews.length} reviews
                </p>
              </div>
            </div>

            <form className="mt-6">
              <div className="mt-6 flex items-center">
                <label htmlFor="quantity" className="sr-only">
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  className="rounded-md border border-gray-300 text-left w-20 p-2"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  min="1"
                />
                <div className="ml-4 flex-1 flex">
                  <motion.button
                    type="button"
                    className="flex-1 bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleAddToCart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" aria-hidden="true" />
                    Add to cart
                  </motion.button>
                  <motion.button
                    type="button"
                    className="ml-4 flex-1 bg-green-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={handleBuyNow}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Buy Now
                  </motion.button>
                </div>
              </div>
            </form>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>
              <div className="border-t divide-y divide-gray-200">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Features</h3>
                  <ul className="mt-2 list-disc list-inside">
                    <li>QR Code Scanning for quick access to medicine information</li>
                    <li>Customizable compartments for organized storage</li>
                    <li>Integration with Mediokart app for reminders and health tracking</li>
                    <li>Durable and water-resistant design</li>
                  </ul>
                </div>
              </div>
            </section>
          </motion.div>
        </div>

        {/* Reviews */}
        <section aria-labelledby="reviews-heading" className="mt-16 sm:mt-24">
          <h2 id="reviews-heading" className="text-lg font-medium text-gray-900">
            Recent reviews
          </h2>
          <div className="mt-6 border-t border-b border-gray-200 pb-10 divide-y divide-gray-200 space-y-10">
            {reviews.map((review) => (
              <div key={review.id} className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
                <div className="lg:col-start-5 lg:col-span-8 xl:col-start-4 xl:col-span-9 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:items-start">
                  <div className="flex items-center xl:col-span-1">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <Star
                          key={rating}
                          className={`${
                            review.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                          } h-5 w-5 flex-shrink-0`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="ml-3 text-sm text-gray-700">
                      {review.rating}
                      <span className="sr-only"> out of 5 stars</span>
                    </p>
                  </div>

                  <div className="mt-4 lg:mt-6 xl:mt-0 xl:col-span-2">
                    <h3 className="text-sm font-medium text-gray-900">{review.author}</h3>
                    <div
                      className="mt-3 space-y-6 text-sm text-gray-500"
                      dangerouslySetInnerHTML={{ __html: review.comment }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

