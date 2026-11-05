import { CANONICAL_ORIGIN } from "@/lib/brand";
import { cmsRobots } from "@webhouse/cms/next";

export default cmsRobots({
  baseUrl: CANONICAL_ORIGIN,
  strategy: "maximum",
  disallowPaths: ["/api/"],
});
