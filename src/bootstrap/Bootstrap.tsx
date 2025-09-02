'use client';
import { useEffect } from 'react';
import { CloudSDK } from '@sitecore-cloudsdk/core/browser';
import '@sitecore-cloudsdk/events/browser';
import '@sitecore-cloudsdk/search/browser';

export function Bootstrap({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    CloudSDK().initialize().addEvents().addSearch();
  }, []);
  return <>{children}</>;
}