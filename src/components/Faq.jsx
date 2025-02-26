import Navigation from "./common/Navigation";
import Footer from "./common/Footer";

export default function Faq() {
  const faqs = [
    {
      question: "What is TransparentNepal?",
      answer:
        "TransparentNepal is a platform that allows users to review companies, post and search for jobs, and get salary information based on employee insights.",
    },
    {
      question: "How can I apply for a job on TransparentNepal?",
      answer:
        "To apply for a job on TransparentNepal, create a profile, browse job listings, and apply directly through the job posting. You can also upload your resume and save job listings for future reference.",
    },
    {
      question: "How can I leave a review for a company?",
      answer:
        "Once you create an account on TransparentNepal, you can leave a review by visiting the company's page and submitting your feedback about the work environment, compensation, and overall experience.",
    },
    {
      question: "Can I trust the reviews on TransparentNepal?",
      answer:
        "TransparentNepal reviews are submitted by employees and job seekers, so while they are not verified, the platform provides tools to report any inappropriate or misleading content.",
    },
    {
      question: "How do I search for jobs on TransparentNepal?",
      answer:
        "To search for jobs on TransparentNepal, go to the job search section, enter relevant keywords, location, and filters, and browse through the job listings. You can also set up job alerts to get notifications.",
    },
    {
      question: "What is the TransparentNepal salary estimate?",
      answer:
        "TransparentNepal salary estimates are based on self-reported data from employees. These estimates can give you an idea of salary ranges for specific roles and locations.",
    },
    {
      question: "How can I edit my review on TransparentNepal?",
      answer:
        "To edit your review on TransparentNepal, go to your profile, find the review you want to update, and click the 'Edit' button. Make sure to submit any changes before exiting.",
    },
    {
      question: "Is TransparentNepal free to use?",
      answer:
        "Yes, TransparentNepal is free to use for both job seekers and employees looking to leave reviews or access salary information. Some premium features may require a subscription.",
    },
    {
      question: "Can I remain anonymous on TransparentNepal?",
      answer:
        "Yes, TransparentNepal allows users to remain anonymous when leaving reviews and posting salary information, so your identity is protected.",
    },
    {
      question: "How can I contact TransparentNepal support?",
      answer:
        "You can contact TransparentNepal support by visiting the 'Help Center' on their website, where you'll find answers to common questions or the option to submit a support request.",
    },
    {
      question: "What is the TransparentNepal mobile app?",
      answer:
        "The TransparentNepal mobile app allows you to search for jobs, read reviews, and browse salary information directly from your phone or tablet. It's available for both iOS and Android.",
    },
    {
      question: "How do I create a TransparentNepal profile?",
      answer:
        "To create a TransparentNepal profile, simply sign up with your email or through social media accounts. Once registered, you can start applying for jobs, leaving reviews, and building your profile.",
    },
    {
      question: "How can I get more reviews for my company?",
      answer:
        "To get more reviews for your company, encourage employees to leave honest feedback about their work experiences. You can also respond to reviews to show that you value employee input.",
    },
  ];

  return (
    <>
      <Navigation />
      <div className="w-screen h-[86vh]  flex items-center justify-center">
        <div className="w-[80%] h-[90%] bg-white p-6 rounded-2xl border-1 overflow-y-auto custom-scrollbar-one">
          {/* Container for all FAQ cards */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#f1f1f0] p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full"
              >
                {/* FAQ Question */}
                <h3 className="text-xl font-bold text-black mb-4">
                  {faq.question}
                </h3>

                {/* FAQ Answer */}
                <p className="text-gray-700 text-sm mb-4 text-justify">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
