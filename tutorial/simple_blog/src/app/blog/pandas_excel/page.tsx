import Navbar from "@/components/Navbar";
import Code_pandas_excel from "./code";

export default function Pandas_excel() {
	return (
		<div>
			<Navbar />
			<h3 className="pt-8 px-5"></h3>
			<div className="px-2">
				<h3 className="flex justify-center px-5 ring-2 rounded-full ">
					pandasでパスワード付きのエクセルを開く
				</h3>
				<div className="p-1">
					<p className="text-sm">
						ISMS関連でたまにExcel用の業務効率化ツールを作成します。
					</p>
					<p className="text-sm ">取得まで処理はだいたい同じになるはず</p>
				</div>
				<div className="px-2 text-xs container mx-auto">
					<p className="flex px-3">python</p>
					<Code_pandas_excel />
				</div>
			</div>
		</div>
	);
}
