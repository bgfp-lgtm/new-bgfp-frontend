"use client";

import dynamic from "next/dynamic";

// Lazy-load below-the-fold components to reduce initial JS bundle
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
    { ssr: false }
);
const CTASection = dynamic(
    () => import("@/components/CTASection"),
    { ssr: false }
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
