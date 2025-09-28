'use client';

import { APIProvider, Map as GoogleMap, AdvancedMarker } from '@vis.gl/react-google-maps';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

type MapProps = {
  center: { lat: number; lng: number };
};

export default function Map({ center }: MapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted p-4">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Google Maps API Key is missing!</AlertTitle>
          <AlertDescription>
            Please add your Google Maps API key to a <code>.env.local</code> file to enable the map.
            <br />
            <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here</code>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <GoogleMap
        defaultCenter={center}
        defaultZoom={14}
        mapId="empower-change-map"
        disableDefaultUI={true}
        gestureHandling="cooperative"
        className="h-full w-full"
      >
        <AdvancedMarker position={center} />
      </GoogleMap>
    </APIProvider>
  );
}
