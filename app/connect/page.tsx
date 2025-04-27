// //********************************* */

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Therapist {
  id: number
  name: string
  specialization: string
  experience: string
  locality: string
  city: string
  clinic: string
  consultationFee: string
  availability: string
  recommendation: string
  patientStories: string
  profileLink: string
  // Optional field for future distance feature
  distance?: string
  // New field for the profile picture URL
  profilePicture?: string
}

const therapists: Therapist[] = [
  {
    id: 1,
    name: "Ms. Paritosh Deepta",
    specialization: "Occupational Therapist",
    experience: "17 years experience overall",
    locality: "HSR Layout",
    city: "Bangalore",
    clinic: "Mom's Faith Clinic",
    consultationFee: "₹950",
    availability: "N/A",
    recommendation: "100%",
    patientStories: "3 Patient Stories",
    profileLink:
      "https://www.practo.com/bangalore/therapist/paritosh-deepta-occupational-therapist?practice_id=842751&specialization=Therapist&referrer=doctor_listing&page_uid=bcf816c4-86ce-4962-b87b-62f54f42ca22",
    // Dummy profile picture link
    profilePicture: "https://imagesx.practo.com/providers/ms-paritosh-deepta-occupational-therapist-bangalore-62553477-7cd0-4dbf-bc04-6b23698dd6ea.jpg?i_type=t_70x70-2x-webp",
  },
  {
    id: 2,
    name: "Ms. Twinkle Mohanty",
    specialization: "Occupational Therapist",
    experience: "3 years experience overall",
    locality: "Banashankari 2nd Stage",
    city: "Bangalore",
    clinic: "Bimba Enterprises Pvt. Ltd.",
    consultationFee: "₹800",
    availability: "N/A",
    recommendation: "N/A",
    patientStories: "N/A",
    profileLink:
      "https://www.practo.com/bangalore/therapist/ms-twinkle-mohanty-occupational-therapist?practice_id=1419502&specialization=Therapist&referrer=doctor_listing&page_uid=bcf816c4-86ce-4962-b87b-62f54f42ca22",
    profilePicture: "https://imagesx.practo.com/providers/ms-twinkle-mohanty-occupational-therapist-bangalore-f7a05761-67ed-4274-a1cd-c9cb9b12acd1.jpg?i_type=t_70x70-2x-webp",
  },
  {
    id: 3,
    name: "Ms. Keerthi A",
    specialization: "Occupational Therapist",
    experience: "4 years experience overall",
    locality: "Electronics City",
    city: "Bangalore",
    clinic: "Helen Speech and Hearing Centre",
    consultationFee: "₹800",
    availability: "N/A",
    recommendation: "N/A",
    patientStories: "N/A",
    profileLink:
      "https://www.practo.com/bangalore/therapist/keerthi-8-occupational-therapist?practice_id=1224028&specialization=Therapist&referrer=doctor_listing&page_uid=bcf816c4-86ce-4962-b87b-62f54f42ca22",
    profilePicture: "https://imagesx.practo.com/providers/ms-keerthi-a-occupational-therapist-bangalore-97fa18e8-80b3-47f7-a15a-09cab43d0fe7.jpg?i_type=t_70x70-2x-webp",
  },
  {
    id: 4,
    name: "Ms. Preetha G",
    specialization: "Occupational Therapist",
    experience: "3 years experience overall",
    locality: "Kasavanahalli",
    city: "Bangalore",
    clinic: "Helen Speech and Hearing Centre",
    consultationFee: "₹800",
    availability: "N/A",
    recommendation: "N/A",
    patientStories: "N/A",
    profileLink:
      "https://www.practo.com/bangalore/therapist/preetha-g-occupational-therapist?practice_id=1151740&specialization=Therapist&referrer=doctor_listing&page_uid=bcf816c4-86ce-4962-b87b-62f54f42ca22",
    profilePicture: "https://imagesx.practo.com/providers/ms-preetha-g-occupational-therapist-bangalore-473a3ba9-4845-4727-8a67-6d4956c384c8.jpg?i_type=t_70x70-2x-webp",
  },
  {
    id: 5,
    name: "Ms. Geetika Sood",
    specialization: "Occupational Therapist",
    experience: "26 years experience overall",
    locality: "Kundalahalli",
    city: "Bangalore",
    clinic: "Together We Achieve: Therapy Clinic",
    consultationFee: "₹800",
    availability: "N/A",
    recommendation: "86%",
    patientStories: "7 Patient Stories",
    profileLink:
      "https://www.practo.com/bangalore/therapist/geetika-sood-occupational-therapist?practice_id=850394&specialization=Therapist&referrer=doctor_listing&page_uid=bcf816c4-86ce-4962-b87b-62f54f42ca22",
    profilePicture: "https://imagesx.practo.com/providers/ms-geetika-sood-occupational-therapist-bangalore-61461c1a-6381-45ce-ad5c-198ffaa15cf7.jpg?i_type=t_70x70-2x-webp",
  },
  {
    id: 6,
    name: "Ms. sakshi bhatia",
    specialization: "Occupational Therapist",
    experience: "11 years experience overall",
    locality: "Kundalahalli",
    city: "Bangalore",
    clinic: "Tender Dental & Health Care",
    consultationFee: "₹750",
    availability: "N/A",
    recommendation: "100%",
    patientStories: "10 Patient Stories",
    profileLink:
      "https://www.practo.com/bangalore/therapist/sakshi-bhatia-occupational-therapist?practice_id=695286&specialization=Therapist&referrer=doctor_listing&page_uid=bcf816c4-86ce-4962-b87b-62f54f42ca22",
    profilePicture: "https://imagesx.practo.com/providers/ms-sakshi-bhatia-occupational-therapist-bangalore-65f5922a-a3cd-4bf9-84e5-46e5cd712ba6.jpg?i_type=t_70x70-2x-webp",
  },
  {
    id: 7,
    name: "Ms. Padmalaya Jali",
    specialization: "Occupational Therapist",
    experience: "13 years experience overall",
    locality: "Doddanekundi",
    city: "Bangalore",
    clinic: "Paravartan Occupational Therapy",
    consultationFee: "₹800",
    availability: "N/A",
    recommendation: "100%",
    patientStories: "26 Patient Stories",
    profileLink:
      "https://www.practo.com/bangalore/therapist/padmalaya-occupational-therapist?practice_id=1237286&specialization=Therapist&referrer=doctor_listing&page_uid=bcf816c4-86ce-4962-b87b-62f54f42ca22",
    profilePicture: "https://imagesx.practo.com/providers/ms-padmalaya-jali-occupational-therapist-bangalore-5208b98b-7ab2-4b35-9cb7-d65771594ffc.jpg?i_type=t_70x70-2x-webp",
  },
  {
    id: 8,
    name: "Mr. Tamilarasan N",
    specialization: "Occupational Therapist",
    experience: "6 years experience overall",
    locality: "Electronics City",
    city: "Bangalore",
    clinic: "Tiny Child Development Center",
    consultationFee: "₹800",
    availability: "N/A",
    recommendation: "89%",
    patientStories: "9 Patient Stories",
    profileLink:
      "https://www.practo.com/bangalore/therapist/tamilarasan-n-occupational-therapist?practice_id=1367236&specialization=Therapist&referrer=doctor_listing&page_uid=bcf816c4-86ce-4962-b87b-62f54f42ca22",
    profilePicture: "https://imagesx.practo.com/providers/mr-tamilarasan-n-occupational-therapist-bangalore-11d20755-55e3-4e5c-abbe-6cccf711456a.jpg?i_type=t_70x70-2x-webp",
  },
  {
    id: 9,
    name: "Ms. Patricia",
    specialization: "Occupational Therapist",
    experience: "21 years experience overall",
    locality: "Kalyan Nagar",
    city: "Bangalore",
    clinic: "Cornerstone Therapy Solutions",
    consultationFee: "₹800",
    availability: "N/A",
    recommendation: "100%",
    patientStories: "5 Patient Stories",
    profileLink:
      "https://www.practo.com/bangalore/therapist/patricia-3?practice_id=1131451&specialization=Therapist&referrer=doctor_listing&page_uid=bcf816c4-86ce-4962-b87b-62f54f42ca22",
    profilePicture: "https://imagesx.practo.com/providers/ms-patricia-pediatric-ot-bangalore-40a6a895-36d5-4ecd-91bc-1a2df4aabeb6.jpg?i_type=t_70x70-2x-webp",
  },
  {
    id: 10,
    name: "Ms. Preethi Shankar",
    specialization: "Occupational Therapist",
    experience: "15 years experience overall",
    locality: "Whitefield",
    city: "Bangalore",
    clinic: "RxDx Healthcare",
    consultationFee: "₹650",
    availability: "N/A",
    recommendation: "100%",
    patientStories: "1 Patient Story",
    profileLink:
      "https://www.practo.com/bangalore/therapist/preethi-shankar-occupational-therapist?practice_id=1154591&specialization=Therapist&referrer=doctor_listing&page_uid=bcf816c4-86ce-4962-b87b-62f54f42ca22",
    profilePicture: "",
  },
]

