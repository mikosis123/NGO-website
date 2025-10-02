
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

type GalleryImage = {
  id: string;
  imageUrl: string;
  description: string;
  imageHint: string;
}

function GalleryImageSkeleton() {
    return (
        <Card className="overflow-hidden group">
            <CardContent className="p-0">
                <Skeleton className="aspect-square w-full" />
            </CardContent>
        </Card>
    );
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
          const imagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage));
          setImages(imagesData);
          setLoading(false);
      }, (error) => {
          console.error("Error fetching gallery images: ", error);
          setLoading(false);
      });
      return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 pt-32 md:pt-32">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Gallery</h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          A glimpse into the lives we're changing and the communities we're empowering. See the impact of your support in action.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
        {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <GalleryImageSkeleton />
                </motion.div>
            ))
        ) : (
            images.map((image, index) => image && (
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
            ))
        )}
      </div>
    </div>
  );
}
