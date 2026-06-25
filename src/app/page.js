import Image from "next/image";
import Hero from "./Components/Hero";

import GlobalCommunity from "./Components/GlobalCommunity";
import WhyChooseUs from "./Components/WhyChooseUs";
import Programs from "./Components/Programs";
import LearningExperience from "./Components/LearningExperience";
import SuccessStories from "./Components/SuccessStory";
import Faculty from "./Components/Faculty";
import CTA from "./Components/CTA";
import Footer from "./Components/Footer";
import FindTutor from "./Components/FindTutor";
import BecomeTutor from "./Components/BecomeTutor";

export default function Home() {
  return (
<>
<Hero></Hero>
{/* <GlobalCommunity></GlobalCommunity> */}
<Programs></Programs>
<FindTutor></FindTutor>
<WhyChooseUs></WhyChooseUs>
<BecomeTutor></BecomeTutor>
{/* <LearningExperience></LearningExperience> */}
<SuccessStories></SuccessStories>
{/* <Faculty></Faculty> */}
<CTA></CTA>
<Footer></Footer>
</>
  );
}
