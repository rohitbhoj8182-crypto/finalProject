import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Mascot() {
  const wrapRef = useRef(null);
  const armGroupRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // gentle float
      gsap.to("#mascotBody", {
        y: -8,
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to("#mascotLaptop", {
        y: -8,
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // blinking eyes
      gsap.to(".eye", {
        scaleY: 0.1,
        duration: 0.08,
        repeat: -1,
        repeatDelay: 3.4,
        yoyo: true,
        transformOrigin: "center",
      });

      // floating code chips
      gsap.to("#chip1", { y: -14, x: 4, rotation: -4, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to("#chip2", { y: -10, x: -6, rotation: 5, duration: 3.1, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.4 });
      gsap.to("#chip3", { y: -16, x: -4, rotation: -3, duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.8 });

      // subtle typing-arm twitch
      gsap.to("#armLeft", {
        rotation: 4,
        duration: 0.35,
        transformOrigin: "top",
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.3,
        ease: "power1.inOut",
      });
    }, wrapRef);

    // wave on hover
    let waveTween = null;
    const node = wrapRef.current;
    const handleEnter = () => {
      if (waveTween) waveTween.kill();
      waveTween = gsap.to(armGroupRef.current, {
        rotation: -35,
        duration: 0.25,
        repeat: 3,
        yoyo: true,
        ease: "power1.inOut",
        onComplete: () => gsap.to(armGroupRef.current, { rotation: 0, duration: 0.3 }),
      });
    };
    node?.addEventListener("mouseenter", handleEnter);

    return () => {
      node?.removeEventListener("mouseenter", handleEnter);
      ctx.revert();
    };
  }, []);

  return (
    <div className="hero-mascot" id="heroMascot" ref={wrapRef}>
      <svg
        id="mascotSvg"
        viewBox="0 0 400 480"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Pixel ninja mascot coding on a laptop"
      >
        <ellipse className="m-shadow" cx="200" cy="450" rx="120" ry="16" fill="#000" opacity="0.35" />

        <g className="m-chip" id="chip1">
          <rect x="18" y="70" width="54" height="30" rx="6" fill="#0a0a0a" stroke="#FFD500" strokeWidth="2" />
          <text x="45" y="90" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="14" fill="#FFD500">
            &lt;/&gt;
          </text>
        </g>
        <g className="m-chip" id="chip2">
          <rect x="320" y="120" width="54" height="30" rx="6" fill="#0a0a0a" stroke="#FFD500" strokeWidth="2" />
          <text x="347" y="140" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="14" fill="#FFD500">
            01
          </text>
        </g>
        <g className="m-chip" id="chip3">
          <rect x="330" y="330" width="54" height="30" rx="6" fill="#0a0a0a" stroke="#FFD500" strokeWidth="2" />
          <text x="357" y="350" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="14" fill="#FFD500">
            {"{ }"}
          </text>
        </g>

        <g id="mascotLaptop">
          <rect x="120" y="330" width="160" height="14" rx="4" fill="#FFD500" />
          <rect x="132" y="252" width="136" height="82" rx="6" fill="#111" stroke="#FFD500" strokeWidth="3" />
          <rect x="142" y="262" width="116" height="62" rx="2" fill="#1c1c1c" />
          <text x="150" y="280" fontFamily="JetBrains Mono" fontSize="8" fill="#FFD500">
            const ninja = {"{"}
          </text>
          <text x="158" y="292" fontFamily="JetBrains Mono" fontSize="8" fill="#F5F5F0">
            rank: 30,
          </text>
          <text x="158" y="304" fontFamily="JetBrains Mono" fontSize="8" fill="#F5F5F0">
            solved: 300
          </text>
          <text x="150" y="316" fontFamily="JetBrains Mono" fontSize="8" fill="#FFD500">
            {"}"}
          </text>
        </g>

        <g id="mascotBody">
          <path
            d="M150 340 Q200 370 250 340 L260 355 Q200 390 140 355 Z"
            fill="#141414"
            stroke="#FFD500"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          <path
            d="M155 250 Q150 200 200 195 Q250 200 245 250 L255 335 Q200 350 145 335 Z"
            fill="#141414"
            stroke="#FFD500"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M186 205 Q200 225 214 205" fill="none" stroke="#FFD500" strokeWidth="3" strokeLinecap="round" />

          <path id="armLeft" d="M162 250 Q135 268 140 300" fill="none" stroke="#141414" strokeWidth="22" strokeLinecap="round" />
          <path d="M162 250 Q135 268 140 300" fill="none" stroke="#FFD500" strokeWidth="3" strokeLinecap="round" />

          <g id="armRightGroup" ref={armGroupRef} style={{ transformOrigin: "240px 252px" }}>
            <path d="M238 250 Q268 262 262 300" fill="none" stroke="#141414" strokeWidth="22" strokeLinecap="round" />
            <path d="M238 250 Q268 262 262 300" fill="none" stroke="#FFD500" strokeWidth="3" strokeLinecap="round" />
          </g>

          <circle cx="200" cy="150" r="58" fill="#F2C9A0" />
          <path d="M144 140 Q200 108 256 140 L256 156 Q200 128 144 156 Z" fill="#0a0a0a" />
          <rect x="182" y="128" width="36" height="18" rx="3" fill="#FFD500" />
          <text x="200" y="142" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="700" fontSize="12" fill="#0a0a0a">
            &lt;/&gt;
          </text>
          <path d="M250 145 Q276 150 270 172 Q262 158 248 156 Z" fill="#0a0a0a" />

          <path
            d="M144 130 Q150 78 200 74 Q250 78 256 130 Q246 96 200 92 Q154 96 144 130 Z"
            fill="#0a0a0a"
          />

          <path d="M158 168 Q200 190 242 168 L242 150 Q200 172 158 150 Z" fill="#0a0a0a" />

          <g id="eyes">
            <ellipse className="eye" cx="180" cy="152" rx="6" ry="8" fill="#0a0a0a" />
            <ellipse className="eye" cx="220" cy="152" rx="6" ry="8" fill="#0a0a0a" />
          </g>
        </g>
      </svg>
    </div>
  );
}
