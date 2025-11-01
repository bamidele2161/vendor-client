import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Value } from "../Values/Value";
import { designTokens } from "../../styles/designTokens";

interface FooterProp {
  value?: boolean;
}

const Footer: React.FC<FooterProp> = ({ value }) => {
  const footerLinks = {
    company: [
      { name: "About Us", href: "/about-us" },
      { name: "Contact", href: "/contact" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
    ],
    customerService: [
      { name: "Help Center", href: "/help" },
      { name: "Returns & Exchanges", href: "/returns" },
      { name: "Order Tracking", href: "/tracking" },
      { name: "FAQ", href: "/faq" },
    ],
    shop: [
      { name: "Men's Clothing", href: "/products?category=men" },
      { name: "Women's Clothing", href: "/products?category=women" },
      { name: "Accessories", href: "/products?category=accessories" },
      { name: "Sale", href: "/products?sale=true" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Refund Policy", href: "/refund" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/share/18sQ1aLHjo/?mibextid=kFxxJD",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://x.com/ashobox",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/ashobox?igsh=MXJ4aDZ2OTdxem92ag%3D%3D&utm_source=qr",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "#",
    },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: "123 Fashion Street, Lagos, Nigeria",
    },
    {
      icon: Phone,
      text: "+234 (0) 123 456 7890",
    },
    {
      icon: Mail,
      text: "hello@ashobox.com",
    },
  ];

  return (
    <>
      {value && <Value />}

      <footer
        className={`${designTokens.colors.background.primary} text-white`}
      >
        <div className="w-full">
          {/* Main Footer Content */}
          <div
            className={`${designTokens.spacing.paddingX.lg} ${designTokens.spacing.paddingY.xl}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {/* Brand Section */}
              <div className="xl:col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h3
                    className={`${designTokens.typography.heading.h3} text-white mb-4`}
                  >
                    AshoBox
                  </h3>
                  <p
                    className={`${designTokens.typography.body.base} text-gray-300 leading-relaxed mb-6`}
                  >
                    Discover your unique style with our curated collection of
                    premium fashion. From trendy streetwear to elegant formal
                    wear, we bring you the best in contemporary fashion.
                  </p>
                </motion.div>

                {/* Contact Info */}
                <div className="space-y-3">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3"
                    >
                      <item.icon className="h-4 w-4 text-secColor" />
                      <span
                        className={`${designTokens.typography.body.sm} text-gray-300`}
                      >
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Company Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h5
                  className={`${designTokens.typography.heading.h5} text-white mb-6`}
                >
                  Company
                </h5>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className={`${designTokens.typography.body.sm} text-gray-300 hover:text-secColor ${designTokens.animation.transition.base} group flex items-center`}
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Customer Service Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h5
                  className={`${designTokens.typography.heading.h5} text-white mb-6`}
                >
                  Customer Service
                </h5>
                <ul className="space-y-3">
                  {footerLinks.customerService.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className={`${designTokens.typography.body.sm} text-gray-300 hover:text-secColor ${designTokens.animation.transition.base} group flex items-center`}
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Shop Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h5
                  className={`${designTokens.typography.heading.h5} text-white mb-6`}
                >
                  Shop
                </h5>
                <ul className="space-y-3">
                  {footerLinks.shop.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className={`${designTokens.typography.body.sm} text-gray-300 hover:text-secColor ${designTokens.animation.transition.base} group flex items-center`}
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <Separator className="my-8 bg-gray-700" />

            {/* Newsletter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              <div>
                <h4
                  className={`${designTokens.typography.heading.h4} text-white mb-2`}
                >
                  Stay Updated
                </h4>
                <p
                  className={`${designTokens.typography.body.sm} text-gray-300`}
                >
                  Subscribe to our newsletter for the latest fashion trends,
                  exclusive offers, and style tips.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-secColor"
                />
                <Button
                  className={`${designTokens.colors.background.secondary} hover:bg-secColor/90 text-white px-6 whitespace-nowrap`}
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>

            <Separator className="my-8 bg-gray-700" />

            {/* Bottom Section */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4"
              >
                <span
                  className={`${designTokens.typography.body.sm} text-gray-300 mr-2`}
                >
                  Follow us:
                </span>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-secColor ${designTokens.animation.transition.base} ${designTokens.animation.hover.scale}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </motion.div>

              {/* Legal Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center lg:justify-end gap-4"
              >
                {footerLinks.legal.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className={`${designTokens.typography.body.xs} text-gray-400 hover:text-secColor ${designTokens.animation.transition.base}`}
                  >
                    {link.name}
                  </a>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className={`${designTokens.colors.background.secondary} py-4`}>
            <div className={`${designTokens.spacing.paddingX.lg}`}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row justify-between items-center gap-4"
              >
                <p
                  className={`${designTokens.typography.body.sm} text-white text-center sm:text-left`}
                >
                  &copy; {new Date().getFullYear()} AshoBox. All rights
                  reserved.
                </p>
                {/* <p className={`${designTokens.typography.body.xs} text-gray-300 text-center sm:text-right`}>
                  Made with ❤️ in Nigeria
                </p> */}
              </motion.div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
