import type { DocumentActionComponent } from "sanity";
import { getPublishedId, useClient } from "sanity";
import { useEffect, useMemo, useState } from "react";

import {
  getResultComparisonPublicationIssues,
  MAX_APPROVED_RESULT_COMPARISONS,
} from "./validation";

const PUBLISHED_RESULT_COMPARISON_COUNT_QUERY = `
  count(*[
    _type == "resultComparison" &&
    isRealClientWork == true &&
    hasClientPublicationConsent == true &&
    hasNoPrivateInformation == true &&
    _id != $publishedId &&
    _id != $draftId
  ])
`;

export function createResultComparisonPublishAction(
  DefaultPublishAction: DocumentActionComponent,
): DocumentActionComponent {
  const ResultComparisonPublishAction: DocumentActionComponent = (props) => {
    const defaultAction = DefaultPublishAction(props);
    const client = useClient({ apiVersion: "2026-05-01" });
    const [publishedComparisonCount, setPublishedComparisonCount] = useState<
      number | null
    >(null);
    const resultDocument = props.draft || props.published || null;
    const publishedId = useMemo(() => getPublishedId(props.id), [props.id]);
    const draftId = useMemo(() => `drafts.${publishedId}`, [publishedId]);
    const publicationIssues = getResultComparisonPublicationIssues(
      resultDocument,
    );

    useEffect(() => {
      let isMounted = true;

      client
        .fetch<number>(PUBLISHED_RESULT_COMPARISON_COUNT_QUERY, {
          publishedId,
          draftId,
        })
        .then((count) => {
          if (isMounted) {
            setPublishedComparisonCount(count);
          }
        })
        .catch(() => {
          if (isMounted) {
            setPublishedComparisonCount(null);
          }
        });

      return () => {
        isMounted = false;
      };
    }, [client, draftId, publishedId]);

    if (
      publishedComparisonCount !== null &&
      publishedComparisonCount >= MAX_APPROVED_RESULT_COMPARISONS
    ) {
      publicationIssues.push(
        `Es können nur ${MAX_APPROVED_RESULT_COMPARISONS} Ergebnisvergleiche veröffentlicht werden.`,
      );
    }

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

  ResultComparisonPublishAction.action = "publish";
  ResultComparisonPublishAction.displayName =
    "ResultComparisonPublishAction";

  return ResultComparisonPublishAction;
}
