
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12",
        scrolled 
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-medium tracking-tight">
            <span className="text-gradient font-bold">Innovate</span>
          </Link>
        </div>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {[
                    {
                      title: "Enterprise Suite",
                      href: "/products/enterprise",
                      description: "Advanced solutions for large organizations"
                    },
                    {
                      title: "Team Collaboration",
                      href: "/products/teams",
                      description: "Tools designed for agile team environments"
                    },
                    {
                      title: "Personal Workspace",
                      href: "/products/personal",
                      description: "Streamlined solutions for individual professionals"
                    },
                    {
                      title: "Integration Platform",
                      href: "/products/integrations",
                      description: "Connect your tools and automate workflows"
                    }
                  ].map((item) => (
                    <li key={item.title} className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            {item.title}
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {item.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/features" className={navigationMenuTriggerStyle()}>
                Features
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/pricing" className={navigationMenuTriggerStyle()}>
                Pricing
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about" className={navigationMenuTriggerStyle()}>
                About
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/showcase" className={navigationMenuTriggerStyle()}>
                Showcase
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center space-x-4">
          <Link to="/login" className="hidden md:block text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 text-gray-700 hover:text-black">
            Sign In
          </Link>
          <Button className="text-sm font-medium bg-primary text-white px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 transform hover:-translate-y-0.5">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
