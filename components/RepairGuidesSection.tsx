"use client";

import { useState } from "react";
import { AnimatedSectionTitle } from "./HeroTitle";

import { repairGuides, type GuideBlock } from "@/lib/repairGuides";

function GuideBlocks({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.kind === "steps") {
          return (
            <div key={index}>
              {block.title ? <p className="guide-answer__block-title">{block.title}</p> : null}
              <ol className="guide-answer__steps">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {item.title ? <strong>{item.title}</strong> : null}
                    <span>{item.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          );
        }

        if (block.kind === "list") {
          return (
            <div key={index}>
              {block.title ? <p className="guide-answer__block-title">{block.title}</p> : null}
              <ul className="guide-answer__list">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          );
        }

        if (block.kind === "table") {
          return (
            <div className="guide-answer__table-wrap" key={index}>
              <table className="guide-answer__table">
                <thead>
                  <tr>
                    {block.columns.map((column) => (
                      <th scope="col" key={column}>
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row[0]}>
                      <th scope="row">{row[0]}</th>
                      <td>{row[1]}</td>
                      <td>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return (
          <p className="guide-answer__note" key={index}>
            {block.text}
          </p>
        );
      })}
    </>
  );
}

export default function RepairGuidesSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="device-faq" id="hilfeanleitungen" aria-labelledby="guides-heading">
      <div className="device-faq__header">
        <AnimatedSectionTitle id="guides-heading" parts={[{ text: "Anleitungen, die Ihnen sofort weiterhelfen." }]} />
        <p className="device-faq__lead">
          Schritt für Schritt erklärt: die häufigsten Störungen an Ihrer Waschmaschine – und was Sie selbst
          gefahrlos prüfen und beheben können.
        </p>
      </div>

      <div className="faq-list">
        {repairGuides.map((guide, index) => {
          const isOpen = openIndex === index;
          const answerId = `guide-answer-${guide.id}`;

          return (
            <article className={`faq-item${isOpen ? " is-open" : ""}`} key={guide.id} id={guide.id}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="faq-item__number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="faq-item__question">{guide.question}</span>
                  <span className="faq-item__icon" aria-hidden="true" />
                </button>
              </h3>
              <div className="faq-item__answer" id={answerId} aria-hidden={!isOpen}>
                <div>
                  <div className="guide-answer">
                    {guide.lead ? <p className="guide-answer__lead">{guide.lead}</p> : null}
                    <GuideBlocks blocks={guide.blocks} />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
