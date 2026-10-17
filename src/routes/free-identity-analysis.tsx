import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/free-identity-analysis")({
  beforeLoad: () => { throw redirect({ to: "/our-expertise", statusCode: 301 }); },
});
