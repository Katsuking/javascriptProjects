import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

// formに入力されたもの FormData
async function createTodo(data: FormData){
	// formに対しての処理
	// super straightforward
    "use server" // サーバーサイド
	const title = data.get("title")?.valueOf(); // ちょっと便利すぎか...
	if (typeof title !== "string" || title.length === 0) {
		throw new Error("Invalid title");
	}
	console.log(title);

	// dbに書き込んでいく
	await prisma.todo.create({data:{title, complete:false}})
	redirect("/")
}

export default function Page() {
	return (
		<>
			<header className="flex justify-between mb-4 items-center">
				<h1 className="text-2xl">Add New Task</h1>
			</header>
			<form action={createTodo} className="flex gap-2 flex-col">
				<input
					type="text"
					name="title"
					className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
				/>
                <div className="flex gap-1 justify-left">
                    <Link href=".." className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100">Cancel</Link>
                    <button type="submit" className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100">Create</button>
                </div>
			</form>
		</>
	);
}