export default function TherapistsPage() {
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)
  // This state will later hold the computed distance from the user to the therapist's location
  const [userDistance, setUserDistance] = useState<Record<number, string>>({})

  // Skeleton function for calculating distance
  const calculateDistance = (id: number) => {
    // Placeholder for future backend integration
    setUserDistance((prev) => ({ ...prev, [id]: "Calculating..." }))
    // Later, you will replace this with a real calculation
    setTimeout(() => {
      setUserDistance((prev) => ({ ...prev, [id]: "5 km" }))
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 rounded-xl bg-black/40 p-8 text-center backdrop-blur-sm shadow-lg border border-purple-500/20"
        >
          <h1 className="mb-4 text-4xl font-bold text-white">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
              Expert Therapists
            </span>
          </h1>
          <p className="text-xl text-slate-300">
            Explore our curated list of occupational therapists with years of experience, patient stories,
            and high recommendations.
          </p>
        </motion.div>

        {/* Therapists Cards */}
        <motion.div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          {therapists.map((therapist, index) => (
            <motion.div
              key={therapist.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="group relative overflow-hidden border border-purple-500/20 bg-black/40 backdrop-blur-sm transition-all hover:border-purple-500 hover:shadow-lg">
                <CardContent className="p-6">
                  {/* Profile Photo */}
                  <div className="mb-4 flex justify-between items-center">
                    <div className="flex-1 pr-4">
                      <h3 className="mb-2 text-2xl font-bold text-white">{therapist.name}</h3>
                      {/* <p className="mb-1 text-slate-300"><span className="font-semibold">Specialization:</span> {therapist.specialization}</p>
                      <p className="mb-1 text-slate-300"><span className="font-semibold">Experience:</span> {therapist.experience}</p>
                      <p className="mb-1 text-slate-300"><span className="font-semibold">Clinic:</span> {therapist.clinic}</p>
                      <p className="mb-1 text-slate-300"><span className="font-semibold">Consultation Fee:</span> {therapist.consultationFee}</p>
                      <p className="mb-1 text-slate-300"><span className="font-semibold">Location:</span> {therapist.locality}, {therapist.city}</p>
                      <p className="mb-1 text-slate-300"><span className="font-semibold">Recommendation:</span> {therapist.recommendation}</p>
                      <p className="mb-4 text-slate-300"><span className="font-semibold">Patient Stories:</span> {therapist.patientStories}</p> */}
                    </div>
                    <img
                      src={therapist.profilePicture || "https://via.placeholder.com/150"}
                      alt=""
                      className="h-24 w-24 rounded-full object-cover border border-purple-500"
                    />
                  </div>

                  {/* <h3 className="mb-2 text-2xl font-bold text-white">{therapist.name}</h3> */}
                  <p className="mb-1 text-slate-300">
                    <span className="font-semibold">Specialization:</span> {therapist.specialization}
                  </p>
                  <p className="mb-1 text-slate-300">
                    <span className="font-semibold">Experience:</span> {therapist.experience}
                  </p>
                  <p className="mb-1 text-slate-300">
                    <span className="font-semibold">Clinic:</span> {therapist.clinic}
                  </p>
                  <p className="mb-1 text-slate-300">
                    <span className="font-semibold">Consultation Fee:</span> {therapist.consultationFee}
                  </p>
                  <p className="mb-1 text-slate-300">
                    <span className="font-semibold">Location:</span> {therapist.locality}, {therapist.city}
                  </p>
                  <p className="mb-1 text-slate-300">
                    <span className="font-semibold">Recommendation:</span> {therapist.recommendation}
                  </p>
                  <p className="mb-4 text-slate-300">
                    <span className="font-semibold">Patient Stories:</span> {therapist.patientStories}
                  </p>
                  {/* Distance Placeholder */}
                  <div className="mb-4 flex items-center gap-2 text-slate-300">
                    <MapPin className="h-5 w-5 text-purple-400" />
                    <span>
                      Distance: {userDistance[therapist.id] ? userDistance[therapist.id] : "Not Calculated"}
                    </span>
                    <Button size="sm" variant="outline" onClick={() => calculateDistance(therapist.id)}>
                      Calculate
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button variant="link" className="text-purple-400" asChild>
                      <Link href={therapist.profileLink} target="_blank">
                        View Profile
                      </Link>
                    </Button>
                    <Button variant="default" onClick={() => setSelectedTherapist(therapist)}>
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal for Therapist Details */}
      <AnimatePresence>
        {selectedTherapist && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTherapist(null)}
          >
            <motion.div
              className="relative max-w-3xl rounded-xl bg-black/80 p-8 shadow-xl border border-purple-500/30"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-purple-400 hover:bg-black/80 hover:text-purple-300"
                onClick={() => setSelectedTherapist(null)}
              >
                <X className="h-5 w-5" />
              </Button>
              {/* Modal Profile Photo */}
              <div className="mb-6 flex justify-center">
                <img
                  src={selectedTherapist.profilePicture || "https://via.placeholder.com/150"}
                  alt={selectedTherapist.name}
                  className="h-32 w-32 rounded-full object-cover border border-purple-500"
                />
              </div>
              <h2 className="mb-4 text-3xl font-bold text-white">{selectedTherapist.name}</h2>
              <p className="mb-2 text-slate-300">
                <strong>Specialization:</strong> {selectedTherapist.specialization}
              </p>
              <p className="mb-2 text-slate-300">
                <strong>Experience:</strong> {selectedTherapist.experience}
              </p>
              <p className="mb-2 text-slate-300">
                <strong>Clinic:</strong> {selectedTherapist.clinic}
              </p>
              <p className="mb-2 text-slate-300">
                <strong>Consultation Fee:</strong> {selectedTherapist.consultationFee}
              </p>
              <p className="mb-2 text-slate-300">
                <strong>Location:</strong> {selectedTherapist.locality}, {selectedTherapist.city}
              </p>
              <p className="mb-2 text-slate-300">
                <strong>Recommendation:</strong> {selectedTherapist.recommendation}
              </p>
              <p className="mb-4 text-slate-300">
                <strong>Patient Stories:</strong> {selectedTherapist.patientStories}
              </p>
              {/* Distance info in modal */}
              <div className="mb-4 flex items-center gap-2 text-slate-300">
                <MapPin className="h-5 w-5 text-purple-400" />
                <span>
                  Distance: {userDistance[selectedTherapist.id] ? userDistance[selectedTherapist.id] : "Not Calculated"}
                </span>
                <Button size="sm" variant="outline" onClick={() => calculateDistance(selectedTherapist.id)}>
                  Calculate Distance
                </Button>
              </div>
              <div>
                <Button variant="default" asChild>
                  <Link href={selectedTherapist.profileLink} target="_blank">
                    Visit Full Profile
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

