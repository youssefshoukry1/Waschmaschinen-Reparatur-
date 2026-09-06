import { defineField, defineType } from "sanity";

export const trustSettings = defineType({
  name: "trustSettings",
  title: "Vertrauensangaben",
  type: "document",
  fields: [
    defineField({
      name: "showRating",
      title: "Bewertungsbadge anzeigen",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "ratingValue",
      title: "Bewertungswert",
      description: "Die echte öffentliche Bewertung verwenden, zum Beispiel 4.8.",
      type: "number",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.showRating !== true) {
            return true;
          }

          if (typeof value !== "number") {
            return "Der Bewertungswert ist erforderlich, wenn das Badge angezeigt wird.";
          }

          if (value < 1 || value > 5) {
            return "Der Bewertungswert muss zwischen 1 und 5 liegen.";
          }

          return true;
        }),
    }),
    defineField({
      name: "ratingSource",
      title: "Bewertungsquelle",
      description: "Zum Beispiel Google, ProvenExpert oder Trustpilot.",
      type: "string",
      initialValue: "Google",
      validation: (Rule) =>
        Rule.max(40).error("Die Bewertungsquelle darf höchstens 40 Zeichen lang sein."),
    }),
    defineField({
      name: "ratingLabel",
      title: "Bewertungslabel",
      description: "Öffentliches Label, das neben den Sternen angezeigt wird.",
      type: "string",
      initialValue: "Google Bewertung",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.showRating !== true) {
            return true;
          }

          if (typeof value !== "string" || value.trim().length === 0) {
            return "Das Bewertungslabel ist erforderlich, wenn das Badge angezeigt wird.";
          }

          if (value.length > 80) {
            return "Das Bewertungslabel darf höchstens 80 Zeichen lang sein.";
          }

          return true;
        }),
    }),
    defineField({
      name: "satisfiedCustomerCount",
      title: "Anzahl zufriedener Kunden",
      description: "Steuert die Zahl in \"Über 6 zufriedene Kunden\".",
      type: "number",
      initialValue: 6,
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(0)
          .max(99999)
          .error("Die Anzahl zufriedener Kunden muss eine ganze Zahl zwischen 0 und 99999 sein."),
    }),
  ],
  preview: {
    select: {
      ratingValue: "ratingValue",
      ratingLabel: "ratingLabel",
      showRating: "showRating",
      satisfiedCustomerCount: "satisfiedCustomerCount",
    },
    prepare({ ratingValue, ratingLabel, showRating, satisfiedCustomerCount }) {
      return {
        title: "Vertrauensangaben",
        subtitle: showRating
          ? `${ratingValue || "Keine Bewertung"} ${ratingLabel || ""} - ${satisfiedCustomerCount || 0} Kunden`
          : `Bewertungsbadge ausgeblendet - ${satisfiedCustomerCount || 0} Kunden`,
      };
    },
  },
});
