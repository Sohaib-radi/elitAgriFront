'use client';

import { _mock } from 'src/_mock';

import { ComponentLayout } from '../../layout';
import { CarouselAlign } from './carousel-align';
import { CarouselAnimation } from './carousel-animation';
import { CarouselAutoHeight } from './carousel-auto-height';
import { CarouselAutoScroll } from './carousel-auto-scroll';
import { CarouselAutoplay } from './carousel-autoplay';
import { CarouselCustoms } from './carousel-customs';
import { CarouselDotsNumber } from './carousel-dots-number';
import { CarouselFade } from './carousel-fade';
import { CarouselOpacity } from './carousel-opacity';
import { CarouselParallax } from './carousel-parallax';
import { CarouselProgress } from './carousel-progress';
import { CarouselScale } from './carousel-scale';
import { CarouselThumbsX } from './carousel-thumbs-x';
import { CarouselThumbsY } from './carousel-thumbs-y';
import { CarouselVariableWidths } from './carousel-variable-widths';
import { CarouselYaxis } from './carousel-yaxis';

// ----------------------------------------------------------------------

const SLIDES = Array.from({ length: 20 }, (_, index) => ({
  id: _mock.id(index),
  title: _mock.postTitle(index),
  coverUrl: _mock.image.cover(index),
  description: _mock.description(index),
}));

const DEMO_COMPONENTS = [
  { name: 'Align', component: <CarouselAlign data={SLIDES.slice(11, 15)} /> },
  { name: 'Progress', component: <CarouselProgress data={SLIDES.slice(3, 7)} /> },
  { name: 'Opacity', component: <CarouselOpacity data={SLIDES.slice(8, 12)} /> },
  { name: 'Scale', component: <CarouselScale data={SLIDES.slice(10, 14)} /> },
  { name: 'Fade', component: <CarouselFade data={SLIDES.slice(11, 15)} /> },
  { name: 'Parallax', component: <CarouselParallax data={SLIDES.slice(11, 15)} /> },
  { name: 'Autoplay', component: <CarouselAutoplay data={SLIDES.slice(2, 6)} /> },
  { name: 'Auto Scroll', component: <CarouselAutoScroll data={SLIDES.slice(3, 7)} /> },
  { name: 'Thumbs-x', component: <CarouselThumbsX data={SLIDES.slice(3, 11)} /> },
  { name: 'Thumbs-y', component: <CarouselThumbsY data={SLIDES.slice(2, 10)} /> },
  { name: 'Variable widths', component: <CarouselVariableWidths data={SLIDES.slice(8, 12)} /> },
  { name: 'Auto height', component: <CarouselAutoHeight data={SLIDES.slice(14, 18)} /> },
  { name: 'Y-axis', component: <CarouselYaxis data={SLIDES.slice(4, 8)} /> },
  { name: 'Dots number', component: <CarouselDotsNumber data={SLIDES.slice(8, 16)} /> },
  { name: 'Animation', component: <CarouselAnimation data={SLIDES.slice(16, 20)} /> },
  { name: 'Customs', component: <CarouselCustoms data={SLIDES.slice(8, 14)} /> },
];

// ----------------------------------------------------------------------

export function CarouselView() {
  return (
    <ComponentLayout
      sectionData={DEMO_COMPONENTS}
      heroProps={{
        heading: 'Carousel',
        moreLinks: ['https://www.embla-carousel.com/'],
      }}
    />
  );
}
