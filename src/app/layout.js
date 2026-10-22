import "./globals.css";
import Navbar from "./Components/Navbar";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "sonner";
import AuthProvider from "./Components/AuthProvider";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "MyAcademy | Academy Management SaaS - Fees, Attendance & Batches",
  description:
    "All-in-one Academy Management SaaS to streamline student fee collection, track real-time attendance, schedule batches, and manage academy operations.",
  icons: {
    icon: "/icon1.png",
    apple: "/apple-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#D6451B",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-orange-100 selection:text-[#D6451B]">
        <ReactQueryProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
          </AuthProvider>
        </ReactQueryProvider>
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          expand
          duration={3500}
          toastOptions={{
            className:
              "!rounded-2xl !border !border-orange-100 !bg-white !text-slate-800 !shadow-xl !font-sans",
            style: {
              fontSize: "14px",
              fontWeight: 500,
              padding: "14px 18px",
            },
          }}
        />
      </body>
    </html>
  );
}
