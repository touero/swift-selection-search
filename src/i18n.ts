/*

Runtime internationalization (i18n) for SSS.

English strings live directly in the HTML/TS sources and act as the fallback
language. The dictionaries below override them when another locale is active.
The active locale comes from the "language" setting ("auto" follows the
browser UI language, "en" and "zh_CN" force a language).

The English dictionary only contains strings that are generated from scripts
(alerts, dynamically created labels, etc). Elements in the HTML pages keep
their English text inline and are only replaced when the current locale has a
translation for their data-i18n* key.

This file is used by the service worker (importScripts), the options page,
the toolbar popup and the intro page. Content scripts do NOT load it; they
receive already-translated data from the service worker instead.

*/

namespace SSS_I18N
{
	export type Locale = "en" | "zh_CN";

	// English text for strings that scripts generate (HTML keeps its own English).
	const english: { [key: string]: string } = {
		engine_showInPopup: "Show in popup",

		groupPopup_chooseEngines: "Choose the engines that will belong to this group:",
		groupPopup_removeEngine: "Remove this engine from the group",
		groupPopup_revertIconConfirm: "Revert to the default icon?",
		groupPopup_groupNamePlaceholder: "Group name",
		groupPopup_defaultGroupName: "Group",
		groupPopup_cycleError: "Adding this group engine would create an infinite cycle, since it contains (directly or indirectly) the group you're currently editing. You can't do that! ;)",

		alert_noNewEngines: "No new engines were added.",
		alert_browserImportUnsupported: "Chrome does not provide extensions with a list of configured search engines. Add a custom search engine instead.",
		alert_downloadsPermission: "Sorry, you cannot export your file without the \"Downloads\" permission! I know it's weird, but it's really needed. :(",
		alert_tabsPermission: "Sorry, the website blocklist won't work without the \"Tabs\" permission!",

		confirm_resetEngines: "Really reset search engines to the default ones?",
		confirm_resetSettings: "Really reset all settings to their default values?",
		confirm_loadFromSync: "Really load all settings from Chrome Sync?",
		confirm_shortcutOverride: "This shortcut is already assigned to \"$1\"! Override?",
		confirm_deleteFromGroups: "This engine will also be removed from the following group(s): \n\n$1\n\nAre you sure?",

		newEngineDefaultName: "New Search Engine",
		browserEngineDescription: "[Browser] Engine imported from the chrome.",
		groupEngine_clickToEdit: "Click to edit this group",
		engine_deleteTooltip: "Delete",
		engineOption_shortcutTooltip: "Type a single character to use as a shortcut for this engine. Shortcuts can then be used when the popup is visible.",

		engineOption_copyAsPlainText: "Copy as plain-text",
		engineOption_textEncoding: "Text encoding",
		engineOption_textEncodingTitle: "If this is a search engine for non-latin alphabets, like Cyrillic, Chinese, Japanese, etc, it might use a different text encoding. You can change it here.",
		engineOption_discardOnOpen: "Discard on open (Advanced)",
		engineOption_discardOnOpenTitle: "Opens the search but discards the resulting page. Useful if this is a \"non-http\" search engine that opens outside the browser, because that would generate an empty tab/page.",
		engineOption_noExtraOptions: "No extra options.",

		encoding_defaultUtf8: "Default (UTF-8)",
	};

