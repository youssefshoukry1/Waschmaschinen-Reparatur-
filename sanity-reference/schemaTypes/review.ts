import { defineField, defineType } from "sanity";

import { validateReviewerFirstName } from "../reviews/validation";

export const review = defineType({
  name: "review",
  title: "Bewertungen",
  type: "document",
  fields: [
    defineField({
      name: "reviewerName",
      title: "Vorname des Bewerters",
      description: "Nur der Vorname des Bewerters ist erlaubt. Keine vollständigen Namen eingeben.",
      type: "string",
      validation: (Rule) =>
        Rule.custom((value) => validateReviewerFirstName(value)),
    }),
    defineField({
      name: "rating",
      title: "Sternebewertung",
      type: "number",
      options: {
        list: [
          { title: "1 Stern", value: 1 },
          { title: "2 Sterne", value: 2 },
          { title: "3 Sterne", value: 3 },
          { title: "4 Sterne", value: 4 },
          { title: "5 Sterne", value: 5 },
        ],
        layout: "radio",
      },
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(1)
          .max(5)
          .error("Die Sternebewertung muss eine ganze Zahl von 1 bis 5 sein."),
    }),
    defineField({
      name: "content",
      title: "Bewertungstext",
      type: "text",
      rows: 4,
      validation: (Rule) =>
        Rule.required()
          .max(500)
          .error("Der Bewertungstext ist erforderlich und darf höchstens 500 Zeichen lang sein."),
    }),
    defineField({
      name: "avatar",
      title: "Avatarbild",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "isRealReview",
      title: "Ich bestätige, dass diese Bewertung echt ist",
      type: "boolean",
      initialValue: false,
      validation: (Rule) =>
        Rule.custom((value) =>
          value === true ? true : "Diese Bewertung muss als echt bestätigt werden.",
        ),
    }),
    defineField({
      name: "hasPublicationConsent",
      title: "Ich bestätige, dass der Bewerter der Veröffentlichung zugestimmt hat",
      type: "boolean",
      initialValue: false,
      validation: (Rule) =>
        Rule.custom((value) =>
          value === true
            ? true
            : "Die Zustimmung des Bewerters zur Veröffentlichung ist erforderlich.",
        ),
    }),
    defineField({
      name: "isApproved",
      title: "Für die Website freigegeben",
      type: "boolean",
      initialValue: false,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const document = context.document;

          if (
            value === true &&
            (!document?.isRealReview || !document?.hasPublicationConsent)
          ) {
            return "Die Bewertung kann erst freigegeben werden, wenn alle Zustimmungsfelder bestätigt sind.";
          }

          return true;
        }),
    }),
    defineField({
      name: "sortOrder",
      title: "Sortierreihenfolge",
      description: "Niedrigere Zahlen erscheinen zuerst.",
      type: "number",
      initialValue: 100,
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(0)
          .error("Die Sortierreihenfolge muss eine ganze Zahl ab 0 sein."),
    }),
  ],
  orderings: [
    {
      title: "Manuelle Reihenfolge",
      name: "manualOrder",
      by: [
        { field: "sortOrder", direction: "asc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "reviewerName",
      rating: "rating",
      media: "avatar",
      approved: "isApproved",
    },
    prepare({ title, rating, media, approved }) {
      return {
        title: title || "Unbenannte Bewertung",
        subtitle: `${rating || 0}/5 Sterne${approved ? " - freigegeben" : " - Entwurf"}`,
        media,
      };
    },
  },
});
