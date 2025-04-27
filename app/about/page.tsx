"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const team = [
  {
    id: 1,
    name: "Ayush Bhardwaj",
    image: "/team/ayush.png",
    bio: "Upcoming Intern at Mimecast.",
    social: {
      linkedin: "https://www.linkedin.com/in/ayush-bhardwaj-ayush0505/",
      github: "#",
      email: "ayush.is22@bmsce.ac.inbmsce.ac.in",
    },
  },
  {
    id: 2,
    name: "Harsh Daftari",
    image: "/team/harsh.jpg",
    bio: "Current Research Intern at HPE.",
    social: {
      linkedin: "https://www.linkedin.com/in/harsh-daftari-571568253/",
      github: "https://github.com/harsh977",
      email: "harshdaftari.is22@bmsce.ac.in",
    },
  },
  {
    id: 3,
    name: "Nikhil Singh",
    image: "/team/nikhil.jpg",
    bio: "Currently interning at BMC Software.",
    social: {
      linkedin: "https://www.linkedin.com/in/nikhil-singh-a77b4325a/",
      github: "https://leetcode.com/u/Nikhil_Singh_zer0/",
      email: "nikhilsingh.is22@bmsce.ac.in",
    },
  },
  {
    id: 4,
    name: "Yash Singh",
    image: "/team/yash.jpg",
    bio: "Runner up in TechThon Hackathon, powered by Visionet Systems Inc.",
    social: {
      linkedin: "https://www.linkedin.com/in/yash-singh-988aa525a/",
      github: "https://github.com/include-yash",
      email: "yashsingh.is22@bmsce.ac.in",
    },
  },
];
export default function AboutPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#13071E] to-[#1E0B33] py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="relative inline-block">
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              About{" "}
              <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
                Us
              </span>
            </h1>
            <div className="absolute -right-6 -top-6 text-purple-400 animate-pulse">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
          <p className="mx-auto max-w-3xl text-xl text-slate-300">
            We are a group of friends studying in ISE at BMSCE, driven by a
            passion for innovation. We specialize in building production-level
            web applications that solve real-life problems with cutting-edge
            technology.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mb-24"
        >
          <h2 className="mb-12 text-center text-4xl font-bold text-purple-400">
            Our Team
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <motion.div
                key={member.id}
                variants={item}
                whileHover={{ y: -15, transition: { duration: 0.3 } }}
                className="group"
              >
                <Card className="relative h-full overflow-hidden border border-purple-500/20 bg-black/40 backdrop-blur-sm transition-all hover:border-purple-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                  <div className="relative aspect-square w-full overflow-hidden">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#13071E] via-[#13071E]/70 to-transparent opacity-80"></div>

                    <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                      <h3 className="mb-1 text-2xl font-bold">{member.name}</h3>
                      {/* <p className="mb-4 text-purple-400">{member.role}</p> */}
                      <p className="mb-6 text-slate-300">{member.bio}</p>
                      <div className="flex space-x-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-10 w-10 rounded-full bg-black/50 text-purple-400 backdrop-blur-sm hover:bg-black/80 hover:text-purple-300"
                        >
                          {/* <a href={member.social.twitter} aria-label="Twitter">
                            <Twitter className="h-5 w-5" />
                          </a> */}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-10 w-10 rounded-full bg-black/50 text-purple-400 backdrop-blur-sm hover:bg-black/80 hover:text-purple-300"
                        >
                          <a
                            href={member.social.linkedin}
                            aria-label="LinkedIn"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-10 w-10 rounded-full bg-black/50 text-purple-400 backdrop-blur-sm hover:bg-black/80 hover:text-purple-300"
                        >
                          <a href={member.social.github} aria-label="GitHub">
                            <Github className="h-5 w-5" />
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-10 w-10 rounded-full bg-black/50 text-purple-400 backdrop-blur-sm hover:bg-black/80 hover:text-purple-300"
                        >
                          <a
                            href={`mailto:${member.social.email}`}
                            aria-label="Email"
                          >
                            <Mail className="h-5 w-5" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 -z-10 bg-purple-500 opacity-5 blur-xl"></div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl rounded-xl border border-purple-500/20 bg-black/40 backdrop-blur-sm p-10 shadow-[0_0_30px_rgba(147,51,234,0.2)]"
        >
          <h2 className="mb-8 text-center text-4xl font-bold text-white">
            Our{" "}
            <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
              Mission
            </span>
          </h2>
          <p className="mb-6 text-xl text-slate-300">
            At VibeSense, we believe in creating AI technology that enhances
            human potential rather than replacing it. Our AI models are designed
            to work alongside humans, augmenting their capabilities and
            improving quality of life across various domains including
            healthcare, education, industry, and personal assistance.
          </p>
          <p className="mb-10 text-xl text-slate-300">
            We are committed to ethical AI development and ensuring our
            technology is accessible, safe, and beneficial for all. Our research
            is conducted with transparency and a focus on addressing real-world
            challenges.
          </p>
        </motion.div> */}
      </div>
    </div>
  );
}