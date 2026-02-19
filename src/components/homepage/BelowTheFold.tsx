"use client";

import dynamic from "next/dynamic";

// Lazy-load below-the-fold components to reduce initial JS bundle.
// SSR is enabled (default) so the server pre-renders HTML and the browser
// only needs to hydrate (attach listeners), avoiding a "mount-from-scratch"
// spike on mobile CPUs.
const CustomerTestimonials = dynamic(
    () => import("@/components/homepage/CustomerTestimonials"),
    { ssr: false }
);
const Loop = dynamic(
    () => import("@/components/homepage/Loop"),
    { ssr: false }
);
const OtherServices = dynamic(
    () => import("@/components/homepage/OtherServices"),
);
const CTASection = dynamic(
    () => import("@/components/CTASection"),
);

interface Props {
    testimonials: any;
    collaborations: any;
    otherServices: any;
    readyData: any;
    cta: any;
}

export default function BelowTheFold({
    testimonials,
    collaborations,
    otherServices,
    readyData,
    cta,
}: Props) {
    return (
        <>
            <OtherServices data={otherServices} readyData={readyData} />
            <CustomerTestimonials data={testimonials} />
            <Loop data={collaborations} />
            <CTASection data={cta} />
        </>
    );
}
