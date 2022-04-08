export default (options) => {
    const targetElementInfo = {
        class: options.class,
    };
    const associateInfo = {
        id: options.associate_id,
    };
    return (tree) => {
        tree.match({ tag: 'a' }, (node) => {
            const content = node.content;
            const attrs = node.attrs;
            if (attrs?.href === undefined) {
                console.warn('No `href` attribute', node);
                return node;
            }
            let newClass = attrs.class;
            if (targetElementInfo.class !== undefined && targetElementInfo.class !== '') {
                const CLASS_SEPARATOR = ' ';
                const classList = attrs.class?.split(CLASS_SEPARATOR);
                if (classList === undefined) {
                    /* class 属性なしの要素 */
                    return node;
                }
                if (!classList.includes(targetElementInfo.class)) {
                    /* 当該クラス名のない要素 */
                    return node;
                }
                /* 指定されたクラス名を除去した上で変換する */
                const newClassList = classList.filter((className) => className !== targetElementInfo.class && className !== '');
                newClass = newClassList.length >= 1 ? newClassList.join(CLASS_SEPARATOR) : undefined;
            }
            if (!attrs.href.match(/^https:\/\/www\.amazon\.[a-z]+(\.[a-z]+)?\/dp\/([\dA-Z]{10})\/$/)) {
                console.warn('URL is not from Amazon product page', node);
                return node;
            }
            attrs.href = `${attrs.href}ref=nosim?tag=${associateInfo.id}`; // https://affiliate-program.amazon.com/help/node/topic/GP38PJ6EUR6PFBEC
            attrs.class = newClass;
            return {
                tag: 'a',
                attrs: attrs,
                content: content,
            };
        });
        return tree;
    };
};
//# sourceMappingURL=index.js.map