'use client';

import CountUp from 'react-countup';
import { mockImpactMetrics } from '@/lib/mock-data';

export default function ImpactCounters() {
  return (
    <section className="bg-secondary/50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Impact in Numbers</h2>
            <p className="mt-3 text-lg text-muted-foreground">
                Together, we're making a measurable difference in communities around the world.
            </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {mockImpactMetrics.map((metric) => (
            <div key={metric.label}>
              <metric.icon className="h-10 w-10 text-primary mx-auto mb-3" />
              <p className="font-headline text-4xl md:text-5xl font-bold text-primary">
                <CountUp
                  end={parseInt(metric.value.replace(/[^0-9]/g, ''), 10)}
                  duration={2.75}
                  enableScrollSpy
                  scrollSpyOnce
                />
                {metric.value.includes('+') ? '+' : ''}
              </p>
              <p className="mt-2 text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
