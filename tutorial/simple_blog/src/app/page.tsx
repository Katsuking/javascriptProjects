import Articles from "@/components/Articles";
import Footer from "@/components/Footer";
import GetPosts from "@/components/GetPosts";
import Header from "@/components/Header/Header";

import Articles from "@/components/Articles";


export default function Home() {
	return (
		<body>
			<Header />
			<h2 className="flex px-3 py-4">日々の学習のアウトプット</h2>
			{/* <GetPosts /> */}
			<Articles />
			<Footer />
		</body>
	);
}
