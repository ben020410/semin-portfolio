import { redirect, notFound } from "next/navigation";
const legacy: Record<string, string> = { "1_bin_picking": "vision-robot-calibration", "2_multimodal-caricature-ai": "multimodal-storybook", "3_vpp-v2g-optimization": "vpp-v2g", "4_vlm-zero-shot-navigation": "zero-shot-navigation" };
export default async function OldPost({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) { const { slug } = await params; if (!legacy[slug])
    notFound(); redirect("/projects/" + legacy[slug]); }
