
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/utils/i18n";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQPage = () => {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);

  // This would be fetched from Supabase in the real implementation
  const faqs = [
    {
      question: "What is the role of ANPDP?",
      answer: "The National Authority for Personal Data Protection (ANPDP) is responsible for ensuring the protection of personal data and privacy rights in Algeria. It oversees the proper application of data protection laws and regulations."
    },
    {
      question: "Who needs to register with ANPDP?",
      answer: "Any organization or entity that collects, processes, or stores personal data of Algerian citizens or residents needs to register with ANPDP to ensure compliance with data protection regulations."
    },
    {
      question: "What are the penalties for non-compliance?",
      answer: "Non-compliance with data protection regulations can result in administrative sanctions, fines, and in serious cases, legal proceedings. The exact penalties depend on the nature and severity of the violation."
    },
    {
      question: "How can I report a data breach?",
      answer: "You can report a data breach by contacting ANPDP through the contact form on our website, by email, or by phone. It's important to report breaches as soon as possible to mitigate potential damage."
    },
    {
      question: "What rights do individuals have regarding their personal data?",
      answer: "Individuals have the right to access, rectify, and erase their personal data. They also have the right to object to processing, data portability, and to not be subject to automated decision-making, including profiling."
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        <h1 className="mb-2 text-center text-4xl font-bold">Frequently Asked Questions</h1>
        <div className="mx-auto mb-10 mt-4 h-1 w-16 bg-primary" />
        
        <div className="mx-auto max-w-4xl">
          <p className="mb-10 text-center text-lg leading-relaxed">
            Find answers to common questions about personal data protection and the role of ANPDP.
          </p>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-10 text-center">
            <p className="text-muted-foreground">
              Don't see your question here? Contact us for more information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
