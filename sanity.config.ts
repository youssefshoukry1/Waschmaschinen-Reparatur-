import { defineConfig, type DocumentActionComponent } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId, studioBasePath } from "./sanity-reference/env";
import { createReviewPublishAction } from "./sanity-reference/reviews/reviewPublishAction";
import { schemaTypes } from "./sanity-reference/schemaTypes";
import { structure } from "./sanity-reference/structure";

function documentActions(
  previous: DocumentActionComponent[],
  context: { schemaType: string },
) {
  if (context.schemaType === "review") {
    return previous.map((action) =>
      action.action === "publish" ? createReviewPublishAction(action) : action,
    );
  }

  return previous;
}

export default defineConfig({
  name: "default",
  title: "Geräte-Service Berlin",
  projectId,
  dataset,
  apiVersion,
  basePath: studioBasePath,
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
  document: { actions: documentActions },
});
