import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhalte")
    .items([
      S.documentTypeListItem("review").title("Bewertungen"),
      S.divider(),
      S.listItem()
        .title("Vertrauensangaben")
        .schemaType("trustSettings")
        .child(
          S.document()
            .schemaType("trustSettings")
            .documentId("trustSettings")
            .title("Vertrauensangaben"),
        ),
    ]);
