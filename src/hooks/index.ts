'use client';
import { useState, useEffect, useCallback } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: false,
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((s) => ({
        ...s,
        error: 'Geolocalizzazione non supportata dal browser',
      }));
      return;
    }

    setState((s) => ({ ...s, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      (err) => {
        setState({
          latitude: null,
          longitude: null,
          error:
            err.code === 1
              ? 'Permesso di geolocalizzazione negato. Inserisci manualmente la tua città.'
              : 'Impossibile ottenere la posizione',
          loading: false,
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  return { ...state, requestLocation };
}

export function useIntersectionObserver(
  threshold = 0.1
) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref);
        }
      },
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return { setRef, isVisible };
}

export function useAnimatedCounter(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const { setRef, isVisible } = useIntersectionObserver(0.5);

  useEffect(() => {
    if (startOnView && !isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible, startOnView]);

  return { count, setRef };
}
