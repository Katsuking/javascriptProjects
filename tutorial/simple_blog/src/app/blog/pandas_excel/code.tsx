"use client";

// hightlight.js
import hljs from "highlight.js";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/github-dark.css"; // theme設定

import { useEffect } from "react";

hljs.registerLanguage("python", python); // 言語設定

export default function Code_pandas_excel() {
	useEffect(() => {
		hljs.initHighlighting();
	}, []);

	return (
		// コード部分は、pre, codeタグで囲みます
		<pre>
			<code className="python">import pandas as pd</code>
		</pre>
	);
}
