import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={"min-h-screen flex flex-col justify-between py-2 px-4 md:py-5 md:px-20"}>
                <Header isLoggedIn={true} userRole="administrador" />
                {children}
                <Footer />
            </body>
        </html>
    );
}
