
import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from 'framer-motion';

const pricingPlans = {
  monthly: [
    {
      name: "Starter",
      price: "$19",
      description: "Perfect for individuals and small projects",
      features: [
        "Up to 5 projects",
        "Basic analytics",
        "24/7 email support",
        "1GB storage",
        "Single user"
      ]
    },
    {
      name: "Professional",
      price: "$49",
      description: "Ideal for growing teams and businesses",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "10GB storage",
        "Up to 5 team members",
        "Custom integrations",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "Advanced features for large organizations",
      features: [
        "Everything in Professional",
        "Unlimited team members",
        "100GB storage",
        "Dedicated account manager",
        "Custom training",
        "Enhanced security",
        "SLA guarantees"
      ]
    }
  ],
  yearly: [
    {
      name: "Starter",
      price: "$190",
      period: "$15.83/mo",
      description: "Perfect for individuals and small projects",
      features: [
        "Up to 5 projects",
        "Basic analytics",
        "24/7 email support",
        "1GB storage",
        "Single user"
      ]
    },
    {
      name: "Professional",
      price: "$490",
      period: "$40.83/mo",
      description: "Ideal for growing teams and businesses",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "10GB storage",
        "Up to 5 team members",
        "Custom integrations",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$990",
      period: "$82.50/mo",
      description: "Advanced features for large organizations",
      features: [
        "Everything in Professional",
        "Unlimited team members",
        "100GB storage",
        "Dedicated account manager",
        "Custom training",
        "Enhanced security",
        "SLA guarantees"
      ]
    }
  ]
};

const Pricing = () => {
  const [isLoading, setIsLoading] = useState(true);

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
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading pricing...</p>
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
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 mb-4">
              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Simple, transparent pricing</span>
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Choose the Right Plan for Your <span className="text-gradient">Needs</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>

          <Tabs defaultValue="monthly" className="w-full max-w-3xl mx-auto mb-12">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly (Save 20%)</TabsTrigger>
            </TabsList>
            <TabsContent value="monthly" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingPlans.monthly.map((plan) => (
                  <motion.div 
                    key={plan.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: pricingPlans.monthly.indexOf(plan) * 0.1 }}
                    className={`relative rounded-xl overflow-hidden border ${plan.popular ? 'border-primary shadow-lg' : 'border-gray-200 dark:border-gray-800'}`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                        Popular
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-gray-500 dark:text-gray-400">/month</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{plan.description}</p>
                      <Button 
                        className={`w-full mb-6 ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white'}`}
                      >
                        Get Started
                      </Button>
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="yearly" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingPlans.yearly.map((plan) => (
                  <motion.div 
                    key={plan.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: pricingPlans.yearly.indexOf(plan) * 0.1 }}
                    className={`relative rounded-xl overflow-hidden border ${plan.popular ? 'border-primary shadow-lg' : 'border-gray-200 dark:border-gray-800'}`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                        Popular
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-gray-500 dark:text-gray-400">/year</span>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{plan.period}</div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{plan.description}</p>
                      <Button 
                        className={`w-full mb-6 ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white'}`}
                      >
                        Get Started
                      </Button>
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="max-w-3xl mx-auto mt-20">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid gap-6">
              {[
                {
                  question: "Can I upgrade or downgrade my plan anytime?",
                  answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
                },
                {
                  question: "Do you offer a discount for non-profits?",
                  answer: "We offer special pricing for non-profit organizations, educational institutions, and open-source projects. Please contact our sales team for more information."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans. We can also accommodate other payment methods for enterprise customers."
                },
                {
                  question: "Is there a setup fee?",
                  answer: "No, there are no setup fees or hidden charges. The price you see is the price you pay."
                }
              ].map((item, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-2">{item.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Pricing;
