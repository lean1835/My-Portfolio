import { motion } from "framer-motion";
import { styles } from "../styles";
import { useState, useEffect } from "react";
import LaptopCanvas from "./canvas/LaptopCanvas";
import TroisLightsCanvas from "./canvas/TroisLightsCanvas";
import { ictu } from "../assets";
const TypewriterText = ({ texts }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (isTyping) {
        const currentText = texts[currentIndex];
        if (displayText.length < currentText.length) {
          setDisplayText((prevText) =>
            currentText.slice(0, prevText.length + 1)
          );
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
          setTimeout(() => {
            setIsTyping(true);
            setDisplayText("");
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }, 2000);
        }
      }
    }, 100);

    return () => {
      clearInterval(typingInterval);
    };
  }, [currentIndex, isTyping, texts, displayText]);

  return (
    <span
      style={{
        background: "linear-gradient(90deg, #915EFF, #00BFFF)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textFillColor: "transparent",
      }}
      className="inline-block font-bold"
    >
      {displayText.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          {char}
        </motion.span>
      ))}
      {isTyping && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="inline-block ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

const WavingHand = () => {
  return (
    <img
      src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f44b.png"
      alt="Waving Hand"
      className="wave-emoji"
      style={{
        display: "inline-block",
        marginLeft: "10px",
        width: "50px",
        height: "50px",
      }}
    />
  );
};

const Hero = () => {
  const typedItems = ["Web Developer", "Mobile Developer","Global E-commerce Entrepreneur"];

  return (
    <>
      <section className="relative w-full h-[350px] mx-auto">
        <style jsx>{`
          @keyframes wave {
            0% {
              transform: rotate(0deg);
            }
            10% {
              transform: rotate(-10deg);
            }
            20% {
              transform: rotate(12deg);
            }
            30% {
              transform: rotate(-10deg);
            }
            40% {
              transform: rotate(9deg);
            }
            50% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }
          .wave-emoji {
            animation-name: wave;
            animation-duration: 1.8s;
            animation-iteration-count: infinite;
            transform-origin: 70% 70%;
            display: inline-block;
          }
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          .floating-logo {
            animation: float 3s ease-in-out infinite;
          }
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .swirl-container:hover .swirl-ring {
            opacity: 1;
          }
          .swirl-ring {
            position: absolute;
            inset: -15px;
            border-radius: 50%;
            background: conic-gradient(from 0deg, transparent, #00BFFF, #915EFF, transparent);
            filter: blur(10px);
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
            animation: rotate 1.5s linear infinite;
            z-index: -1;
          }
        `}</style>
        <div
          className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
        >
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
            <div className="w-1 sm:h-80 h-40 violet-gradient" />
          </div>

          <div className="flex-grow">
            <h1 className={`${styles.heroHeadText} text-white`}>
              Hi, I'm{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #915EFF, #00BFFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                }}
              >
                An
              </span>{" "}
              <WavingHand />
            </h1>

            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              I'm a <TypewriterText texts={typedItems} />
              <br />
              <b>Welcome to my portfolio!</b>
            </p>
          </div>

          {/* 🏫 SCHOOL LOGO — Floating lớn bên phải */}
          {/* <a
            href="https://ictu.edu.vn/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block absolute right-[0%] top-[10px] z-20 pointer-events-auto"
          >
            <div className="relative swirl-container">
              <div className="swirl-ring"></div>
              <motion.img
                src={ictu}
                alt="ICTU Logo"
                className="floating-logo w-40 h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 object-contain rounded-full cursor-pointer"
                style={{
                  boxShadow: "0 0 50px 15px rgba(255, 255, 255, 0.6), 0 0 100px 30px rgba(255, 255, 255, 0.3)",
                  border: "none",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                whileHover={{ scale: 1.1 }}
              />
            </div>
          </a> */}
        </div>

        {/* <div className="absolute inset-0 top-[200px] flex items-center justify-center pointer-events-none">
          <div className="w-full h-[650px] max-w-7xl mx-auto pointer-events-auto">
            <LaptopCanvas />
          </div>
        </div> */}
      </section>

      {/* Standalone Trois Lights Showcase Section - Rendered below the Hero section */}
      <div className="relative w-full h-[1000px] py-24 bg-black">
        <TroisLightsCanvas />
      </div>
    </>
  );
};

export default Hero;
