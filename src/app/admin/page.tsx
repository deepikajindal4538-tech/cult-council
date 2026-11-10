import React from "react";
import AdminPortalClient from "@/components/admin/AdminPortalClient";

export const metadata = {
  title: "Admin Command Center | Cultural Council IIIT Allahabad",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <AdminPortalClient />;
}
