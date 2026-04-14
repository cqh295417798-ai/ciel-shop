const faqs = [
  {
    id: "shipping",
    q: "How long does shipping take?",
    a: "Orders within the US typically arrive in 5–8 business days. We offer free standard shipping on orders over $50. Expedited options are available at checkout.",
  },
  {
    id: "returns",
    q: "What is your return policy?",
    a: "We accept returns within 30 days of delivery. Items must be unused and in original packaging. Contact us at hello@cielgem.com to initiate a return.",
  },
  {
    q: "Are your crystals genuine?",
    a: "Yes — every crystal is 100% natural and genuine. We source directly from trusted miners and verify authenticity before adding anything to our collection.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently we ship within the United States. International shipping is coming soon — sign up for our newsletter to be the first to know.",
  },
  {
    q: "How should I care for my crystals?",
    a: "Avoid prolonged exposure to direct sunlight, which can fade some stones. Cleanse your crystals regularly with moonlight, sound, or sage smoke. Keep them away from harsh chemicals.",
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-cormorant text-4xl font-light text-center mb-10 tracking-wide">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} id={faq.id} className="border-b border-stone-200 pb-6">
            <h3 className="font-cormorant text-xl font-semibold mb-2">{faq.q}</h3>
            <p className="text-stone-500 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
