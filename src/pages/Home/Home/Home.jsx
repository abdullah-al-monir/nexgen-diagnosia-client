import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";
import Promotions from "../Promotions/Promotions";
import Testimonials from "../Testimonials/Testimonials";
import Tips from "../Tips/Tips";

const Home = () => {
  return (
    <div>
      <Banner />
      <Featured />
      <Promotions/>
      <Tips />
      <Testimonials />
    </div>
  );
};

export default Home;
