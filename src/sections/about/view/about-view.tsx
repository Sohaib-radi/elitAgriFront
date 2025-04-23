'use client';

import { AboutHero } from '../about-hero';
import { AboutTeam } from '../about-team';
import { AboutTestimonials } from '../about-testimonials';
import { AboutVision } from '../about-vision';
import { AboutWhat } from '../about-what';

// ----------------------------------------------------------------------

export function AboutView() {
  return (
    <>
      <AboutHero />

      <AboutWhat />

      <AboutVision />

      <AboutTeam />

      <AboutTestimonials />
    </>
  );
}
