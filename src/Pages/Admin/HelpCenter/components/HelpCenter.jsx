import React, { useState } from "react";
import {
  Search,
  HelpCircle,
  Book,
  MessageSquare,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
  FileText,
  Video,
  Download,
  Users,
} from "lucide-react";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFAQ, setOpenFAQ] = useState(null);

  const categories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <Book className="w-6 h-6" />,
      description: "Learn the basics of using our sales management system",
      color: "bg-blue-500",
    },
    {
      id: "orders",
      title: "Orders Management",
      icon: <FileText className="w-6 h-6" />,
      description: "How to create, manage, and track customer orders",
      color: "bg-green-500",
    },
    {
      id: "customers",
      title: "Customer Management",
      icon: <Users className="w-6 h-6" />,
      description: "Add, edit, and organize your customer database",
      color: "bg-purple-500",
    },
    {
      id: "payments",
      title: "Payments & Billing",
      icon: <Download className="w-6 h-6" />,
      description: "Process payments and manage billing information",
      color: "bg-yellow-500",
    },
    {
      id: "reports",
      title: "Reports & Analytics",
      icon: <Video className="w-6 h-6" />,
      description: "Generate reports and analyze your sales data",
      color: "bg-red-500",
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: <HelpCircle className="w-6 h-6" />,
      description: "Common issues and solutions",
      color: "bg-orange-500",
    },
  ];

  const faqs = [
    {
      category: "getting-started",
      question: "How do I get started with the Sales Management System?",
      answer:
        "To get started, first complete your profile setup by adding your business information. Then, import your existing customer data or start adding customers manually. Finally, configure your product catalog and payment methods.",
    },
    {
      category: "orders",
      question: "How do I create a new order?",
      answer:
        'Navigate to the Orders section and click "New Order". Select a customer, add products from your catalog, set quantities and pricing, then save the order. You can also send the order confirmation directly to the customer via email.',
    },
    {
      category: "customers",
      question: "Can I import customers from a CSV file?",
      answer:
        "Yes! Go to Customers > Import and upload your CSV file. Make sure your CSV includes columns for name, email, phone, and address. The system will validate the data before importing.",
    },
    {
      category: "payments",
      question: "What payment methods are supported?",
      answer:
        "We support all major credit cards, PayPal, bank transfers, and cash payments. You can configure which payment methods to accept in the Settings > Payments section.",
    },
    {
      category: "reports",
      question: "How do I generate sales reports?",
      answer:
        "Go to Reports > Sales Reports and select your date range, filters, and report type. You can export reports as PDF or Excel files, and schedule automatic report generation.",
    },
    {
      category: "troubleshooting",
      question: "Why am I having trouble logging in?",
      answer:
        'Make sure you are using the correct email and password. If you forgot your password, use the "Reset Password" link. Clear your browser cache if issues persist, or contact support.',
    },
  ];

  const quickActions = [
    {
      title: "User Guide",
      description: "Complete guide to using all features",
      icon: <Book className="w-5 h-5" />,
      link: "#",
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video walkthroughs",
      icon: <Video className="w-5 h-5" />,
      link: "#",
    },
    {
      title: "API Documentation",
      description: "Developer resources and API reference",
      icon: <FileText className="w-5 h-5" />,
      link: "#",
    },
  ];

  const filteredFAQs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 mt-4 rounded-2xl">
      <div className="mmx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl text-left font-bold mb-4 bg-gradient-to-r text-gray-600">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-left">
            Welcome to the Help Center, ThongVathana! How can we assist you
            today?
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles, guides, and FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.link}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center mb-3">
                <div className="p-2 bg-blue-500 rounded-lg mr-3 group-hover:bg-blue-400 transition-colors">
                  {action.icon}
                </div>
                <h3 className="text-lg font-semibold">{action.title}</h3>
              </div>
              <p className="text-gray-600">{action.description}</p>
            </a>
          ))}
        </div>

        {/* Help Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`bg-gray-50 border border-gray-200 rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition-all transform hover:scale-[1.02] ${
                  activeCategory === category.id
                    ? "ring-2 ring-blue-500 bg-gray-100"
                    : ""
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 ${category.color} rounded-lg mr-4`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            {activeCategory !== "all" && (
              <button
                onClick={() => setActiveCategory("all")}
                className="text-blue-600 hover:text-blue-500 transition-colors"
              >
                Show All FAQs
              </button>
            )}
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 last:border-b-0"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left hover:bg-gray-100 transition-colors focus:outline-none focus:bg-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium pr-4">{faq.question}</h3>
                    {openFAQ === index ? (
                      <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    )}
                  </div>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-blue-100 mb-6">
            Can't find what you're looking for? Our support team is ready to
            help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center px-6 py-3 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors">
              <MessageSquare className="w-5 h-5 mr-2" />
              Live Chat
            </button>
            <button className="flex items-center justify-center px-6 py-3 bg-blue-700 hover:bg-blue-800 bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors">
              <Mail className="w-5 h-5 mr-2" />
              Email Support
            </button>
            <button className="flex items-center justify-center px-6 py-3 bg-blue-700 hover:bg-blue-800 bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors">
              <Phone className="w-5 h-5 mr-2" />
              Call Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
