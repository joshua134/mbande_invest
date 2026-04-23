import React, { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import emailjs from 'emailjs-com';

interface FormData {
  name: string;
  email: string;
  phone: string;
  serviceCategory: string;
  description: string;
  preferredContact: string;
}

// Simple math CAPTCHA generator
const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ['+', '-'];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  let answer: number;
  
  if (operator === '+') {
    answer = num1 + num2;
  } else {
    answer = num1 - num2;
  }
  
  return {
    question: `${num1} ${operator} ${num2}`,
    answer: answer.toString()
  };
};

const QuoteForm: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    serviceCategory: 'electrical',
    description: '',
    preferredContact: 'phone'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  // Initialize EmailJS with your public key
  // You need to sign up at https://www.emailjs.com/ and get your keys
  useEffect(() => {
    // Replace with your EmailJS public key after signing up
    emailjs.init('YOUR_PUBLIC_KEY');
  }, []);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
    setCaptchaError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear general error when user starts typing
    if (errorMessage) setErrorMessage('');
  };

  const validateForm = (): boolean => {
    // Validate CAPTCHA
    if (captchaInput !== captcha.answer) {
      setCaptchaError('Incorrect answer. Please try again.');
      setErrorMessage('Security check failed. Please verify you are human.');
      refreshCaptcha();
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }

    // Validate phone (Kenyan format)
    const phoneRegex = /^(\+254|0)[17]\d{8}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setErrorMessage('Please enter a valid Kenyan phone number (e.g., 0722XXXXXX or +254722XXXXXX).');
      return false;
    }

    // Validate description is not too short
    if (formData.description.length < 20) {
      setErrorMessage('Please provide more details about your project (at least 20 characters).');
      return false;
    }

    return true;
  };

  const sendEmail = async (formDataToSend: FormData) => {
    // EmailJS configuration
    // You need to create these on EmailJS website
    const serviceId = 'YOUR_SERVICE_ID';     // Replace with your EmailJS service ID
    const templateId = 'YOUR_TEMPLATE_ID';   // Replace with your EmailJS template ID
    
    const templateParams = {
      to_name: 'Peter Isiye',
      to_email: 'isiyejoshua@gmail.com',
      from_name: formDataToSend.name,
      from_email: formDataToSend.email,
      phone: formDataToSend.phone,
      service_category: formDataToSend.serviceCategory,
      project_description: formDataToSend.description,
      preferred_contact: formDataToSend.preferredContact,
      reply_to: formDataToSend.email,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  };

  // Alternative: Using FormSubmit.co (Free, no registration needed)
  const sendViaFormSubmit = async (formDataToSend: FormData) => {
    const formUrl = 'https://formsubmit.co/ajax/isiyejoshua@gmail.com';
    
    const data = {
      name: formDataToSend.name,
      email: formDataToSend.email,
      phone: formDataToSend.phone,
      service: formDataToSend.serviceCategory,
      description: formDataToSend.description,
      preferred_contact: formDataToSend.preferredContact,
      _subject: `New Quote Request from ${formDataToSend.name}`,
      _captcha: 'false'
    };

    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('FormSubmit failed:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form first
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage('');
    
    // Try to send email using FormSubmit (simpler, no registration)
    // Option 1: Use FormSubmit (Recommended - Free, no setup needed)
    const success = await sendViaFormSubmit(formData);
    
    if (success) {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceCategory: 'electrical',
          description: '',
          preferredContact: 'phone'
        });
        refreshCaptcha();
      }, 3000);
    } else {
      setIsSubmitting(false);
      setErrorMessage('Failed to send your request. Please try again or call us directly.');
    }
  };

  if (isSubmitted) {
    return (
      <section id="quote" className="py-20 bg-gradient-to-br from-primary to-secondary">
        <div className="container-custom">
          <div className="bg-white rounded-2xl p-12 text-center max-w-2xl mx-auto">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-bounce" />
            <h3 className="text-2xl font-bold text-primary mb-4">Quote Request Sent!</h3>
            <p className="text-gray-600 mb-4">
              Thank you for choosing Mbande Investment Ltd. 
            </p>
            <p className="text-gray-600">
              We have sent a confirmation to <strong>{formData.email}</strong>. Our team will get back to you within 24 hours.
            </p>
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">
                📧 A copy has been sent to isiyejoshua@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" ref={ref} className="py-20 bg-gradient-to-br from-primary to-secondary">
      <div className="container-custom">
        <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
              Request a Quotation
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Tell us about your project and we'll provide a competitive quote within 24 hours
            </p>

            {/* Error Message Display */}
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number * (Kenyan format)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0722 886751 or +254722886751"
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: 0722XXXXXX or +254722XXXXXX</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Category *
                  </label>
                  <select
                    name="serviceCategory"
                    value={formData.serviceCategory}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="electrical">Electrical Services</option>
                    <option value="general">General Contracting</option>
                    <option value="it">IT Services</option>
                    <option value="kplc">KPLC Contracting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project / Service Description * (Min. 20 characters)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Please describe your project requirements, timeline, and any specific details..."
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  Characters: {formData.description.length}/minimum 20
                  {formData.description.length < 20 && formData.description.length > 0 && (
                    <span className="text-orange-500 ml-2">Need {20 - formData.description.length} more characters</span>
                  )}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Contact Method *
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="phone"
                      checked={formData.preferredContact === 'phone'}
                      onChange={handleChange}
                      className="text-primary"
                    />
                    <span>Phone Call</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === 'email'}
                      onChange={handleChange}
                      className="text-primary"
                    />
                    <span>Email</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="whatsapp"
                      checked={formData.preferredContact === 'whatsapp'}
                      onChange={handleChange}
                      className="text-primary"
                    />
                    <span>WhatsApp</span>
                  </label>
                </div>
              </div>

              {/* CAPTCHA Section */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Security Check *
                </label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="bg-primary text-white font-bold text-xl px-6 py-3 rounded-lg">
                      {captcha.question} = ?
                    </div>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                      title="Refresh CAPTCHA"
                    >
                      <RefreshCw className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => {
                      setCaptchaInput(e.target.value);
                      setCaptchaError('');
                      setErrorMessage('');
                    }}
                    placeholder="Enter the answer"
                    className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {captchaError && (
                    <p className="text-red-500 text-sm mt-2">{captchaError}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    * This helps us prevent automated spam submissions
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Quote Request</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By submitting this form, you agree to be contacted by Mbande Investment Ltd regarding your quote request.
                We respect your privacy and will not share your information.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
// import React, { useState } from 'react';
// import { Send, CheckCircle } from 'lucide-react';
// import { useScrollAnimation } from '../hooks/useScrollAnimation';

// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   serviceCategory: string;
//   description: string;
//   preferredContact: string;
// }

// const QuoteForm: React.FC = () => {
//   const { ref, isVisible } = useScrollAnimation();
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     phone: '',
//     serviceCategory: 'electrical',
//     description: '',
//     preferredContact: 'phone'
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate form submission
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     // Here you would send the data to your email service
//     console.log('Quote request:', formData);
    
//     setIsSubmitting(false);
//     setIsSubmitted(true);
    
//     // Reset form after 3 seconds
//     setTimeout(() => {
//       setIsSubmitted(false);
//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         serviceCategory: 'electrical',
//         description: '',
//         preferredContact: 'phone'
//       });
//     }, 3000);
//   };

//   if (isSubmitted) {
//     return (
//       <section id="quote" className="py-20 bg-gradient-to-br from-primary to-secondary">
//         <div className="container-custom">
//           <div className="bg-white rounded-2xl p-12 text-center max-w-2xl mx-auto animate__animated animate__fadeInUp">
//             <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate__animated animate__bounceIn" />
//             <h3 className="text-2xl font-bold text-primary mb-4">Quote Request Sent!</h3>
//             <p className="text-gray-600 mb-6">
//               Thank you for choosing Mbande Investment Ltd. Our team will get back to you within 24 hours.
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section id="quote" ref={ref} className="py-20 bg-gradient-to-br from-primary to-secondary">
//       <div className="container-custom">
//         <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
//           <div className="p-8 md:p-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
//               Request a Quotation
//             </h2>
//             <p className="text-gray-600 text-center mb-8">
//               Tell us about your project and we'll provide a competitive quote within 24 hours
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                     placeholder="John Doe"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Email Address *
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                     placeholder="john@example.com"
//                   />
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Phone Number *
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                     placeholder="+254 722 886751"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Service Category *
//                   </label>
//                   <select
//                     name="serviceCategory"
//                     value={formData.serviceCategory}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                   >
//                     <option value="electrical">Electrical Services</option>
//                     <option value="general">General Contracting</option>
//                     <option value="it">IT Services</option>
//                     <option value="kplc">KPLC Contracting</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Project / Service Description *
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   required
//                   rows={4}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                   placeholder="Please describe your project requirements, timeline, and any specific details..."
//                 ></textarea>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Preferred Contact Method *
//                 </label>
//                 <div className="flex space-x-4">
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name="preferredContact"
//                       value="phone"
//                       checked={formData.preferredContact === 'phone'}
//                       onChange={handleChange}
//                       className="text-primary"
//                     />
//                     <span>Phone Call</span>
//                   </label>
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name="preferredContact"
//                       value="email"
//                       checked={formData.preferredContact === 'email'}
//                       onChange={handleChange}
//                       className="text-primary"
//                     />
//                     <span>Email</span>
//                   </label>
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name="preferredContact"
//                       value="whatsapp"
//                       checked={formData.preferredContact === 'whatsapp'}
//                       onChange={handleChange}
//                       className="text-primary"
//                     />
//                     <span>WhatsApp</span>
//                   </label>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Sending...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Send className="w-5 h-5" />
//                     <span>Submit Quote Request</span>
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default QuoteForm;