import PageIllustration from '@/components/landing/page-illustration';
import Hero from '@/components/landing/hero-home';
import Workflows from '@/components/landing/workflows';
import Features from '@/components/landing/features';
import Testimonials from '@/components/landing/testimonials';
import Cta from '@/components/landing/cta';

export default function Lnading2({
  setPosition,
}: {
  setPosition: (value: number) => void;
}) {
  return (
    <>
      <PageIllustration />
      <Hero setPosition={setPosition} />
      <Workflows />
      <Features />
      <Testimonials />
      <Cta />
    </>
  );
}
