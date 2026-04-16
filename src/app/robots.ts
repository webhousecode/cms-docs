import { cmsRobots } from "@webhouse/cms/next";

export default cmsRobots({
  baseUrl: "https://docs.webhouse.app",
  strategy: "maximum",
  disallowPaths: ["/api/"],
});
