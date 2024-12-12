import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Coffee, Utensils, Clock } from "lucide-react";

export default function AboutPage() {
	return (
		<div className="px-4 py-8 bg-rose-50 min-h-screen">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-4xl font-bold mb-8 text-center text-brown-600">
					About Our Café
				</h1>

				<section className="mb-12">
					<h2 className="text-2xl font-semibold mb-4 text-brown-600">
						Our Story
					</h2>
					<p className="text-lg text-muted-foreground">
						Established in 2010, our café has been serving the community with
						passion and dedication. We started as a small corner shop and have
						grown into a beloved local gathering spot, known for our artisanal
						coffee and homemade pastries.
					</p>
				</section>

				<section className="mb-12">
					<h2 className="text-2xl font-semibold mb-4 text-brown-600">
						What We Offer
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{[
							{
								title: "Artisanal Coffee",
								description: "Locally roasted, ethically sourced beans",
								icon: Coffee,
							},
							{
								title: "Fresh Pastries",
								description: "Baked in-house daily",
								icon: Utensils,
							},
							{
								title: "Cozy Atmosphere",
								description: "Perfect for work or relaxation",
								icon: Clock,
							},
						].map((item) => (
							<Card key={item.title} className="bg-white">
								<CardHeader>
									<div className="w-12 h-12 mx-auto bg-rose-100 rounded-full flex items-center justify-center">
										<item.icon className="w-6 h-6 text-brown-600" />
									</div>
								</CardHeader>
								<CardContent className="text-center">
									<CardTitle className="mb-1 text-brown-600">
										{item.title}
									</CardTitle>
									<p className="text-sm text-muted-foreground">
										{item.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</section>

				<section className="mb-12">
					<h2 className="text-2xl font-semibold mb-4 text-brown-600">
						Our Team
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{[
							{
								name: "Emma Johnson",
								role: "Head Barista",
								avatar: "/placeholder.svg?height=100&width=100",
							},
							{
								name: "Liam Chen",
								role: "Pastry Chef",
								avatar: "/placeholder.svg?height=100&width=100",
							},
							{
								name: "Sophie Martinez",
								role: "Café Manager",
								avatar: "/placeholder.svg?height=100&width=100",
							},
						].map((member) => (
							<Card key={member.name} className="bg-white">
								<CardHeader>
									<Avatar className="w-24 h-24 mx-auto">
										<AvatarImage src={member.avatar} alt={member.name} />
										<AvatarFallback>
											{member.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
								</CardHeader>
								<CardContent className="text-center">
									<CardTitle className="mb-1 text-brown-600">
										{member.name}
									</CardTitle>
									<p className="text-sm text-muted-foreground">{member.role}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-4 text-brown-600">
						Our Philosophy
					</h2>
					<Card className="bg-white">
						<CardContent className="p-6">
							<p className="text-lg">
								At our café, we believe in creating a warm and inviting space
								where our community can come together. We&apos;re committed to
								serving high-quality, ethically sourced coffee and food made
								with love. Our goal is to make every visit a delightful
								experience that keeps you coming back.
							</p>
						</CardContent>
					</Card>
				</section>
			</div>
		</div>
	);
}
