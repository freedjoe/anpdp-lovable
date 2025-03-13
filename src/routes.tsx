
import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Activities from "@/pages/Activities";
import ConcernedParties from "@/pages/ConcernedParties";
import Events from "@/pages/Events";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminContent from "@/pages/admin/Content";
import AdminEvents from "@/pages/admin/Events";
import AdminFAQ from "@/pages/admin/FAQ";
import AdminMeetings from "@/pages/admin/Meetings";
import AdminImportContent from "@/pages/admin/ImportContent";
import AdminMenu from "@/pages/admin/Menu";
import FAQPage from "@/pages/FAQ";
import MeetingsPage from "@/pages/Meetings";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/concerned-parties" element={<ConcernedParties />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/meetings" element={<MeetingsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="content" element={<AdminContent />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="faq" element={<AdminFAQ />} />
        <Route path="meetings" element={<AdminMeetings />} />
        <Route path="menu" element={<AdminMenu />} />
        <Route path="import" element={<AdminImportContent />} />
      </Route>
    </Routes>
  );
};
