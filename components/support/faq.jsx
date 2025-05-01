import { useState } from "react";

const FAQ = () => {
  // State to track which FAQ is open (null means all closed)
  const [openFaq, setOpenFaq] = useState(null);

  // Toggle function to open/close FAQs
  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null); // Close if already open
    } else {
      setOpenFaq(index); // Open the clicked FAQ
    }
  };

  // FAQ data with questions and answers
  const faqItems = [
    {
      question: "How do I reset my password?",
      answer:
        "To reset your password, click on the 'Forgot Password' link on the login page. Enter your email address, and we'll send you instructions to reset your password.",
    },
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and navigating to 'Order History'. Click on the specific order to view its current status and tracking information.",
    },
    {
      question: "How do I contact customer service?",
      answer:
        "Our customer service team is available via email at support@example.com, by phone at (555) 123-4567, or through the chat feature on our website. Our hours are Monday-Friday, 9am-5pm EST.",
    },
  ];

  return (
    <div className="mb-6">
      <h2 className="mb-4 text-2xl font-semibold">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqItems.map((faq, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-md border"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="flex w-full items-center justify-between bg-gray-50 p-4 text-left transition-colors hover:bg-gray-100"
            >
              <span className="font-medium">{faq.question}</span>
              <span className="text-xl">{openFaq === index ? "−" : "+"}</span>
            </button>
            {openFaq === index && (
              <div className="bg-white p-4">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
