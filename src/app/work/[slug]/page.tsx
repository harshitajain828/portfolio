import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import CaseView from "@/components/case/CaseView";
import FixitCase from "@/components/case/FixitCase";
import AppealCase from "@/components/case/AppealCase";
import SentinelCase from "@/components/case/SentinelCase";

const CUSTOM: Record<string, typeof CaseView> = {
  fixit: FixitCase,
  appeal: AppealCase,
  sentinel: SentinelCase,
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.statement,
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  const View = CUSTOM[slug] ?? CaseView;

  return (
    <View
      project={project}
      index={idx}
      total={projects.length}
      next={next}
    />
  );
}
