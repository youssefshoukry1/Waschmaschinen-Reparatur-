import type { DocumentActionComponent } from "sanity";

import { getReviewPublicationIssues } from "./validation";

export function createReviewPublishAction(
  DefaultPublishAction: DocumentActionComponent,
): DocumentActionComponent {
  const ReviewPublishAction: DocumentActionComponent = (props) => {
    const defaultAction = DefaultPublishAction(props);
    const reviewDocument = props.draft || props.published || null;
    const publicationIssues = getReviewPublicationIssues(reviewDocument);

    if (!defaultAction || publicationIssues.length === 0) {
      return defaultAction;
    }

    return {
      ...defaultAction,
      disabled: true,
      title: publicationIssues.join("\n"),
      onHandle: undefined,
    };
  };

  ReviewPublishAction.action = "publish";
  ReviewPublishAction.displayName = "ReviewPublishAction";

  return ReviewPublishAction;
}
