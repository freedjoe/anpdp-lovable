
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/utils/i18n";
import { Mail, MapPin, Phone, Printer } from "lucide-react";

const Contact = () => {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key);

  const contactInfo = {
    address: '05, Rue Ahmed Kara - El-Biar 16006 - Alger, Algérie',
    phone: '+213 (0) 23 38 08 60',
    fax: '+213 (0) 23 38 08 48',
    email: 'contact@anpdp.dz',
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        <h1 className="mb-2 text-center text-4xl font-bold">{t('nav.contact')}</h1>
        <div className="mx-auto mb-10 mt-4 h-1 w-16 bg-primary" />
        
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Information */}
            <div className="rounded-xl border bg-card p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-semibold">{t('footer.contact')}</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-medium">{t('footer.address')}</h3>
                    <p className="text-muted-foreground">{contactInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-medium">{t('footer.phone')}</h3>
                    <p className="text-muted-foreground">{contactInfo.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Printer className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-medium">{t('footer.fax')}</h3>
                    <p className="text-muted-foreground">{contactInfo.fax}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-medium">{t('footer.email')}</h3>
                    <a 
                      href={`mailto:${contactInfo.email}`} 
                      className="text-primary hover:underline"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 h-60 w-full overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.2238447594136!2d3.0383!3d36.7574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQ1JzI2LjYiTiAzwrAwMicxNy45IkU!5e0!3m2!1sen!2sus!4v1652276580000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ANPDP Location"
                ></iframe>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="rounded-xl border bg-card p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-semibold">Send us a message</h2>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-lg border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-lg border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full rounded-lg border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full rounded-lg border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-primary w-full">
                  {t('actions.send')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