	// Simplified Chinese. Contains every translatable key (HTML and script strings).
	const chinese: { [key: string]: string } = {

		/* ===== page chrome ===== */

		page_title: 'SSS 选项',
		toggleDarkMode_title: '在深色/浅色选项页面之间切换',
		header_title: '<span style="color: #3399FF">Swift Selection Search (SSS)</span><br>选项',

		/* ===== general section ===== */

		section_general: '通用',
		setting_language_name: '语言',
		setting_language_desc: 'SSS 页面、弹窗提示和右键菜单使用的语言。“自动”会跟随浏览器的界面语言。',
		language_option_auto: '自动（跟随浏览器语言）',
		button_default: '默认',

		/* ===== instructions section ===== */

		section_instructions: '使用说明',
		instructions_quickSetup_name: '快速上手',
		instructions_quickSetup_html: '<ol><li>使用下方“搜索引擎”区块中的<pop>添加搜索引擎</pop>按钮添加新的搜索引擎。SSS 自带了几个示例！Chrome 不允许扩展读取浏览器内置的搜索引擎，所以请手动添加你需要的引擎。</li><li>在网页上选中文字后，引擎会出现在弹窗和/或右键菜单中。点击某个引擎时，会调用你定义的搜索网址，并把 <popm>{searchTerms}</popm> 替换为选中的文字。</li><li>要自定义弹窗外观、右键菜单、点击行为等，请探索本页面中的各个选项。;)</li></ol>',
		instructions_problems_name: '遇到问题？',
		instructions_problems_html: '<ul><li>广告拦截器的某些拦截列表可能会阻止某些搜索引擎图标或名称加载！如果图标没有显示，请检查这一点。（例如：YouTube 可能被 <pop>Fanboy\'s Annoyance List</pop> 拦截。有时把“YouTube”改名为“YouTub”之类的也能解决！）</li><li>如果在暂停/继续播放 YouTube 视频时弹窗出现了，那是因为你轻微移动了鼠标，选中了顶部 YouTube 标志旁边的国家代码。;) 我知道这很烦人！请尝试把“最少选中字符数”设置为 3，或者使用非“自动”的“打开行为”。</li><li>如果某些搜索引擎的图标是 <popm>resource://</popm> 链接（一些导入的引擎会有这种情况），这些图标可能无法显示。很遗憾，这是正常现象。请尝试为该引擎寻找其他图标，或者删除图标链接，SSS 会尝试帮你获取。</li><li>如果弹窗在某个网站上或网站的部分内容中完全不出现，可能是由于该网站的内容策略。例如，<pop>chromewebstore.google.com</pop> 和其他 <pop>chrome://</pop> 页面不允许扩展修改它们。</li><li>这里没有你的问题？请前往 SSS 在 <a target="_blank" href="https://chromewebstore.google.com/detail/swift-selection-search/imminkkhgldibmkjekahkgbgkkmglhdp">Chrome 网上应用店</a> 的页面，查看如何反馈问题。</li></ul>',
		instructions_addSite_name: '不知道该怎么添加某个特定的网站……',
		instructions_addSite_html: '<details><summary>【点击展开/折叠】</summary><ul><li>这并不总是容易弄清楚的！我来试着帮帮你。:)</li><li>在网站上使用搜索栏之后，网站通常会把搜索内容放到网址中的某个位置。例如，在 Google 上搜索 <pop>Chrome Web Store</pop>，Google 会在网址中加上 <popm>q=Chrome+Web+Store</popm>（此外可能还夹杂着许多其他内容）。<popm>q</popm> 是 Google 用于用户查询的参数。其他网站会使用不同的结构，但你输入的内容应该会出现在网址里（除非网站使用 POST 请求，那就是另一回事了！）。</li><li>SSS 需要一个在查询内容所在位置写有 <popm>{searchTerms}</popm> 的搜索网址。在上面的例子中，就是把 <popm>q=Chrome+Web+Store</popm> 替换为 <popm>q={searchTerms}</popm>。</li><li>小技巧<ul><li>看看 SSS 自带的搜索引擎的搜索网址！它们可能会有帮助。</li><li>许多网站使用 <popm>?</popm> 符号，然后添加许多用 <popm>&amp;</popm> 符号分隔的参数。你通常要找到代表查询内容的那个参数，并把它替换为 <popm>{searchTerms}</popm>。</li><li>大多数时候，网址里还包含许多不必要的参数。删除它们基本上靠反复尝试。</li><li>有时它不是参数，而在网址的其他位置。网站有时候就是这样复杂。:(</li></ul></li></ul></details>',
		instructions_advanced_name: '高级用法',
		instructions_advanced_html: '<details><summary>【点击展开/折叠】</summary><ul><li>你可能会注意到，在引擎列表中点击某个搜索引擎时它会展开，并显示额外的选项。其中之一是“文字编码”选项。对于使用日文、中文等非拉丁字母的网站，更改编码有时是必不可少的。如果在这类网站上遇到问题，请尝试把编码从 UTF-8 更改为更合适的编码（具体取决于该网站搜索时使用的编码！）。</li><li>大多数 <a target="_blank" href="https://developer.mozilla.org/docs/Web/API/URL#Properties">JavaScript URL 属性</a>都可以作为搜索网址中的变量使用，例如 <popm>{hash}</popm>、<popm>{host}</popm>、<popm>{hostname}</popm>、<popm>{href}</popm>、<popm>{origin}</popm>、<popm>{password}</popm>、<popm>{pathname}</popm>、<popm>{port}</popm>、<popm>{protocol}</popm>、<popm>{search}</popm> 和 <popm>{username}</popm>。例如，如果搜索网址中包含 <popm>{hostname}</popm>，搜索时它会被替换为当前网站所在的域名（例如 <popm>google.com</popm>）。</li><li>诸如 <popm>{searchTerms}</popm> 和 JavaScript URL 属性（如 <popm>{hostname}</popm>、<popm>{href}</popm> 等）之类的变量支持文本替换，格式为 <popm>{variable{原始文本|新文本}}</popm>，并且允许使用多组 <popm>{原始文本|新文本}</popm>。<ul><li>例如，如果你想始终把搜索内容中的空格替换为“+”，把“@”替换为“at”，可以在搜索引擎中使用 <popm>{searchTerms{ |+}{@|at}}</popm>。</li><li>由于 SSS 使用特殊字符 <popm>\\</popm>、<popm>{</popm>、<popm>|</popm> 和 <popm>}</popm> 来分隔替换规则，如果想在替换内容本身中使用这些字符，应在它们前面加上 <popm>\\</popm>。这称为“字符转义”。例如，<popm>{searchTerms{\\{|\\}}}</popm> 会把文本中的 <popm>{</popm> 替换为 <popm>}</popm>，而 <popm>{searchTerms{ |\\\\}}</popm> 会把空格替换为 <popm>\\</popm>（是的，这很难读！）。</li><li>替换规则还可以是<a target="_blank" href="https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions">正则表达式</a>。如果你不了解它们也没关系。解释它们远远超出了本说明的范围。<ul><li>正则替换的形式为 <popm>{searchTerms{re/你的正则表达式/标志}}</popm>（选中的文本将被替换为仅与表达式匹配的字符），或 <popm>{searchTerms{re/你的正则表达式/标志|替换内容}}</popm>（匹配的内容将被替换为“替换内容”）。如果使用与所有出现位置都匹配的 <popm>g</popm> 标志，每一处都会被替换。</li><li>替换内容支持匹配组，替换中的 $1 对应第一个分组，$2 对应第二个，依此类推。</li><li>举个例子，如果你想删除 searchTerms 中的所有非字母数字字符，可以使用 <popm>{searchTerms{re/[0-9a-z]/gi}}</popm>（<popm>g</popm> 查找所有匹配，<popm>i</popm> 表示不区分大小写）。要交换用空格分隔的两个单词，可以使用 <popm>{searchTerms{re/(\\w+)\\s+(\\w+)/g|$2 $1}}</popm>。它会把“John Smith”这样的两个词变成“Smith John”。</li></ul></ul></li><li>变量支持通过索引格式 <popm>{variable[index]}</popm> 或 <popm>{variable[start:end]}</popm>（start 和 end 都可省略）只使用选中文本的一部分。<ul><li><popm>{searchTerms[index]}</popm> 可以选取指定位置（从 0 开始）上的单个字符。例如搜索“Chrome”时，<popm>{searchTerms[0]}</popm> 会得到“C”，<popm>{searchTerms[2]}</popm> 会得到“r”。</li><li><popm>{searchTerms[start:end]}</popm> 用于多个字符。对于“Chrome”，<popm>{searchTerms[0:2]}</popm> 得到“Ch”，<popm>{searchTerms[2:5]}</popm> 得到“rom”，<popm>{searchTerms[2:]}</popm> 得到“rome”，<popm>{searchTerms[:5]}</popm> 得到“Chrom”。</li><li>也允许使用负数索引，<popm>{searchTerms[-1]}</popm> 给出选中文本的最后一个字符，<popm>{searchTerms[-3:]}</popm> 给出最后三个字符。</li></ul></li><li>变量还支持一些函数，格式为 <popm>{variable(函数名)}</popm>。<ul><li><popm>{searchTerms(lowercase)}</popm> 和 <popm>{searchTerms(uppercase)}</popm> 分别把文本转换为<pop>小写</pop>和<pop>大写</pop>。</li><li><popm>{searchTerms(encodeURIComponent)}</popm> 会对文本应用 URL 编码，把 URL 中不允许的字符替换为转义形式。例如，% 被替换为 %25，/ 被替换为 %2F 等。注意：SSS 在所有替换完成后会<pop>始终</pop>应用 URL 编码（否则网址中可能出现无效字符），所以此函数只应适用于少数会进行多次编码，或编码后还做额外修改的网站。</li><li><popm>{searchTerms(disableURIEncoding)}</popm> 会禁用默认总会应用于最终文本的 URL 编码。这对搜索链接的网站很有用。例如，Internet Archive 网站可以搜索 <popm>https://www.google.com</popm>，但不能搜索 <popm>https%3A%2F%2Fwww.google.com</popm>（编码后的结果），此时就应使用 <popm>disableURIEncoding</popm>。</li></ul></li><li>上述任何变量修改（替换、索引、函数）都可以组合使用。因此，类似 <popm>{searchTerms[2:5]{ |+}{@|at}(lowercase)}</popm> 的写法是有效的，并且会按给定顺序依次应用：先只选取第 2、3、4 个字符，然后转换其中的空格和 @，最后把结果转换为小写。（唯一的例外是 disableURIEncoding，它的顺序无关紧要。）</li></ul></details>',
		ui_expandCollapse: '【点击展开/折叠】',
		ui_seeExamples: '【点击查看示例】',

		/* ===== search engines section ===== */

		section_searchEngines: '搜索引擎',
		engine_showInPopup: '在弹窗中显示',
		engine_table_name: '名称',
		engine_table_searchUrl: '搜索网址',
		engine_table_iconUrl: '图标网址',
		engine_table_shortcut: '快捷键',
		b_addEngine: '添加搜索引擎',
		b_addGroup: '添加分组',
		b_addSeparator: '添加分隔符',
		s_importBrowserEngines_name: '导入浏览器搜索引擎',
		b_import: '导入',
		s_importBrowserEngines_desc: '导入你平时在浏览器搜索栏中使用的搜索引擎。<br><br>注意：Chrome 不会向扩展提供已配置的搜索引擎列表，因此此按钮无法导入它们。请改为添加自定义搜索引擎。',
		s_resetEngines_name: '重置搜索引擎',
		b_resetEngines: '重置引擎',
		s_resetEngines_desc: '将搜索引擎重置为默认值（如同首次运行 SSS 时一样）。',
		s_iconsSource_name: '自动图标网址的来源',
		o_iconsSource_none: '无',
		s_iconsSource_desc: '定义添加新引擎时自动获取搜索引擎图标的来源。如果你有隐私方面的顾虑，或希望全部手动添加图标，请更改此选项。',

		/* ===== popup behaviour section ===== */

		section_popupBehaviour: '弹窗/图标行为',
		s_autoOpen_name: '选中文字时自动打开',
		s_autoOpen_desc: '启用后，选中文字时 SSS 弹窗会自动打开。如果不想被打扰可以禁用它；你仍然可以选中文字后右键点击，或使用键盘快捷键来搜索。',
		s_openBehaviour_name: '打开行为',
		o_open_off: '关闭（从不）',
		o_open_auto: '自动（选中文字时打开）',
		o_open_holdAlt: '按住 Alt（选中时按住 Alt 键【Mac 上为 Option】）',
		o_open_keyboard: '仅键盘（选中文字后按键盘快捷键）',
		o_open_middleMouse: '鼠标中键（在选中的文字上按鼠标中键）',
		s_openBehaviour_desc: '何时打开弹窗。',
		s_middleClickMargin_name: '鼠标中键点击边距',
		s_middleClickMargin_desc: '添加以像素为单位的边距，这样在选区附近也可以使用中键点击，不必完全点在选区上。',
		s_minChars_name: '最少选中字符数',
		s_minChars_desc: '在“自动”打开行为下，只有选中的字符数至少达到此数量时才显示弹窗（不计首尾空格）。设为 0 则始终显示。',
		s_maxChars_name: '最多选中字符数',
		s_maxChars_desc: '在“自动”打开行为下，只有选中的字符数不超过此数量时才显示弹窗（不计首尾空格）。设为 0 则始终显示。',
		s_popupDelay_name: '弹窗延迟',
		s_popupDelay_desc: '选中文字后延迟多少毫秒再显示弹窗。如果你经常用三连击来选中整段文字，这可以避免误点击。',
		s_popupLocation_name: '弹窗位置',
		o_popupLoc_selection: '选区“矩形”的右下角',
		o_popupLoc_cursor: '在光标位置',
		s_popupLocation_desc: '选中文字后弹窗出现的位置。',
		s_mouseLeft_name: '鼠标左键点击',
		s_mouseLeft_desc: '用鼠标左键点击搜索引擎时的行为。',
		s_mouseRight_name: '鼠标右键点击',
		s_mouseRight_desc: '用鼠标右键点击搜索引擎时的行为。',
		s_mouseMiddle_name: '鼠标中键点击',
		s_mouseMiddle_desc: '用鼠标中键点击搜索引擎时的行为。',
		s_shortcutBehaviour_name: '使用快捷键时',
		s_shortcutBehaviour_desc: '通过快捷键搜索时的行为。也适用于用 TAB 键选中引擎的情况。',
		o_open_thisTab: '在当前标签页打开',
		o_open_newTab: '在新标签页打开',
		o_open_newBgTab: '在新后台标签页打开',
		o_open_newTabNext: '在新标签页打开（紧邻当前标签页）',
		o_open_newBgTabNext: '在新后台标签页打开（紧邻当前标签页）',
		o_open_newWindow: '在新窗口打开',
		s_allowEditable_name: '在可编辑区域显示弹窗',
		s_allowEditable_desc: '在登录表单、搜索栏或电子邮件撰写窗口等可编辑文本区域中用鼠标选中文字时也显示弹窗。注意：“打开弹窗的快捷键”不受此选项影响，在可编辑区域中始终可用。',
		s_hideOnScroll_name: '页面滚动时隐藏弹窗',
		s_hideOnScroll_desc: '页面滚动时隐藏弹窗。',
		s_hideOnRightClick_name: '右键点击时隐藏弹窗',
		s_hideOnRightClick_desc: '在弹窗外按下鼠标右键时隐藏弹窗。注意：左键或中键点击始终会隐藏弹窗，不受此选项影响。',
		s_hideOnSearch_name: '点击搜索引擎时隐藏弹窗',
		s_hideOnSearch_desc: '点击某个搜索引擎时隐藏弹窗。使用快捷键搜索时同样适用。',
		s_shortcutWithoutPopup_name: '弹窗未显示时也允许使用引擎快捷键',
		s_shortcutWithoutPopup_desc: '即使弹窗未显示，也启用搜索引擎快捷键。<br>注意：如果引擎未勾选“在弹窗中显示”，快捷键将不起作用（即使并不需要弹窗）。在可编辑区域中输入时，快捷键同样不起作用。',
		s_openPopupShortcut_name: '打开弹窗的快捷键',
		s_openPopupShortcut_desc: '要更改此快捷键，请使用 Chrome 的“键盘快捷键”页面（<popm>chrome://extensions/shortcuts</popm>）。<br>默认值为 Ctrl+Shift+Space（注意：在 Mac 上，Ctrl 指的是 Command 键）。',
		s_toggleAutoPopupShortcut_name: '切换自动打开弹窗的快捷键',
		s_toggleAutoPopupShortcut_desc: '要更改此快捷键，请使用 Chrome 的“键盘快捷键”页面（<popm>chrome://extensions/shortcuts</popm>）。<br>默认值为 Ctrl+Shift+U（注意：在 Mac 上，Ctrl 指的是 Command 键）。',
		s_animationDuration_name: '弹窗动画时长',
		s_animationDuration_desc: '弹窗动画的时长，以毫秒为单位。设为 0 可让弹窗立即显示。',
		s_autoCopy_name: '自动复制到剪贴板',
		o_autoCopy_off: '关闭',
		o_autoCopy_always: '总是',
		o_autoCopy_nonEditableOnly: '仅对不可编辑文字',
		s_autoCopy_desc: '弹窗打开时自动把选中的文字复制到剪贴板。',
		s_blocklist_name: '网站屏蔽列表',
		s_blocklist_desc: '在这些网址上禁用弹窗。每行写一个网址，不要使用“http”“https”或任何其他协议。网址支持通配符 *（表示“任意数量的字符，包括零个”），也支持 /你的正则表达式/ 形式的正则表达式（regex）。<br><br>注意：无论此设置如何，通过键盘快捷键打开弹窗始终有效。<br><br><details><summary>【点击查看示例】</summary><div><br><popm>google.com</popm> → 屏蔽 google.com，但不屏蔽 www.google.com 和 drive.google.com<br><popm>*.google.com</popm> → 屏蔽 www.google.com 和 drive.google.com，但不屏蔽 google.com<br><popm>*google.com</popm> → 屏蔽 google.com、www.google.com、drive.google.com<br><popm>drive.google.com</popm> → 屏蔽 drive.google.com<br><popm>docs.google.com/spreadsheets</popm> → 屏蔽 docs.google.com/spreadsheets（其他页面不受影响）<br><popm>/\\.com/</popm> → （正则）屏蔽所有网址中包含“.com”的网站<br><br>注意：正则表达式的错误会由 SSS 作为警告报告到 Chrome 的 DevTools 控制台。在页面上打开 DevTools（Ctrl+Shift+J），或从 <popm>chrome://extensions</popm> 检查扩展的 Service Worker 即可查看。</div></details>',

		/* ===== popup appearance section ===== */

		section_popupAppearance: '弹窗/图标外观',
		s_showTextField_name: '显示文本框',
		s_showTextField_desc: '在弹窗中显示一个包含当前选中文字的文本框。便于在用某个引擎搜索前先修改文字。',
		s_textFieldLocation_name: '文本框位置',
		o_textFieldLoc_top: '顶部',
		o_textFieldLoc_bottom: '底部',
		s_textFieldLocation_desc: '文本框在弹窗中的位置，位于搜索引擎的上方或下方。',
		s_singleRow_name: '单行显示',
		s_singleRow_desc: '把所有搜索引擎放在一行中显示，而不是网格排列。',
		s_iconsPerRow_name: '网格中每行的图标数',
		s_iconsPerRow_desc: '网格显示时每行最多的搜索引擎数量。',
		s_iconAlignment_name: '网格中的图标对齐方式',
		o_align_left: '左对齐',
		o_align_middle: '居中',
		o_align_right: '右对齐',
		s_iconAlignment_desc: '指定网格显示时某一行未排满的情况下图标如何对齐。',
		s_iconSize_name: '图标大小',
		s_iconSize_desc: '搜索引擎图标的尺寸，以像素为单位。',
		s_separatorWidth_name: '分隔符宽度',
		s_separatorWidth_desc: '分隔符图标的宽度，按图标大小的百分比计算。',
		s_iconPaddingH_name: '图标水平内边距',
		s_iconPaddingH_desc: '搜索引擎图标的水平内边距（左右两侧），以像素为单位。',
		s_iconPaddingV_name: '图标垂直内边距',
		s_iconPaddingV_desc: '搜索引擎图标的垂直内边距（上下两侧），以像素为单位。',
		s_iconHover_name: '图标悬停效果',
		o_hover_nothing: '无（无悬停效果）',
		o_hover_highlight: '仅高亮',
		o_hover_highlightMove: '高亮并移动',
		o_hover_scale: '缩放',
		s_iconHover_desc: '鼠标悬停在搜索引擎图标上时的效果。',
		s_iconRoundness_name: '图标圆角',
		s_iconRoundness_desc: '图标的圆角半径，以像素为单位。让图标更圆或更方。注意：对于没有背景的图标，效果可能不明显。',
		s_popupBgColor_name: '弹窗背景色',
		s_popupBgColor_desc: '弹窗背景的颜色。支持使用 #rrggbbaa 表示透明度。',
		s_popupHighlightColor_name: '弹窗高亮色',
		s_popupHighlightColor_desc: '弹窗高亮的颜色。支持使用 #rrggbbaa 表示透明度。',
		s_popupPaddingX_name: '弹窗水平内边距',
		s_popupPaddingX_desc: '弹窗左右两侧的内边距，以像素为单位。',
		s_popupPaddingY_name: '弹窗垂直内边距',
		s_popupPaddingY_desc: '弹窗上下两侧的内边距，以像素为单位。',
		s_popupOffsetX_name: '弹窗水平偏移',
		s_popupOffsetX_desc: '弹窗相对默认位置的水平偏移，以像素为单位（正值向右移动）。',
		s_popupOffsetY_name: '弹窗垂直偏移',
		s_popupOffsetY_desc: '弹窗相对默认位置的垂直偏移，以像素为单位（正值向上移动）。',
		s_popupRoundness_name: '弹窗圆角',
		s_popupRoundness_desc: '弹窗的圆角半径，以像素为单位。让弹窗更圆或更方。',
		s_customCss_name: '使用自定义 CSS 格式（实验性）',
		s_customCss_desc: '如果你了解 CSS，可以对弹窗应用任何想要的格式，例如自定义图标悬停动画或背景图片。请记住，你的自定义 CSS 会*添加*到 SSS 使用的内部 CSS 之上，因此可能产生冲突。<br><br>注意：如果将来的更新更改了弹窗的内部 CSS，此选项可能会自动停用以避免问题。',
		s_customCssField_name: '自定义 CSS',

		/* ===== context menu section ===== */

		section_contextMenu: '右键菜单',
		s_contextMenu_desc: '右键菜单始终启用。在选中文字后右键点击网页时，“Swift Selection Search”子菜单会列出与弹窗相同的引擎（即在“搜索引擎”区块中勾选了“P.”复选框的那些）。',
		s_contextMenuBehaviour_name: '右键菜单左键点击行为',
		s_contextMenuBehaviour_desc: '在右键菜单中点击搜索引擎时的行为。<br>注意：Chrome 的右键菜单项只会报告左键点击，因此没有单独的右键/中键点击行为。',

		/* ===== storage & backup section ===== */

		section_storage: '存储与备份',
		s_storageSize_name: '存储大小',
		s_storageSize_desc: '这是你的 SSS 引擎和选项所占用的 Chrome 同步存储的估算值。<span class="warn-when-over-storage-limit">使用“data:image”图标的引擎往往会占用大量空间。</span>实际大小可能略有出入。',
		s_syncUpload_name: '同步选项（上传）',
		b_saveToSync: '保存到同步',
		s_syncUpload_desc: '把所有 SSS 选项和引擎保存到 Chrome 同步。启用扩展同步后，Chrome 会在已登录的 Chrome 配置文件之间同步这些数据。<span class="warn-when-over-storage-limit">总量必须保持在 Chrome 的 100KB 同步存储限制之内。如果太大，请从引擎中移除“data:image”图标或其他极长的网址。</span>',
		s_syncDownload_name: '同步选项（下载）',
		b_loadFromSync: '从同步加载',
		s_syncDownload_desc: '加载之前保存到 Chrome 同步的 SSS 选项和引擎。这会覆盖所有现有的选项和引擎！',
		s_export_name: '导出选项到文件',
		b_exportToFile: '导出到文件',
		s_export_desc: '把所有 SSS 选项和引擎导出到文件。',
		s_import_name: '从文件导入选项',
		b_importFromFile: '从文件导入',
		s_import_desc: '从文件（之前导出的）导入 SSS 选项和引擎。这会覆盖所有现有的选项和引擎！',

		/* ===== reset section ===== */

		section_reset: '重置',
		s_reset_name: '重置所有选项',
		b_resetOptions: '重置选项',
		s_reset_desc: '把除搜索引擎外的所有选项重置为默认值（如同首次运行 SSS 时一样）。',

		/* ===== group popup ===== */

		b_save: '保存',
		b_cancel: '取消',
		groupPopup_chooseEngines: '选择要加入此分组的引擎：',
		groupPopup_removeEngine: '从此分组中移除该引擎',
		groupPopup_revertIconConfirm: '恢复默认图标？',
		groupPopup_groupNamePlaceholder: '分组名称',
		groupPopup_defaultGroupName: '分组',
		groupPopup_cycleError: '添加此分组引擎会产生无限循环，因为它（直接或间接地）包含你正在编辑的分组。不能这样做哦！;)',

		/* ===== script-generated strings ===== */

		alert_noNewEngines: '没有添加新引擎。',
		alert_browserImportUnsupported: 'Chrome 不会向扩展提供已配置的搜索引擎列表。请改为添加自定义搜索引擎。',
		alert_downloadsPermission: '抱歉，没有“下载”权限就无法导出文件！我知道这很奇怪，但确实需要。:(',
		alert_tabsPermission: '抱歉，没有“标签页”权限，网站屏蔽列表将无法工作！',

		confirm_resetEngines: '确定要将搜索引擎重置为默认值吗？',
		confirm_resetSettings: '确定要将所有设置重置为默认值吗？',
		confirm_loadFromSync: '确定要从 Chrome 同步加载所有设置吗？',
		confirm_shortcutOverride: '此快捷键已分配给“$1”！要覆盖吗？',
		confirm_deleteFromGroups: '此引擎也将从以下分组中移除：\n\n$1\n\n确定吗？',

		newEngineDefaultName: '新建搜索引擎',
		browserEngineDescription: '[浏览器] 从浏览器导入的引擎。',
		groupEngine_clickToEdit: '点击编辑此分组',
		engine_deleteTooltip: '删除',
		engineOption_shortcutTooltip: '输入单个字符作为此引擎的快捷键。弹窗显示时即可使用快捷键。',

		engineOption_copyAsPlainText: '复制为纯文本',
		engineOption_textEncoding: '文字编码',
		engineOption_textEncodingTitle: '如果这是针对西里尔文、中文、日文等非拉丁字母的搜索引擎，它可能使用不同的文字编码。可以在此更改。',
		engineOption_discardOnOpen: '打开后丢弃（高级）',
		engineOption_discardOnOpenTitle: '打开搜索但丢弃结果页面。如果这是一个在浏览器之外打开的“非 http”搜索引擎，这会很有用，因为那会生成一个空白的标签页/窗口。',
		engineOption_noExtraOptions: '没有其他选项。',

		'encodingGroup_Native': '原生',
		'encodingGroup_ISO codepages': 'ISO 代码页',
		'encodingGroup_Cyrillic (Russia, Ukraine)': '西里尔文（俄罗斯、乌克兰）',
		'encodingGroup_Chinese (China)': '中文（中国大陆）',
		'encodingGroup_Chinese (Taiwan, Hong Kong)': '中文（台湾、香港）',
		'encodingGroup_Japanese': '日语',
		'encodingGroup_Korean': '韩语',
		encoding_defaultUtf8: '默认（UTF-8）',

		sssIcon_copyToClipboard_name: '复制到剪贴板',
		sssIcon_copyToClipboard_description: '[SSS] 在弹窗中添加“复制选中内容到剪贴板”图标。',
		sssIcon_openAsLink_name: '作为链接打开',
		sssIcon_openAsLink_description: '[SSS] 在弹窗中添加“将选中内容作为链接打开”图标。',
		sssIcon_separator_name: '分隔符',
		sssIcon_separator_description: '[SSS] 添加一个分隔符。',

		/* ===== toolbar popup ===== */

		popup_settings: '设置',
		popup_sponsor: '赞助',

		/* ===== intro page ===== */

		intro_title: '欢迎使用 SSS！',
		intro_greeting: '嗨！抱歉打扰你。我是 <span class="sss">Swift Selection Search</span>，朋友们都叫我 <span class="sss">SSS</span>。',
		intro_tryIt: '试着选中一些文字，我的弹窗就会出现。右键菜单里也有我哦！',
		intro_q1_name: '如何自定义设置？',
		intro_q1_text: '点击 Chrome 工具栏中的<strong>扩展程序</strong>图标（拼图块），然后点击 <strong>Swift Selection Search</strong> 旁边的三点菜单并选择<strong>选项</strong>。也可以打开 <span class="muted">chrome://extensions</span>，点击此扩展的<strong>详情</strong>，再点击<strong>扩展程序选项</strong>。',
		intro_q2_name: '如何添加新的搜索引擎？或删除一些？',
		intro_q2_text: '这些也可以在<a href="/settings/settings.html">选项页面</a>完成。:) 一定要读一下顶部的说明哦！',
		intro_q3_name: '弹窗在哪里 / 如何固定 SSS？',
		intro_q3_text: '点击 Chrome 工具栏中的<strong>扩展程序</strong>图标（拼图块），使用 <strong>Swift Selection Search</strong> 旁边的图钉按钮进行固定。工具栏图标会打开 SSS 的弹窗。',
		intro_q4_name: '遇到问题了吗？',
		intro_q4_text: '请打开<a href="/settings/settings.html">选项页面</a>，展开“使用说明”区块并查看“遇到问题？”部分。',
		intro_thanks: '谢谢！<br><span class="sss">SSS</span>',
	};

