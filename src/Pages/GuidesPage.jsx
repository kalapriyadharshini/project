import React from "react";
import { Container } from "react-bootstrap";
import "./GuidesPage.css";

export default function GuidesPage() {
  const guides = [
    {
      title: "Beginner’s Guide to Setting Up Your First Tank",
      description: `
        Starting an aquarium is exciting, but proper preparation ensures success.
        Choose a tank size that suits your space and experience level (larger tanks
        are more stable for beginners). Install a good filter and heater, add
        substrate and decorations, and allow the tank to cycle for at least 3–4 weeks
        before adding fish. Cycling builds beneficial bacteria to keep water healthy.
      `,
    },
    {
      title: "How to Choose Healthy Fish",
      description: `
        Healthy fish are active, alert, and have vibrant colors. Avoid fish with torn fins,
        white spots, or sluggish movement. Research compatibility before purchase — not
        all fish live well together. Ask your supplier how long the fish have been in
        stock; fish that have been in the store for at least a week without illness are
        generally safer to buy.
      `,
    },
    {
      title: "Planted Aquarium Care Tips",
      description: `
        A planted tank can be a stunning centerpiece. Choose plants suited to your lighting
        level — low-light plants like Java Fern and Anubias are great for beginners.
        Use nutrient-rich substrate and dose liquid fertilizers if needed. Trim plants
        regularly to prevent overgrowth and encourage healthy new leaves. Consistent care
        keeps your plants vibrant and algae-free.
      `,
    },
    {
      title: "Water Quality & Maintenance",
      description: `
        Good water quality is the foundation of a healthy aquarium. Test your water weekly
        for pH, ammonia, nitrite, and nitrate levels. Perform regular water changes —
        about 20–30% every 1–2 weeks — to remove waste and replenish minerals. Avoid
        overfeeding, as leftover food can quickly pollute the water. A clean, balanced tank
        means healthier fish and fewer problems.
      `,
    },
  ];

  return (
    <section className="guides-section text-center">
      <Container>
        <h1 className="text-center guides-title">Aquarium Guides</h1>
        <p className="text-center guides-subtitle">
          In-depth guides to help you set up, maintain, and enjoy your aquarium —
          whether you’re a beginner or an experienced aquarist.
        </p>

        <div className="guides-list">
          {guides.map((guide, index) => (
            <div className="guide-block" key={index}>
              <h3>{guide.title}</h3>
              <p>{guide.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
