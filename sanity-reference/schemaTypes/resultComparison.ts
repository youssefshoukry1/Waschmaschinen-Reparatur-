import { defineField, defineType } from "sanity";

export const resultComparison = defineType({
  name: "resultComparison",
  title: "Ergebnisvergleiche",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Dienstleistungstitel",
      description: "Zum Beispiel Hausreinigung, Autopflege oder Gartenpflege.",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(80)
          .error("Der Dienstleistungstitel ist erforderlich und darf höchstens 80 Zeichen lang sein."),
    }),
    defineField({
      name: "beforeImage",
      title: "Vorher-Bild",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.required().error("Das Vorher-Bild ist erforderlich."),
    }),
    defineField({
      name: "afterImage",
      title: "Nachher-Bild",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.required().error("Das Nachher-Bild ist erforderlich."),
    }),
    defineField({
      name: "beforeAlt",
      title: "Alt-Text für Vorher-Bild",
      type: "string",
      initialValue: "Vorher-Bild eines Kundenprojekts",
      validation: (Rule) =>
        Rule.required()
          .max(140)
          .error("Der Alt-Text für das Vorher-Bild ist erforderlich und darf höchstens 140 Zeichen lang sein."),
    }),
    defineField({
      name: "afterAlt",
      title: "Alt-Text für Nachher-Bild",
      type: "string",
      initialValue: "Nachher-Bild eines Kundenprojekts",
      validation: (Rule) =>
        Rule.required()
          .max(140)
          .error("Der Alt-Text für das Nachher-Bild ist erforderlich und darf höchstens 140 Zeichen lang sein."),
    }),
    defineField({
      name: "isRealClientWork",
      title: "Ich bestätige, dass diese Bilder echte Kundenarbeit zeigen",
      type: "boolean",
      initialValue: false,
      validation: (Rule) =>
        Rule.custom((value) =>
          value === true
            ? true
            : "Es muss bestätigt werden, dass diese Bilder echte Kundenarbeit zeigen.",
        ),
    }),
    defineField({
      name: "hasClientPublicationConsent",
      title: "Ich bestätige, dass der Kunde die Veröffentlichung dieser Bilder erlaubt hat",
      type: "boolean",
      initialValue: false,
      validation: (Rule) =>
        Rule.custom((value) =>
          value === true
            ? true
            : "Die Zustimmung des Kunden zur Veröffentlichung ist erforderlich.",
        ),
    }),
    defineField({
      name: "hasNoPrivateInformation",
      title:
        "Ich bestätige, dass die Bilder keine privaten Informationen oder DSGVO-sensiblen Daten zeigen",
      description:
        "Vor der Freigabe Adressen, Telefonnummern, Kennzeichen, Dokumente, Gesichter ohne Zustimmung und andere private Daten prüfen.",
      type: "boolean",
      initialValue: false,
      validation: (Rule) =>
        Rule.custom((value) =>
          value === true
            ? true
            : "Es muss bestätigt werden, dass die Bilder keine privaten oder DSGVO-sensiblen Daten zeigen.",
        ),
    }),
    defineField({
      name: "privacyNotes",
      title: "Notizen zur Datenschutzprüfung",
      description: "Optionale interne Notizen für den Editor. Werden nicht auf der Website angezeigt.",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.max(500).error("Die Notizen dürfen höchstens 500 Zeichen lang sein."),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "afterImage",
    },
    prepare({ title, media }) {
      return {
        title: title || "Unbenanntes Ergebnis",
        subtitle: "Wird nach Zustimmung und Datenschutzprüfung veröffentlicht",
        media,
      };
    },
  },
});
