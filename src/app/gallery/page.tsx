
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

const galleryImages = [
  'gallery-women-empowerment',
  'gallery-village-community',
  'gallery-children-smiling',
  'gallery-building-school',
  'gallery-medical-help',
  'gallery-food-distribution',
  'gallery-clean-water-access',
  'gallery-planting-trees',
];

export default function GalleryPage() {
  const images = galleryImages.map(id => PlaceHolderImages.find(p => p.id === id)).filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 pt-32 md:pt-32">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Gallery</h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          A glimpse into the lives we're changing and the communities we're empowering. See the impact of your support in action.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
        {images.map((image, index) => image && (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    data-ai-hint={image.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <p className="text-white text-center text-sm">{image.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
