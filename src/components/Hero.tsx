import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Hero = () => {
	return (
		<div className="relative h-screen overflow-none">
			{/* SVG wave container */}
			<div className="absolute inset-0 w-full h-full overflow-none">
				<svg
					width="100%"
					height="100%"
					viewBox="0 0 1439 857"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="w-full h-full"
					preserveAspectRatio="xMidYMid slice" // Adjusted for better aspect ratio handling
				>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M0 0L29.9792 112.357C59.9583 222.512 119.917 445.023 179.875 445.023C239.833 445.023 299.792 222.512 359.75 207.09C419.708 191.668 479.667 381.134 539.625 445.023C599.583 508.913 659.542 445.023 719.5 332.666C779.458 222.512 839.417 63.8895 899.375 79.3111C959.333 94.7327 1019.29 286.401 1079.25 317.244C1139.21 350.291 1199.17 222.512 1259.12 143.201C1319.08 63.8895 1379.04 33.0463 1409.02 15.4216L1439 0V857H1409.02C1379.04 857 1319.08 857 1259.12 857C1199.17 857 1139.21 857 1079.25 857C1019.29 857 959.333 857 899.375 857C839.417 857 779.458 857 719.5 857C659.542 857 599.583 857 539.625 857C479.667 857 419.708 857 359.75 857C299.792 857 239.833 857 179.875 857C119.917 857 59.9583 857 29.9792 857H0V0Z"
						fill="url(#paint0_linear_18_2)"
					/>
					<defs>
						<linearGradient
							id="paint0_linear_18_2"
							x1="812.025"
							y1="857.556"
							x2="761.297"
							y2="182.22"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#E21D48" />
							<stop offset="1" stopColor="#FFC4D1" />
						</linearGradient>
					</defs>
				</svg>
			</div>
			<div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center p-4 md:p-8 z-10">
				{/* Text content */}
				<div className="text-black flex flex-col justify-center items-center p-4 md:p-8 max-w-xl text-center">
					<h1 className="text-3xl md:text-5xl font-bold leading-tight">
						Welcome to Cafe [Name]
					</h1>
					<h2 className="text-2xl md:text-4xl font-bold leading-normal mt-2 md:mt-4">
						Take a Sip and Relax
					</h2>
					<p className="text-lg md:text-2xl mt-4 md:mt-6 max-w-sm mx-auto font-medium">
						Serving specially handcrafted drinks in a cozy atmosphere
					</p>
					<div className="mt-4 md:mt-6 flex justify-center">
						<Button className="w-fit px-12 py-6 text-lg mx-auto">
							<Link href="/menu">Start Order</Link>
						</Button>
					</div>
				</div>

				{/* Image placed next to the text, stack vertically on small screens */}
				<div className="mt-6 md:mt-0 md:ml-12">
					<Image
						src="/assets/coffee-home.png"
						height={550}
						width={550}
						alt="Coffee cup"
						className="z-10"
					/>
				</div>
			</div>
		</div>
	);
};

export default Hero;
