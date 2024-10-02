import { HydrateClient } from "~/trpc/server";
import { CommunitySection } from "../_components/sections/CommunitySection";
import { InsideAttractionsListSection } from "../_components/sections/InsideAttractionsListSection";
import { OutsideAttractionsListSection } from "../_components/sections/OutsideAttractionsListSection";
import { AttractionsUsBannerSection } from "../_components/sections/AttractionsUsBannerSection";

export default async function Home() {

  return (
    <HydrateClient>
      <main>
        <AttractionsUsBannerSection />
        <div className="h-[120px] min-h-[7.5rem] bg-[#566c6a] py-[60px]"></div>
        <CommunitySection />
        <InsideAttractionsListSection />
        <div className="learn-more-padding">
            <div className="learn-more-container-smalller">
              <div className="py-12">
                <div className="align-text-center">
                  <a href="https://visitrwandabookings.rdb.rw/rdbportal/web/rdb/home" target="_blank" className="link-block-4 w-inline-block">
                    <h1 className="learn-more-heading">Learn More</h1>
                  </a>
                  <div className="small-space"></div>
                </div>
              </div>
            </div>
          </div>
        <OutsideAttractionsListSection />
      </main>
    </HydrateClient>
  );
}
