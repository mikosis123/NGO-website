'use client';

import CountUp from 'react-countup';
import { mockImpactMetrics } from '@/lib/mock-data';

export default function ImpactCounters() {
  return (
    <section className="bg-secondary/50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {mockImpactMetrics.map((metric) => (
            <div key={metric.label}>
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
