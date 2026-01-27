
import CheckBookingContent from "@/components/CheckBookingContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Check Booking | BlueVoyage",
    description: "Check your booking status and details.",
};

export default function CheckBookingPage() {
    return <CheckBookingContent />;
}
