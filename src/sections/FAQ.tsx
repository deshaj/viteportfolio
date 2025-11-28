import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { Highlighter } from '../components/ui/TextHighlighter';

const faqs = [
  {
    question: "What services do you offer?",
    answer: "I specialize in Fullstack Web Development (React, Next.js) and advanced Discord Bot development. I can build custom websites, automation tools, and community management bots tailored to your needs."
  },
  {
    question: "How much do you charge for a project?",
    answer: "Pricing depends on the complexity and scope of the project. For simple bots or websites, I have standard packages. For custom requirements, let's discuss your needs to get a precise quote."
  },
  {
    question: "What tech stack do you use?",
    answer: "My primary stack includes TypeScript, React, Next.js, Tailwind CSS for web. For backend and bots, I use Node.js, Discord.js, Go (Golang), and MongoDB/PostgreSQL."
  },
  {
    question: "Do you provide support after deployment?",
    answer: "Yes! I provide 30 days of free support for bug fixes after the project is delivered. Long-term maintenance plans are also available if you need continuous updates."
  },
  {
    question: "How can I hire you?",
    answer: "You can reach out to me via the Contact section below, join my Discord server, or send me an email directly. I'm currently open for commissions and freelance work."
  }
];

const AccordionItem = ({ 
  question, 
  answer, 
  isOpen, 
  onClick 
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void; 
}) => {
  return (
    <div className="border-b border-[var(--nav-border)] last:border-none">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
      >
        <span className={`text-base md:text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-[var(--primary)]' : 'text-[var(--foreground)] group-hover:text-[var(--primary)]'}`}>
          {question}
        </span>
        <span className={`p-2 rounded-full border border-[var(--nav-border)] transition-all duration-300 ${isOpen ? 'bg-[var(--primary)] border-[var(--primary)] text-white' : 'text-[var(--secondary)]'}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm md:text-base text-[var(--secondary)] leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full flex justify-center py-24 px-6 bg-[var(--background)]">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="md:col-span-5 sticky top-32 mb-8 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] leading-tight mb-4">
            Need{' '}
            <Highlighter action="highlight" color="var(--primary)" padding={2}>
              <span className="text-[var(--foreground)]">Help?</span>
            </Highlighter>
            <br />
            <span className="text-[var(--secondary)] opacity-60">We're here to assist.</span>
          </h2>
          
          <p className="text-[var(--secondary)] text-lg mb-8 max-w-sm">
            Still have questions? Feel free to contact our friendly support team specialists.
          </p>

          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--nav-border)] text-[var(--foreground)] font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all group"
          >
            Contact Support
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        <div className="md:col-span-7">
          <div className="bg-[var(--card)] rounded-3xl p-6 md:p-8 border border-[var(--nav-border)]">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}