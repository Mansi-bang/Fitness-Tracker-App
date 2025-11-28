import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function useDistanceTracker() {
  const [distance, setDistance] = useState(0); // km
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [lastPos, setLastPos] = useState<Location.LocationObjectCoords | null>(null);

  // Haversine formula (km)
  const calcDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionGranted(status === "granted");

      if (status !== "granted") return;

      const subscriber = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 3000,
          distanceInterval: 1,
        },
        (loc) => {
          if (lastPos) {
            const d = calcDistance(
              lastPos.latitude,
              lastPos.longitude,
              loc.coords.latitude,
              loc.coords.longitude
            );
            setDistance((prev) => prev + d);
          }

          setLastPos(loc.coords);
        }
      );

      return () => subscriber.remove();
    })();
  }, [lastPos]);

  return { distance: parseFloat(distance.toFixed(3)), permissionGranted };
}
