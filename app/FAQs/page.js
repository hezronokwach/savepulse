import Navbar from "@/Components/Navbar/page";

export default function Contact() {
  const faqs = [
    {
      question: "What is SavePulse?",
      answer:
        "SavePulse is a web and mobile application designed to restore trust in the blood donation system by providing transparency and traceability for donors.",
    },
    {
      question: "Who can use SavePulse?",
      answer:
        "SavePulse is for individuals aged 18–45 who are healthy, well-informed, and willing to donate blood. It is also for admins managing hospitals, satellite centers, and regional blood banks.",
    },
    {
      question: "How does SavePulse ensure transparency?",
      answer:
        "SavePulse keeps donors informed at every stage of their donation journey. After donating, they can track their blood status via their dashboard. Notifications update them on screening results and blood usage at hospitals.",
    },
    {
      question: "How do I register on SavePulse?",
      answer:
        "To register, download the SavePulse app or visit the website, create an account with your details, and receive a unique ID for tracking your donations.",
    },
    {
      question: "What happens if my blood does not pass screening?",
      answer:
        "If your blood is discarded, the app will notify you and recommend visiting a nearby health center for further medical advice.",
    },
    {
      question: "How does SavePulse prevent misuse of donated blood?",
      answer:
        "Blood donations are linked to unique IDs, ensuring traceability from donation to usage. Admins onboard trusted hospitals, satellite centers, and regional blood banks to maintain system integrity.",
    },
    {
      question: "Can I donate blood more than once?",
      answer:
        "Yes! SavePulse tracks your donation history and reminds you when you’re eligible to donate again.",
    },
    {
      question: "Is SavePulse only available in Kenya?",
      answer:
        "No, SavePulse is designed to be deployable anywhere in the world. It can adapt to local needs and contexts while addressing global blood donation challenges.",
    },
    {
      question: "How does SavePulse notify donors about their blood usage?",
      answer:
        "When a hospital uses your blood, you’ll receive a notification with a thank-you message acknowledging your role in saving a life.",
    },
    {
      question: "Is my data secure on SavePulse?",
      answer:
        "Yes, SavePulse uses secure databases and follows best practices for data protection to safeguard user information.",
    },
    {
      question: "What should I do if I have a question or issue?",
      answer:
        "For questions or support, you can contact us at support@savepulse.org.",
    },
  ];

  return (
    <div>
      <h1>FAQs Page</h1>
      {faqs.map((faq, index) => (
        <div key={index}>
          <p>
            <strong>{index + 1}. {faq.question}</strong>
          </p>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}