	const dictionaries: { [locale: string]: { [key: string]: string } } = {
		en: english,
		zh_CN: chinese,
	};

	let currentLocale: Locale = "en";

	/* ------------------------------------ */

	// Defines the language for translations. Accepts "auto", "en" or "zh_CN".
	export function setLanguage(languageSetting: string)
	{
		if (languageSetting === "en" || languageSetting === "zh_CN") {
			currentLocale = languageSetting;
		} else {
			currentLocale = resolveAutoLanguage();
		}
	}

	export function getLocale(): Locale
	{
		return currentLocale;
	}

	function resolveAutoLanguage(): Locale
	{
		try {
			const uiLanguage = chrome.i18n.getUILanguage().toLowerCase();
			return uiLanguage.startsWith("zh") ? "zh_CN" : "en";
		} catch {
			return "en";
		}
	}

	// Returns the translation for a key, replacing $1, $2... with the extra
	// arguments, or null when the current locale has no entry for the key
	// (callers can then keep their own English fallback).
	export function translateOrNull(key: string, ...args: string[]): string
	{
		let value = dictionaries[currentLocale][key];
		if (value === undefined) return null;

		for (let i = 0; i < args.length; i++) {
			value = value.split("$" + (i + 1)).join(args[i]);
		}

		return value;
	}

