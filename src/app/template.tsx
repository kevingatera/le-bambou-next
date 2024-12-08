import { Footer } from "./_components/Footer";
import { NavigationBar } from "./_components/NavigationBar";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavigationBar />
            {children}
            <Footer />
        </>
    );
}
