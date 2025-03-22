
import { useEffect, useState, useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "Former tech executive with 15+ years experience in SaaS and enterprise software.",
    image: "https://placehold.co/400x400/667eea/ffffff?text=SJ"
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Engineering leader who previously scaled technology at multiple successful startups.",
    image: "https://placehold.co/400x400/4f46e5/ffffff?text=MC" 
  },
  {
    name: "Priya Patel",
    role: "Head of Product",
    bio: "Product expert specializing in user experience and customer-driven development.",
    image: "https://placehold.co/400x400/7c3aed/ffffff?text=PP"
  },
  {
    name: "James Wilson",
    role: "VP of Engineering",
    bio: "Leads our engineering team with expertise in scalable architecture and performance.",
    image: "https://placehold.co/400x400/2563eb/ffffff?text=JW"
  },
  {
    name: "Olivia Martinez",
    role: "Chief Marketing Officer",
    bio: "Creative marketer with a track record of building beloved brands in technology.",
    image: "https://placehold.co/400x400/0ea5e9/ffffff?text=OM"
  },
  {
    name: "David Kim",
    role: "Head of Customer Success",
    bio: "Passionate about ensuring customers achieve their goals with our platform.",
    image: "https://placehold.co/400x400/10b981/ffffff?text=DK"
  }
];

const timeline = [
  {
    year: "2019",
    title: "Founding",
    description: "Innovate was founded with a mission to transform how people work with technology."
  },
  {
    year: "2020",
    title: "Initial Product Launch",
    description: "Released our first product version, attracting early adopters and positive feedback."
  },
  {
    year: "2021",
    title: "Series A Funding",
    description: "Secured $10M in funding to accelerate product development and market expansion."
  },
  {
    year: "2022",
    title: "Team Growth",
    description: "Expanded our team to 50+ members across engineering, product, and customer success."
  },
  {
    year: "2023",
    title: "Enterprise Platform",
    description: "Launched our enterprise platform with advanced features for large organizations."
  },
  {
    year: "2024",
    title: "Global Expansion",
    description: "Opened offices in Europe and Asia to better serve our international customers."
  }
];

const TeamMember = ({ member, index }: { member: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <motion.div 
      ref={ref}
      className="group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative overflow-hidden rounded-xl mb-4 aspect-square">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-5 text-white">
            <h3 className="font-medium">{member.role}</h3>
          </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold">{member.name}</h3>
      <p className="text-gray-600 dark:text-gray-400 mt-1">{member.bio}</p>
    </motion.div>
  );
};

const TimelineItem = ({ item, index }: { item: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div 
      ref={ref}
      className="flex items-start gap-6 relative"
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline line */}
      <div className="absolute left-16 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800"></div>
      
      {/* Year bubble */}
      <div className="w-32 flex-shrink-0 pt-1.5">
        <div className="text-xl font-bold">{item.year}</div>
      </div>
      
      {/* Bubble */}
      <div className="relative z-10">
        <div className="w-6 h-6 rounded-full bg-primary border-4 border-white dark:border-gray-900"></div>
      </div>
      
      {/* Content */}
      <div className="flex-grow pb-12">
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
      </div>
    </motion.div>
  );
};

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-800 opacity-25"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading about page...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <main className="flex-grow pt-24">
        {/* Hero section */}
        <div ref={headerRef} className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900/20 py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                Our Story
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                We're on a mission to revolutionize how teams collaborate and build amazing products together. Our platform combines cutting-edge technology with intuitive design to solve complex problems with elegant solutions.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button className="mr-4">
                  Join Our Team
                </Button>
                <Button variant="outline">
                  Contact Us
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Values section */}
        <div className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Our Values
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                These principles guide everything we do
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "Innovation",
                  description: "We embrace creative thinking and strive to push boundaries in everything we build.",
                  icon: "💡"
                },
                {
                  title: "Customer Focus",
                  description: "Our customers' success is our success. We listen, learn, and deliver solutions that matter.",
                  icon: "👥"
                },
                {
                  title: "Quality",
                  description: "We have uncompromising standards and take pride in the excellence of our work.",
                  icon: "✨"
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <div className="text-4xl mb-4 mx-auto">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline section */}
        <div className="py-24 px-4 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                From inception to industry leader
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {timeline.map((item, index) => (
                <TimelineItem key={item.year} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Team section */}
        <div className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                The talented people behind our success
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {teamMembers.map((member, index) => (
                <TeamMember key={member.name} member={member} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="bg-primary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl max-w-3xl mx-auto mb-10 opacity-90">
              We're always looking for talented individuals who share our passion for innovation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-primary hover:bg-gray-100">
                View Open Positions
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Learn About Our Culture
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default About;
