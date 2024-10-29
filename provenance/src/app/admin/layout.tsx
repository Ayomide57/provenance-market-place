"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
      <DefaultLayout>
          {children}
    </DefaultLayout>
  );
}
