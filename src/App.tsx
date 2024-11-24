import AboutUs from "./components/AboutUs";
import Hero from "./components/Hero";
import "locomotive-scroll/src/locomotive-scroll.scss";
import { SmoothScrollProvider } from "./context/ScrollProviderContext.tsx";
import NavBar from "./components/NavBar.tsx";

function App() {
  return (
    <>
      <SmoothScrollProvider>
      <NavBar />
        <div className=" main-container relative min-h-screen w-screen ">
          <Hero />
          <AboutUs />
          {/* <div className=" relative">
        <AnimatedTitle title="meow meow" className=" text-center  inset-0 absolute !text-black" />
        <AnimatedTitle noAnimation={true} title="meow meow" className=" text-center inset-0 absolute " />
      </div> */}
        </div>
      </SmoothScrollProvider>
    </>
  );
}

export default App;
