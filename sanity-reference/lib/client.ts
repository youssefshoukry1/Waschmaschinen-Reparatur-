import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

const projectIdPattern = /^[a-z0-9]+$/;

export const isSanityConfigured =
  projectId !== "yourprojectid" && projectIdPattern.test(projectId);

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});