	// Like translateOrNull(), but falls back to English and then to the key itself.
	export function t(key: string, ...args: string[]): string
	{
		return translateOrNull(key, ...args) ?? english[key] ?? key;
	}

	// Applies translations to every element with a data-i18n* attribute inside
	// the given root. Elements without a translation for the current locale keep
	// their original (English) content. NOTE: <template> contents are not
	// traversed by querySelectorAll, so clones must be translated by the code
	// that creates them.
	export function applyTranslations(root: Document | Element)
	{
		for (const elem of root.querySelectorAll("[data-i18n]")) {
			const value = translateOrNull(elem.getAttribute("data-i18n"));
			if (value !== null) elem.textContent = value;
		}

		for (const elem of root.querySelectorAll("[data-i18n-html]")) {
			const value = translateOrNull(elem.getAttribute("data-i18n-html"));
			if (value !== null) elem.innerHTML = value;
		}

		for (const elem of root.querySelectorAll("[data-i18n-title]")) {
			const value = translateOrNull(elem.getAttribute("data-i18n-title"));
			if (value !== null) elem.setAttribute("title", value);
		}

		for (const elem of root.querySelectorAll("[data-i18n-value]")) {
			const value = translateOrNull(elem.getAttribute("data-i18n-value"));
			if (value !== null) (elem as HTMLInputElement).value = value;
		}

		for (const elem of root.querySelectorAll("[data-i18n-placeholder]")) {
			const value = translateOrNull(elem.getAttribute("data-i18n-placeholder"));
			if (value !== null) elem.setAttribute("placeholder", value);
		}
	}
}
