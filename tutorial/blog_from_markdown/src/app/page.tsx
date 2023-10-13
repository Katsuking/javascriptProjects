import GetPosts from "@/components/GetPosts";

export default function Home() {
	return (
		<div>
			<h2 className="flex px-3 py-4">日々の学習のアウトプット</h2>
			<GetPosts />
      <p className="text-sm p-3">
				GithubのIssueにでも書いとけってレベルですが...
        <br />
        これでも, markdownでかんたんにpostできるようにしたり、
        工夫はしているつもり。
        後々、アップグレードしていきます。たぶん...
      </p>
		</div>
	);
}
