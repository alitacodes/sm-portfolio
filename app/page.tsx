"use client"

import { useState, useEffect } from "react"
import {
  ArrowDown,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Palette,
  Smartphone,
  Globe,
  X,
  Twitter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isVisible, setIsVisible] = useState(false)
  const [showComingSoonModal, setShowComingSoonModal] = useState(false)
  const [showNotAvailableModal, setShowNotAvailableModal] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "skills", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const projects = [
    {
      title: "Movie Website",
      description:
        "An entertainment platform that lets users enjoy any movie for free. Built with React and integrated with movie APIs for real-time data fetching, featuring responsive design, search functionality, and streaming capabilities.",
      image: "/images/movie-website-screenshot.png",
      tags: ["React", "API Integration", "Responsive Design", "JavaScript", "CSS"],
      github: "https://github.com/alitacodes/movie-22",
      live: "https://movie-22.vercel.app/",
    },
    {
      title: "The BookShelf",
      description:
        "A comprehensive digital library where users can find any book with detailed descriptions, PDF downloads, and ebook facilities. Features advanced search algorithms, user authentication, and cloud storage integration.",
      image: "/images/bookshelf-screenshot.png",
      tags: ["Next.js", "Database", "Cloud Storage", "Authentication", "PDF.js"],
      github: "https://github.com/alitacodes/BookFinder",
      live: "https://bookfinder1010.vercel.app/",
    },
    {
      title: "Bagaan",
      description:
        "An AI-powered plant disease diagnostician that detects crop diseases using machine learning models. Provides intelligent suggestions, prevention methods, and early weather condition alerts with real-time data processing.",
      image: "/images/bagaan-screenshot.png",
      tags: ["AI/ML", "TensorFlow", "Weather API", "Computer Vision", "React"],
      github: "https://github.com/alitacodes/plant_doctor_ai",
      live: "https://bagaan.vercel.app/",
    },
    {
      title: "Circlo",
      description:
        "A peer-to-peer rental platform promoting sustainability and cultural preservation. Built with modern web technologies, featuring secure payment integration, user verification, and geolocation services.",
      image: "/images/circlo-screenshot.png",
      tags: ["Full-Stack", "Payment Gateway", "Geolocation", "Node.js", "MongoDB"],
      github: "#",
      live: "#",
    },
    {
      title: "LOLand",
      description:
        "A Web3 meme platform empowering creators through tokenized content and community rewards. Implements blockchain technology, smart contracts, and cryptocurrency integration for decentralized content monetization.",
      image: "/images/loland-screenshot.jpg",
      tags: ["Web3", "Blockchain", "Smart Contracts", "Solidity", "React"],
      github: "https://github.com/alitacodes/LOLand",
      live: "#",
    },
  ]

  const skills = [
    { name: "Frontend Development", icon: Code, level: 95 },
    { name: "Backend Development", icon: Globe, level: 75 },
    { name: "WEB3 & Blockchain", icon: Smartphone, level: 70 },
    { name: "Quantum Computing", icon: Palette, level: 60 },
  ]

  const ComingSoonModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? "" : "hidden"}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-black/80 backdrop-blur-md border border-pink-400/30 rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 text-white/60 hover:text-pink-400 hover:bg-white/10 rounded-full p-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent">
              Coming Soon!
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              This feature is under development and will be available soon.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-yellow-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent">
              SM
            </div>
            <div className="hidden md:flex space-x-8">
              {["hero", "about", "projects", "skills", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 hover:text-pink-400 ${
                    activeSection === section ? "text-pink-400" : "text-white/70"
                  }`}
                >
                  {section === "hero" ? "Home" : section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-yellow-500/20 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent animate-gradient">
                Welcome to Sneha Mandal's Portfolio
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Full-Stack Developer & UI/UX Designer crafting digital experiences that inspire and engage
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 hover:from-pink-600 hover:via-purple-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105"
                onClick={() => scrollToSection("projects")}
              >
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 transition-all duration-300"
                onClick={() => scrollToSection("contact")}
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-white/60" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
              <p className="text-lg text-white/80 leading-relaxed">
                I'm skilled in Frontend Development and currently expanding my expertise in Backend Development and WEB3
                technologies. Alongside honing my development skills, I'm researching Quantum Computing because I
                believe it can be a key to unlocking the quantum world.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Beyond the technological realm, I'm passionate about Physics - particularly Astronomy and Quantum
                Physics. In pursuit of knowledge and creativity, I enjoy reading books, sketching, and playing piano.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Frontend Development",
                  "Backend Development",
                  "WEB3",
                  "Quantum Computing",
                  "React",
                  "Next.js",
                  "Node.js",
                  "Blockchain",
                ].map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-white/10 text-white border-white/20">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 rounded-full animate-spin-slow opacity-75"></div>
                <div className="absolute inset-2 bg-slate-900 rounded-full flex items-center justify-center">
                  <Image
                    src="/images/profile.jpg"
                    alt="Sneha Mandal - Full Stack Developer"
                    width={300}
                    height={300}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardHeader>
                  <CardTitle className="text-white">{project.title}</CardTitle>
                  <CardDescription className="text-white/70">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-pink-400/50 text-pink-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    {project.github !== "#" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10"
                        onClick={() => window.open(project.github, "_blank")}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10"
                        onClick={() => setShowNotAvailableModal(true)}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                    )}
                    {project.live !== "#" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10"
                        onClick={() => window.open(project.live, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10"
                        onClick={() => setShowComingSoonModal(true)}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Skills & Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 text-center group"
              >
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                    <skill.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-lg">{skill.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="text-white/70 text-sm">{skill.level}%</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Get In Touch</h2>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-4">Let's Work Together</h3>
            <p className="text-white/80 text-lg leading-relaxed">
              I'm always interested in new opportunities and exciting projects. Whether you have a question or just want
              to say hi, feel free to reach out!
            </p>
            <div className="flex items-center space-x-6 mt-6">
              <a
                href="https://github.com/alitacodes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 transition-colors duration-300 transform hover:scale-110"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/sneha-mandal-36938432b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 transition-colors duration-300 transform hover:scale-110"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://x.com/SnehaM01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 transition-colors duration-300 transform hover:scale-110"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="mailto:snehaman1010@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 transition-colors duration-300 transform hover:scale-110"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/60">© {new Date().getFullYear()} Sneha Mandal. All rights reserved.</p>
        </div>
      </footer>

      {/* Coming Soon Modal */}
      <ComingSoonModal isOpen={showComingSoonModal} onClose={() => setShowComingSoonModal(false)} />

      {/* Not Available Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center ${showNotAvailableModal ? "" : "hidden"}`}>
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowNotAvailableModal(false)}
        />
        <div className="relative bg-black/80 backdrop-blur-md border border-pink-400/30 rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 text-white/60 hover:text-pink-400 hover:bg-white/10 rounded-full p-2"
            onClick={() => setShowNotAvailableModal(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent">
              Not Available!
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">Not available at this moment!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
