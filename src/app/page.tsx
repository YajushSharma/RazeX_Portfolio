import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import EndCTA from "@/components/EndCTA";
import SpaceshipReveal from "@/components/SpaceshipReveal";
import TetrominoDivider from "@/components/TetrominoDivider";

export default function Home() {
    return (
        <main>
            <SpaceshipReveal>
                <Hero />
            </SpaceshipReveal>
            <Portfolio />
            <Services />
            <TetrominoDivider />
            <EndCTA />
        </main>
    );
}
