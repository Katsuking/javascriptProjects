import { randomUUID } from "crypto"
import Link from "next/link"


export default function Articles() {

    // blog記事まとめ
    let articles = [
        {url: "/blog/why_blog",title: "フロントエンドに触れたい", subtitle: "why blog?", date: "2023/07/01", id:randomUUID()},

        {url: "/blog/pandas_excel", title: "パスワード保護されたExcelを開く", subtitle: "python pandas x password-protected excel", date: "2023/07/02", id:randomUUID()},

    ]

    const posts = articles.map(article => (
        <article key={article.id} {...article} className='py-2 px-10 hover:text-violet-500'>
        <div className="bg-gray-200 rounded-lg p-4 border border-blue-400 shadow-lg">
            <Link href={article.url}>
            <h2 className='flex justify-center font-bold'>{article.title}</h2>
            <p className='text-sm text-slate-700'>{article.subtitle}</p>
            <p className='text-sm text-slate-400'>{article.date}</p>
            </Link>
        </div>
    </article>
    ))

    return <>{posts}</>

};

